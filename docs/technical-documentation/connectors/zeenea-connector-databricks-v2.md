# Databricks Connector Guide

The Databricks connector V2 catalogs your Databricks Unity Catalog metadata — tables, views and
table columns — and enriches it with job lineage, column-level lineage and user-defined tags, for
one Databricks workspace.

## Capability overview

| Capability | Support |
| :--- | :--- |
| **Connection & operations** | |
| Authentication — OAuth2 | :material-check-circle:{ .green } Supported — machine-to-machine only (service principal) |
| Authentication — personal access token (PAT) | :material-close-circle:{ .red } Not supported |
| Filtering (inventory) | :material-check-circle:{ .green } Supported |
| **Objects & metadata** | |
| Tables, views, table columns | :material-check-circle:{ .green } Supported |
| Table primary & foreign keys | :material-check-circle:{ .green } Supported |
| Volumes, functions, AI / ML models | :material-close-circle:{ .red } Not supported |
| **Lineage** | |
| Databricks jobs | :material-check-circle:{ .green } Supported — field-to-field |
| Lineage produced outside a job (e.g. an interactive SQL query) | :material-check-circle:{ .green } Supported — direct table-to-table link² |
| Views | :material-check-circle:{ .green } Supported — field-to-field¹ |
| Notebooks, pipelines, SQL queries & dashboards as data processes | :material-close-circle:{ .red } Not supported |
| **Classification & governance** | |
| User-defined tags | :material-check-circle:{ .green } Read-only — tables, views and columns only (no write-back) |
| Masking & row-filter policies | :material-close-circle:{ .red } Not supported |
| Data classification | :material-close-circle:{ .red } Not supported |
| **Data** | |
| Data sampling (catalog feature) | :material-close-circle:{ .red } Not supported |
| Data profiling (catalog feature) | :material-close-circle:{ .red } Not supported |
| Databricks profiling metrics | :material-close-circle:{ .red } Not supported |
| Data quality monitoring (anomaly detection) | :material-close-circle:{ .red } Not supported |

<small>¹ For views, the connector does not call the lineage API: it exposes the view's SQL definition,
and the mapping is resolved down to the **field-to-field** level from that statement. It falls
back to table-to-table level when the statement cannot be fully parsed.</small>

<small>² Unity Catalog knows the table-to-table link but attributes it to no job. The upstream
table is then linked directly to the dataset, with no data process in between — there is no job to
describe.</small>

## Prerequisites & connection

### Prerequisites

Before creating the connection, make sure you have:

- A network route open between the scanner and the Databricks workspace (**port 443**, outbound).
  The same host and port are used for the optional JDBC traffic (tags, `jdbc_compute` lineage).
- A Databricks workspace with a **Unity Catalog** metastore.
- A dedicated Databricks **service principal** with an OAuth secret (machine-to-machine). The
  privileges to grant it **depend on which capabilities you enable**:
  core metadata needs only browse access, while some features require additional grants. See
  [Required privileges](#required-privileges) to grant only what you need.

### Supported versions

- **Databricks** — Unity Catalog REST API `2.1` (catalogs, schemas, tables, jobs) and `2.0`
  (lineage tracking). Available on AWS, Azure and GCP workspaces.
- **Scanner** — each plugin release requires a minimum scanner version. See the plugin's entry in
  [Zeenea Connector Downloads](./zeenea-connectors-list.md) for the exact version.

### Installing the plugin

The Databricks connector ships as a plugin. Download it from
[Zeenea Connector Downloads](./zeenea-connectors-list.md) and follow
[Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

The Databricks JDBC driver is **bundled with the plugin** — there is nothing else to install, even when you enable the features that use it.

### Connecting to Databricks

The connection is declared in a configuration file in the scanner's `/connections` folder.
Authentication is **OAuth2 machine-to-machine** with a service principal: the connector derives the
token endpoint from the workspace URL, so only the client ID and secret are needed.

!!! tip "Credentials & secrets"
    Credentials can be resolved from the scanner's **Secret Manager** instead of being stored in
    clear text in the configuration file. This is a scanner capability (scanner 73 and later).

=== "REST only"

    ```hocon
    name         = "<DISPLAY_NAME>"
    code         = "<CONNECTION_CODE>"
    connector_id = "databricks-v2"

    connection {
      url = "https://<WORKSPACE>.cloud.databricks.com"
      oauth {
        client_id     = "<CLIENT_ID>"
        client_secret = "<CLIENT_SECRET>"
      }
    }
    ```

=== "REST + SQL warehouse"

    ```hocon
    name         = "<DISPLAY_NAME>"
    code         = "<CONNECTION_CODE>"
    connector_id = "databricks-v2"

    connection {
      url = "https://<WORKSPACE>.cloud.databricks.com"

      # Required by user-defined tags and by the jdbc_compute lineage strategy
      http_path = "/sql/1.0/warehouses/<WAREHOUSE_ID>"

      oauth {
        client_id     = "<CLIENT_ID>"
        client_secret = "<CLIENT_SECRET>"
      }
    }
    ```

`connection.http_path` is the HTTP path of the SQL warehouse (or cluster) used for the SQL-based
features. You find it in the Databricks workspace under **SQL Warehouses → [warehouse] →
Connection details → HTTP path**. It is only needed when
[User-defined tags](#user-defined-tags) or the `jdbc_compute` field lineage strategy
(see [Databricks jobs](#databricks-jobs)) is enabled; when one of them is enabled without it, the
connection is rejected at startup.

## Detailed capabilities & configuration

For the full list of properties and defaults, see the [Configuration reference](#configuration-reference).

!!! note
    Features marked :material-cash:{ .amber } run SQL statements on the **Databricks SQL warehouse**
    declared in `connection.http_path`, and therefore consume compute. The actual cost depends on
    warehouse size, the number of objects and the extraction frequency — size and schedule these
    accordingly.

### Connection & operations

#### Authentication

The connector authenticates as a **service principal** using the OAuth2 client-credentials flow.
The token endpoint is built from `connection.url` (`<connection.url>/oidc/v1/token`) and the
`all-apis` scope is requested. See [Connecting to Databricks](#connecting-to-databricks).

#### Filtering

> **Config:** `inventory_filters`

Filters restrict the inventory to the objects you care about, following the
[Universal filters](../../technical-documentation/scanners/zeenea-universal-filters.md) syntax.
Rules match Databricks objects on:

- `catalog` — Unity Catalog catalog
- `schema` — schema
- `table` — table or view name

#### Proxy & TLS

> **Config:** `proxy.*`, `tls.truststore.*`

The REST traffic (including the OAuth2 token request) honours the scanner's proxy and trust-store
settings. Use `tls.truststore.*` when the workspace certificate is issued by a private authority.

!!! warning "SQL traffic ignores these settings"
    The JDBC connection used by [User-defined tags](#user-defined-tags) and by the `jdbc_compute`
    field lineage strategy (see [Databricks jobs](#databricks-jobs)) connects directly over TLS: it
    does **not** go through `proxy.*` and does not use `tls.truststore.*`.

### Objects & metadata

The connector maps Databricks objects to catalog objects as follows:

| Databricks object | Imported into the platform as |
| :--- | :--- |
| Table, view | **Dataset** |
| Table column | **Field** |
| Job that feeds a table | **Data process** (see [Lineage](#lineage)) |
| User-defined tags | Properties on the dataset and its fields |

Catalogs and schemas are traversed to discover tables, but are not imported as catalog objects.
Databricks **system catalogs** and every `information_schema` schema are excluded from the
inventory.

**Dataset** — a table or a view:

- **Name & description** — from the Unity Catalog comment
- **Location** — catalog name and schema name
- **Type** — the Unity Catalog table type (e.g. `MANAGED`, `EXTERNAL`, `VIEW`) and the data source format (e.g. `DELTA`)
- **Storage location** — the underlying storage path, when the table has one
- **Identifiers** — metastore ID and table ID
- **Audit** — created at / created by, updated at / updated by
- **SQL query** — for views, the view definition, with the `databricks` dialect
- **Primary key** — which of its fields form the primary key
- **Foreign keys** — links from its fields to fields in other datasets
- **User-defined tags** — when enabled

**Field** — a table column:

- **Name & description** — from the Unity Catalog comment
- **Type** — mapped data type and native Databricks type
- **Position** — the column index
- **Nullable** — from the column definition
- **Multivalued** — for `ARRAY` and `MAP` columns
- **User-defined tags** — when enabled

Complex columns are **flattened into additional fields**, so that each leaf can be documented and
linked individually:

| Column type | Fields produced |
| :--- | :--- |
| `STRUCT` | the column, plus one field per member, named `column.member` (recursively) |
| `MAP` | the column, plus `column[key]` and `column[value]` (recursively) |
| `ARRAY` | the column (typed after its element), plus the element's own sub-fields |

#### Identification keys

Each catalog object carries an **identification key**, built by the connector.
See [Identification keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identification key | Components |
| :--- | :--- | :--- |
| Dataset | `catalog/schema/table` | **catalog**: Unity Catalog catalog · **schema**: schema · **table**: table or view name |
| Field | `catalog/schema/table/field_key` | …plus **field_key**: column name (dotted path for a sub-field) |
| Data process | `job_id` | **job_id**: Databricks job identifier |

Keys are scoped to the **workspace host**, not to the connection code: two connections pointing at
the same workspace produce the same keys, and lineage links resolve across connectors.

### Lineage

Lineage is materialized as **Data processes** that link input and output assets
(*input → Data process → output*).

#### Databricks jobs

> **Config:** `lineage.field_to_field.enabled`, `lineage.field_to_field.strategy` · **Default:** table-to-table always on, field-to-field off · :material-lock:{ .amber } [Required privileges](#required-privileges)

Upstream tables → **job** → the extracted table, read from the Unity Catalog lineage-tracking API.
One data process is created per upstream job, named after the job and carrying its description,
workflow ID, workflow URL and creation metadata. Table-to-table lineage is not configurable: it is
fetched for every extracted table.

**Field-to-field lineage is optional**. Both strategies resolve the same mapping and
differ only in how they fetch it:

| | `rest_api` *(default)* | `jdbc_compute` |
| :--- | :--- | :--- |
| Best suited to | Narrow tables, or a workspace where no SQL warehouse may be used | Wide tables, where one call per column slows the extraction down |
| Read from | Lineage-tracking REST API | `system.access.column_lineage` system table |
| Queries issued | One call per upstream column — slower on wide tables | One query per source/target table pair |
| Databricks compute | None | :material-cash:{ .amber } SQL warehouse compute |
| Extra configuration required | None | `connection.http_path` |

Only the selected strategy runs: there is **no fallback**. When it returns nothing — a missing
privilege, an unreachable warehouse, a SQL error — the data process keeps its table-level lineage
and the import carries on. One case is not tolerated: selecting `jdbc_compute` without
`connection.http_path` **rejects the connection at startup**, before any import.

!!! note "Degraded cases"
    - A job the service principal cannot read still produces a data process, named after its job ID
      instead of its name.
    - An upstream table that Unity Catalog attributes to no job is linked directly to the dataset,
      without a data process.

#### Views

> **Default:** always on

Source tables → **view** → the view.
For a view, the connector exposes the view's **SQL definition**
(property *SQL Query*, dialect `databricks`). The mapping is resolved down to the
**field-to-field** level from that statement, and falls back to table-to-table level when the statement cannot be fully parsed.

### Classification & governance

#### User-defined tags

> **Config:** `tags.enabled` · **Default:** off · :material-lock:{ .amber } [Required privileges](#required-privileges) · :material-cash:{ .amber } SQL warehouse compute · requires `connection.http_path`

Retrieves user-defined Databricks tags on **tables, views and their columns**, and attaches them as
properties. The Databricks REST API exposes no tag endpoint, so tags are read over JDBC from each
catalog's `information_schema.table_tags` and `information_schema.column_tags` views.

- **System tags and governed tags** are both retrieved.
- Tags on **catalogs, schemas, volumes and jobs** are not retrieved.
- **Read-only** — the connector never writes tags back to Databricks.

!!! note "Degraded mode"
    `connection.http_path` is mandatory when `tags.enabled = true`; without it the connection is
    rejected at startup. If the path is set but the SQL warehouse cannot be reached, or if the
    `SELECT` privilege on the tag views is missing, tags are **skipped with a warning** and the rest
    of the import proceeds.

## Required privileges

The connector is **read-only**. Grant only what the enabled features need — the table below maps
each capability to the Databricks objects it reads and the privilege required.

| Capability | Objects / APIs queried | Privilege required |
| :--- | :--- | :--- |
| Inventory (catalogs, schemas, tables) | `GET /api/2.1/unity-catalog/catalogs`, `/schemas`, `/tables` | `USE CATALOG` on the catalog, `USE SCHEMA` on the schema, and `BROWSE` (or `SELECT`) on the objects |
| Table metadata, columns, primary & foreign keys | `GET /api/2.1/unity-catalog/tables/{full_name}` | same as above |
| Job lineage (table level) | `GET /api/2.0/lineage-tracking/table-lineage` | object privileges above — *validate with your admin* |
| Job name & description | `GET /api/2.1/jobs/get` | `CAN_VIEW` on each job |
| Field-to-field lineage — `rest_api` | `GET /api/2.0/lineage-tracking/column-lineage` | object privileges above — *validate with your admin* |
| Field-to-field lineage — `jdbc_compute` | `system.access.column_lineage` (SQL) | `USE CATALOG` on `system`, `USE SCHEMA` on `system.access`, `SELECT` on the table, plus **Can use** on the SQL warehouse |
| User-defined tags | `<catalog>.information_schema.table_tags` / `column_tags` (SQL) | `SELECT` on both views, per catalog, plus **Can use** on the SQL warehouse |

!!! note
    `BROWSE` is enough for the whole inventory and for table metadata: the connector asks the API
    to include browse-only objects. The service principal never needs `SELECT` on your data to
    catalog it.

Example grants for a dedicated service principal (adapt names, then validate against your policy):

```sql
-- 1. Metadata: repeat per catalog to be cataloged
GRANT USE CATALOG ON CATALOG `<catalog>` TO `<service_principal_app_id>`;
GRANT USE SCHEMA  ON SCHEMA  `<catalog>`.`<schema>` TO `<service_principal_app_id>`;
GRANT BROWSE      ON CATALOG `<catalog>` TO `<service_principal_app_id>`;

-- 2. User-defined tags: repeat per catalog
GRANT SELECT ON TABLE `<catalog>`.`information_schema`.`table_tags`  TO `<service_principal_app_id>`;
GRANT SELECT ON TABLE `<catalog>`.`information_schema`.`column_tags` TO `<service_principal_app_id>`;

-- 3. Field-to-field lineage with the jdbc_compute strategy
--    system.access is a metastore-level schema: run these as a metastore admin
GRANT USE CATALOG ON CATALOG `system` TO `<service_principal_app_id>`;
GRANT USE SCHEMA  ON SCHEMA  `system`.`access` TO `<service_principal_app_id>`;
GRANT SELECT ON TABLE `system`.`access`.`column_lineage` TO `<service_principal_app_id>`;
```

In addition, in the workspace UI:

- **SQL Warehouses → [warehouse] → Permissions** — grant the service principal **Can use** (or
  **Can run**), for user-defined tags and for the `jdbc_compute` lineage strategy.
- **Workflows → [job] → Permissions** — grant the service principal **CAN_VIEW**, so that data
  processes are named after the job instead of its ID.

## Configuration reference

The table below lists the connection properties handled by the Databricks V2 connector.

!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

| Property | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| **General** | | | |
| `name` | — | Yes | Display name shown to catalog users. |
| `code` | — | Yes | Unique connection identifier. Do not change after registration. |
| `connector_id` | — | Yes | Connector type. Must be `databricks-v2`. |
| `enabled` | `true` | No | Whether the connection is active. |
| **Connection** | | | |
| `connection.url` | — | Yes | Workspace URL, e.g. `https://<workspace>.cloud.databricks.com`. |
| `connection.oauth.client_id` | — | Yes | Service principal client ID (application ID). |
| `connection.oauth.client_secret` | — | Yes | Service principal OAuth secret. |
| `connection.http_path` | — | Conditional | HTTP path of the SQL warehouse. Required when `tags.enabled = true`, or when `lineage.field_to_field.enabled = true` with `strategy = "jdbc_compute"`. |
| `connection.timeout` | `300000` | No | HTTP call timeout, in milliseconds. |
| `connection.keep_alive` | `300000` | No | HTTP keep-alive, in milliseconds. |
| **Filtering** | | | |
| `inventory_filters` | *(none)* | No | Which objects are cataloged (`ACCEPT` / `REJECT`), on `catalog`, `schema` and `table`. See [Filtering](#filtering). |
| **Lineage** | | | |
| `lineage.field_to_field.enabled` | `false` | No | Column-level lineage inside job data processes. See [Databricks jobs](#databricks-jobs). |
| `lineage.field_to_field.strategy` | `rest_api` | No | `rest_api` or `jdbc_compute`. Applies only when `lineage.field_to_field.enabled = true`, but the value is validated in all cases: any other value is rejected at startup. |
| **Tags** | | | |
| `tags.enabled` | `false` | No | User-defined tags on tables and columns (read-only). See [User-defined tags](#user-defined-tags). |
| **Proxy** | | | |
| `proxy.scheme` | *(none)* | No | `http` or `https`. |
| `proxy.hostname` | *(none)* | No | Proxy address. |
| `proxy.port` | *(none)* | No | Proxy port. |
| `proxy.username` | *(none)* | No | Proxy username. |
| `proxy.password` | *(none)* | No | Proxy account password. |
| **TLS** | | | |
| `tls.truststore.path` | *(none)* | No | Trust store file path, containing the certification chain. |
| `tls.truststore.password` | *(none)* | No | Trust store password. |
| `tls.truststore.type` | *(from the file extension)* | No | `PKCS12` or `JKS`. |

## Troubleshooting

| Symptom | Likely cause | Fix |
| :--- | :--- | :--- |
| The connection is rejected before anything is cataloged | `tags.enabled = true`, or the `jdbc_compute` strategy, without `connection.http_path` | Set `connection.http_path` — see [Connecting to Databricks](#connecting-to-databricks) |
| Catalogs, schemas or tables missing from the inventory, with no error | Unity Catalog silently returns only what the service principal may see | Grant `USE CATALOG`, `USE SCHEMA` and `BROWSE` — see [Required privileges](#required-privileges) |
| Tables sync, but no field-to-field lineage | The selected strategy failed and there is no fallback: table-level lineage is kept, the import carries on (log `databricks_column_lineage_jdbc_failed`) | Grant the privileges of that strategy, or switch to `rest_api`, which needs none — see [Required privileges](#required-privileges) |
| No tag, although `tags.enabled = true` and the import succeeds | Warehouse unreachable, or `SELECT` missing on the tag views (logs starting with `databricks_tags_`) | Grant **Can use** on the warehouse and `SELECT` on both tag views, per catalog — see [Required privileges](#required-privileges) |
| Data processes named with a number instead of the job name | No `CAN_VIEW` on the job, so its definition cannot be read | Grant `CAN_VIEW` on the jobs — see [Required privileges](#required-privileges) |
| Extraction much slower after enabling field-to-field lineage | `rest_api` issues one call per upstream column | Switch to `jdbc_compute` — one query per table pair, at the cost of warehouse compute |

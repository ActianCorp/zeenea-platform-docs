# BigQuery V2 Connector Guide

The BigQuery connector V2 catalogs your Google BigQuery metadata —
tables, external tables, table fields, views, materialized views and more —
and enriches it with lineage across one or several Google Cloud projects.

## Capability overview

| Capability | Support |
| :--- | :--- |
| **Connection & operations** | |
| Authentication (service account JSON key) | :material-check-circle:{ .green } Supported |
| Multi-project (auto-discovery or a single project) | :material-check-circle:{ .green } Supported |
| Filtering (inventory, sampling) | :material-check-circle:{ .green } Supported |
| **Objects & metadata** | |
| Tables, external tables, table snapshots, table fields, views, materialized views | :material-check-circle:{ .green } Supported |
| Primary & foreign keys | :material-check-circle:{ .green } Supported |
| Technical properties (e.g. row count) | :material-check-circle:{ .green } Supported |
| Nested & repeated columns | :material-close-circle:{ .red } Not supported — imported as a single field |
| Stored procedures & user-defined functions (routines) | :material-close-circle:{ .red } Not supported |
| BigQuery ML models | :material-close-circle:{ .red } Not supported |
| **Lineage** | |
| Views & materialized views | :material-check-circle:{ .green } Supported — field-to-field¹ |
| Table transformation jobs | :material-check-circle:{ .green } Supported — table-to-table, and field-to-field with `data_lineage_streaming`² |
| Copy jobs | :material-check-circle:{ .green } Supported — table-to-table |
| Load jobs from Cloud Storage | :material-check-circle:{ .green } Supported — from the source bucket |
| **Classification & governance** | |
| BigQuery labels (tables & views) | :material-check-circle:{ .green } Read-only (no write-back) |
| Policy tags & column-level security | :material-close-circle:{ .red } Not supported |
| Row-access policies | :material-close-circle:{ .red } Not supported |
| **Data** | |
| Data sampling | :material-check-circle:{ .green } Supported |
| Data profiling | :material-close-circle:{ .red } Not supported |

<small>¹ View and materialized-view definition SQL is parsed by the platform down to the
**field-to-field** level, and falls back to table level when the statement cannot be fully
parsed.<br>
² Field links are inferred by the connector from the Data Lineage API — see
[Lineage](#lineage).</small>

## Prerequisites & connection

### Prerequisites

Before creating the connection, make sure you have:

- A network route open between the scanner and the Google Cloud APIs (**port 443**,
  outbound, to `*.googleapis.com` — HTTPS for BigQuery, gRPC for Cloud Resource Manager and the
  Data Lineage API). An outbound proxy can be declared in the connection.
- The **Cloud Resource Manager API** enabled, when projects are auto-discovered, and the
  **Data Lineage API** enabled, which both lineage strategies read — a disabled API is refused
  regardless of the IAM roles granted.
- A dedicated Google Cloud **service account**. The IAM roles to grant it **depend on which
  capabilities you enable** (lineage strategy, data sampling…): core metadata needs only
  read access. See [Required privileges](#required-privileges) to grant only what you need.
- A Google Cloud project to **bill query jobs** to, if you enable a feature that runs them —
  view sampling, for instance.

### Supported versions

- **Google BigQuery** — cloud service.
- **Scanner** — each plugin release requires a minimum scanner version. See the plugin's
  entry in [Zeenea Connector Downloads](./zeenea-connectors-list.md) for the exact version.

### Installing the plugin

The BigQuery connector ships as a plugin. Download it from
[Zeenea Connector Downloads](./zeenea-connectors-list.md) and follow
[Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Connecting to BigQuery

The connection is declared in a configuration file in the scanner's `/connections` folder.
Authentication uses a **service account JSON key**, provided in the `connection.json_key`
property either as a file reference or inline.

!!! tip "Credentials & secrets"
    Prefer the file reference in production. The key can also be resolved from the scanner's
    **Secret Manager** instead of being stored in clear text in the configuration file — a
    scanner capability, which requires a scanner 73 or later.

!!! warning
    The value must be a `file:` URL or inline JSON. A bare path such as
    `/etc/keys/bigquery-scanner.json` is read as JSON content and fails with
    `Error loading JsonKey`; a `file:` URL that cannot be read fails with `Invalid file: …`,
    and a blank value with `json_key configuration is mandatory`.

=== "Key file"

    ```hocon
    connector_id = "bigquery-v2"

    connection {
      # Absolute path of the JSON key file, as a file: URL
      json_key = "file:///etc/keys/bigquery-scanner.json"
    }
    ```

=== "Inline JSON key"

    ```hocon
    connector_id = "bigquery-v2"

    connection {
      # Service account credentials (JSON content)
      json_key = """<SERVICE_ACCOUNT_JSON_KEY>"""
    }
    ```

Two optional properties define the scope and the billing of the connection:

```hocon
connection {
  # Inventory a single project. If blank, every accessible project is inventoried.
  project_id = "<PROJECT_ID>"

  # Issue every API call and query job under this project. If blank, each call goes to the
  # project of the object it targets, which then needs bigquery.jobs.create.
  billing_project_id = "<BILLING_PROJECT_ID>"
}
```

## Detailed capabilities & configuration

For the full list of properties and defaults, see the [Configuration reference](#configuration-reference).

!!! note
    Features marked :material-cash:{ .amber } run **BigQuery query jobs**, billed as scanned
    bytes to the billing project (`connection.billing_project_id`; if blank, the project of the
    table each job targets). Every other operation only performs metadata or read-API calls —
    no query bytes are billed.

### Connection & operations

#### Authentication

Service-account authentication is configured when declaring the connection —
see [Connecting to BigQuery](#connecting-to-bigquery).

#### Multi-project

> **Config:** `connection.project_id` · **Default:** *(auto-discovery)*

When `connection.project_id` is left blank, the connector **auto-discovers** every project the
service account can see through the Cloud Resource Manager API — including projects that do not
use BigQuery. Set `connection.project_id` to restrict the scope, or use [Filtering](#filtering)
to narrow it.

Every object is attributed to its project, but all projects of a connection share a **single
data source** in the catalog: the project is part of the object's identification key, not of
the data source.

#### Filtering

> **Config:** `inventory_filters`, `sampling_filters`

Filters restrict each stage to the objects you care about, following the
[Universal filters](../../technical-documentation/scanners/zeenea-universal-filters.md) syntax:

- **`inventory_filters`** — which objects are cataloged.
- **`sampling_filters`** — which objects data sampling runs on.

Rules match BigQuery objects on `project`, `dataset` (the BigQuery dataset, i.e. the container)
and `table`. Each key falls back to the legacy `filters` key, with the same syntax, when it is
absent.

#### Partitioned-table grouping

> **Config:** `inventory.partition.pattern` · **Default:** off

A regular expression matched against table names: every match is replaced by a wildcard, so that
tables differing only by a partition suffix are cataloged as **a single Dataset**. With
`inventory.partition.pattern = "\\d{8}$"`, the tables `events_20240101`, `events_20240102` and
`events_20240103` become one Dataset named `events_*`. A table the pattern does not match keeps
its own entry — `events_summary` stays a Dataset of its own.

The group takes its metadata from its **most recent table**: fields, description, keys,
statistics, lineage and data samples are all read from that one table. Statistics are therefore
the latest table's, not the sum of the group, and a schema change between tables shows only in
its latest state.

!!! note
    The grouping is decided at inventory time. After changing or removing the pattern, run an
    inventory: entries grouped under the former pattern no longer resolve to anything.

### Objects & metadata

The connector maps BigQuery objects to catalog objects as follows:

| BigQuery object | Imported into the platform as |
| :--- | :--- |
| Table, external table, view, materialized view, table snapshot | **Dataset** |
| Table column | **Field** |
| View / materialized-view definition, lineage operation (Data Lineage API link, snapshot base table) | **Data process** (see [Lineage](#lineage)) |
| Labels set on a table or a view | Property on the dataset (see [BigQuery labels](#bigquery-labels)) |

!!! warning "BigQuery *dataset* vs platform *Dataset*"
    A BigQuery **dataset** is a container — the equivalent of a schema — and is not cataloged as
    an object of its own: it appears as a component of the identification key of the tables it
    holds. A **Dataset** in the platform is a table, external table, view, materialized view or
    snapshot.

**Dataset** — a table, external table, view, materialized view, or table snapshot:

- **Name & description** — the table name, and the description set on the source object
- **Friendly name** — the BigQuery display name, when one is set
- **Location** — project, BigQuery dataset, and table name
- **Data location** — the region the data is stored in (standard tables only)
- **Type** — the BigQuery table type (table, external table, view, materialized view, snapshot)
- **Statistics** — number of rows, storage size and long-term storage size, for objects that
  have their own storage
- **Timestamps** — creation, last-modification and expiration dates
- **Labels** — the BigQuery labels set on the asset
- **Primary key** — which of its fields form the primary key
- **Foreign keys** — links from its fields to fields in other datasets. A foreign key with no
  name, no referenced table or project, or no columns, is skipped.

**Field** — a table column:

- **Name & description** — from the source description
- **Type** — mapped data type, and the native BigQuery type as reported by the API
  (`INTEGER`, `FLOAT`, `BOOLEAN`, `RECORD`…). A column whose type the API does not report is
  cataloged with an unknown type and no native type.
- **Position** — the column index
- **Nullability** — a column is nullable only when its BigQuery mode is `NULLABLE`; `REQUIRED`
  and `REPEATED` columns are reported as not nullable

!!! note
    Only top-level columns are cataloged: a `RECORD` column is imported as a single field of
    type *Struct*, without its sub-fields, and a `REPEATED` column is imported as a single field
    that is not flagged as multivalued.

!!! note
    Extraction is best-effort: a table, a field or a foreign key that cannot be read is logged
    and skipped, and the rest of the table — along with the other tables — is still imported.

#### Identification keys

Each catalog object carries an **identification key**, built by the connector.
See [Identification keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identification key | Components |
| :--- | :--- | :--- |
| Data source | `type` | **type**: always `bigquery` — a single data source per connection, whatever the number of projects, shared by every dataset and by the lineage references to BigQuery tables |
| Dataset | `project/dataset/table` | **project**: Google Cloud project · **dataset**: BigQuery dataset · **table**: table, external table, view, materialized view, or snapshot name |
| Field | `project/dataset/table/field_key` | …plus **field_key**: column name |

### Lineage

Lineage is materialized as **Data processes** that link input and output assets
(*input → Data process → output*).

Transformation, copy and load jobs are read from the **Google Cloud Data Lineage API**, through
one of two **mutually exclusive strategies**, selected with `lineage.strategy`:

- **`data_lineage_api`** *(default)* — **table-to-table** links, read with `searchLinks`.
- **`data_lineage_streaming`** — the same table-to-table links, plus **field-to-field** links
  between columns, read with `SearchLineageStreaming`.

!!! warning "Field links are inferred"
    The API does not say whether a column link is a computation or merely a filter or join key,
    so the connector infers which ones to declare: it can keep a spurious link, or drop a genuine
    one. Source tables are always declared, so table-level lineage is unaffected.

#### Views & materialized views

Source tables → **view definition** → the view. Always on, not configurable. The definition SQL
is parsed by the platform down to the **field-to-field** level, falling back to table level when
the statement cannot be fully parsed. Neither strategy queries the API for views, so the edge is
never reported twice.

#### Table snapshots

Base table → **snapshot** → the snapshot, at **table-to-table** level. Always on, not
configurable. A snapshot is an immutable copy, so the base table declared in its own metadata is
its complete upstream lineage — at no API cost, and beyond the 30-day retention of the Data
Lineage API. A snapshot whose metadata carries no base table is logged and gets no lineage.

#### Table transformation jobs

> **Config:** `lineage.strategy` · **Default:** `data_lineage_api` ·
> :material-lock:{ .amber } [Required privileges](#required-privileges)

Source tables → **operation** → output table, for the statements that write into a table.

The connector makes **one API call per table**, at the location of its BigQuery dataset, and
attaches the sources the API reports. Views, materialized views and snapshots are skipped: they
already carry their own lineage.

#### Copy jobs

Source table → **copy** → destination table, at **table-to-table** level. Reported natively by
the Data Lineage API, with both strategies — nothing to enable.

#### Load jobs from Cloud Storage

Source bucket → **load** → destination table. The Data Lineage API reports Cloud Storage sources
at **bucket** level, so the upstream asset is the bucket itself, not the loaded files or folders.
The edge resolves only if that bucket is cataloged, as `path={bucket}` in a data source aliased
`gs-{bucket}`.

#### Sources outside BigQuery

The API names every source as `{system}:{name}`, and the connector maps the systems it knows:

| Source system | Referenced as |
| :--- | :--- |
| BigQuery | The table, in the `bigquery` data source. The reference is sent whether or not the source table is inventoried: the edge appears once that table is cataloged, by this connection or by another BigQuery connection. |
| Redshift, MySQL, Oracle, PostgreSQL, SQL Server, Db2, Snowflake, Hive | The table of the matching connector, matched by host and port — by account for Snowflake. A source with no host is skipped. |
| Cloud Storage | The bucket (see above) |

Any other system, or a name the connector cannot parse, is logged and skipped. These links appear
only if lineage events from those systems reached the Data Lineage API; Google does not produce
them on its own.

#### Lineage coverage notes

- **Job activity, not table history**: lineage reflects the jobs the API has recorded, over its
  fixed **30-day** retention. A table last written before that window shows no lineage.
- Nothing is recorded before the Data Lineage API is **enabled** on the project, and a link is
  not readable as soon as its job ends: on the jobs observed, from about 40 minutes to the next
  day.
- **Cross-project writes** (both strategies): the API stores a link under the project that **ran
  the job**, not under the table's. Links under a project the service account cannot read are
  dropped **silently** — grant `roles/datalineage.viewer` there too.
- A table whose BigQuery dataset location cannot be determined is logged and gets no lineage.
- A lineage read failure — a missing permission, for instance — is logged as a warning and
  yields empty lineage for the affected table; the rest of the synchronization continues.

### Classification & governance

#### BigQuery labels

Retrieves the labels set on tables and views, as a single text property holding the `key:value`
pairs. **Read-only** — the connector never writes labels back to BigQuery. Labels set on the
enclosing BigQuery dataset are not imported.

### Data

#### Data sampling

> **Config:** `sampling.view.enabled`, `sampling.view.simple_view_optimization` (views only) ·
> **Default:** off · :material-cash:{ .amber } Query jobs (views only) ·
> :material-lock:{ .amber } [Required privileges](#required-privileges)

Exposes a preview of field values, retrieved on demand from the sampled object. See
[Data Sampling](../../features-applications/cross-application-features/zeenea-data-sampling.md).

**Tables** are sampled without any configuration, through the BigQuery read API
(`tabledata.list`): no query job, and no query bytes billed.

**Views and materialized views** are sampled only when `sampling.view.enabled` is set, by
running the view's query as a **query job** — one per request.

!!! warning "Cost of view sampling"
    A `LIMIT` does not reduce the bytes BigQuery scans: every sample request on a view scans
    everything its query reads, and is billed accordingly. On large views the cost is
    significant, and it repeats with each request — hence the property being off by default.

**`sampling.view.simple_view_optimization`** cuts that cost, for the views it can handle. A view
qualifies as *simple* when its query reads **a single table**: exactly one `FROM`, and no `JOIN`,
`UNION`, `GROUP BY` or subquery. The connector then adds a `TABLESAMPLE SYSTEM` clause on that
source table, sized to return about twice the requested rows, so the job scans a fraction of the
table instead of all of it.

- Materialized views, and views that do not qualify, always run the plain query.
- The source table must be identifiable in the query and have a known, non-zero row count.
- `TABLESAMPLE SYSTEM` reads whole storage blocks, so a sample can come back with fewer rows
  than requested.

!!! warning
    When the optimization is enabled and fails on a given view — source table not identifiable,
    zero or unknown row count, schema mismatch, query error — **no sample is returned** for that
    view: there is no fallback to the plain query.

## Required privileges

The connector is **read-only** with respect to your data. Grant only what the enabled
features need — the table below maps each capability to the Google APIs it reads and the
IAM role required.

| Capability | Google APIs / objects read | IAM required |
| :--- | :--- | :--- |
| Core metadata (tables, fields, constraints, view definitions) | BigQuery metadata (`datasets.list`, `tables.list`, `tables.get`) | `roles/bigquery.metadataViewer` on each inventoried project |
| Project auto-discovery | Cloud Resource Manager (`projects.search`) | `resourcemanager.projects.get`, already carried by `roles/bigquery.metadataViewer` |
| Lineage (both strategies) | Data Lineage API (`searchLinks`, `SearchLineageStreaming`) | `roles/datalineage.viewer` on each inventoried project, and on every project that runs jobs writing those tables |
| Data sampling — tables | Table data (`tabledata.list` read API) | `bigquery.tables.getData` on the sampled tables, e.g. `roles/bigquery.dataViewer` — no query job |
| Data sampling — views | Table data (`SELECT … FROM <view>` query job) | `roles/bigquery.jobUser` where query jobs run · plus `bigquery.tables.getData` on the view and the tables it reads |

!!! note
    "Where query jobs run" is the billing project when `connection.billing_project_id` is set,
    and every inventoried project otherwise. Metadata roles cover object definitions and
    structure, including the view definitions used for lineage; actual **table data** is read
    only when a sample is requested.

!!! note
    Field-level lineage additionally reads `datalineage.events.getFields`, a permission
    `roles/datalineage.viewer` already carries. Check it explicitly only if you replace that role
    with a custom one.

Example bindings for a dedicated service account (adapt names, then validate against your policy):

```bash
PROJECT="<PROJECT_ID>"                     # repeat for each inventoried project
BILLING_PROJECT="<BILLING_PROJECT_ID>"     # connection.billing_project_id
SA="serviceAccount:<SERVICE_ACCOUNT_EMAIL>"

# Core metadata, and project auto-discovery
gcloud projects add-iam-policy-binding "$PROJECT" --member="$SA" \
  --role="roles/bigquery.metadataViewer"

# Lineage, both strategies — grant it as well on every project that runs jobs writing your tables
gcloud projects add-iam-policy-binding "$PROJECT" --member="$SA" \
  --role="roles/datalineage.viewer"

# Data sampling — scope it to the datasets you actually sample
gcloud projects add-iam-policy-binding "$PROJECT" --member="$SA" \
  --role="roles/bigquery.dataViewer"

# View sampling only: query jobs need a job user where they run
gcloud projects add-iam-policy-binding "$BILLING_PROJECT" --member="$SA" \
  --role="roles/bigquery.jobUser"
```

## Configuration reference

The table below lists the connection properties handled by the BigQuery V2 connector.

!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

| Property | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| **General** | | | |
| `name` | — | Yes | Display name shown to catalog users. |
| `code` | — | Yes | Unique connection identifier. Do not change after registration. |
| `connector_id` | — | Yes | Connector type. Must be `bigquery-v2`. |
| `enabled` | `true` | No | Whether the connection is active. |
| **Connection** | | | |
| `connection.json_key` | — | Yes | Google Cloud service account credentials: a `file:` URL pointing to the key file, or the JSON content inline as a HOCON triple-quoted string. A bare file path is not supported. See [Connecting to BigQuery](#connecting-to-bigquery). |
| `connection.project_id` | *(auto-discovery)* | No | Google Cloud project to inventory. If blank, every project accessible to the service account is inventoried. See [Multi-project](#multi-project). |
| `connection.billing_project_id` | *(project of the targeted object)* | No | Project under which every BigQuery API call and query job is issued. See [Connecting to BigQuery](#connecting-to-bigquery). |
| **Proxy** | | | |
| `proxy.scheme` | *(none)* | No | Proxy scheme, `http` or `https`. The proxy is used only when scheme and hostname are both set. |
| `proxy.hostname` | *(none)* | No | Proxy host name. |
| `proxy.port` | *(none)* | Yes, when a proxy is set | Proxy port. Required as soon as `proxy.scheme` and `proxy.hostname` are set: without it, the calls made over gRPC — project discovery and lineage — fail. |
| `proxy.username` | *(none)* | No | Proxy user name. Used only when a password is also set. |
| `proxy.password` | *(none)* | No | Proxy password. Used only when a user name is also set. |
| **Filtering & inventory** | | | |
| `inventory_filters` | *(`filters`)* | No | Which objects are cataloged (`ACCEPT` / `REJECT`), matching on `project`, `dataset` and `table`. Falls back to the legacy `filters` key when absent. See [Filtering](#filtering). |
| `sampling_filters` | *(`filters`)* | No | Which objects data sampling runs on. Falls back to the legacy `filters` key when absent. See [Filtering](#filtering). |
| `inventory.partition.pattern` | *(none)* | No | Regular expression whose every match in a table name is replaced by a wildcard, cataloging the matching tables as a single Dataset. See [Partitioned-table grouping](#partitioned-table-grouping). |
| **Lineage** | | | |
| `lineage.strategy` | `data_lineage_api` | No | Lineage strategy: `data_lineage_api` or `data_lineage_streaming`. A blank or missing value defaults to `data_lineage_api`. The two are mutually exclusive, and any other value fails connection creation. See [Lineage](#lineage). |
| **Sampling** | | | |
| `sampling.view.enabled` | `false` | No | Enable data sampling for views and materialized views, by running the view's query as a query job. Tables are sampled without configuration. See [Data sampling](#data-sampling). |
| `sampling.view.simple_view_optimization` | `false` | No | For views reading a single table, sample through a `TABLESAMPLE` clause on that table instead of scanning the whole view. No sample is returned when the optimization fails. See [Data sampling](#data-sampling). |

## Troubleshooting

| Symptom | Likely cause | Fix |
| :--- | :--- | :--- |
| `403` on lineage or project discovery, although the IAM roles are granted | The API is not enabled on the project | Enable the Data Lineage API, or the Cloud Resource Manager API for auto-discovery |
| Objects sync but no lineage appears | Missing privileges: the lineage read fails with a log warning, the sync carries on | Grant the roles in [Required privileges](#required-privileges) |
| No lineage on a recently enabled project | Google records nothing before the Data Lineage API is enabled on the project | Wait — a job's lineage appears up to 24 hours after it runs. Activity from before the API was enabled is never recovered |

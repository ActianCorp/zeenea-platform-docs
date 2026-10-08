# BigQuery V2 Connector Guide

The BigQuery connector V2 catalogs your Google BigQuery metadata —
tables, views, materialized views, table fields, constraints and more — and enriches it with
lineage and data sampling, across one or several Google Cloud projects.

## Capability overview

| Capability | Support |
| :--- | :--- |
| **Connection & operations** | |
| Authentication (service account JSON key) | :material-check-circle:{ .green } Supported |
| Multi-project (auto-discovery of accessible projects) | :material-check-circle:{ .green } Supported |
| Filtering (inventory, by project and dataset) | :material-check-circle:{ .green } Supported |
| Partitioned-table grouping | :material-check-circle:{ .green } Supported |
| **Objects & metadata** | |
| Tables, external tables, views, materialized views, table fields | :material-check-circle:{ .green } Supported |
| Table snapshots | :material-check-circle:{ .green } Supported |
| Primary & foreign keys | :material-check-circle:{ .green } Supported |
| Table statistics (row count, size) | :material-check-circle:{ .green } Supported |
| **Lineage** | |
| Views & materialized views (definition SQL) | :material-check-circle:{ .green } Supported — field-to-field¹ |
| Data Lineage API (`data_lineage_api` strategy) | :material-check-circle:{ .green } Supported — dataset-to-dataset |
| Data Lineage API streaming (`data_lineage_streaming` strategy, trial) | :material-check-circle:{ .green } Supported — dataset-to-dataset and field-to-field (inferred²) |
| Copy jobs | :material-check-circle:{ .green } Supported — dataset level, as reported by the Data Lineage API |
| Table snapshots (base table) | :material-check-circle:{ .green } Supported — dataset level |
| Load jobs (from Cloud Storage) | :material-check-circle:{ .green } Supported — dataset level, the source bucket |
| **Data** | |
| Data sampling | :material-check-circle:{ .green } Supported (views: opt-in) |
| Fingerprint | :material-close-circle:{ .red } Not supported |

<small>¹ Lineage SQL (view and materialized-view definitions) is parsed by the Zeenea platform down
to the **field-to-field** level, and falls back to dataset level when the statement cannot be
fully parsed.<br>
² Field links come from the Data Lineage API and are filtered with a heuristic — see
[Data Lineage API streaming strategy](#data-lineage-api-streaming-strategy-trial).</small>

## Prerequisites & connection

### Prerequisites

Before creating the connection, make sure you have:

- A network route open between the Zeenea scanner and the Google Cloud APIs (**port 443**,
  outbound, to `*.googleapis.com` — BigQuery, Cloud Resource Manager, and, depending on the
  lineage strategy, the Data Lineage API).
- A dedicated Google Cloud **service account**. The IAM roles to grant it **depend on which
  capabilities you enable** (lineage strategy, data sampling…): core metadata needs only
  read access. See [Required privileges](#required-privileges) to grant only what you need.

### Supported versions

- **Google BigQuery** — cloud service.
- **Zeenea scanner** — each plugin release requires a minimum scanner version. See the plugin's
  entry in [Zeenea Connector Downloads](./zeenea-connectors-list.md) for the exact version.

### Installing the plugin

The BigQuery connector ships as a plugin. Download it from
[Zeenea Connector Downloads](./zeenea-connectors-list.md) and follow
[Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Connecting to BigQuery

The connection is declared in a configuration file in the scanner's `/connections` folder.
Authentication uses a **service account JSON key**, provided in the
`connection.json_key` property: either the JSON content inline, or a `file:` URL pointing to
the key file on the scanner host (e.g. `file:///etc/zeenea/bigquery-key.json`).

!!! tip "Credentials & secrets"
    The service account key can be resolved from the scanner's **Secret Manager** instead of
    being stored in clear text in the configuration file.

```hocon
connector_id = "bigquery-v2"

# Service account credentials (JSON content)
connection.json_key = """<SERVICE_ACCOUNT_JSON_KEY>"""

# Optional: restrict the inventory to one project.
# If blank or absent, every project accessible to the service account is inventoried.
connection.project_id = "<PROJECT_ID>"

# Optional: bill query jobs (view sampling) to a dedicated project.
# If blank, each query job is billed to the project of the table it targets.
connection.billing_project_id = "<BILLING_PROJECT_ID>"
```

## Detailed capabilities & configuration

For the full list of properties and defaults, see the [Configuration reference](#configuration-reference).

!!! note
    Features marked :material-cash:{ .amber } run **BigQuery query jobs** billed to the
    billing project (`connection.billing_project_id`; if blank, the project of the table each
    job targets). Core metadata extraction, table sampling, and the Data Lineage API only
    perform metadata or read-API calls — no query bytes are billed.

### Connection & operations

#### Authentication

Service-account authentication is configured when declaring the connection —
see [Connecting to BigQuery](#connecting-to-bigquery).

#### Multi-project

> **Config:** `connection.project_id`

When `connection.project_id` is left blank, the connector **auto-discovers** every project
accessible to the service account (through the Cloud Resource Manager API) and inventories
all of them. Set `connection.project_id` to restrict the scope to a single project. Every
object is attributed to its project.

#### Filtering

> **Config:** `inventory_filters`

Filters restrict the inventory to the objects you care about, following the
[Universal filters](../../technical-documentation/scanners/zeenea-universal-filters.md) syntax.

Rules match BigQuery objects on `project` and `dataset`.

#### Partitioned-table grouping

> **Config:** `inventory.partition.pattern` · **Default:** off

A regex pattern matched against table names: every match is replaced by a wildcard, so that
all partitions of a table are grouped as a **single inventory item** (e.g. `events_20260101`,
`events_20260102`, … are listed once as `events_*`). This keeps the inventory compact for
heavily partitioned tables.

When the grouped item is extracted, the wildcard is expanded: the connector lists the dataset
and builds **one Dataset per matching table**, each under its own table name (`events_20260101`,
`events_20260102`, …).

### Objects & metadata

The connector maps BigQuery objects to catalog objects as follows:

| BigQuery object | Imported into Zeenea as |
| :--- | :--- |
| Table, external table, view, materialized view, table snapshot | **Dataset** |
| Table column | **Field** |
| View / materialized-view definition, lineage operation (Data Lineage API link, snapshot base table) | **Data process** (see [Lineage](#lineage)) |

**Dataset** — a table, external table, view, materialized view, or table snapshot:

- **Name** — the table name
- **Description** — the table description
- **Location** — project, dataset, and table name
- **Type** — the BigQuery table type (`table`, `external`, `view`, `materialized view`, `snapshot`)
- **Statistics** — row count, size, and long-term storage size (bytes)
- **Timestamps** — creation, last-modification and expiration dates
- **Data location** — the table location (standard and model tables only; not set for views, materialized views, external tables or snapshots)
- **Labels** — the table labels, as space-separated `key:value` pairs
- **Friendly name** — the table's friendly name, or the table name when none is set
- **Primary key** — which of its fields form the primary key
- **Foreign keys** — links from its fields to fields in other datasets

**Field** — a table column:

- **Name** — the column name
- **Description** — the column description
- **Type** — mapped data type and native BigQuery type. `RECORD` and `REPEATED` (array) columns
  are mapped to a structure type; nested fields are not cataloged as separate fields. A column
  whose type is missing is kept with an unknown type.
- **Position** — the column index
- **Nullability** — nullable only when the BigQuery field mode is `NULLABLE`; `REQUIRED` and
  `REPEATED` fields are reported as not nullable

#### Identification keys

Each catalog object carries an **identification key**, built by the connector.
See [Identification keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identification key | Components |
| :--- | :--- | :--- |
| Data source | `type` | **type**: always `bigquery` (one data source per connection) |
| Dataset | `project/dataset/table` | **project**: Google Cloud project · **dataset**: BigQuery dataset · **table**: table, view, materialized view, or snapshot name |
| Field | `project/dataset/table/field_key` | …plus **field_key**: column name |

### Lineage

Lineage is materialized as **Data processes** that link input and output assets
(*input → Data process → output*).

The connector supports two **mutually exclusive lineage strategies**, selected with the
`lineage.strategy` property. Both read the Google Cloud Data Lineage API, through different
methods. They cannot be combined, so lineage edges are never double-reported: a connection
that sets `data_lineage_streaming` together with another value is rejected at creation.

| Strategy | Granularity | Status |
| :--- | :--- | :--- |
| `data_lineage_api` (default) | Dataset-to-dataset | Stable |
| `data_lineage_streaming` | Dataset-to-dataset and field-to-field (inferred) | Trial |

Whatever the strategy, **views and materialized views** get their lineage from their own
definition SQL, and **table snapshots** from their own metadata — see below.

!!! warning
    The former `job_history` strategy is no longer supported. A connection that still sets
    `lineage.strategy = job_history` fails at creation. Switch to `data_lineage_api`
    (dataset-level lineage) or `data_lineage_streaming` (dataset-level and field-to-field
    lineage). Leftover `lineage.job_history.*` properties are ignored.

#### Data Lineage API strategy

> **Config:** `lineage.strategy = data_lineage_api` · **Default**

Source datasets → **operation** → target table, read from the **Google Cloud Data Lineage
API** and attached to standard and external tables. The edges are **dataset-to-dataset**;
field-to-field lineage is not available from this source. Copy jobs are covered natively.

- Requires `roles/datalineage.viewer` on each inventoried project — see
  [Required privileges](#required-privileges).
- No billing project and no query jobs are needed.
- The Data Lineage API retains **30 days** of history.

#### Data Lineage API streaming strategy (trial)

> **Config:** `lineage.strategy = data_lineage_streaming` ·
> :material-lock:{ .amber } [Required privileges](#required-privileges)

Source datasets → **operation** → target table, read from the **Google Cloud Data Lineage
API** with one `SearchLineageStreaming` call per standard or external table (direct upstream
only). A single call returns both the source datasets and the **field-to-field** links, so a
relationship reaches the catalog through one channel. Use it instead of `data_lineage_api`, not
alongside it.

- Requires `roles/datalineage.viewer` on each inventoried project. Field-level links
  additionally need the `datalineage.events.getFields` permission — check that the role you
  grant carries it.
- No billing project and no query jobs are needed.
- The Data Lineage API retains **30 days** of history.
- Views, materialized views and table snapshots are not queried; they keep their definition-SQL
  and base-table lineage (see below).

```hocon
lineage {
  strategy = data_lineage_streaming
}
```

**Why it is a trial.** The Data Lineage API reports filter, grouping and expression
dependencies alike as `OTHER`: `SUM(amount) AS total` and `WHERE region = 'EU'` look the same.
The API exposes no job ID or SQL to tell them apart, so the connector infers which field links
to keep:

- A link is **declared** when it is an exact copy, when it carries no dependency information,
  or when it comes from a source field that feeds a **single** target field.
- A link is **not declared** when it is `OTHER`-only and its source field feeds **several**
  target fields, since that looks like a filter, join key or group key.
- The source dataset is declared in every case.

The heuristic can misjudge. A filter on a single-output table stays declared, and an expression
used for two outputs (`SUM(a) AS x, SUM(a) AS y`) is dropped. Review the field links before
relying on them. Self-links and nested field paths are skipped, and field links are sent only
when the table has at least one source dataset.

#### Views & materialized views

Source tables → **view definition** → the view (both strategies, always on).
The view or materialized-view definition SQL is parsed by the Zeenea platform down to the
**field-to-field** level (falling back to dataset level when the statement cannot be fully
parsed). Neither lineage strategy is additionally queried for views, so the edge is never
double-reported.

#### Table snapshots

Base table → **snapshot** → the table snapshot (both strategies, always on).
A snapshot is an immutable point-in-time copy, so its base table — read from the snapshot's
own metadata, at no extra API cost — is its complete upstream lineage. This works even when
the snapshot outlives the 30-day retention of the Data Lineage API. A snapshot whose metadata
carries no base table reference is logged and gets no lineage.

#### Supported source systems

Sources are identified by the Data Lineage API fully qualified name (`{system}:{name}`):

| Source system | Referenced as |
| :--- | :--- |
| BigQuery | The BigQuery dataset, in the `bigquery` data source |
| Redshift, MySQL, Oracle, PostgreSQL, SQL Server, Db2, Snowflake, Hive | The table of the matching connector, by host and port (by account for Snowflake). A source without a host is skipped. |
| Cloud Storage (`gcs:{bucket}`) | The bucket, as `path={bucket}` in the `gs-{bucket}` data source |

Any other source type, or a malformed name, is logged and skipped.

#### Lineage coverage notes

- **Job activity, not table history** (both strategies): lineage reflects jobs executed
  within the last **30 days**, the retention of the Data Lineage API. A table last written
  before the window shows no lineage.
- **Dataset location**: lineage is read at the dataset's location. A dataset whose location
  cannot be found is logged and yields no lineage.
- **Load jobs** from Cloud Storage appear with the source **bucket** as upstream dataset
  (`gcs:{bucket}`), not the loaded files or folders.
- A lineage read failure (e.g. missing permission) logs a warning and yields empty lineage
  for the affected table; **the sync itself never fails because of lineage**.

### Data

#### Data sampling

> **Config:** `sampling.view.enabled`, `sampling.view.simple_view_optimization` ·
> :material-cash:{ .amber } Query jobs (views only) · :material-lock:{ .amber } [Required privileges](#required-privileges)

Exposes a preview of field values, retrieved on demand from the sampled table. See
[Data Sampling](../../features-applications/cross-application-features/zeenea-data-sampling.md).

- **Tables** are sampled through the BigQuery read API (`tabledata.list`) — no query job,
  no query bytes billed.
- **Views** are sampled only when `sampling.view.enabled` is set: the sample is retrieved by
  running the view's query as a **query job**. With
  `sampling.view.simple_view_optimization`, simple views (single `FROM`, no
  JOIN/UNION/GROUP BY/subqueries) are instead sampled with a `TABLESAMPLE` clause on their
  underlying source table, reducing the data scanned by the query; if the optimization fails
  (source table not found or not identifiable, source table with a zero or unknown row count,
  schema mismatch, query error), no sample is returned — there is no fallback to the full view
  query. Materialized views and complex views always run the plain view query.

## Required privileges

The connector is **read-only** with respect to your data. Grant only what the enabled
features need — the table below maps each capability to the Google APIs it reads and the
IAM permission or role required.

| Capability | Google APIs / objects read | IAM required |
| :--- | :--- | :--- |
| Core metadata (datasets, tables, fields, constraints) | BigQuery metadata (datasets, tables, schemas) | `roles/bigquery.metadataViewer` on each inventoried project |
| Project auto-discovery | Cloud Resource Manager (project listing) | Ability to list/get the projects to inventory (e.g. a role carrying `resourcemanager.projects.get` on them) |
| Lineage — `data_lineage_api` strategy | Data Lineage API (`searchLinks`) | `roles/datalineage.viewer` on each inventoried project |
| Lineage — `data_lineage_streaming` strategy | Data Lineage API (`SearchLineageStreaming`) | `roles/datalineage.viewer` on each inventoried project; field-level links additionally need `datalineage.events.getFields` |
| Data sampling — tables | Table data (`tabledata.list` read API) | Read access to the sampled table data (`bigquery.tables.getData`, e.g. `roles/bigquery.dataViewer`) — no query job |
| Data sampling — views | Table data (`SELECT … FROM <view>` query job) | `bigquery.jobs.create` on the billing project (or on the view's own project when no billing project is set) + read access to the sampled data (e.g. `roles/bigquery.dataViewer`) |

!!! note
    Metadata roles let the connector read object **definitions and structure** (including
    view definitions used for lineage). Actual **table data** is read only when data
    sampling is enabled.

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
| `connection.json_key` | — | Yes | Google Cloud service account credentials: the JSON content, or a `file:` URL to the key file. |
| `connection.project_id` | *(auto-discovery)* | No | Google Cloud project to inventory. If blank, every project accessible to the service account is inventoried. See [Multi-project](#multi-project). |
| `connection.billing_project_id` | *(project of the targeted table)* | No | Project billed for query jobs (view sampling). If blank, each query job is billed to the project of the table it targets. See [Connecting to BigQuery](#connecting-to-bigquery). |
| **Filtering & inventory** | | | |
| `inventory_filters` | *(none)* | No | Which objects are cataloged, matching on `project` and `dataset`. See [Filtering](#filtering). |
| `inventory.partition.pattern` | *(none)* | No | Regex grouping partitioned tables into a single inventory item. See [Partitioned-table grouping](#partitioned-table-grouping). |
| **Lineage** | | | |
| `lineage.strategy` | `data_lineage_api` | No | Lineage strategy: `data_lineage_api` (dataset-level) or `data_lineage_streaming` (trial; dataset-level and field-to-field). `data_lineage_streaming` cannot be combined with another value. `job_history` is no longer supported, and any other value fails connection creation. See [Lineage](#lineage). |
| **Sampling** | | | |
| `sampling.view.enabled` | `false` | No | Enable data sampling for views by running the view's query. See [Data sampling](#data-sampling). |
| `sampling.view.simple_view_optimization` | `false` | No | Sample simple views with a `TABLESAMPLE` clause on their source table, reducing the data scanned. See [Data sampling](#data-sampling). |
| **Proxy** | | | |
| `proxy.scheme` | *(none)* | No | Proxy scheme, `http` or `https`. The proxy is used only when both `proxy.scheme` and `proxy.hostname` are set. |
| `proxy.hostname` | *(none)* | No | Proxy host name. |
| `proxy.port` | *(none)* | Yes, when a proxy is set | Proxy port. Mandatory as soon as `proxy.scheme` and `proxy.hostname` are set: without it, the Google API calls going through gRPC (project discovery, lineage) fail. |
| `proxy.username` | *(none)* | No | Proxy user name. Used only when `proxy.password` is also set. |
| `proxy.password` | *(none)* | No | Proxy password. Used only when `proxy.username` is also set. |

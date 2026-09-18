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
| Job history (`job_history` strategy) | :material-check-circle:{ .green } Supported — field-to-field¹ |
| Copy jobs | :material-check-circle:{ .green } Supported — `data_lineage_api`, or opt-in with `job_history` (dataset level) |
| Table snapshots (base table) | :material-check-circle:{ .green } Supported — dataset level |
| Load jobs | :material-close-circle:{ .red } Not supported |
| **Data** | |
| Data sampling | :material-check-circle:{ .green } Supported (views: opt-in) |
| Fingerprint | :material-close-circle:{ .red } Not supported |

<small>¹ Lineage SQL (view and materialized-view definitions, harvested job history) is parsed by
the Zeenea platform down to the **field-to-field** level, and falls back to dataset level when the
statement cannot be fully parsed.</small>

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
Authentication uses a **service account JSON key**, provided inline in the
`connection.json_key` property.

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

# Optional: bill query jobs (view sampling, job-history lineage) to a dedicated project.
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

A regex pattern matched against table names: the matched partition segment is replaced by a
wildcard, so that all partitions of a table are grouped as a **single inventory item**
(e.g. `events_20260101`, `events_20260102`, … cataloged once as `events_*`). This keeps the
inventory compact for heavily partitioned tables.

### Objects & metadata

The connector maps BigQuery objects to catalog objects as follows:

| BigQuery object | Imported into Zeenea as |
| :--- | :--- |
| Table, external table, view, materialized view, table snapshot | **Dataset** |
| Table column | **Field** |
| View / materialized-view definition, lineage operation (Data Lineage API link, job-history query, copy job, snapshot base table) | **Data process** (see [Lineage](#lineage)) |

**Dataset** — a table, external table, view, materialized view, or table snapshot:

- **Name & description** — from the source description
- **Location** — project, dataset, and table name
- **Type** — the BigQuery table type (table, external table, view, materialized view, snapshot)
- **Statistics** — row count and size
- **Timestamps** — creation and last-modification dates
- **Primary key** — which of its fields form the primary key
- **Foreign keys** — links from its fields to fields in other datasets

**Field** — a table column:

- **Name & description** — from the source description
- **Type** — mapped data type and native BigQuery type, including nested (`RECORD`) types
- **Position** — the column index
- **Nullability** — from the BigQuery field mode

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
`lineage.strategy` property and named after the Google evidence source each one reads. The two
strategies never stack, so lineage edges are never double-reported. Every
`lineage.job_history.*` property is only legal with `lineage.strategy = job_history` —
present with another strategy, the connection is rejected at creation.

Whatever the strategy, **views and materialized views** get their lineage from their own
definition SQL, and **table snapshots** from their own metadata — see below.

#### Data Lineage API strategy

> **Config:** `lineage.strategy = data_lineage_api` · **Default**

Source datasets → **operation** → target table, read from the **Google Cloud Data Lineage
API** and attached to standard and external tables. The edges are **dataset-to-dataset**;
field-to-field lineage is not available from this source. Copy jobs are covered natively.

- Requires `roles/datalineage.viewer` on each inventoried project — see
  [Required privileges](#required-privileges).
- No billing project and no query jobs are needed.
- The Data Lineage API retains **30 days** of history.

#### Job history strategy

> **Config:** `lineage.strategy = job_history`, `lineage.job_history.lookback_days` ·
> :material-lock:{ .amber } [Required privileges](#required-privileges) ·
> :material-cash:{ .amber } Query jobs

Source tables → **operation** (`CREATE TABLE AS SELECT`, `CREATE TABLE`, `INSERT`, `MERGE`,
`UPDATE`, `DELETE`) → output table, reconstructed from the SQL of successful write jobs
harvested from `INFORMATION_SCHEMA.JOBS` — one bulk query per project and region over the
lookback window. The harvested SQL is parsed by the Zeenea platform into both
**dataset-level and field-to-field** lineage. The Data Lineage API is not called in this mode.

- `lineage.job_history.lookback_days` — number of days of job history to harvest
  (default `30`, bounded by BigQuery's 180-day `INFORMATION_SCHEMA.JOBS` retention).

```hocon
lineage {
  strategy = job_history
  job_history {
    lookback_days = 30
  }
}
```

#### Copy jobs

> **Config:** `lineage.job_history.copy.enabled`, `lineage.job_history.copy.max_jobs_per_table` ·
> **Default:** off

With the `data_lineage_api` strategy, copy jobs are already reported by the API — nothing to
enable.

With the `job_history` strategy, set `lineage.job_history.copy.enabled` to also harvest
**copy jobs**. Copy jobs carry no SQL, so each one is resolved to its source tables with a
`jobs.get` metadata call (no query bytes billed) and reported as **dataset-level** lineage:
source tables → **copy** → destination table.

- `lineage.job_history.copy.max_jobs_per_table` — only the N most recent copy jobs per
  destination table are resolved (default `10`), keeping the metadata-call fan-out bounded
  for heavily copied-into tables. Sources reachable only through older copy jobs are not
  reported.

```hocon
lineage {
  strategy = job_history
  job_history {
    lookback_days = 30
    copy {
      enabled = true
      max_jobs_per_table = 10
    }
  }
}
```

!!! note
A table that is both **copied-into and queried-into from the same source** gets that edge
through both channels (one parsed from SQL, one declared), appearing as two data
processes in the catalog.

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
the snapshot outlives the 30–180-day retention of the Data Lineage API and
`INFORMATION_SCHEMA.JOBS`.

#### Lineage coverage notes

- **Job activity, not table history** (both strategies): lineage reflects jobs executed
  within the strategy's window (30 days for `data_lineage_api`;
  `lineage.job_history.lookback_days` for `job_history`). A table last written before the
  window shows no lineage, and the same table can legitimately show different lineage
  across the two strategies.
- **Load jobs** produce lineage with neither strategy.
- **Cross-project jobs** (`job_history` strategy): a table's lineage comes from the
  `INFORMATION_SCHEMA.JOBS` view of its own project; jobs run in a different project that
  wrote into this table are not seen.
- A lineage harvest failure (e.g. missing permission) logs a warning and yields empty
  lineage for the affected project/region; **the sync itself never fails because of
  lineage**.

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
  (source table not found, schema mismatch), no sample is returned — there is no fallback to
  the full view query. Materialized views and complex views always run the plain view query.

## Required privileges

The connector is **read-only** with respect to your data. Grant only what the enabled
features need — the table below maps each capability to the Google APIs it reads and the
IAM permission or role required.

| Capability | Google APIs / objects read | IAM required |
| :--- | :--- | :--- |
| Core metadata (datasets, tables, fields, constraints) | BigQuery metadata (datasets, tables, schemas) | `roles/bigquery.metadataViewer` on each inventoried project |
| Project auto-discovery | Cloud Resource Manager (project listing) | Ability to list/get the projects to inventory (e.g. a role carrying `resourcemanager.projects.get` on them) |
| Lineage — `data_lineage_api` strategy | Data Lineage API (`searchLinks`) | `roles/datalineage.viewer` on each inventoried project |
| Lineage — `job_history` strategy | `INFORMATION_SCHEMA.JOBS` (bulk query) | `bigquery.jobs.create` on the billing project + `bigquery.jobs.listAll` on each inventoried project (carried by `roles/bigquery.resourceViewer`) |
| Lineage — copy jobs (`job_history` strategy) | `jobs.get` (job metadata) | `bigquery.jobs.get` on each inventoried project (carried by the same `roles/bigquery.resourceViewer`) |
| Data sampling — tables | Table data (`tabledata.list` read API) | Read access to the sampled table data (`bigquery.tables.getData`, e.g. `roles/bigquery.dataViewer`) — no query job |
| Data sampling — views | Table data (`SELECT … FROM <view>` query job) | `bigquery.jobs.create` on the billing project + read access to the sampled data (e.g. `roles/bigquery.dataViewer`) |

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
| `connection.json_key` | — | Yes | Google Cloud service account credentials, in JSON format. |
| `connection.project_id` | *(auto-discovery)* | No | Google Cloud project to inventory. If blank, every project accessible to the service account is inventoried. See [Multi-project](#multi-project). |
| `connection.billing_project_id` | *(project of the targeted table)* | No | Project billed for query jobs (view sampling, job-history lineage). If blank, each query job is billed to the project of the table it targets. See [Connecting to BigQuery](#connecting-to-bigquery). |
| **Filtering & inventory** | | | |
| `inventory_filters` | *(none)* | No | Which objects are cataloged, matching on `project` and `dataset`. See [Filtering](#filtering). |
| `inventory.partition.pattern` | *(none)* | No | Regex grouping partitioned tables into a single inventory item. See [Partitioned-table grouping](#partitioned-table-grouping). |
| **Lineage** | | | |
| `lineage.strategy` | `data_lineage_api` | No | Lineage strategy: `data_lineage_api` or `job_history`. Any other value fails connection creation. See [Lineage](#lineage). |
| `lineage.job_history.lookback_days` | `30` | No | Days of job history harvested from `INFORMATION_SCHEMA.JOBS` (positive, bounded by BigQuery's 180-day retention). Only legal with `lineage.strategy = job_history`. See [Job history strategy](#job-history-strategy). |
| `lineage.job_history.copy.enabled` | `false` | No | Also harvest copy jobs (dataset-level lineage). Only legal with `lineage.strategy = job_history`. See [Copy jobs](#copy-jobs). |
| `lineage.job_history.copy.max_jobs_per_table` | `10` | No | Maximum number of copy jobs resolved per destination table (positive), keeping the most recent ones. Only used with `lineage.job_history.copy.enabled`. See [Copy jobs](#copy-jobs). |
| **Sampling** | | | |
| `sampling.view.enabled` | `false` | No | Enable data sampling for views by running the view's query. See [Data sampling](#data-sampling). |
| `sampling.view.simple_view_optimization` | `false` | No | Sample simple views with a `TABLESAMPLE` clause on their source table, reducing the data scanned. See [Data sampling](#data-sampling). |

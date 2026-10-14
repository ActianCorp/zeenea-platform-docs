# Snowflake V2 Connector Guide

The Snowflake connector V2 catalogs your Snowflake metadata —
tables, dynamic tables, table fields, views and more — and enriches it with lineage, data classification and
tags, across one or several Snowflake accounts.

## Capability overview

| Capability | Support |
| :--- | :--- |
| **Connection & operations** | |
| Authentication (password & key pair) | :material-check-circle:{ .green } Supported |
| Multi-account | :material-check-circle:{ .green } Supported |
| Filtering (inventory, sampling, profiling) | :material-check-circle:{ .green } Supported |
| Extraction caching (fewer queries, faster refresh) | :material-check-circle:{ .green } Supported |
| **Objects & metadata** | |
| Tables, dynamic tables, table fields, views | :material-check-circle:{ .green } Supported |
| Table primary & foreign keys | :material-check-circle:{ .green } Supported |
| Streams, tasks | :material-close-circle:{ .red } Not supported |
| AI / ML models | :material-close-circle:{ .red } Not supported |
| Stored procedures & user-defined functions (UDFs) | :material-close-circle:{ .red } Not supported |
| **Lineage** | |
| Views | :material-check-circle:{ .green } Supported — field-to-field¹ |
| Dynamic table definitions | :material-check-circle:{ .green } Supported — field-to-field¹ |
| Snowpipes | :material-check-circle:{ .green } Supported — file-to-table |
| Query-history operations | :material-check-circle:{ .green } Supported — table-to-table |
| **Classification & governance** | |
| Data classification (privacy & semantic categories) | :material-check-circle:{ .green } Supported |
| User-defined tags | :material-check-circle:{ .green } Read-only (no write-back) |
| Masking & row-access policies | :material-close-circle:{ .red } Not supported |
| Data quality (data metric functions) | :material-close-circle:{ .red } Not supported |
| **Data** | |
| Data profiling | :material-check-circle:{ .green } Supported |
| Data sampling | :material-check-circle:{ .green } Supported |

<small>¹ For views and dynamic table definitions, the mapping is resolved down to the
**field-to-field** level from the object's SQL definition, and falls back to table-to-table level when the
statement cannot be fully parsed.</small>

## Prerequisites & connection

### Prerequisites

Before creating the connection, make sure you have:

- A network route open between the scanner and Snowflake (**port 443**, outbound).
- A dedicated Snowflake **service role**. The privileges to grant it **depend on which
  capabilities you enable** (lineage, data classification, tags, profiling…): core metadata
  needs only read access, while some features require additional grants. See
  [Required privileges](#required-privileges) to grant only what you need.

### Supported versions

- **Snowflake** — cloud service (all current editions).
- **Scanner** — each plugin release requires a minimum scanner version. See the plugin's
  entry in [Zeenea Connector Downloads](./zeenea-connectors-list.md) for the exact version.

### Installing the plugin

The Snowflake connector ships as a plugin. Download it from
[Zeenea Connector Downloads](./zeenea-connectors-list.md) and follow
[Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Connecting to Snowflake

The connection is declared in a configuration file in the scanner's `/connections` folder.
The JDBC URL **must** include the `db` parameter (the connector rejects a URL without it).
A `role` and a `warehouse` are needed to run queries; you can omit them from the URL if the
user has defaults defined in Snowflake.

!!! tip "Credentials & secrets"
    Prefer key-pair authentication in production. Credentials — for a single account
    (`connection.*`) or per account (`<org>-<account>.*`) — can be resolved from the
    scanner's **Secret Manager** instead of being stored in clear text in the config file.
    This is a scanner capability and applies to both single- and multi-account connections.

#### Single account

=== "Password"

    ```hocon
    connector_id = "snowflake-v2"
    connection.url      = "jdbc:snowflake://<org>-<account>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"
    connection.username = "<USERNAME>"
    connection.password = "<PASSWORD>"
    ```

=== "Key pair"

    ```hocon
    connector_id = "snowflake-v2"
    connection.url              = "jdbc:snowflake://<org>-<account>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"
    connection.username         = "<USERNAME>"
    connection.private_key_path = "/etc/keys/rsa_key.p8"
    connection.passphrase       = "<PASSPHRASE>"
    ```

#### Multiple accounts

The connector can inventory several Snowflake accounts. By default it **auto-discovers**
every account in the organization (requires access to `SNOWFLAKE.ORGANIZATION_USAGE.ACCOUNTS`).
To restrict the scope, list the accounts explicitly:

```hocon
multi_account.list = ["<org>-<account1>", "<org>-<account2>"]
```

**Credentials** can be shared or set per account:

- **Shared** — if every account uses the same credentials, define them once at the
  `connection.*` level.
- **Per account** — override any parameter by prefixing the account identifier
  (`<org>-<account>`). If a per-account key is missing, the connector falls back to the
  `connection.*` value.

!!! note
    A `connection.url` at the connection level is **always required**: it initializes the
    primary connection, even when every account defines its own URL.

=== "Password (per account)"

    ```hocon
    connector_id = "snowflake-v2"

    connection.url = "jdbc:snowflake://<org>-<account1>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"

    multi_account.list = ["<org>-<account1>", "<org>-<account2>"]

    <org>-<account1>.url      = "jdbc:snowflake://<org>-<account1>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"
    <org>-<account1>.username = "<USERNAME_1>"
    <org>-<account1>.password = "<PASSWORD_1>"

    <org>-<account2>.url      = "jdbc:snowflake://<org>-<account2>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"
    <org>-<account2>.username = "<USERNAME_2>"
    <org>-<account2>.password = "<PASSWORD_2>"
    ```

=== "Key pair (per account)"

    ```hocon
    connector_id = "snowflake-v2"

    connection.url = "jdbc:snowflake://<org>-<account1>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"

    multi_account.list = ["<org>-<account1>", "<org>-<account2>"]

    <org>-<account1>.url              = "jdbc:snowflake://<org>-<account1>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"
    <org>-<account1>.username         = "<USERNAME_1>"
    <org>-<account1>.private_key_path = "/etc/keys/account1.p8"
    <org>-<account1>.passphrase       = "<PASSPHRASE_1>"

    <org>-<account2>.url              = "jdbc:snowflake://<org>-<account2>.snowflakecomputing.com/?db=<DB>&role=<ROLE>&warehouse=<WH>"
    <org>-<account2>.username         = "<USERNAME_2>"
    <org>-<account2>.private_key_path = "/etc/keys/account2.p8"
    <org>-<account2>.passphrase       = "<PASSPHRASE_2>"
    ```

!!! note
    Account identifiers must use the `<organization>-<account>` format. Classic
    single-part identifiers are ignored (with a warning).

## Detailed capabilities & configuration

For the full list of properties and defaults, see the [Configuration reference](#configuration-reference).

!!! note
    Features marked :material-cash:{ .amber } run queries that use **Snowflake warehouse
    compute** (data scans or `ACCOUNT_USAGE` reads). The actual cost depends on warehouse
    size, data volume, and extraction frequency — size and schedule these accordingly.

### Connection & operations

#### Authentication

Password and key-pair authentication are configured when declaring the connection —
see [Connecting to Snowflake](#connecting-to-snowflake).

#### Multi-account

> **Config:** `multi_account.list`

Each Snowflake account is cataloged as a **separate data source**, and every object is
attributed to its account. Accounts are either **auto-discovered** from the organization
or listed explicitly — see [Multiple accounts](#multiple-accounts).

#### Filtering

> **Config:** `inventory_filters`, `sampling_filters`, `profiling_filters`

Filters restrict each stage to the objects you care about, following the
[Universal filters](../../technical-documentation/scanners/zeenea-universal-filters.md) syntax:

- **`inventory_filters`** — which objects are cataloged.
- **`sampling_filters`** — which objects data sampling runs on.
- **`profiling_filters`** — which objects data profiling runs on.

Rules match Snowflake objects on `account`, `catalog` (Snowflake database), `schema`, and `table`.

#### Extraction caching

> **Config:** `cache.*` · **Default:** off

Reduces the number of queries sent to Snowflake during extraction: instead of querying
each table individually, the connector runs a few per-database queries and reuses the
result for the cache validity period. This speeds up refreshes and lowers warehouse load,
especially for databases with many tables.

### Objects & metadata

The connector maps Snowflake objects to catalog objects as follows:

| Snowflake object | Imported into the platform as |
| :--- | :--- |
| Table, dynamic table, view | **Dataset** |
| Table column | **Field** |
| View / dynamic-table definition, Snowpipe, query-history operation | **Data process** (see [Lineage](#lineage)) |
| User-defined tags | Properties on the dataset (table, view, dynamic table) and its fields |
| Privacy & Semantic categories (data classification) | Field properties |

**Dataset** — a table, a dynamic table, or a view:

- **Name & description** — from the source comment
- **Location** — account, catalog (database), schema, and table name
- **Type** — the Snowflake table type (e.g. `BASE TABLE`, `VIEW`), and whether it is a dynamic table
- **Primary key** — which of its fields form the primary key
- **Foreign keys** — links from its fields to fields in other datasets
- **User-defined tags** — when enabled

**Field** — a table column:

- **Name & description** — from the source comment
- **Type** — mapped data type and native Snowflake type
- **Position** — the column index
- **Classification** — *Privacy Category* and *Semantic Category*, when data classification is enabled
- **User-defined tags** — when enabled

#### Identification keys

Each catalog object carries an **identification key**, built by the connector.
See [Identification keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identification key | Components |
| :--- | :--- | :--- |
| Dataset | `catalog/schema/name` | **catalog**: Snowflake database · **schema**: schema · **name**: table, view, or dynamic table name |
| Field | `catalog/schema/name/field` | …plus **field**: column name |
| Data process (query-history lineage) | `type/hash` | **type**: operation type · **hash**: hash of the access-history entry |
| Data process (Snowpipe lineage) | `catalog/schema/pipe` | **catalog**: Snowflake database · **schema**: schema · **pipe**: Snowpipe name |

### Lineage

Lineage is materialized as **Data processes** that link input and output assets
(*input → Data process → output*). Each lineage feature produces a specific kind of data process.

#### Views

> **Config:** `lineage.view.enabled` · **Default:** on

Source tables → **view** → the view.
The mapping is resolved down to the **field-to-field** level from the object's SQL definition (it falls back to dataset level when the statement cannot be fully parsed).

#### Dynamic table definitions

> **Config:** `lineage.dynamic_table.enabled` · **Default:** on

Source tables → **dynamic table definition** → the dynamic table.
The mapping is resolved down to the **field-to-field** level from the object's SQL definition (it falls back to dataset level when the statement cannot be fully parsed).

#### Snowpipes

> **Config:** `lineage.pipe.enabled` · **Default:** off · :material-lock:{ .amber } [Required privileges](#required-privileges)

Ingested source files (from a cloud stage) → **Snowpipe** → target table. A data process is created for each Snowpipe that has loaded data into a table.

#### Query-history operations

> **Config:** `lineage.history.enabled`, `lineage.history.period`, `lineage.history.warehouse` · **Default:** off · :material-lock:{ .amber } [Required privileges](#required-privileges) · :material-cash:{ .amber } Warehouse compute

Input tables → **operation** (`INSERT`, `MERGE`, `UPDATE`, `CREATE TABLE AS SELECT`) → output tables, reconstructed from query history.

- `lineage.history.period` — number of days of history to analyze (default `2`).
- `lineage.history.warehouse` — restrict analysis to a specific warehouse (optional).

!!! note
    Only the operations listed above are reconstructed. Manual `COPY INTO` statements
    (outside Snowpipe) are not captured as lineage.

### Classification & governance

#### Data classification

> **Config:** `data_classification.enabled` · **Default:** off · :material-lock:{ .amber } [Required privileges](#required-privileges)

Retrieves Snowflake's **Privacy Category** and **Semantic Category** and attaches them to
the relevant fields.

#### User-defined tags

> **Config:** `user_defined_tags.enabled` · **Default:** off

Retrieves user-defined Snowflake tags on tables, dynamic tables, views and table columns.
**Read-only** — the connector never writes tags back to Snowflake.

### Data

#### Data profiling

:material-cash:{ .amber } Warehouse compute · :material-lock:{ .amber } [Required privileges](#required-privileges)

Statistical profiles per field. The connector draws a random sample
(`COUNT(*)` + `TABLESAMPLE`) sized to the requested row count; statistics are then computed from that sample.
See [Data Profiling](../../features-applications/cross-application-features/zeenea-data-profiling.md).

#### Data sampling

:material-cash:{ .amber } Warehouse compute · :material-lock:{ .amber } [Required privileges](#required-privileges)

Exposes a preview of field values, retrieved on demand from the sampled table. See
[Data Sampling](../../features-applications/cross-application-features/zeenea-data-sampling.md).

## Required privileges

The connector is **read-only**. Grant only what the enabled features need — the table
below maps each capability to the Snowflake objects it reads and the privilege required.

| Capability | Snowflake objects queried | Privilege required |
| :--- | :--- | :--- |
| Core metadata (tables, views, columns) | `INFORMATION_SCHEMA.DATABASES` / `TABLES` / `COLUMNS` | `USAGE` on the database & schemas; access to the objects |
| Primary & foreign keys | `SHOW PRIMARY KEYS`, `SHOW IMPORTED KEYS` | Access to the tables |
| View lineage | `SHOW VIEWS` (view definition); `INFORMATION_SCHEMA.VIEWS` when caching is enabled | `SELECT` on the views (secure views: owner role or `SNOWFLAKE.OBJECT_VIEWER`) |
| Dynamic table definition lineage | `GET_DDL('DYNAMIC_TABLE', …)` | `SELECT` on the dynamic tables |
| Snowpipe lineage | `SNOWFLAKE.ACCOUNT_USAGE.PIPES`; `INFORMATION_SCHEMA.COPY_HISTORY()` (last 14 days) | `IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE` + `MONITOR` on each pipe |
| Query-history operation lineage | `SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY`, `QUERY_HISTORY` | `IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE` — requires Snowflake **Enterprise Edition** |
| Data classification | `SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES` | `IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE` |
| User-defined tags | `INFORMATION_SCHEMA.TAG_REFERENCES()` / `TAG_REFERENCES_ALL_COLUMNS()`, `SHOW TAGS IN ACCOUNT` | Access to the tagged objects (same grants as core metadata) |
| Data sampling & profiling | Table data (`SELECT … FROM <table>`) | `SELECT` on the targeted tables |
| Multi-account auto-discovery | `SNOWFLAKE.ORGANIZATION_USAGE.ACCOUNTS` | `SNOWFLAKE.ORGANIZATION_ACCOUNTS_VIEWER` database role (granted by an ORGADMIN) |

!!! note
    Granting `SELECT` lets the connector read object **definitions and structure** (needed for
    view and dynamic-table lineage). Actual **table data** is read only when data sampling or
    profiling is enabled.

Example grants for a dedicated role (adapt names, then validate against your policy):

```sql
-- 1. Service role & warehouse
CREATE ROLE IF NOT EXISTS SCANNER;
GRANT USAGE ON WAREHOUSE <WH> TO ROLE SCANNER;

-- 2. Metadata + view / dynamic-table lineage
--    SELECT (not REFERENCES) is required to read view & dynamic-table definitions
GRANT USAGE ON DATABASE <DB> TO ROLE SCANNER;
GRANT USAGE ON ALL SCHEMAS IN DATABASE <DB> TO ROLE SCANNER;
GRANT SELECT ON ALL TABLES IN DATABASE <DB> TO ROLE SCANNER;
GRANT SELECT ON ALL VIEWS IN DATABASE <DB> TO ROLE SCANNER;
GRANT SELECT ON ALL DYNAMIC TABLES IN DATABASE <DB> TO ROLE SCANNER;
-- Secure views: definition is visible only to the owning role or via SNOWFLAKE.OBJECT_VIEWER

-- 3. Account-level features (query history, Snowpipe, data classification)
GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE SCANNER;
GRANT MONITOR ON PIPE <PIPE_NAME> TO ROLE SCANNER;   -- per Snowpipe
-- Query-history lineage uses ACCESS_HISTORY -> requires Snowflake Enterprise Edition

-- 4. User-defined tags: covered by the object access granted above (no extra privilege needed).
--    Note: SHOW TAGS lists only the tag definitions the role can access.

-- 5. Multi-account auto-discovery (run by an ORGADMIN)
GRANT DATABASE ROLE SNOWFLAKE.ORGANIZATION_ACCOUNTS_VIEWER TO ROLE SCANNER;

-- Optional: automatically cover objects created later
GRANT SELECT ON FUTURE TABLES         IN DATABASE <DB> TO ROLE SCANNER;
GRANT SELECT ON FUTURE VIEWS          IN DATABASE <DB> TO ROLE SCANNER;
GRANT SELECT ON FUTURE DYNAMIC TABLES IN DATABASE <DB> TO ROLE SCANNER;
```

## Configuration reference

The table below lists the connection properties handled by the Snowflake V2 connector.

!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

| Property | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| **General** | | | |
| `name` | — | Yes | Display name shown to catalog users. |
| `code` | — | Yes | Unique connection identifier. Do not change after registration. |
| `connector_id` | — | Yes | Connector type. Must be `snowflake-v2`. |
| `enabled` | `true` | No | Whether the connection is active. |
| **Connection** | | | |
| `connection.url` | — | Yes | JDBC URL. `db` is required; `role` and `warehouse` are required unless the user has defaults. |
| `connection.username` | — | Yes | Snowflake username. |
| `connection.password` | — | Conditional | User password. Required unless key-pair authentication is used. |
| `connection.private_key_path` | — | Conditional | Path to the PKCS#8 `.p8` private key (see [Single account](#single-account)). |
| `connection.passphrase` | — | Conditional | Passphrase of the encrypted private key. |
| **Multi-account** | | | |
| `multi_account.list` | *(auto-discovery)* | No | List of `<org>-<account>` identifiers (e.g. `["myorg-account1", "myorg-account2"]`). If unset, accounts are discovered automatically. See [Multiple accounts](#multiple-accounts). |
| `<org>-<account>.*` | *(falls back to `connection.*`)* | No | Per-account override of `url`, `username`, `password`, `private_key_path`, `passphrase`. |
| **Filtering** | | | |
| `inventory_filters` | *(none)* | No | Which objects are cataloged (`ACCEPT` / `REJECT`). See [Filtering](#filtering). |
| `sampling_filters` | *(none)* | No | Which objects data sampling runs on. See [Filtering](#filtering). |
| `profiling_filters` | *(none)* | No | Which objects data profiling runs on, with optional overrides. See [Filtering](#filtering). |
| **Lineage** | | | |
| `lineage.view.enabled` | `true` | No | View lineage. See [Views](#views). |
| `lineage.dynamic_table.enabled` | `true` | No | Dynamic table lineage. See [Dynamic table definitions](#dynamic-table-definitions). |
| `lineage.pipe.enabled` | `false` | No | Snowpipe lineage. See [Snowpipes](#snowpipes). |
| `lineage.history.enabled` | `false` | No | Query history lineage. See [Query-history operations](#query-history-operations). |
| `lineage.history.period` | `2` | No | Number of days of history to analyze. |
| `lineage.history.warehouse` | *(none)* | No | Restrict history analysis to a specific warehouse. |
| **Classification & tags** | | | |
| `data_classification.enabled` | `false` | No | Privacy & semantic categories. See [Data classification](#data-classification). |
| `user_defined_tags.enabled` | `false` | No | User-defined tags (read-only). See [User-defined tags](#user-defined-tags). |
| **Extraction caching** | | | |
| `cache.enabled` | `false` | No | Enable extraction caching. See [Extraction caching](#extraction-caching). |
| `cache.folder` | *(in-memory)* | No | Directory where cache files are stored. In-memory if unset. |
| `cache.ttl` | `PT12H` | No | Cache validity period (ISO-8601 duration). |

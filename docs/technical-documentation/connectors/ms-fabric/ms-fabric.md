# MS Fabric Connector Guide

The Microsoft Fabric connector catalogs metadata from your Microsoft Fabric tenant, including Power BI reports, semantic models, lakehouse tables, and warehouse tables. It also enriches this metadata with lineage, workspace, and domain context across all workspaces in the Fabric tenant.

## Capability Overview

| Capability | Support |
| :--- | :--- |
| **Connection and Operations** | |
| Authentication (Microsoft Entra service principal and client secret) | Supported |
| Tenant-wide inventory (workspaces are auto-discovered) | Supported |
| Filtering (inventory) | Supported (workspaces and Fabric domains) |
| Extraction caching (fewer API calls, faster refresh) | Supported |
| **Objects and Metadata** | |
| Power BI reports (pages and projected fields) | Supported |
| Semantic models — tables, columns, and measures | Supported |
| Lakehouse and warehouse tables and columns | Supported |
| Primary and foreign keys | Supported (warehouse tables only) |
| Lakehouse shortcuts (type and location) | Supported |
| Power BI apps (*Application Model* URL, `[App]` name prefix) | Supported |
| Dashboards, paginated reports, datamarts, dataflows | Not supported |
| Notebooks, data pipelines, Spark job definitions, copy jobs | Not supported |
| Eventhouses, KQL databases, eventstreams, mirrored databases, SQL databases | Not supported |
| ML models and experiments | Not supported |
| **Lineage** | |
| Report → semantic model | Supported (field-to-field) |
| Semantic model → lakehouse or warehouse table (Direct Lake) | Supported (field-to-field¹) |
| Semantic model → external data source (Power Query / M) | Supported (resolved by the scanner) |
| Lakehouse shortcut → OneLake target table | Supported (field-to-field) |
| Shortcuts to external storage (S3, ADLS Gen2, GCS, Dataverse…) | Not supported as lineage (recorded as properties) |
| Notebook, pipeline, dataflow and eventstream lineage | Not supported |
| **Classification and Governance** | |
| Report endorsement — *Endorsement* and *Certified By* | Read-only (no write-back) |
| Fabric domains — *Domain* and *Domain Path* on lakehouse and warehouse datasets | Read-only (no write-back) |
| Sensitivity labels (Microsoft Purview Information Protection) | Not supported |
| Fabric item tags | Not supported |
| **Data** | |
| Data sampling | Not supported |
| Data profiling | Not supported |

<small>¹ Field-to-field when the semantic model table uses **Direct Lake** storage over a single source table. Otherwise, the link remains at **table-to-table** level.</small>

## Prerequisites and Connection

### Prerequisites

Before creating the connection, make sure you have:

- A network route open between the Actian Data Intelligence Scanner and Microsoft, outbound:
    - **port 443** to `login.microsoftonline.com`, `api.powerbi.com`, and `api.fabric.microsoft.com`.
    - **port 1433** to `*.datawarehouse.fabric.microsoft.com`. This is required only to catalog lakehouse and warehouse tables, which the connector reads through the SQL analytics endpoint.
- A **Microsoft Entra app registration** (service principal) with a client secret.
- Fabric **tenant settings** and **workspace roles** for that service principal. The privileges that must be granted **depend on the objects being cataloged**: workspace-level metadata requires only the read-only admin APIs, while report fields, domains, and lakehouse or warehouse tables each require additional access. See [Required Privileges](#required-privileges) to grant only the permissions you need.

### Supported Versions

- **Microsoft Fabric / Power BI Service**: Cloud service (SaaS) only. The connector uses the Power BI REST API `v1.0` and the Fabric REST API `v1`. On-premises Power BI Report Server is not supported.
- **Actian Data Intelligence Scanner**: Each plugin release requires a minimum scanner version. For more information about the required version, see [Connector Downloads](../connectors-list.md).

### Installing the Plugin

The MS Fabric connector is distributed as a plugin. Download it from [Connector Downloads](../connectors-list.md) and follow the instructions in [Installing and Configuring Connectors as a Plugin](../connectors-install-as-plugin.md).

The Microsoft SQL Server JDBC driver used to read lakehouse and warehouse tables is bundled with the plugin. No additional installation is required.

### Connecting to Microsoft Fabric

The connection is declared in a configuration file in the scanner's `/connections` folder. One connection covers **one Fabric tenant**. To catalog multiple tenants, declare one connection per tenant.

Authentication uses a **Microsoft Entra service principal** with a client secret. `connection.tenant` is the Entra tenant ID. The connector uses this value to build the token endpoint: `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token`.

```hocon
name         = "<DISPLAY NAME>"
code         = "<UNIQUE CODE>"
connector_id = "ms-fabric"

connection {
    tenant              = "<TENANT_ID>"
    oauth.client_id     = "<CLIENT_ID>"
    oauth.client_secret = "<CLIENT_SECRET>"
}
```

!!! tip "Credentials and Secrets"
    You can resolve `connection.oauth.client_secret` using the scanner's **Secret Manager** instead of storing it in plain text in the configuration file. This is a scanner capability.

!!! note "Timeout and Proxy"
    `connection.timeout` (in milliseconds, default `300000`) and the scanner's proxy settings apply to **both** the Power BI and the Fabric API clients.

## Detailed Capabilities and Configuration

For the full list of properties and defaults, see [Configuration Reference](#configuration-reference).

!!! note
    Features marked :material-cash:{ .amber } consume **Fabric capacity**. Reading table structure opens a session on the SQL analytics endpoint of each warehouse and lakehouse. The cost depends on the number of warehouses and lakehouses in scope and on the extraction frequency.

### Connection and Operations

#### Authentication

Service-principal authentication is configured when declaring the connection. For more information, see [Connecting to Microsoft Fabric](#connecting-to-microsoft-fabric).

#### Tenant-Wide Inventory

Config: `time_between_scan`

Default: `3000` (ms)

One connection covers one Fabric tenant, and workspaces are discovered automatically. During each inventory, the connector:

1. Lists the tenant's **active workspaces**, 5,000 per page.
2. Runs a **metadata scan** on them, in batches of **100 workspaces**, requesting lineage, data source details, semantic model schema, DAX and Power Query expressions, and item users.
3. Polls the scan status every `time_between_scan` milliseconds until the scan completes, then reads the result.

Increase `time_between_scan` on large tenants to reduce the number of polling requests.

#### Filtering

Config: `inventory_filters`

Filters restrict which objects are cataloged, following the [Universal Filters](../../scanners/universal-filters.md) syntax.

The following rule keys are supported:

| Rule Key | Matches |
| :--- | :--- |
| `workspace_id`, `workspace_name` | The workspace the object belongs to. |
| `domain_id`, `domain` | The Fabric domain the workspace is assigned to. |
| `type` | The object type: `report`, `dataset`, `warehouse`, or `lakehouse`. |
| `id` | The report or semantic model identifier. |
| `name` | The report name, or the table name of a semantic model table. |
| `semantic_model_name` | The semantic model a table belongs to. |
| `dataset_name` | The table name inside a semantic model. |

!!! tip "Large Tenants: Filter on Workspaces or Domains"
    When **every** `ACCEPT` filter includes a workspace criterion (`workspace_id` or `workspace_name`), or when every filter includes a domain criterion, the connector reads only the matching workspaces from Fabric. With any other rule set, it scans every workspace in the tenant and applies the filters afterwards. The result is the same, but the scan can take much longer on large tenants.

#### Report-Only Inventory

Config: `inventory_on_reports_only`

Default: `false`

When enabled, semantic model tables are no longer inventoried as standalone objects. Instead, they are imported together with the reports that consume them, ensuring that each report and its semantic model are imported as a whole. This option is useful for tenants with a large number of semantic models.

!!! warning
    This option does **not** exclude lakehouse and warehouse tables from the inventory. However, their extraction returns no results. Leave this option set to `false` when you catalog lakehouses or warehouses.

#### Power Query Resolution (ODBC DSN)

Config: `dsn.configuration`

Semantic model tables contain their Power Query (M) expression, which the scanner uses to resolve lineage towards the underlying data sources. When those sources are accessed through an **ODBC DSN**, the connection details are not included in the M expression. Declare the DSNs so that the scanner can resolve the target.

The value is a JSON array, either inline or `file:` followed by a path. Each object must contain `name` and `engine`, and can also contain `host`, `port`, `database`, and `awsRegion`, depending on the engine.

Supported engines are `athena`, `denodo`, `oracle`, `redshift`, `snowflake`, and `sqlserver`.

```hocon
dsn.configuration = """
   [
       { "name": "Simba Athena", "engine": "athena", "awsRegion": "eu-west-3" },
       { "name": "Snowflake PRD", "engine": "snowflake",
         "host": "<ACCOUNT>.snowflakecomputing.com", "database": "<DB>" }
   ]
"""
```

Semantic model parameters used in the expression are resolved to their values before the expression is sent to the catalog.

#### Extraction Caching

Config: `cache.*`

Default: off

Reduces the number of API calls during extraction. Workspace scan results, tenant domains, lakehouse and warehouse table lists, Power BI applications, and report layouts are read once, stored in the cache, and reused throughout the extraction. The cache is refreshed during each inventory and expires after `cache.ttl`.

Fabric report definitions and lakehouse shortcuts are **never** cached. They are always retrieved directly from the source.

!!! note
    Loading the cache requires reading the layout of **every** report in scope, which makes the first inventory after enabling the cache noticeably longer.

### Objects and Metadata

The connector maps Fabric objects to catalog objects as follows:

| Fabric Object | Imported Into the Platform As |
| :--- | :--- |
| Power BI report | **Visualization** |
| Semantic model table | **Dataset** |
| Lakehouse or warehouse table | **Dataset** |
| Semantic model column and measure | **Field** of the dataset |
| Lakehouse or warehouse table column | **Field** of the dataset |
| Field projected in a report visual | **Field** of the visualization |
| Report users | **Contacts** of the visualization |
| Fabric domain | Properties of the lakehouse and warehouse datasets |
| Lakehouse shortcut | Properties of the dataset and link to the target dataset (see [Lineage](#lineage)) |

**Visualization** — A Power BI report:

- **Name and description** — From the report. A report distributed through a Power BI app carries the app's `[App]` name.
- **Location** — *Workspace URL* and *Access URL* for opening the report in Fabric, and *Application Model* when the report is distributed through a Power BI app.
- **Type** — *Report Type* (`PowerBiReport`).
- **Pages** — List of report page names.
- **Audit** — *Created By*, *Creation Date*, *Modified By*, and *Modified Date*.
- **Endorsement** — *Endorsement* and *Certified By*, when set in Fabric.
- **Contacts** — Report users, filtered by `contact.role_filter`.
- **Fields** — One field per column or measure projected in a visual, with *Type* (`Dimension` or `Measure`), *Expression*, and the *Pages* on which it appears.

**Dataset** — A semantic model table:

- **Name and description** — From the semantic model.
- **Location** — *Workspace URL* and *Semantic Model* URL.
- **Fields** — Columns (*Type* `Dimension`) and measures (*Type* `Measure`, with their DAX *Expression*).
- **Power Query** — The table's M expression, sent to the catalog to resolve lineage towards the underlying sources.

**Dataset** — A lakehouse or warehouse table:

:material-lock:{ .amber } [Required Privileges](#required-privileges)

:material-cash:{ .amber } Fabric capacity

- **Name** — The table name.
- **Location** — *Workspace URL*, *Workspace*, and *Lakehouse* or *Warehouse*.
- **Domain** — *Domain* and *Domain Path*, when the workspace is assigned to a Fabric domain.
- **Shortcut** — *Shortcut Type* and *Shortcut Location*, for a lakehouse table backed by a shortcut.
- **Primary key** — Warehouse tables only: which of its fields form the primary key.
- **Foreign keys** — Warehouse tables only: links from its fields to fields of other datasets.
- **Fields** — Columns, including their native SQL type, mapped data type, position, and nullability.

#### Identification Keys

Each catalog object carries an **identification key** generated by the connector. For more information, see [Identification Keys](../../../features-applications/studio/stewardship/identification-keys.md).

| Object | Identification Key | Components |
| :--- | :--- | :--- |
| Visualization (report) | `workspace_id/type/id` | **workspace_id**: workspace<br/>**type**: `report`<br/>**id**: report ID |
| Dataset (semantic model table) | `workspace_id/type/id/dataset_name` | **type**: `dataset`<br/>**id**: semantic model ID<br/>**dataset_name**: table name |
| Dataset (warehouse table) | `workspace_id/type/id/table_name` | **type**: `warehouse`<br/>**id**: warehouse ID<br/>**table_name**: table name |
| Dataset (lakehouse table) | `workspace_id/type/id/table_name` | **type**: `lakehouse`<br/>**id**: lakehouse ID<br/>**table_name**: table name |
| Field | …plus `field_key` | **field_key**: column or measure name |

Objects are assigned to a single data source named **MS Fabric**.

### Lineage

Lineage is materialized by linking a dataset or a visualization to its source datasets and fields.

#### Report → Semantic Model

Semantic model tables → the report. Each field projected in a visual is linked to the semantic model column or measure it comes from, providing **field-to-field** lineage.

The report structure is read from the Fabric **report definition**, in either of the two formats returned by Fabric: PBIR (one file per page and per visual) or a single legacy layout file. When the definition cannot be read, the connector falls back to exporting the report as **PBIX** through the Power BI API and reads its layout.

!!! note
    If neither the report definition nor the PBIX export is available, usually because of a privilege issue (see [Required Privileges](#required-privileges)), the report is still cataloged but without fields and without its page list. The scanner logs a warning that identifies the report.

#### Semantic Model → Lakehouse or Warehouse Table (Direct Lake)

Lakehouse or warehouse tables → the semantic model table, from the relations reported by the metadata scan. 

When the semantic model table uses **Direct Lake** storage over a single source table, each of its columns is also linked to the source column of the same name, providing **field-to-field** lineage. Otherwise, the link remains at **table-to-table** level.

#### Semantic Model → External Data Source

The Power Query (M) expression of each semantic model table is sent to the catalog, and the scanner resolves it to the datasets of the underlying source connections (Snowflake, SQL Server, BigQuery, and others). 

Parameters are substituted with their values beforehand, and ODBC DSNs are resolved from `dsn.configuration`. For more information, see [Power Query Resolution (ODBC DSN)](#power-query-resolution-odbc-dsn).

#### Lakehouse Shortcut → OneLake Target Table

:material-lock:{ .amber } [Required Privileges](#required-privileges)

A lakehouse table backed by a **OneLake** shortcut is linked to the target lakehouse or warehouse table, column by column (**field-to-field**). The shortcut's *Shortcut Type* and *Shortcut Location* are recorded as properties.

Shortcuts pointing outside OneLake, such as Amazon S3, S3-compatible, ADLS Gen2, Azure Blob Storage, Google Cloud Storage, Dataverse, OneDrive or SharePoint, and external data shares, are recorded as properties only. No lineage link is created towards the external storage.

### Classification and Governance

#### Fabric Domains

:material-lock:{ .amber } [Required Privileges](#required-privileges)

The tenant's domains are read from the Fabric admin API. The domain of each workspace is attached to its lakehouse and warehouse datasets as *Domain* and *Domain Path*. The *Domain Path* contains the full parent hierarchy, for example `Finance/Controlling`. 

Domains can also be used for filtering. For more information, see [Filtering](#filtering).

#### Endorsement

The report's *Endorsement* (`Promoted`, `Certified`) and *Certified By* values are read from the metadata scan and exposed as properties. 

**Read-only**: The connector never writes back to Fabric.

#### Contacts

Config: `contact.role_filter`

Report users returned by the metadata scan are imported as contacts, with their Power BI access right assigned as role. Only principals of type *User* with a valid email address are imported. 

Use `contact.role_filter` to restrict which roles are imported as contacts. For example:

```hocon
contact.role_filter = "role in ('Owner')"
```

### Data

Data profiling and data sampling are **not supported** by this connector. The connector reads structure and metadata only and never reads table contents.

## Required Privileges

The connector is **read-only** and never modifies Fabric content. Grant only what the objects you catalog need.

### Tenant Settings

A Fabric administrator must enable the following settings in **Admin portal > Tenant settings** and add the service principal to the security group allowed by each setting:

| Setting | Section | Needed For |
| :--- | :--- | :--- |
| Service principals can access read-only admin APIs | Admin API settings | Workspace discovery and metadata scan |
| Enhance admin APIs responses with detailed metadata | Admin API settings | Semantic model tables, columns, and measures |
| Enhance admin APIs responses with DAX and mashup expressions | Admin API settings | Measure DAX and Power Query lineage |
| Service principals can use Fabric APIs | Developer settings | Report definitions, domains, lakehouses, warehouses, shortcuts, and SQL analytics endpoint |

### Privileges per Capability

The following table lists the privileges required for each capability.

| Capability | APIs and Objects Queried | Privilege Required |
| :--- | :--- | :--- |
| Workspace discovery | `GET /v1.0/myorg/admin/groups` | Read-only admin APIs (tenant setting and allowed security group). |
| Reports, semantic models, report users, lakehouse and warehouse lists | `POST /v1.0/myorg/admin/workspaces/getInfo`, `admin/workspaces/scanStatus/{id}`, `admin/workspaces/scanResult/{id}` | Read-only admin APIs and both **Enhance admin APIs responses…** tenant settings. |
| Power BI apps | `GET /v1.0/myorg/admin/apps` | Read-only admin APIs. |
| Report pages and fields (report definition) | `POST /v1/workspaces/{workspaceId}/reports/{reportId}/getDefinition` | Microsoft requires read **and write** permission on the item (`Report.ReadWrite.All` or `Item.ReadWrite.All`). In practice, this requires a workspace role of **Contributor** or higher. |
| Report pages and fields (PBIX fallback) | `GET /v1.0/myorg/groups/{workspaceId}/reports/{reportId}/export` | Access to the report in its workspace (`Report.Read.All`). |
| Fabric domains | `GET /v1/admin/domains`, `GET /v1/admin/domains/{domainId}/workspaces` | The caller must be a **Fabric administrator** (`Tenant.Read.All`). |
| Lakehouse and warehouse SQL endpoint discovery | `GET /v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}`, `GET /v1/workspaces/{workspaceId}/warehouses/{warehouseId}` | Read permission on the item. In practice, this requires a workspace **Viewer** (`Lakehouse.Read.All` , `Warehouse.Read.All` , or `Item.Read.All`). |
| Lakehouse shortcuts | `GET /v1/workspaces/{workspaceId}/items/{itemId}/shortcuts`, `GET /v1/workspaces/{workspaceId}/items/{itemId}` | `OneLake.Read.All` and read permission on the item. |
| Lakehouse and warehouse tables, columns, primary keys, and foreign keys | SQL analytics endpoint (TDS, port 1433): `INFORMATION_SCHEMA.COLUMNS`, `INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS` joined with `INFORMATION_SCHEMA.KEY_COLUMN_USAGE`, and the JDBC primary-key metadata | Read access to the SQL analytics endpoint of each warehouse and lakehouse. This requires a workspace role that grants **ReadData**, or `SELECT` permission granted explicitly to the service principal. |

!!! tip "Least Privilege"
    Enabling the **read-only admin APIs** provides tenant-wide access to workspaces, reports, and semantic models. Beyond that, grant the service principal access only to the workspaces where you need report fields (*Contributor* role) or lakehouse and warehouse tables (*Viewer* role and read access to the SQL analytics endpoint). Domains require the **Fabric administrator** role.

!!! warning "Validate with Your Fabric Administrator"
    Fabric permission requirements vary depending on tenant settings, capacity, and workspace configuration. Microsoft may also change the required permission scopes. Validate the required permissions with your Fabric administrator and start with a single workspace.

## Configuration Reference

The following table lists the connection properties supported by the MS Fabric connector.

!!! note
    A configuration file template is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

| Property | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| **General** | | | |
| `name` | — | Yes | Display name shown to catalog users. |
| `code` | — | Yes | Unique connection identifier. Do not change it after registration. |
| `connector_id` | — | Yes | Connector type. Must be `ms-fabric`. |
| `enabled` | `true` | No | Whether the connection is active. |
| **Connection** | | | |
| `connection.tenant` | — | Yes | Microsoft Entra tenant ID. Used to construct the OAuth 2.0 token endpoint. |
| `connection.oauth.client_id` | — | Yes | Application (client) ID of the service principal. |
| `connection.oauth.client_secret` | — | Yes | Client secret for the service principal. Can be resolved from the scanner's Secret Manager. |
| `connection.url` | *(`https://api.powerbi.com` and `https://api.fabric.microsoft.com`)* | No | Base URL for the Power BI and Fabric APIs. Both API clients use this single value. If you point it to a gateway, that host must serve both the `/v1.0/myorg` and `/v1` paths. |
| `connection.timeout` | `300000` | No | Request timeout, in milliseconds, for both API clients. |
| **Inventory** | | | |
| `inventory_filters` | *(none)* | No | Which objects are cataloged (`ACCEPT` or `REJECT`). See [Filtering](#filtering). |
| `inventory_on_reports_only` | `false` | No | Import semantic model tables together with their reports instead of as standalone objects. See [Report-Only Inventory](#report-only-inventory). |
| `time_between_scan` | `3000` | No | Delay, in milliseconds, between metadata scan status polls. See [Tenant-Wide Inventory](#tenant-wide-inventory). |
| `contact.role_filter` | *(all roles)* | No | Which report user roles are imported as contacts. See [Contacts](#contacts). |
| `dsn.configuration` | *(none)* | No | ODBC DSN definitions used to resolve Power Query lineage. Specify an inline JSON array, or `file:<path>`. See [Power Query Resolution (ODBC DSN)](#power-query-resolution-odbc-dsn). |
| **Extraction Caching** | | | |
| `cache.enabled` | `false` | No | Enable extraction caching. See [Extraction Caching](#extraction-caching). |
| `cache.path` | `<scanner home>/cache/<connection name>.cache` | No | File where the cache is stored. |
| `cache.ttl` | `PT23H` | No | Cache validity period (ISO-8601 duration). |

## Troubleshooting

| Symptom | Likely Cause | Fix |
| :--- | :--- | :--- |
| Reports are cataloged, but fields and page lists are missing. | Microsoft requires read **and write** permission on a report to read its definition, and the PBIX fallback was not available either. | Grant the service principal a *Contributor* role on the workspaces where you need report fields. For more information, see [Required Privileges](#required-privileges). |
| Semantic model tables have no columns or measures, or measures have no DAX expression. | The **Enhance admin APIs responses…** tenant settings are not enabled for the service principal's security group. | Enable both settings. For more information, see [Tenant Settings](#tenant-settings). |
| No lakehouse or warehouse tables appear in the catalog. | The *Service principals can use Fabric APIs* tenant setting is disabled, port 1433 is closed, the service principal lacks permission to read the items, or a newly created service principal does not yet have a Fabric token. | Check the tenant setting, the outbound route to `*.datawarehouse.fabric.microsoft.com`, and the item permissions. Then run the extraction again. The connector calls the Fabric API during each extraction, which creates the token. Microsoft requires the token to be renewed every 30 days. |
| Tables from one warehouse or lakehouse are missing, while the others are available. | That SQL analytics endpoint could not be reached. The connector skips it for 60 seconds and continues processing. | Check that the item is available and that read access has been granted. |
| *Domain* and *Domain Path* are empty for lakehouse and warehouse datasets. | Reading tenant domains requires the **Fabric administrator** role. | Grant the role, or accept that domains are not cataloged. |
| The inventory takes hours to complete on a large tenant. | No workspace or domain criteria are specified in the `ACCEPT` filters, so the metadata scan runs on every workspace. | Update the rules so that every `ACCEPT` filter includes a workspace or domain criterion, and enable [Extraction Caching](#extraction-caching). |

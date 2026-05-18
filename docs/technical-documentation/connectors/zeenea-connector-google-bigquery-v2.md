# Adding a BigQuery Connection

## Prerequisites

* In order to establish a connection to Google BigQuery, a service account with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards Google BigQuery must be open.

Zeenea uses the Google Cloud BigQuery public SDK to collect metadata.

| Target | Protocol | Usual Ports |
| :--- | :--- | :--- |
| BigQuery | HTTPS | 443 |

## Supported Versions

The BigQuery v2 connector has been tested with the cloud version of this service.

## Installing the Plugin

This connector is distributed as a plugin and requires a compatible scanner version.

It can be downloaded from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../Features/zeenea-administration/zeenea-managing-connections.md)

In order to establish a connection with BigQuery, specifying the following parameters in the dedicated file is required:

| Parameter | Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection |
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `bigquery-v2`. This value must not be modified. |
| `connection.json_key` | Path to the service account JSON key file (e.g. `file:/path/to/key.json`), or the JSON content inline. |
| `connection.project_id` | (Optional) Identifier of the Google Cloud project to scan. If omitted, all projects accessible to the service account are discovered and scanned. |
| `connection.billing_project_id` | (Optional) Identifier of the project used for billing. The Google invoice is for this project. When set, all BigQuery API calls are billed to this project regardless of the project being scanned. |
| `inventory.partition.pattern` | (Optional) Regular expression pattern matching the variable part of partitioned table names. Tables whose names match this pattern will be grouped under a single catalog entry. See examples in the template file. |
| `sampling.view.enabled` | (Optional) Enables data sampling for views and materialized views. Default value: `false`. |
| `proxy.scheme` | (Optional) Depending on the proxy: `http` or `https` |
| `proxy.hostname` | (Optional) Proxy address |
| `proxy.port` | (Optional) Proxy port |
| `proxy.username` | (Optional) Proxy username |
| `proxy.password` | (Optional) Proxy account password |

## User Permissions

In order to collect metadata, the service account must have permissions to list and read all sources that need to be cataloged.

### Roles

To extract metadata, the technical account must have the following predefined roles:

* On the project where the service account is managed:
  * Project Browser (`roles/browser`)
  * BigQuery Metadata Viewer (`roles/bigquery.metadataViewer`)
* On all projects to be cataloged:
  * BigQuery Metadata Viewer (`roles/bigquery.metadataViewer`)

Primary Keys and Foreign Keys are retrieved automatically using the BigQuery Table Constraints API.

If the data sampling feature is enabled for views, the service account also needs read access on the relevant tables:
* BigQuery Data Viewer (`roles/bigquery.dataViewer`)

## Universal Filters


Use universal filter language to filter and root items with the criteria bellow

| Criteria | Description |
| :--- | :--- |
| `project` | (String) Project name |
| `dataset` | (String) Dataset name |
| `table` | (String) Table name |

#### Example:
```
filters = [
  {
    id = "accept_zeenea_project"
    action = ACCEPT
    rules {
      project = "zeenea_project"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

Read more: [Universal Filters](#zeenea-universal-filters.html)

## Data Extraction

The connector performs a full inventory of all accessible BigQuery projects, iterating through datasets and tables. For each table, detailed metadata is extracted including schema, constraints, and technical properties.

For views and materialized views, the SQL definition query is captured and exposed as a source query reference, enabling lineage tracking.

## Collected Metadata

### Inventory

The inventory collects all tables, views, and materialized views that the service account can access.

### Dataset

A BigQuery table, view, or materialized view cataloged as a Dataset.

* **Name**: Table name (or friendly name for partitioned multi-table entries)
* **Source Description**: Table description as set in BigQuery
* **Source Queries**: For views and materialized views, the SQL definition query (used for lineage)
* **Primary Keys**: Columns defined as primary key via BigQuery Table Constraints
* **Foreign Keys**: Foreign key constraints defined via BigQuery Table Constraints
* **Technical Data**:
  * Project
  * Dataset
  * Table
  * Type (e.g. `table`, `view`, `materialized view`)
  * Friendly Name
  * Created
  * Expiration
  * Last modified
  * Size (bytes)
  * Long-Term Storage Size (bytes)
  * Number of rows
  * Data location
  * Labels

### Field

A column in a BigQuery table or view.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: `true` if the field mode is `NULLABLE`
* **Primary Key**: Derived from the table's Primary Key constraint
* **Technical Data**:
  * Technical Name: Field technical name
  * Native type: BigQuery field type (e.g. `STRING`, `INTEGER`, `STRUCT`, `ARRAY`)

## Data Sampling

!!! important
    The Data Sampling feature allows your Explorers to preview actual data stored in each field. This feature can be activated per connection in the Scanner. Depending on the volume of fields enabled, sampling can generate significant query costs in BigQuery. Ensure the estimated impact is acceptable before enabling it.

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of objects created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md).

| Object | Identification Key | Description |
| :--- | :--- | :--- |
| Dataset | `code` / `project_id` / `dataset` / `table` | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project_id**: Google Cloud project identifier<br/>- **dataset**: BigQuery dataset name<br/>- **table**: Table or view name (may contain a wildcard `*` for partitioned tables) |
| Field | `code` / `project_id` / `dataset` / `table` / `field_key` | - **field_key**: Column name |

!!! note
    The identification key format has changed compared to the previous BigQuery connector. A migration step may be required when upgrading from the legacy `BigQuery` or `BigQueryOrganization` connectors to `bigquery-v2`.
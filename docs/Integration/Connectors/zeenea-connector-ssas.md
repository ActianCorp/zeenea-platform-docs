# Adding an SSAS (SQL Server Analysis Services) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SSAS.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Installing the Plugin

The SSAS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with SSAS, the following parameters in the dedicated file are required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `ssas` and this value must not be modified. |
| `connection.path` | Path to the SSAS project directory to synchronize with the catalog. These files will be parsed: <br/>- `.cube` : cube file<br/>- `.ds`: reference datasource file<br/>- `.dsv`: reference datasource view file |
| `connection.url` | URL to the data pump `MSMDPUMP.dll` |
| `connection.server_mode` | Server or project mode for SSAS. Accepted values are:<br/>- Empty or `tabular`: The target server/project is configured in "Tabular" mode.<br/>- `multidimensional`: The target server/project is configured in "Multidimensional" mode. |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read files from the directory specified in the dedicated parameter.

When the URL parameter is configured, the connector goes through the `MSMDPUMP.dll` data pump.

For more information, refer to [Configure HTTP Access to Analysis Services on IIS 8.0](https://learn.microsoft.com/en-us/analysis-services/instances/configure-http-access-to-analysis-services-on-iis-8-0?view=asallproducts-allversions&redirectedfrom=MSDN).

## Data Extraction

To extract information, the connector runs requests on views from the `pg_catalog schema`.

## Collected Metadata

### Lineage

The connector only handles lineage from SQL queries. **M scripts are not handled**.

The connector is capable of reconstructing the lineage of manipulated tables in transformations if they are present in the catalog. This functionality is available when SSAS manipulates datasets from the following technologies:

* SqlServer

In this case, it is necessary to specify an additional parameter in the original connections of these tables following the format:

`alias = ["<host>:<port>/<database>"]`
 
where the variables `<host>`, `<port>`, and `<database>` are replaced with the values from the original connections.

### Dataset

A dataset corresponds to a table for a SSAS server in "Tabular" mode or a cube for a server in "Multidimensional" mode.

* **Name**
* **Source Description**
* **Technical Data**: 
  * Catalog
  * Creation date
  * Last modification date
 
### Field

A field is a field within a dataset.

* **Name**
* **Source Description**
* **Type**
* **Can be null**
* **Multivalued (Mode "Multidimensional" only)**
* **Primary Key**
* **Technical Data**: 
  * "Multidimensional" Mode:
    * Field Type (dimension or measure)
    * Measure Group
    * Aggregate Function
    * The table associated with the measure
    * Column associated with the measure
  * "Tabular" Mode:
    * Is Hidden
    * Is Unique
    * Last Modification Date

### Data Process

A data process represents lineage between a cube/table and its sources.

* **Name**: `CREATEVIEW view-name`
* **Input**: Datasets as input to the process
* **Output**: Dataset as output to the process
* **Technical  Data**:
  * "Tabular" Mode:
    * SQL Query used

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

 Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/catalog/[table or cube] | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Name of the catalog<br/>- **table or cube**: Name of the table or cube |
| Field | code/catalog/[table or cube]/column | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Name of the catalog<br/>- **table or cube**: Name of the table or cube<br/>- **column name**: Name of the column, the measure, or the dimension |
| Data process | code/catalog/dataprocess/import [table or cube] | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Name of the catalog<br/>- **transformation**: Name of this transformation |

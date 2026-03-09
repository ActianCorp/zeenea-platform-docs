# Adding a Databricks Unity Catalog REST Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Databricks Unity Catalog. 
* Zeenea traffic flows towards the data source must be open.

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Databricks Unity Catalog connector is compatible with version API Rest versions 2.0 and 2.1. 

## Installing the Plugin

You can download the Databricks Unity Catalog plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../../Features/zeenea-administration/zeenea-managing-connections.md).

To establish a connection with a Databricks Unity Catalog instance, fill in the following parameters in the dedicated configuration file:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `databricks-unitycatalog` and this value must not be modified. | 
| `connection.url` | Databricks URL address (`https://url.cloud.databricks.com`). |
| `connection.oauth.endpoint`	| Databricks OAuth2 endpoint (Optional)<br /><br /> Example: `https://tenant.cloud.databricks.com/oidc/v1/token`. |
| `connection.oauth.client_id` | Client identifier |
| `connection.oauth.client_secret` | Client secret |
| `lineage.enabled` | Activates the lineage feature. Default value `false`. |
| `filter` | To filter datasets during the inventory |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` |	Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

## User Permissions

To collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

The user must have `USE_CATALOG`, `USE_SCHEMA`, and `BROWSE` privileges on the objects that need cataloging.
 
## Rich Filters

Databricks connector benefits from the feature of rich filters in the configuration of the connector. Following are the available filtering keys for Databricks Unity Catalog:

* `catalog`
* `schema`
* `table`

For more information about filters, see [Filters](../Scanners/zeenea-filters.md).

## Data Extraction

To extract information, the connector runs REST requests on following endpoints:

* **GET**: `/api/2.1/unity-catalog/catalogs`: To get available catalogs.
* **GET**: `/api/2.1/unity-catalog/schema?catalog_name=main`: To get schema from available catalogs.
* **GET**: `/api/2.1/unity-catalog/tables?catalog_name=main&schema_name=default`: To get tables and views from a catalog schema.
* **GET**: `/api/2.1/unity-catalog/tables/main.default.table_name`: To get tables and views metadata.

## Collected Metadata

### Inventory

The inventory collects the list of tables and views accessible by the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**: 
  * Catalog Name
  * Schema Name
  * Metastore ID
  * Table ID
  * Type
  * Data Source Format
  * Storage Location
  * Created at
  * Created by
  * Updated at
  * Updated by

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings
* **Multivalued**: Depending on field type
* **Primary Key**: Depending on the "Primary Key" attribute
* **Technical Data**: 
  * Technical Name
  * Native type
 
## Object Identification Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.

For more information about identifier keys, see [Identification Keys](../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
| --- | --- | --- |
| Dataset | code/catalog/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Object catalog<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name |
| Field | code/catalog/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Object catalog<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name<br/>- **field name** |

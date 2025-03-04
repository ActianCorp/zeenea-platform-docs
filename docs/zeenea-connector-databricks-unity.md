---
title: Databricks Unity Catalog
---

# Adding a Databricks Unity Catalog Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Databricks Unity Catalog. 
* Zeenea traffic flows towards the data source must be open.

:::note
A configuration template can be downloaded here: [databricks-unitycatalog.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUal0&d=%2Fa%2FNu000002lgaX%2Fk_V_FIT5LAvVG29BZPY2.zJdnwWdJoCT4L38CsrYxRw&asPdf=false)
:::

## Supported Versions

The Databricks Unity Catalog connector is compatible with version API Rest versions 2.0 and 2.1. 

## Installing the Plugin

The Databricks Unity Catalog plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Databricks Unity Catalog instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `databricks-unitycatalog` and this value must not be modified. | 
| `connection.url` | Databricks URL address (`https://url.cloud.databricks.com`). |
| `connection.oauth.endpoint`	| Databricks OAuth2 endpoint (Optional)<br /><br /> Example: `https://tenant.cloud.databricks.com/oidc/v1/token`. |
| `connection.oauth.client_id` | Client identifier |
| `connection.oauth.client_secret` | Client secret |
| `lineage.enabled` | Activates the lineage feature. Default value `false`. |
| `filter` | To filter datasets during the inventory |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain.
| `tls.truststore.password` |	Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username | Proxy username |
| `proxy.password | Proxy account password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have `SELECT` access to objects that need cataloging.
 
## Rich Filters

Databricks connector benefits from the feature of rich filters in the configuration of the connector. Available filtering keys for Databricks Unity Catalog are the following:

* catalog
* schema
* table

Read more: [Filters](zeenea-filters.md)

## Data Extraction

To extract information, the connector runs REST requests on following endpoints:

* **GET** `/api/2.1/unity-catalog/catalogs`: To get available catalogs.
* **GET**: `/api/2.1/unity-catalog/schema?catalog_name=main`: To get schema from available catalogs.
* **GET**: `/api/2.1/unity-catalog/tables?catalog_name=main&schema_name=default`: To get tables and views from a catalog schema.
* **GET**: `/api/2.1/unity-catalog/tables/main.default.table_name`: To get tables and views metadata.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

## Dataset

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

## Field

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
 
## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/catalog/schema/dataset name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**catalog**: Object catalog</li>
        <li>**schema**: Object schema</li>
        <li>**dataset name**: Table or view name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/catalog/schema/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**catalog**: Object catalog</li>
        <li>**schema**: Object schema</li>
        <li>**dataset name**: Table or view name</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

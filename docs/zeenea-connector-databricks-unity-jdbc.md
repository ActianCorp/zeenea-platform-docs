---
title: Databricks Unity Catalog JDBC
---

# Adding a Databricks Unity Catalog JDBC Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Databricks Unity Catalog. 
* Zeenea traffic flows towards the data source must be open.

:::note[IMPORTANT]
**The Databricks JDBC driver is not provided with the connector**. Download the Databricks JDBC driver for your Databricks instance and copy it to the `/lib-ext` folder of your scanner (**only the .jar file**). You can find the driver in the sources provided by the vendor on their website: https://www.databricks.com/spark/jdbc-drivers-download.
:::

:::note
A configuration template can be downloaded here: [databricks-jdbc.conf](https://github.com/zeenea/connector-conf-templates/blob/main/templates/databricks-jdbc.conf)
:::

## Supported Versions

The Databricks Unity Catalog JDBC connector is compatible with Databricks on AWS, Azure, and Google Cloud platforms. 

Our connector has been built and tested with Simba 2.7.3 driver on Databricks 16.4 LTS version.

## Installing the Plugin

The Databricks Unity Catalog JDBC plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Databricks Unity Catalog instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `databricks-jdbc` and this value must not be modified. | 
| `connection.url` | JDBC URL (example: `jdbc:databricks://<tenant>.cloud.databricks.com:443`) |
| `connection.oauth.endpoint`	| Databricks OAuth2 endpoint (Optional)<br /><br /> Example: `https://tenant.cloud.databricks.com/oidc/v1/token`. |
| `connection.oauth.client_id` | Client identifier |
| `connection.oauth.client_secret` | Client secret |
| `connection.http_path` | Cluster HTTP path |
| `filter` | To filter datasets during the inventory |
| `fingerprint.sampling_max_rows` | Max sampling rows during fingerprinting (default 10,000) |
| `lineage.enabled` | Enable lineage (default `true`)

## User Permissions

In order to collect metadata, the running user's permissions must have `SELECT` access to system tables that contains all information we have to retrieve.
User must have `SELECT` permission on the following Databricks schema : `system.information_schema`
 
## Rich Filters

Databricks connector benefits from the feature of rich filters in the configuration of the connector. Available filtering keys for Databricks Unity Catalog JDBC are the following:

* catalog
* schema
* table

Read more: [Filters](zeenea-filters.md)

## Data Extraction

To extract information, the connector is querying the following system tables :

* `system.information_schema.tables` : To get available tables and retrieve metadata.
* `system.information_schema.views` : To retrieve view's data
* `system.information_schema.columns` : To retrieve table's schema
* `system.information_schema.table_constraints` : To retrieve primary keys
* `system.information_schema.key_column_usage` : To retrieve foreign keys
* `system.information_schema.constraint_column_usage` : To retrieve foreign keys

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
  * Type
  * Data Source Format
  * Storage Location
  * Created at
  * Created by
  * Updated at
  * Updated by
  * View query definition

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

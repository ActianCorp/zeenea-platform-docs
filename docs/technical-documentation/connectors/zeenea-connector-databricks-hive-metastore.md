# Adding a Databricks Hive Metastore Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Databricks Hive Metastore.
* Zeenea traffic flows towards the database must be open. 

> **Important:** The Databricks JDBC driver is not provided with the connector. Download the Databricks JDBC driver for your Databricks instance and copy it to the `/lib-ext` folder of your scanner (**only the .jar file**). You can find the driver in the sources provided by the vendor on their website: [https://www.databricks.com/spark/jdbc-drivers-download](https://www.databricks.com/spark/jdbc-drivers-download).

<br />

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Databricks Hive Metastore connector is compatible with the SaaS version of the product.

## Installing the Plugin

The Databricks plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with an Databricks Hive Metastore instance, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `databricks-hivemetastore` and this value must not be modified. |
| `connection.url` | Address (example: `jdbc:databricks://.cloud.databricks.com:443`). |
| `connection.token` | Databricks Token |
| `connection.http_path` | Cluster HTTP path |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read datasets that need cataloging. 

Here, the user must have read access to Hive Metastore and to schemas and tables that need cataloging.

## Data Extraction

To extract information, the connector runs the following SQL requests:

* `SHOW DATABASES;`
* `USE ;`
* `SHOW TABLES;`
* `DESCRIBE TABLE FORMATTED;`

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Catalog Name
  * Schema Name
  * Type
  * Data Source Format
  * Storage Location
  * Partitioned By
  * Created By
  * Created At

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type
 
## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/catalog/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Object catalog<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name |
| Field | code/catalog/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **catalog**: Object catalog<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name<br/>- **field name** |

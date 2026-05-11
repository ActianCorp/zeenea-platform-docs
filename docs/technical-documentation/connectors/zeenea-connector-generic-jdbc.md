# Adding a Generic JDBC Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with a data source through the standard JDBC interface.
* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

> **Important:** The JDBC connector requires the installation of the relevant JDBC driver in the /lib-ext folder of the scanner to be compatible with the required source system. 

## Installing the Plugin

From version 54 of the scanner, the JDBC connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).
 
## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with a JDBC instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `generic-jdbc` and this value must not be modified. |
| `connection.url` | Database address |
| `connection.jdbc_driver_name` | **Scanner 69 and later.**<br/>(Optional) The long name of the JDBC Driver to use.<br/>Examples:<br/>  * `org.postgresql.Driver`<br/>  * `com.mysql.jdbc.Driver`<br/>  * `org.mariadb.jdbc.Driver`<br/>  * `com.microsoft.sqlserver.jdbc.SQLServerDriver`<br/>  * `oracle.jdbc.driver.OracleDriver`<br/>  * `com.ibm.db2.jcc.DB2Driver` |
| `connection.username` | Username |
| `connection.password` | User password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging.
 
## Data Extraction

To extract information, the connector runs requests from the driver's capabilities.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**: 
  * Catalog
  * Schema
  * Type

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings
* **Multivalued**: Depending on field settings
* **Primary Key**: Depending on the "Primary Key" attribute
* **Technical Data**: 
  * Technical Name
  * Native type

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | * **code**: Unique identifier of the connection noted in the configuration file<br/>* **schema**: Object schema<br/>* **dataset name**: Table or view name |
| Field | code/database name/dataset name/field name | * **code**: Unique identifier of the connection noted in the configuration file<br/>* **schema**: Object schema<br/>* **dataset name**: Table or view name<br/>* **field name** |

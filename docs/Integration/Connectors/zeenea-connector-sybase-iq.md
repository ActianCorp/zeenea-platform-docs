# Adding a Sybase IQ Connection

## Prerequisites

* In order to establish a connection with Sybase IQ, a user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards Sybase IQ must be open. 

> **Important:** The Sybase IQ driver is not delivered with the connector with scanner version 34 and later. Download the Sybase IQ driver related to your Sybase IQ instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: [http://www.sybase.com/products/allproductsa-z/softwaredeveloperkit/jconnect](http://www.sybase.com/products/allproductsa-z/softwaredeveloperkit/jconnect)

<br />

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

This connector was successfully tested with version 16.0. 

## Installing the Plugin

The SybaseIQ connector has been moved to the JDBC plugin. It can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with SybaseIQ, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `SybaseIQ` and this value must not be modified. |
| `connection.hostname` | Database address |
| `connection.database` | Database name |
| `connection.port` | Port used by the database |
| `connection.username` | Username |
| `connection.password` | User password |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

The user must be able to read objects from tables: 

* `sysusers`
* `sysobjects`
* `sysremark`

## Data Extraction

In order to extract data from Sybase IQ, the connector runs requests on the following tables: 

* `sysusers`
* `sysobjects`
* `sysremark`
 
## Collected Metadata

### Inventory

The inventory collects the list of all data sources that the user can access.

### Datasets

Here, a dataset is a table. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Schema: source schema
  * Table: table name

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Based on field settings
* **Multivalued**: Not supported. Default value `FALSE`.
* **Primary Key**: Based on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type: Field native type

## Object Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |

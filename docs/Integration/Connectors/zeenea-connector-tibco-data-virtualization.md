# Adding a Tibco Data Virtualization Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Tibco Data Virtualization (TDV).
* Zeenea traffic flows towards the database must be open.

> **Important:**
> * The TDV connector is compatible with **scanner version 34** and later.
> * **The Tibco driver is not delivered with the connector**. Download the Tibco driver related to your TDV instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: [https://edelivery.tibco.com/storefront/eval/tibco-data-virtualization/prod11801.html](https://edelivery.tibco.com/storefront/eval/tibco-data-virtualization/prod11801.html)

<br />

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The TDV connector was developed and tested with TDV 8.4.

## Installing the Plugin

The Tibco plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with a TDV instance, the following parameters in the configuration file are required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `tibco-datavirtualization` and this value must not be modified. |
| `connection.url` | Database address.<br/>Example: `jdbc:compositesw:dbapi@localhost:9401?domain=composite&dataSource=system` |
| `connection.username` | Username |
| `connection.password` | User password |
| `lineage` | Option for lineage feature activation. Default value `false`. |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read published views that need cataloging. 

Here, the composite user must have been configured with the following rights:

 * model.ALL_TABLES
 * model.ALL_DATASOURCES
 * model.ALL_COLUMNS
 * model.ALL\_RESOURCE\_PROPERTIES

## Data Extraction

To extract information, the connector runs SQL requests on the TDV Server to collect and extract metadata about views.
 
## Collected Metadata

### Inventory

Will collect the list of views accessible by the user.

### Lineage

The connector is able to retrieve the lineage for views to existing datasets from the catalog.

### Dataset

A dataset is a published view. 

* **Name**
* **Description**
* **Technical Data**:
  * Composite Container Name
  * Catalog Name
  * Schema Name
  * Creation Date
  * Last Modification Date

### Field

Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings
* **Multivalued**: Not supported. Default value `false`.
* **Primary key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type: field native type
  * Column Length:
    * For CHAR or VARCHAR columns, the max length allowed.
    * For DECIMAL or NUMERIC columns, the total number of digits is the column length value.
    * If it is not one of these four types, the value is NULL.

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/path/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Dataset parent path<br/>- **dataset name** |
| Field | code/path/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Dataset parent path<br/>- **dataset name**<br/>- **field name** |
  

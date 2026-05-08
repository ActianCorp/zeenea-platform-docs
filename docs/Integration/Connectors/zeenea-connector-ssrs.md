# Adding an SSRS (SQL Server Reporting Services) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SSRS.  
* Zeenea traffic flows towards the data source must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The SSRS connector is compatible with SSRS 2019. 

## Installing the Plugin

The SSRS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with an SSRS instance, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `ssrs` and this value must not be modified. |
| `connection.path` | Path of the directory containing SSRS projects to synchronize with the catalog |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read reports that need cataloging. 

Here, the user must have read access to files from the directory specified in the dedicated parameter.

## Data Extraction

To extract information, the connector will parse the `.rdl`, `.rds`, and `.rsd` files of the directory to identify the reports and the datasets linked to them.

## Collected Metadata

### Inventory

Will collect the list of reports accessible by the user.  

### Visualization

A visualization is an SSRS report.

* **Name**
* **Source Description**
* **Technical Data**:
  * Author

### Dataset

A dataset is an SSRS reports dataset. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Source Report
  * Datasource Name
  * Data Provider
  * Connection String
  * Number of filters
  * Number of Query Parameters

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. Default value `false`.
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Data**:
  * Technical Name
  * Native type: Field native type

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identifier Key | Description |
|---|---|---|
| Visualization | code/report id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **report id**: SSRS technical report identifier |
| Dataset | code/report id/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **report id**: SSRS technical report identifier<br/>- **dataset name** |
| Field | code/report id/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **report id**: SSRS technical report identifier<br/>- **dataset name**<br/>- **field name** |

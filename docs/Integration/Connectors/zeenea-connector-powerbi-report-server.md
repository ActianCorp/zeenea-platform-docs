# Adding a Power BI Report Server Connection

## Prerequisites

* To connect to Power Bi Report Server, a user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards PowerBI Report Server must be opened.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Power BI Report Server module is compatible with all versions. 

## Installing the Plugin

From version 54 of the scanner, the Power BI Report Server connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

For PowerBI Report Server, the following parameters are required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `PowerBIReportServer` and this value must not be modified. |
| `connection.url` | Address of the Report Server: you can find it on the web interface of your Report Server.(example: `https://pbirs.example.com/Reports`) |
| `connection.authentication_scheme` | Authentication scheme, accepted values are: `Basic`, `Digest`, `Ntlm`, `Spnego`, and `Kerberos`. |
| `connection.username` | Username |
| `connection.password` | User password |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
 
## User Permissions

In order to collect metadata, the user must be able to list and read the reports that need to be cataloged.

## Data Extraction

To extract the information, the connector will execute queries on the Rest API to collect the reports list. During the import task, the connector requests details to get complete information about each report.

## Collected Metadata

### Inventory

The inventory collects the list of reports accessible by the user.

### Visualization

A visualization object is a Power BI Report Server report.

* **Name**
* **Source Description**
* Technical metadata:
  * PowerBI Id
  * PowerBI Path
  * PowerBI Type

### Dataset

A Zeenea Dataset is a Power BI Report Server dataset.

* **Name**
* **Source Description**

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object | Identification Key | Description |
|---|---|---|
| Visualization | code/type/identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Report or PowerBI Report<br/>- **identifier**: PBI Report Server technical object identifier |
| Dataset | code/type/identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Dataset<br/>- **identifier**: PBI Report Server technical dataset identifier |
 
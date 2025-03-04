---
title: Power BI Report Server  
---

# Adding a Power BI Report Server Connection

## Prerequisites

* To connect to Power Bi Report Server, a user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards PowerBI Report Server must be opened.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Power BI Report Server module is compatible with all versions. 

## Installing the Plugin

From version 54 of the scanner, the Power BI Report Server connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

For PowerBI Report Server, the following parameters are required:

<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection.</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The connector type to use for the connection. Here, the value must be `PowerBIReportServer` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Address of the Report Server: you can find it on the web interface of your Report Server.(example: `https://pbirs.example.com/Reports`)</td>
  </tr>
  <tr>
    <td>`connection.authentication_scheme`</td>
    <td>Authentication scheme, accepted values are: `Basic`, `Digest`, `Ntlm`, `Spnego`, and `Kerberos`.</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::
 
## User Permissions

In order to collect metadata, the user must be able to list and read the reports that need to be cataloged.

## Data Extraction

To extract the information, the connector will execute queries on the Rest API to collect the reports list. During the import task, the connector requests details to get complete information about each report.

## Collected Metadata

### Inventory

The inventory collects the list of reports accessible by the user.

## Visualization

A visualization object is a Power BI Report Server report.

* **Name**
* **Source Description**
* Technical metadata:
  * PowerBI Id
  * PowerBI Path
  * PowerBI Type

## Dataset

A Zeenea Dataset is a Power BI Report Server dataset.

* **Name**
* **Source Description**

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Visualization</td>
     <td>code/type/identifier</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**type**: Report or PowerBI Report</li>
         <li>**identifier**: PBI Report Server technical object identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Dataset</td>
     <td>code/type/identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**type**: Dataset</li>
         <li>**identifier**: PBI Report Server technical dataset identifier</li>
       </ul>
     </td>
   </tr>
 </table>
 
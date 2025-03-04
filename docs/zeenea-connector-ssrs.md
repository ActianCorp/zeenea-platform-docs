---
title: SSRS - SQL Server Reporting Services
---

# Adding an SSRS Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SSRS.  
* Zeenea traffic flows towards the data source must be open. 

## Supported Versions

The SSRS connector is compatible with SSRS 2019. 

## Installing the Plugin

The SSRS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with an SSRS instance, specifying the following parameters in the dedicated file is required:
 
<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The type of connector to be used for the connection. Here, the value must be `ssrs` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>Path of the directory containing SSRS projects to synchronize with the catalog</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

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

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Visualization</td>
    <td>code/report id</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**report id**: SSRS technical report identifier</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/report id/dataset name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**report id**: SSRS technical report identifier</li>
        <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/report id/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**report id**: SSRS technical report identifier</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

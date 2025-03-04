---
title: Sybase IQ
---

# Adding a Sybase IQ Connection

## Prerequisites

* In order to establish a connection with Sybase IQ, a user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards Sybase IQ must be open. 

:::note[IMPORTANT]
**The Sybase IQ driver is not delivered with the connector with scanner version 34 and later**. Download the Sybase IQ driver related to your Sybase IQ instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: http://www.sybase.com/products/allproductsa-z/softwaredeveloperkit/jconnect
:::

## Supported Versions

This connector was successfully tested with version 16.0. 

## Installing the Plugin

From version 54 of the scanner, the Sybase IQ connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with SybaseIQ, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `SybaseIQ` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.hostname`</td>
    <td>Database address</td>
  </tr>
  <tr>
    <td>`connection.database`</td>
    <td>Database name</td>
  </tr>
  <tr>
    <td>`connection.port`</td>
    <td>Port used by the database</td>
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

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identification Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/schema/dataset name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**schema**: Dataset schema</li>
      <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/schema/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**schema**: Dataset schema</li>
      <li>**dataset name**</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

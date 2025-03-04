---
title: Tibco Data Virtualization
---

# Adding a Tibco Data Virtualization Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Tibco Data Virtualization (TDV).
* Zeenea traffic flows towards the database must be open.

:::note[IMPORTANT]
* The TDV connector is compatible with **scanner version 34** and later.
* **The Tibco driver is not delivered with the connector**. Download the Tibco driver related to your TDV instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: https://edelivery.tibco.com/storefront/eval/tibco-data-virtualization/prod11801.html
:::

## Supported Versions

The TDV connector was developed and tested with TDV 8.4.

## Installing the Plugin

The Tibco plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a TDV instance, the following parameters in the configuration file are required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `tibco-datavirtualization` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address.<br />Example: `jdbc:compositesw:dbapi@localhost:9401?domain=composite&dataSource=system`</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`lineage`</td>
    <td>Option for lineage feature activation. Default value `false`.</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read published views that need cataloging. 

Here, the composite user must have been configured with the following rights:

<font color="red">Image is missing.</font>

## Data Extraction

To extract information, the connector runs SQL requests on the TDV Server to collect and extract metadata about views.
 
## Collected Metadata

## Inventory

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

 Read more: [Identification Keys](./zeenea-identification-keys.md)

 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
     <td>Dataset</td>
     <td>code/path/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**path**: Dataset parent path</li>
         <li>**dataset name**</li>
       </ul>
     </td>
   </tr>
  <tr>
     <td>Field</td>
     <td>code/path/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**path**: Dataset parent path</li>
         <li>**dataset name**</li>
         <li>**field  name**</li>
       </ul>
     </td>
   </tr>
 </table>
    

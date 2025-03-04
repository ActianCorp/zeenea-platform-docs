---
title: Generic Dataset (Deprecated)
---

# Adding a Generic Dataset Connection

## Deprecated

:::caution[NOTE]
**This connector is deprecated. Use the new [ZDF Dataset](./zeenea-connector-zdf.md) connector instead**.
:::

:::caution[DISCLAIMER]
This connector should only be used in very specific cases where a conventional connector is unable to connect to the platform managing the data sets. The indirection offered by this connector will enable you to create and then document datasets from a description. By contract, Zeenea defines a Dataset as a data container that physically exists on a platform. If you decide to use this connector, you must respect this contract in order to provide your end-users with a consistent experience.

**Get in touch with your Customer Success Manager for further explanations.**
:::

## Prerequisites

A user with sufficient [permissions](#user-permissions) is required to gather the metadata from the JSON description files.

Configuration templates can be downloaded here: 

* [empty_dataset_description.json](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUVEx&d=%2Fa%2FNu000002lfUn%2F65pNHnkVq60yfmIcXVCF4VnX6xhR.KgsSug2ohQWod0&asPdf=false)
* [example_dataset_description.json](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgWr&d=%2Fa%2FNu000002lfWP%2FeeMFWRTqgqIGzyJV5ytd983DUDc1hFE_xoxT4PPHELQ&asPdf=false)
*  [datasets.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GULFY&d=%2Fa%2FNu000002lfY1%2FZvrYkaMo1XsJ_zZ9QYd7EBUWOIZu4rn27WVyfVDrwLA&asPdf=false)

## Supported Versions

This connector is compatible with Zeenea description files as illustrated by the templates listed above.

## Installing the Plugin

This connector is presented as a plugin and can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

For this specific connector, fill out the following parameters in the dedicated file:

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
    <td>The connector type to use for the connection. Here, the value must be `generic-dataset` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>Path to the folder containing the descriptor files</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow the scanner to access and read the description files.

## Data Extraction

To extract information, the connector will read the content of the description files.

## Collected Metadata

### Inventory

Will collect the list of tables and views described in the JSON files.

### Dataset

A dataset can be a table or a view. This is a first level object in the JSON structure.

* **Name**
* **Source Description**
* **Technical Data**:
  * Type
  * Label
  * Format
  * Number Of Rows
  * DiskUsage
  * Location
  * Project
  * Catalog
  * Schema
  * Database
  * ReplicationFactor
  * Tags
  * SourceSystem
  * Origin
  * Creation Date
  * Update Date
  * Created By
  * Updated By
  * Comments

### Field

Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**
* **Multivalued**: Not supported. Default value `FALSE`.
* **Primary Key**: Depends on "Primary key" property
* **Technical Data**:
  * Format
  * Length
  * Encoding

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/path/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**path**: Path of the item</li>
         <li>**dataset name**: Name of the dataset</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/path/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**path**: Path of the item</li>
         <li>**dataset name**: Name of the dataset</li>
         <li>**field name**: Name of the field</li>
       </ul>
     </td>
   </tr>
 </table>
 
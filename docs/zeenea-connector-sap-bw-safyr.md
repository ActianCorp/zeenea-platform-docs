---
title: SAP BW (Safyr)  
---

# Adding an SAP BW Connection

## Prerequisites

:::caution[NOTE]
**To connect Zeenea to SAP BW, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.**
:::

## Supported Versions

The SAP BW connector is compatible with SAP BW.

## Installing the Plugin

The Silwood Safyr plugin can be downloaded here:  [Zeenea Connector Downloads](./zeenea-connectors-list.md)

:::caution[ATTENTION]
* **Updating the connector to version 3.0.0 from a previous version requires a data migration for the "Dataset" type objects representing Query. Please contact customer service to assist you in this migration**.
* **Updating the connector to version 3.1.1 from a previous version impacts data processes identification and requires a manual deleting of existing data processes. If you documented your SAP BW data processes, please contact customer service to assist you in this migration**.
:::

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with SAP BW, you need to fill out the following parameters in the dedicated file:

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
    <td>The connector type to use for the connection. Here, the value must be `safyr-sap` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`input.folder	`</td>
    <td>The complete path to the folder containing files from the Silwood Safyr extraction</td>
  </tr>
  <tr>
    <td>`input.display_name`</td>
    <td>(Deprecated) To choose between the "Physical" and the "Logical" name of the objects</td>
  </tr>
  <tr>
    <td>`input.dataset_display_name`</td>
    <td>To choose between the "Physical" and the "Logical" name of datasets</td>
  </tr>
  <tr>
    <td>`input.field_display_name`</td>
    <td>To choose between the "Physical" and the "Logical" name of fields</td>
  </tr>
  <tr>
    <td>`input.flatten_attributes`</td>
    <td>Flatten the attribute's characteristics as new fields (`true` or `false`). Default value is `true`.</td>
  </tr>
  <tr>
    <td>`lineage`</td>
    <td>To activate the lineage feature for cubes and queries</td>
  </tr>
</table>

:::note 
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## Data Extraction

To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

## Collected Metadata

### Inventory

Will collect the list of objects accessible by the user.  

### Lineage

The connector is able to reconstruct the lineage of **cubes** referenced in **cubes** as well as the lineage representing the **cubes** that are used by the **queries**.

### Dataset

A dataset can be the following SAP BW object: Data Store Object, Advanced Data Store Object, HANA Composite Provider, Info Sources, Data Sources, Cube, Query, or HANA Calculation View. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Type
  * Metadata Changed
  * Physical Name
  * Logical Name

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field properties
* **Multivalued**: Depending on field properties
* **Primary key**: Depending on field properties
* **Technical Data**: 
  * Technical Name
  * Native type
  * Type: Unit, Measure, Dimension or Characteristic
  * Size
  * Data Element
  * Metadata Changed
  * Physical Name
  * Logical Name

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/asset type/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**asset type**: Asset type as defined by Safyr</li>
         <li>**dataset name**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/asset type/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**asset type**: Asset type as defined by Safyr</li>
         <li>**dataset name**</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Data Process</td>
     <td>code/reference/asset type/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**asset type**: Asset type as defined by Safyr</li>
         <li>**dataset name**: Dataset name that is linked</li>
       </ul>
     </td>
   </tr>
 </table>
 
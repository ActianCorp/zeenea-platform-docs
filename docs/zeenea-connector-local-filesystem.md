---
title: Local File System  
---

# Adding a Local File System Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection to a local file system.
* Zeenea traffic flows towards the data source must be open.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The local file system connector is compatible with every file system without an authentication process. 

## Installing the Plugin

From version 54 of the scanner, the local file system connector is presented as a plugin. 

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a local file system, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `local-filesystem` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`inventory.root`</td>
    <td>Path of the root directory to explore</td>
  </tr>
  <tr>
    <td colspan="2"> **Optional parameters for customizing dataset detection**</td>
  </tr>
  <tr>
    <td>`inventory.partition`</td>
    <td>Regex to identify partition folders</td>
  </tr>
  <tr>
    <td>`inventory.skippedDirectory`</td>
    <td>Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder. No folder is ignored by default.</td>
  </tr>
  <tr>
    <td>`inventory.ignoredDirectory`</td>
    <td>Regex on the name of the folders to ignore: their content will also be ignored. No folder is ignored by default.</td>
  </tr>
  <tr>
    <td>`inventory.ignoredFile`</td>
    <td>Regex in the name of the files to ignore, default value: `\..* | _.* | .*\.crc`</td>
  </tr>
  <tr>
    <td>`inventory.extension.csv`</td>
    <td>For CSV files detection. Default value: `csv, tsv, csv.gz, tsv.gz, csv.zip, tsv.zip`</td>
  </tr>
  <tr>
    <td>`inventory.extension.parquet`</td>
    <td>For Parquet files detection. Default value: `parquet`</td>
  </tr>
  <tr>
    <td>`inventory.extension.avro`</td>
    <td>For Avro files detection. Default value: `avro`</td>
  </tr>
  <tr>
    <td>`inventory.extension.orc`</td>
    <td>For Orc files detection. Default value: `orc`</td>
  </tr>
  <tr>
    <td>`inventory.extension.xml`</td>
    <td>For XML files detection. Default value: `xml, xml.gz, xml.zip`</td>
  </tr>
  <tr>
    <td>`inventory.extension.json`</td>
    <td>For JSON files detection. Default value: `json, json.gz, json.zip`</td>
  </tr>
  <tr>
    <td>`inventory.csv.header`</td>
    <td>Used for configuring csv files header detection pattern. Select `always` to force recognizing the schema on the first line of csv files. Possible values are: `never`, `always`, and `only` string.</td>
  </tr>
  <tr>
    <td>`xml.namespace_identification`</td>
    <td>Used for configuring XML fields identification. Value `uri`. **Note**: To keep the compatibility with a scanner previous to version 43, it is necessary to use the value `legacy` (default value).</td>
  </tr>
  <tr>
    <td>`xml.fields_ordering`</td>
    <td>
      <p>Starting from **version 67**.</p>
      <p>Allows ordering the list of retrieved fields.</p>
      <p>Possible values are:</p>
      <ul>
        <li>`alphabetical`: Fields are ordered alphabetically</li>
        <li>`""`, `legacy`, or `unordered`: Fields are ordered as they are read.</li>
      </ul>
    </td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read folders and files that need cataloging. 

## Data Extraction

A dataset from a file system may actually be stored in multiple files. Those files can themselves be stored in different folders (partitions). 

When running the inventory, the local file system connector detects datasets with the usual dataset naming convention in file systems. 

Read more: [Dataset Detection on File Systems](./zeenea-dataset-detection.md)

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible to the user.

## Dataset

* **Name**
* **Source Description**: not supported
* **Inputs datasets**
* **Output datasets**
* **Multivalued**: `false`
* **Primary Key**: Tags are considered to be part of the primary key.
* **Technical Data**:
  * File path
  * File Format
  * Created
  * Updated
  * Owner

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: not supported, `false` by default
* **Multivalued**: not supported, `false` by default
* **Primary Key**: not supported, `false` by default
* **Technical Data**:
  * Technical Name
  * Native type

## Unique Identifier Keys
 
 A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
 More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/path/dataset name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**path**: Full path</li>
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
         <li>**path**: Full path</li>
         <li>**dataset name**</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
 </table>
 
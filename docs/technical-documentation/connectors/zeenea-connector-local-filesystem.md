# Adding a Local File System Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection to a local file system.
* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The local file system connector is compatible with every file system without an authentication process. 

## Installing the Plugin

From version 54 of the scanner, the local file system connector is presented as a plugin. 

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with a local file system, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|-----------|----------------|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `local-filesystem` and this value must not be modified. |
| `inventory.root` | Path of the root directory to explore |
| **Optional parameters for customizing dataset detection** |  |
| `inventory.partition` | Regex to identify partition folders |
| `inventory.skippedDirectory` | Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder. No folder is ignored by default. |
| `inventory.ignoredDirectory` | Regex on the name of the folders to ignore: their content will also be ignored. No folder is ignored by default. |
| `inventory.ignoredFile` | Regex in the name of the files to ignore, default value: `\..* \| _.* \| .*\.crc` |
| `inventory.extension.csv` | For CSV files detection. Default value: `csv, tsv, csv.gz, tsv.gz, csv.zip, tsv.zip` |
| `inventory.extension.parquet` | For Parquet files detection. Default value: `parquet` |
| `inventory.extension.avro` | For Avro files detection. Default value: `avro` |
| `inventory.extension.orc` | For Orc files detection. Default value: `orc` |
| `inventory.extension.xml` | For XML files detection. Default value: `xml, xml.gz, xml.zip` |
| `inventory.extension.json` | For JSON files detection. Default value: `json, json.gz, json.zip` |
| `inventory.csv.header` | Used for configuring csv files header detection pattern. Select `always` to force recognizing the schema on the first line of csv files. Possible values are: `never`, `always`, and `only` string. |
| `xml.namespace_identification` | Used for configuring XML fields identification. Value `uri`. **Note**: To keep the compatibility with a scanner previous to version 43, it is necessary to use the value `legacy` (default value). |
| `xml.fields_ordering` | Starting from **version 67**.<br />Allows ordering the list of retrieved fields.<br />Possible values are:<br />- `alphabetical`: Fields are ordered alphabetically<br />- `""`, `legacy`, or `unordered`: Fields are ordered as they are read. |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read folders and files that need cataloging. 

## Data Extraction

A dataset from a file system may actually be stored in multiple files. Those files can themselves be stored in different folders (partitions). 

When running the inventory, the local file system connector detects datasets with the usual dataset naming convention in file systems. 

Read more: [Dataset Detection on File Systems](../New_files/zeenea-dataset-detection.md)

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
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object   | Identifier Key                     | Description |
|----------|------------------------------------|-------------|
| Dataset  | code/path/dataset name             | - **code**: Unique identifier of the connection noted in the configuration file<br />- **path**: Full path<br />- **dataset name** |
| Field    | code/path/dataset name/field name  | - **code**: Unique identifier of the connection noted in the configuration file<br />- **path**: Full path<br />- **dataset name**<br />- **field name** |
 
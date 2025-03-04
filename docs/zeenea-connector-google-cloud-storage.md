---
title: Google Cloud Storage
---

# Adding a Google Cloud Storage Connection

## Prerequisites

* In order to establish a connection to Google Cloud Storage, a user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flow towards Google Cloud Storage must be open. 

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The connector was successfully tested with the cloud-based application.

## Installing the Plugin

From version 54 of the scanner, the Google Cloud Storage connector is presented as a plugin. 

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Google Cloud Storage, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `GCPCloudStorage` and this value must not be modified. | 
| `connection.project_id` | Project Identifier |
| `connection.json_key` | Project JSON access key |

#### Optional parameters for customizing dataset detection

| Parameter| Expected Value |
| :--- | :--- |
| `inventory.partition` | Regex to identify partition folders |
| `inventory.skippedDirectory` | Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder. No folder is ignored by default. |
| `inventory.ignoredDirectory` | Regex on the name of the folders to ignore: their content will also be ignored. No folder is ignored by default. |
| `inventory.ignoredFile` | Regex in the name of the files to ignore. Default value: `"\\..* \| _.* \| .*\\.crc"` |
| `inventory.extension.csv` | For CSV files detection. Default value: `"csv, tsv, csv.gz, tsv.gz, csv.zip, tsv.zip"`. |
| `inventory.extension.parquet` |	For Parquet files detection. Default value: `parquet`. |
| `inventory.extension.avro` | For Avro files detection. Default value: `avro`. |
| `inventory.extension.orc` | For Orc files detection. Default value: `orc`. |
| `inventory.extension.xml` | For Xml files detection./ Default value: `"xml, xml.gz, xml.zip"`. |
| `inventory.extension.json` | For Json files detection. Default value: `"json, json.gz, json.zip"`. |
| `inventory.csv.header` | Used for configuring csv files header detection pattern. Select `always` to force recognizing the schema on the first line of csv files.<br /><br />Possible values are: `never`, `always`, and `only string`. |
| `xml.namespace_identification` | Used for configuring XML fields identification. Use the value `uri` except when you need to keep the compatibility with a scanner previous to version 43, in which case it is necessary to use the value `legacy` (default value). |
| `xml.fields_ordering	` |<p> **Starting from version 67.**</p><p>Allows ordering the list of retrieved fields.</p><p>Possible values are:</p><ul><li>`alphabetical`: Fields are ordered alphabetically</li><li>`""`, `legacy`, or `unordered`: Fields are ordered as they are read.</li></ul> |
| `filter` | To filter datasets during the inventory. |

## User Permissions

In order to collect metadata, the user permissions must allow them to list and read all sources that need to be cataloged. 

## Rich Filters

Since version 54 of the scanner, the Google Cloud Storage connector benefits from the feature of rich filters in the configuration of the connector. The available keys to filter objects during the inventory are:

* bucket: name of the bucket
* key: name of the object

Read more: [Filters](zeenea-filters.md)

## Data Extraction

There is a specific set of rules that the connector must follow to rebuild hierarchy and datasets, in order to extract data.

Read more: [Dataset Detection on File Systems](./zeenea-dataset-detection.md)

## Collected Metadata

### Inventory

The inventory collects all data sources that the user can access. 

## Dataset

A dataset is a data source that has been identified as such, as per the rules of the connector. 



* **Name**
* **Source Description**
* **Technical Data**:
  * Bucket: Source bucket
  * File format
  * File location

## Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings (`ORC` and `parquet`). Default value `No`.
* **Multivalued**: Depending on the field settings (`ORC` and `parquet`). Default value `No`.
* **Primary Key**: Not supported. Default value `No`.
* **Technical Data**:
  * Technical Name: Field technical name
  * Native type: Field native type
 
## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/path/dataset name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**path**: Full path including project id</li>
        <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/path/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**path**: Full path including project id</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

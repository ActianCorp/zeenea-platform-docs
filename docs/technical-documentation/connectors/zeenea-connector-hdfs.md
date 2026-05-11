# Adding an HDFS Connection

## Prerequisites

To catalog datasets stored in a Hadoop cluster, Zeenea must be installed in a Hadoop Edge Node type server, with the following characteristics: 

* Access to HDFS from native APIs
* Access to Hive Server 2
* Hadoop Client (HDFS command, Yarn, ...) and Hadoop Client configuration (core-site.xml, hdfs-site.xml, ...) on the server

If the server is secured by the Kerberos protocol, a Keytab for Zeenea will have to be generated. The owner of the Keytab must also have read permissions on HDFS directories and files, along with the Hive tables that need to be documented. 

Because of its type (Hadoop Edge Node), the server is either on the same network as the Hadoop cluster, or it has access to HDFS, Hive Server and technical services such as Kerberos through traffic flows. 

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| HDFS NameNode | IPC | 8020 / 9000 |
| HDFS DataNode | IPC | 50020 |
| Hive Server | TCP / HTTP | 10000 |

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The HDFS connector supports versions included in the following distributions: 

* CDH-5
* CDH-6
* CDP

## Installing the Plugin

From version 54 of the scanner, the HDFS connector is presented as a plugin. It can be downloaded here according to your Hadoop cluster version.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with HDFS, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `Hdfs` and this value must not be modified. |
| `connection.hadoop_conf_dir` | Location of the HDFS Client configuration file |
| `connection.principal` | Username |
| `connection.keytab` | Kerberos Keytab authentication file |
| `inventory.root` | HDFS Path from which datasets detection must begin |
| **Optional parameters for customizing dataset detection** | |
| `inventory.partition` | Regex to identify partition folders |
| `inventory.skippedDirectory ` | Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder. No folder is ignored by default. |
| `inventory.ignoredDirectory` | Regex on the name of the folders to ignore: their content will also be ignored. No folder is ignored by default. |
| `inventory.ignoredFile` | Regex in the name of the files to ignore. Default value: `\..* \| _.* \| .*\.crc` |
| `inventory.extension.csv` | For CSV files detection. Default value: `csv, tsv, csv.gz, tsv.gz, csv.zip, tsv.zip`. |
| `inventory.extension.parquet` | For Parquet files detection. Default value: `parquet`. |
| `inventory.extension.avro` | For Avro files detection. Default value: `avro`. |
| `inventory.extension.orc` | For Orc files detection. Default value: `orc`. |
| `inventory.extension.xml` | For XML files detection. Default value: `xml, xml.gz, xml.zip`. |
| `inventory.extension.json` | For JSON files detection. Default value: `json, json.gz, json.zip`. |
| `inventory.csv.header` | Used for configuring csv files header detection pattern. Select `always` to force recognizing the schema on the first line of csv files. Possible values are: `never`, `always` and `only string`. |
| `xml.namespace_identification` | Used for configuring XML fields identification. Value `uri` to use except to keep the compatibility with a scanner previous to version 43, it is necessary to use the value `legacy` (default value). |
| `xml.fields_ordering` | **Starting from version 67.** <br/>Allows ordering the list of retrieved fields. <br/>Possible values are: `alphabetical`: Fields are ordered alphabetically `""`, `legacy` or `unordered`: Fields are ordered as they are read |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read directories and files that need cataloging. 

## Data Extraction

Datasets are often stored on a file system that is itself dispatched over multiple other files. Those files can be split over multiple folders as well. 

When doing an inventory, the HDFS connector detects datasets by following the usual datasets organization conventions in HDFS.

Read more: [Dataset Detection on File Systems](../New_files/zeenea-dataset-detection.md)

## Collected Metadata

### Inventory

The inventory collects the list of datasets that the running user can access. This is done through the procedure described in the above section. 

### Dataset

A dataset is defined by the dataset definition algorithm. 

* **Name**
* **Source Description**: Not supported. Default value `Empty`.
* **Technical Data**:
  * File format: source file format
  * File path: source file path

### Fields

* **Name**
* **Source Description**: Not supported. *Empty* by default.
* **Type**
* **Can be null**: Depending on the field settings (`ORC` and `parquet`). No by default.
* **Multivalued**: Depending on the field settings (`ORC` and `parquet`). No by default.
* **Primary Key**:  Not supported. No by default.
* **Technical Data**:
  * Technical Name
  * Native type: Field native type

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/path/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Full path<br/>- **dataset name** |
| Field | code/path/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Full path<br/>- **dataset name**<br/>- **field name** |

---
title: Amazon S3
---

# Adding an Amazon S3 Connection

In order to establish a connection with Amazon S3, a user with sufficient [permissions](#user-permissions) is required. 

Zeenea traffic flows towards the database must be opened.

There are two ways to authenticate the Zeenea Agent on S3:

* Either the Agent's host server has sufficient credentials to connect to S3 (recommended way); in this case, available authentication methods are: 
  * Instance Role
  * Environment Variable
  * Configuration File
* Or, the API Keys are managed by Zeenea, in that case the keys need to be entered in the connection configuration file.

Traffic flows toward S3 must be open. 

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| AWS S3 | HTTPS | 443 |

:::note
A configuration template can be downloaded here: [AmazonS3.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUfZD&d=%2Fa%2FNu000002lh5B%2F55oDUFtXL.KM_Eh3ZNHNwnI3AERAnuFHfsgLQ.tZu5o&asPdf=false).
:::
 
## Supported Versions

The S3 connector was successfully tested with the online application.

## Installing the Plugin

From version 54 of the scanner, the S3 connector is presented as a plugin and can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).
 
## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with Amazon S3, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `AmazonS3` and this value must not be modified. |
| `connection.aws.access_key_id` | Amazon S3 Access Key Identifier |
| `connection.aws.secret_access_key` | Amazon S3 Secret Access Key |
| `s3.bucket_list` | The list of buckets to be explored. The separator is space (" ").<br />If this setting is left empty, the connector will explore all buckets accessible by the user. |
| `connection.url` | Include this setting if you wish to use an S3 instance other than Amazon's. |
| `proxy.endpoint` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

#### Optional parameters for customizing dataset detection

| Parameter| Expected Value |
| :--- | :--- |
| `inventory.partition` | Regex to identify partition folders. |
| `inventory.skippedDirectory` | Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder.<br />No folder is ignored by default. |
| `inventory.ignoredDirectory` | Regex on the name of the folders to ignore: their content will also be ignored.<br />No folder is ignored by default. |
| `inventory.ignoredFile` | Regex in the name of the files to ignore. Default value: `\..* \| _.* \| .*\.crc` |
| `inventory.extension.csv` | For CSV files detection, default value: `csv`, `tsv`, `csv.gz`, `tsv.gz`, `csv.zip`, `tsv.zip` |
| `inventory.extension.parquet` | For Parquet files detection, default value: `parquet` |
| `inventory.extension.avro` | For Avro files detection, default value: `avro` |
| `inventory.extension.orc` | For Orc files detection, default value: `orc` |
| `inventory.extension.xml` | For Xml files detection, default value: `xml, xml.gz, xml.zip` |
| `inventory.extension.json` | For Json files detection, default value: `json, json.gz, json.zip` |
| `inventory.csv.header` | Used for configuring csv files header detection pattern. Select "always" to force recognizing the schema on the first line of csv files. Possible values are: `never`, `always` and `only string`. |
| `cache.path` | When inventoried buckets are very large and contain a lot of objects, the connector can consume a large amount of memory. It is possible to cache the objects list on disk to reduce memory consumption.<br />To enable disk cache, just set the path to a file. (You can both set an absolute or a relative path, however, relative paths are dependant of the current directory at the scanner launch time).<br /><br />Examples:<br /><br />`"/opt/zeenea-scanner/cache/s3.cache"`<br />`"/var/lib/zeenea-scanner/s3.cache"`<br />`"""C:\zeenea-scanner\cache\s3.cache"""`<br/><br />**NOTE: When dealing with multiple S3 connections, pay attention to configure different cache files for each of your connections in order to avoid conflicts.** |
| `xml.namespace_identification` | Used for configuring XML fields identification. Value `uri` to use except to keep the compatibility with a scanner previous to version 43, it is necessary to use the value `legacy` (default value). |
| `xml.fields_ordering` | **Starting from version 67**.<br /><br />Allows ordering the list of retrieved fields.<br /><br />Possible values are:<ul><li>`alphabetical`: Fields are ordered alphabetically</li><li>`""`, `legacy`, or `unordered`. Fields are ordered as they are read.</li></ul> |
| `filter` | To filter datasets during the inventory. See [Rich Filters](#rich-filters) |

## User Permissions

In order to collect metadata, the user must be able to list and read all datasets that need to be cataloged. 

### Roles

The user must be able to run the following actions on the target bucket and the objects it contains: 

* `s3:GetObject`
* `s3:ListBucket`
* `s3:GetBucketLocation`
 
The user must also be able to run the `s3:ListAllMyBuckets` action on all resources. 

In the following examples, the user is cataloging the `zeenea-test-data` bucket:

* Directly from the Amazon S3 interface:  

  <font color="red">Broken image in Community docs.</font>

* In JSON:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject",
                    "s3:ListBucket",
                    "s3:GetBucketLocation"
                ],
                "Resource": [
                    "arn:aws:s3:::zeenea-test-data",
                    "arn:aws:s3:::zeenea-test-data/*"
                ]
            },
            {
                "Sid": "VisualEditor1",
                "Effect": "Allow",
                "Action": [
                    "s3:ListAllMyBuckets"
                ],
                "Resource": "*"
            }
        ]
    }
    ``` 
 
## Rich Filters

Since version 54 of the scanner, the S3 connector benefits from the feature of rich filters in the configuration of the connector. The available keys to filter objects during the inventory are:

* `bucket`: name of the bucket
* `key`: name of the object

Read more: [Filters](zeenea-filters.md)
 
## Data Extraction

A dataset from a file system may actually be stored in multiple files. Those files can themselves be stored in different folders (partitions). 

When running the inventory, the Amazon S3 connector detects datasets with the usual dataset naming convention in Amazon S3.

Read more: [Dataset Detection on File Systems](./zeenea-dataset-detection.md)
 
## Collected Metadata

### Inventory

The inventory collects all datasets accessible by the user through the method described above. 

## Datasets

A dataset is defined by the Dataset Definition Algorithm. 

* **Name**
* **Source Description**: Not supported, `NULL` by default
* **Technical Data**: 
  * Bucket: Data Source bucket
  * File Format: Source File Format
  * File Location: Source File Location
 
## Field

Dataset field. 

* **Name**
* **Source Description**: Not supported, `NULL` by default.
* **Type**
* **Can be null**: Depending on the field settings (`ORC` and `parquet`). Default value `No`.
* **Multivalued**: Depending on the field settings (`ORC` and `parquet`). Default value `No`.
* **Primary Key**: Not supported. Default value `No`.
* **Technical Data**: 
  * Technical Name: field technical name
  * Native type: field native type
 
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
        <li>**path**: Full path including the bucket</li>
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
        <li>**path**: Full path including the bucket</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

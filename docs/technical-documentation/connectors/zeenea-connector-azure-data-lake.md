# Adding an Azure Data Lake Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Azure Data Lake. 
* Zeenea traffic flows towards the Data Lake must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Azure connection can be set up towards ADLS Gen 2. To choose the appropriate connector, you must select ADSLGen2 in the corresponding list. 

## Installing the Plugin

Starting with scanner version 54, the ADLS connector is provided as a plugin.

You can download the Azure plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md) and requires a scanner version 64 or later.

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md).

To establish a connection with an Azure Gen 2 cluster, fill in the following parameters in the dedicated configuration file:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | Specifies the display name for the connection. | 
| `code` | Specifies the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | Specifies the type of connector to be used for the connection. The value must be `ADLSGen2` and must not be modified. | 
| `enabled` | Specifies whether to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Specifies the catalog code associated with the connection (`default` when empty). |
| `alias` | Specifies the list of aliases used by other connectors to generate lineage link. <br />For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | Specifies whether to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`. |
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.account_name` | Specifies the ADLS account name. |
| `connection.account_key` | Specifies the account Key. It can be retrieved in the Access Key section of the Azure menu. |
| `connection.container_name` | Specifies the list of containers to browse, separated by spaces. |
| `connection.oauth.tenant_id` | Specifies the tenant ID as defined in Azure. |
| `connection.oauth.client_id` | Specifies the application ID (client) as defined in Azure. |
| `connection.oauth.client_secret` | Specifies the client secret. |
| `filter` | Specifies the filter used to include or exclude datasets during inventory. See [Rich Filters](#rich-filters). |

### Optional parameters for customizing dataset detection

| Parameter| Expected Value |
| :--- | :--- |
| `inventory.partition` | Regex to identify partition folders. |
| `inventory.skippedDirectory` | Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder. No folder is ignored by default. |
| `inventory.ignoredDirectory` | Regex on the name of the folders to ignore: their content will also be ignored. No folder is ignored by default. |
| `inventory.ignoredFile` | Regex in the name of the files to ignore. <br />Default value: `"\..* \| _.* \| .*\\.crc"` | 
| `inventory.extension.csv` | For CSV files detection. <br />Default value: `"csv, tsv, csv.gz, tsv.gz, csv.zip, tsv.zip"` |
| `inventory.extension.parquet` | For Parquet files detection. <br />Default value: `parquet`. |
| `inventory.extension.avro` | For Avro files detection. <br />Default value: `avro`. |
| `inventory.extension.orc` | For Orc files detection. <br />Default value: `orc`. |
| `inventory.extension.xml` | For Xml files detection. <br />Default value: `xml, xml.gz, xml.zip`. |
| `inventory.extension.json` | For Json files detection. <br />Default value: `json, json.gz, json.zip`. |
| `inventory.csv.header` | Used for configuring csv files header detection pattern. Use `always` to force recognizing the schema on the first line of csv files. Possible values are: `never`, `always`, and `only string`. |
| `xml.namespace_identification` | Used for configuring XML fields identification. Use `uri`, except to keep the compatibility with a scanner previous to version 43, where it is necessary to use the value `legacy` (default value). |
| `xml.fields_ordering` | Starting from version 67.<br />Allows ordering the list of retrieved fields.<br />Possible values are: <ul><li>`alphabetical`: Fields are ordered alphabetically</li><li>`""`, `legacy` or `unordered`: Fields are ordered as they are read.</li></ul> |
 
## User Permissions

To collect metadata, the running user's permissions must allow them to access and read reports that need cataloging.

There is no specific authorization to be configured for Azure Gen 2. The connector uses the key and the string connection specified for the data lake.

## Rich Filters

Since version 54 of the scanner, the ADLS connector benefits from the feature of rich filters in the configuration of the connector. You can use the following keys to filter objects during inventory:

  * `container`: The name of the container.
  * `path`: The path of the file in the container.

Paths don't start with slashes for all file systems for consistency reasons between connectors. (The choice was made based on S3 choice where the slash has no specific meaning and is only a convention).

So to excludes items in a folder `test` at any level you have to write:

`not (path starts with 'test/' or path contains '/test/')`
 
or with a regex (slashes in regex must be escaped):

`not path ~ /(^|.*\/)test\/.*/`
 
For more information about filters, see [Filters](../scanners/zeenea-filters.md).
 
## Data Extraction

To extract data, the connector needs to follow specified rules in order to rebuild the hierarchy and the datasets.

For more information, see [Dataset Detection on File Systems](./zeenea-dataset-detection.md).
 
## Collected Metadata

### Inventory

The Inventory collects the list of reports along with any related data source that the user can access. 

### Datasets

A dataset is identified according to the connector's rules.

* **Name**
* **Source Description**: Not supported
* **Technical Data**: 
  * File Format
  * File Path

### Fields

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings (`ORC` and `parquet`). Default value `No`.
* **Multivalued**: Depending on the field settings (`ORC` and `parquet`). Default value `No`.
* **Primary Key**: Not supported. Default value `No`.
* **Technical Data**: 
  * Technical Name: Field technical name
  * Native type: Field native type
 
## Unique Identifier Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/path/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Full path including the container name<br/>- **dataset name** |
| Field | code/path/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Full path including the container name<br/>- **dataset name**<br/>- **field name** |

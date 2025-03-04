---
title: Azure Data Lake
---

# Adding an Azure Data Lake Connection


## Prerequisites

* To connect to an Azure data lake, a user with sufficient [permissions](#user-permissions) is required. 
* Zeenea traffic flows towards the Data Lake must be open. 

:::note
Configuration templates for ADLSGen1 and ADLSGen2 can be downloaded here: 
* [ADLSGen1.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUeja&d=%2Fa%2FNu000002lggz%2FASw0YFvXoykgjjzSOb5IfDgLJuczaIxGUVQ666rzLeU&asPdf=false)
* [ADLSGen2.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUfZC&d=%2Fa%2FNu000002lgib%2Fp2E.6CmbtrtzL8Jz6QG0nxuK68fWn4ZnPM7Q738rZ.Q&asPdf=false)
:::

## Supported Versions

The Azure connection can be set up towards two generations of Data Lakes. To choose the appropriate connector, you must select ADSLGen1 or ADSLGen2 in the corresponding list. 

As for the rest of the form, please follow the instructions below.

## Installing the Plugin

From version 54 of the scanner, the ADLS connector is presented as a plugin. 

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)

### Azure Gen 1

In order to establish a connection with an Azure Gen 1 cluster, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `ADLSGen1` and this value must not be modified. | 
| `connection.account_fqdn` | Fully Qualified Domain Name (FQDN) of the Azure Data Lake Store account |
| `connection.oauth.client_id` | Application ID |
| `connection.oauth.endpoint` | Endpoint obtained from the configuration menu of your Azure account.<br /><br />**Azure Active Directory** > **App Registration** > **Endpoints** > **OAuth 2.0 token endpoint (v1)**<br /><br />Example: `https://login.microsoftonline.com/c802e70e-9ed0-11ec-9163-00155d15055c/oauth2/token` |
| `connection.oauth.client_secret` | Client secret |
| `filter` | To filter datasets during the inventory. See [Rich Filters](#rich-filters). |

### Azure Gen 2

In order to establish a connection with an Azure Gen 2 cluster, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `ADLSGen2` and this value must not be modified. | 
| `connection.account_name` | Account name |
| `connection.account_key` | Account Key; can be retrieved in the Access Key section of the Azure menu |
| `connection.container_name` | List of containers to browse, separated by spaces |
| `connection.oauth.tenant_id` |Tenant ID as defined in Azure |
| `connection.oauth.client_id` | Application ID (client) as defined in Azure |
| `connection.oauth.client_secret` | Client secret |
| `filter` | To filter datasets during the inventory |

### Optional parameters for customizing dataset detection

| Parameter| Expected Value |
| :--- | :--- |
| `inventory.partition` | Regex to identify partition folders |
| `inventory.skippedDirectory` | Regex on the name of the folders to ignore while keeping the content taken into account. The content will be scanned as if it were at the root of the parent folder. No folder is ignored by default. |
| `inventory.ignoredDirectory` | Regex on the name of the folders to ignore: their content will also be ignored. No folder is ignored by default. |
| `inventory.ignoredFile` | Regex in the name of the files to ignore. Default value: `"\..* \| _.* \| .*\\.crc"` | 
| `inventory.extension.csv` | For CSV files detection. Default value: `"csv, tsv, csv.gz, tsv.gz, csv.zip, tsv.zip"` |
| `inventory.extension.parquet` | For Parquet files detection. Default value: `parquet`. |
| `inventory.extension.avro` | For Avro files detection. Default value: `avro`. |
| `inventory.extension.orc` | For Orc files detection. Default value: `orc`. |
| `inventory.extension.xml` | For Xml files detection. Default value: `xml, xml.gz, xml.zip`. |
| `inventory.extension.json` | For Json files detection. Default value: `json, json.gz, json.zip`. |
| `inventory.csv.header` | Used for configuring csv files header detection pattern. Use `always` to force recognizing the schema on the first line of csv files. Possible values are: `never`, `always`, and `only string`. |
| `xml.namespace_identification` | Used for configuring XML fields identification. Use `uri`, except to keep the compatibility with a scanner previous to version 43, where it is necessary to use the value `legacy` (default value). |
| `xml.fields_ordering` | Starting from version 67.<br />Allows ordering the list of retrieved fields.<br />Possible values are: <ul><li>`alphabetical`: Fields are ordered alphabetically</li><li>`""`, `legacy` or `unordered`: Fields are ordered as they are read.</li></ul> |
 

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read reports that need cataloging.

* **Azure Gen 1**: the service principal must have the authorization to "Read and Execute" defined in the App registration.
* **Azure Gen 2**: there is no specific authorization to be configured. The connector uses the key and the string connection specified for the data lake.

# Rich Filters

Since version 54 of the scanner, the ADLS connector benefits from the feature of rich filters in the configuration of the connector. The available keys to filter objects during the inventory are:

* **ADLS Gen 1**:
  * path: the path of the file.
* **ADLS Gen 2**:
  * container: the name of the container
  * path: the path of the file in the container.

Paths don't start with slashes for all file systems for consistency reasons between connectors. (The choice was made based on S3 choice where the slash has no specific meaning and is only a convention).

So to excludes items in a folder `test` at any level you have to write:

`not (path starts with 'test/' or path contains '/test/')`
 
or with a regex (slashes in regex must be escaped):

`not path ~ /(^|.*\/)test\/.*/`
 
Read more: [Filters](zeenea-filters.md)
 
## Data Extraction

To extract data, the connector needs to follow specified rules in order to rebuild the hierarchy and the datasets.

Read more: [Dataset Detection on File Systems](./zeenea-dataset-detection.md)
 
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

## Fields

* **Name**
* **Source Description**
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
        <li>**path**: Full path including the container name</li>
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
        <li>**path**: Full path including the container name</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

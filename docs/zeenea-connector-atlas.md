---
title: Atlas
---

# Adding an Atlas Connection

## Prerequisites

* In order to establish a connection to an Atlas data catalog, the user must have sufficient permissions.
* Zeenea traffic flows towards Atlas must be open. 

:::note
A configuration template can be downloaded here: [Atlas.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUYpU&d=%2Fa%2FNu000002le0s%2FXS5fr1f84X2DJW_pzGZqH_y_pZbJIhZvOEYX1qPaTmY&asPdf=false)
:::

## Supported Versions

This connector may be used on an Atlas catalog linked through its v2 API to a Hadoop cluster.

## Installing the Plugin

Since scanner version 26.0, the Atlas plugin can be downloaded here: Connectors: download links

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Atlas, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `Atlas` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>URL used to connect to the application</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Atlas user used to log into Zeenea. Must have sufficient permissions</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`connection.authentication_scheme`</td>
    <td>Method to be used for authentication with the Atlas server. Possible values: `Basic`, `Digest`, `Ntlm`, `Spnego`, `Kerberos`. Default value: `Basic`.</td>
  </tr>
</table>

Some additional settings, dedicated to improving performance, are available in the Atlas connector configuration file.

Finally, the connector can be configured to filter items (by type) during inventory and import. Without specific configuration, all items are taken into account. Both parameters must have as their value a list of types, separated by a comma, between double-quotes. Example: `"hdfs_path, sqoop_process, sqoop_dbdatastore"`.

The available types are listed below:

* `inventoried types`
* `hive_process`
* `spark_process`
* `sqoop_process`
* `sqoop_dbdatastore`

| Parameter | Value	|
| :--- | :--- |
| `filter.atlas_type.includes` | Inclusion list. All types included if not defined. |
| `filter.atlas_type.excludes` | Exclusion list. No exclusion if not defined. |

## Extracting Metadata

In order to gather metadata from Atlas, the connector first references **datasets** and **fields**, but it will also retrieve the Data Process used in Atlas to build a Dataset. This allows Zeenea to build the entirety of the **process**, and the lineage.

:::note[IMPORTANT]
The Atlas connector behavior is very specific, and must be taken into account when deploying the connector. When a dataset is imported or updated, the connector will also import: 

1. The selected Dataset
2. Any Data Process of which the selected dataset is an output
3. Any Data Process of which the selected Dataset is an input

Note that, in the case of updates, they are by default scheduled to be done daily.
:::

## Collected Metadata

### Inventory

The inventory collects the list of data sources that the user can access. 

### Dataset

The Datasets are data sources. 

* **Name**
* **Source Description**
* **Technical Data**:
  * GUID: Atlas technical id
  * Qualified Name: Atlas technical name
  * Created: creation date
  * Created By
  * Data Source Type: Data source type
  * Owner
  * Updated: date of last update
  * Updated By
  * Database: optional
  * Table: optional
  * Display Name: optional

### Field

* **Name**
* **Source Description**
* **Type**
* **Can be null**: `false` (default)
* **Multivalued**: `true` when the field represents a table, `false` otherwise
* **Primary Key**:  `false` (default)
* **Technical Metadata**: none

### Data Process

All documented lineages in Atlas. 

* **Name**
* **Input**: Datasets in input
* **Output**: Datasets in output

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identification Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/type/dataset identifier</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**type**: Object type, possible values: `hbase_table`, `hdfs_path`, `hive_table`</li>
      <li>**dataset identifier**: Atlas attribute `qualifiedName`</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/type/dataset identifier/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**type**: Object type, possible values: `hbase_table`, `hdfs_path`, `hive_table`</li>
      <li>**dataset identifier**: Atlas attribute `qualifiedName`</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Data process</td>
    <td>code/type/data process identifier</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**type**: Object type, possible values: `hive_process`, `spark_process`, `sqoop_process`</li>
        <li>**data process identifier**: Technical data process identifier calculated from data process outputs</li>
      </ul>
    </td>
  </tr>
</table>

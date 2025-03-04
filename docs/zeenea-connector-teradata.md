---
title: Teradata
---

# Adding a Teradata Connection

## Prerequisites

* In order to establish a connection with Teradata, a user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards the database must be opened.  

:::note[IMPORTANT]
**The Teradata driver is not delivered with the connector with scanner version 34 and later**. Download the Teradata driver related to your Teradata instance and move it into the `/lib-ext` folder of your scanner. You will find the driver into sources provided by the editor on their website: https://downloads.teradata.com/download/connectivity/jdbc-driver.
:::

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Teradata connector is compatible with Teradata version 16. Data profiling feature is available since scanner version 33. 

## Installing the Plugin

From version 54 of the scanner, the Teradata connector is presented as a plugin.

It requires a scanner version 66 and can be downloaded here: [https://plugins.zeenea.app/jdbc-connector-plugin/jdbc-connector-plugin-66.zip](https://plugins.zeenea.app/jdbc-connector-plugin/jdbc-connector-plugin-66.zip).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Teradata, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `Teradata` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address. It is possible to add specific parameters through URL.<br /><br />Example : `jdbc:teradata://localhost/CHARSET=UTF8,LOG=...`</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`inventory.primary_keys`</td>
    <td>Retrieve Primary Indexes as Primary key if the parameter set to `primary_index`. Default value is `primary_key`.</td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter datasets during the inventory. See [Rich Filters](#rich-filters).</td>
  </tr>
  <tr>
    <td>`roles`</td>
    <td>To filter the "Roles" metadata. See [Rich Filters](#rich-filters).</td>
  </tr>
  <tr>
    <td>`extract.dbc.use_qvci`</td>
    <td>
      <p>Define which DBC view will be used to extract columns metadata.</p>
      <ul>
        <li>`use_qvci = "false": DBC.ColumnsV` (default value, table's columns metadata only)</li>
        <li>`use_qvci = "true": DBC.ColumnsQV` (table's and view's columns metadata).</li>
      </ul>
      <p>Before setting `use_qvci` flag to `true`, you must activate QVCI (Queryable Column Information on Views) feature on the Teradata platform.</p>
    </td>
  </tr>
  <tr>
    <td>`cache.enabled`</td>
    <td>Enable the cache functionality. When the cache is activated, the schema update performs four queries in total instead of four per imported table. The result is greater efficiency.</td>
  </tr>
  <tr>
    <td>`cache.folder`</td>
    <td>The size of the cache file produced depends on the number of tables in the database (and not on the number of tables imported into Zeenea). If the folder is not specified, the cache is stored in memory.</td>
  </tr>
  <tr>
    <td>`cache.ttl`</td>
    <td>Cache validity period (default `12h`). As long as the cache is valid, requests that fill it are not executed.</td>
  </tr>
</table>

:::note
In order to read data with the desired encoding CHARSET, you have to add "CHARSET=" parameter to the JDBC URL.
Here is an exhaustive list of all encoding types :
https://teradata-docs.s3.amazonaws.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#URL_CHARSET
:::

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user must have read-only access to databases that need to be cataloged.

If the data profiling feature was enabled, the user must have read access on impacted tables. Otherwise, this permission is not necessary.

## Rich Filters

Since version 47 of the scanner, the Teradata connector benefits from the feature of rich filters in the configuration of the connector. The keys that can be used to filter the elements are the standard ones for JDBC (`schema`, `table`) but also on the `type` of the table.

This functionality also applies to the Roles metadata of the datasets from the `roles` parameters to be completed with the `role` key. Example: `roles = "role in ('role1', 'role2')"`.

Read more: [Filters](zeenea-filters.md)


| Criteria | Description |
| :--- | :--- |
| schema | Schema name |
| table | Table or view name |
| type | Objects type<br /><br />See all table types here: https://docs.teradata.com/r/Teradata-VantageTM-Data-Dictionary/March-2019/View-Column-Values/TableKind-Column |
| roles | Role datasets metadata |

## Data Extraction

To extract the information, the connector will perform queries, depending on the scanner version, on the dbc.tables, dbc.columns and dbc.databases tables for versions less than or equal to 42 or on the `DBC.TablesV`, `DBC.ColumnsV` (or `DBC.ColumnsQV` if the QVCI functionality is active) and `DBC.DatabasesV` tables for versions greater than or equal to 44.

## Collected Metadata

### Inventory

The inventory collects all data accessible by the user. 

### Dataset

Here, a dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Schema
  * Table
  * Last Alter Time
  * Type
  * Roles

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on field settings
* **Technical Data**:
  * Technical Name: field technical name
  * Native type: field native type
  * Field Size

## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).
 
Read access on targeted tables is mandatory to activate the feature. For Teradata technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table `tableName`.

``` 
SELECT
   field1, field2
   FROM tableName
   SAMPLE (linesPercentage)
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identification Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/schema/dataset name</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**schema**: Dataset schema</li>
      <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/schema/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**schema**: Dataset schema</li>
      <li>**dataset name**</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

---
title: AWS Redshift
---

# Adding a Redshift Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Redshift.
* Zeenea traffic flows towards Redshift must be open.
* In order to catalog datasets stored on Redshift, Zeenea uses the JDBC API to extract metadata. The flow toward the Redshift server must be open.

| Target| Protocol | Usual Ports |
| :--- | :--- | :--- |
| AWS Redshift | JDBC | 5439 |

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::
 
## Supported Versions

The Redshift connector is compatible with all versions supported by Amazon. 

## Installing the Plugin

From version 54 of the scanner, the Redshift connector is presented as a plugin.

It can downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Redshift, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `AWSRedshift` and this value must not be modified. | 
| `connection.url` | AWS Redshift server address (example: `jdbc:redshift://redshift.example.com:5439/database`) | 
| `connection.username` | Username| 
| `connection.password` | User password | 
| `lineage.view.enabled` | To activate the lineage feature. Default value `false`. | 
| `filter` | To filter datasets during the inventory.See [Rich Filters](#rich-filters). |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

 Here, the user must have read access to objects from the `pg_catalog schema`.

 To catalog externals tables (Spectrum), the user must have additional rights on them. You can provide those rights to all tables of the external schema (named here `spectrum_schema_example`) through both requests below:

`grant usage on schema spectrum_schema_example to user;`

`grant select on all tables in schema spectrum_schema_example to user;`

If the data profiling feature was enabled, the user must have read access to impacted tables. Otherwise, this permission is not necessary.
 
## Rich filters

Since version 47 of the scanner, the Redshift connector benefits from the feature of rich filters in the configuration of the connector. This functionality also applies if on the metadata "Roles" of the datasets.

Read more: [Filters](zeenea-filters.md)

## Data Extraction

To extract information, the connector runs requests on views from the `pg_catalog schema`.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.

### Lineage

From version 54 of the scanner, the connector has the lineage feature on the views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**: 
  * Catalog
  * Schema
  * Table
  * Type:
  * table
  * view
  * materialized view
  * index
  * sequence
  * foreign table
  * TOAST table
  * composite type
  * partitioned table
  * partitioned index
 
### Field
Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings
* **Multivalued**: not supported, `FALSE` by default
* **Primary Key**: depending on the field "Primary Key" attribute
* **Technical Data**: 
  * Technical Name
  * Native type

### Data Process
A data process represents the request to build a view.

* **Name**: `CREATEVIEW view-name`
 
## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).
 
Read access on targeted tables is mandatory to activate the feature. For AWS Redshift technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table `tableName`.

``` 
SELECT
   field1, field2
   FROM tableName
   ORDER BY RANDOM() LIMIT 10000
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit of collected rows is 10.000.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
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
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**schema**: Dataset schema</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Data process</td>
    <td>code/view/schema/dataset name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**schema**: Dataset schema</li>
        <li>**dataset name**: View name</li>
      </ul>
    </td>
  </tr>
</table>

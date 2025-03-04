---
title: Greenplum 
---

# Adding a Greenplum  Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Greenplum.
* Zeenea traffic flows towards the data source must be open.
* In order to catalog datasets stored on Greenplum, Zeenea uses the JDBC API to extract metadata. The flow towards the Greenplum server must be open. 

| Target| Protocol | Usual Ports |
| :--- | :--- | :--- |
| Greenplum | JDBC | 5432 |

:::note
A configuration template can be downloaded here: [Greenplum.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgqD&d=%2Fa%2FNu000002lgHB%2FHbG8nqK6P.iKW.bGC0kFb.8zCn3MFgq3YMgk.OMYbAM&asPdf=false).
:::

## Supported Versions

The Greenplum connector was tested with version 6.8 and is compatible with older version. The connector is available since scanner version 33.

## Installing the Plugin

From version 54 of the scanner, the Greenplum connector is presented as a plugin. 

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Greenplum instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `greenplum` and this value must not be modified. | 
| `connection.url` | Database address (example: `jdbc:postgresql://postgresql.example.com:5432/database`) |
| `connection.username` | Username |
| `connection.password` | User password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have read access to objects from the `pg_catalog schema`.

If the data profiling feature was enabled, the user must have read access on impacted tables. Otherwise, this permission is not necessary.

## Data Extraction

To extract information, the connector runs requests on views from the `pg_catalog` schema.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Table: table name
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
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type

## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For Greenplum technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
 The request above defines the number of rows in the table tableName.

```
SELECT
   field1, field2
   FROM tableName
   ORDER BY random() LIMIT linesPercentage
``` 
 
The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](./zeenea-identification-keys.md).

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
    <td>code/path/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**schema**: Dataset schema</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

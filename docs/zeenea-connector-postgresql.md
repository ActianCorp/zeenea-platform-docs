---
title: PostgreSQL  
---

# Adding a PostgreSQL Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with PostgreSQL.
* Zeenea traffic flows towards the database must be open.
* In order to catalog datasets stored on PostgreSQL, Zeenea uses the JDBC API to extract metadata. The flow towards the PostgreSQL server must be open.


| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| PostgreSQL | JDBC | 5432 |

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)
:::

## Supported Versions

The PostgreSQL connector was developed and tested with version 10.4. It is compatible with version 9.5 and later. It is also compatible with the PolarDB versions of the Alibaba Cloud service as well as with the RDS and Aurora versions of the Amazon Cloud service.

## Installing the Plugin

From version 54 of the scanner, the PostgreSQL connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a PostgreSQL instance, fill out the following parameters in the dedicated file:

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
    <td>The type of connector to be used for the connection. Here, the value must be `PgSql` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address (example: `jdbc:postgresql://postgresql.example.com:5432/database`)</td>
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
    <td>`lineage.view.enabled`</td><td>Set to `true` to activate the lineage feature. Default value `false`.</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have read access to objects from the `pg_catalog` schema.

If the data profiling feature was enabled, the user must have read access on impacted tables. Otherwise, this permission is not necessary.

## Data Extraction

To extract information, the connector runs requests on the following views from the `pg_catalog` schema:

* `pg_class`
* `pg_namespace`
* `pg_description`
* `pg_attribute`
* `pg_type`

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Lineage

From version 56 of the plugin, the connector has the lineage feature on the views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

## Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Catalog: Source catalog
  * Schema: Source schema
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
* **Can be null**: Depending on field settings
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type: field native type

### Data Process

A data process represents the request to build a view.

* **Name**: `CREATEVIEW "view-name"`

## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For PostgreSQL technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table tableName.

```
SELECT
   field1, field2
   FROM tableName
   TABLESAMPLE BERNOULLI (linesPercentage)
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Dataset</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/schema/dataset name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
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
 
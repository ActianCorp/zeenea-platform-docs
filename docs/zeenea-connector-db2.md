---
title: DB2
---

# Adding a DB2 Connection

## Prerequisites

* In order to establish a connection to IBM DB2, the user must have sufficient [permissions](#user-permissions).
* Zeenea traffic flows towards DB2 must be open.  

:::note[IMPORTANT]
**The DB2 driver is not delivered with the connector with scanner version 34 and later**. Download the DB2 driver related to your DB2 instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads.

For the **DB2 for i** version, use the jt400 driver: https://www.ibm.com/docs/fr/was/9.0.5?topic=variables-configuring-toolbox-java.
:::

:::note
A configuration template can be downloaded here: [DB2.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUfsY&d=%2Fa%2FNu000002ld3C%2FRQzRoITrrw_JIywiMHtUxPxTKwGGtJbK.PqLsHBEhlM&asPdf=false](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgn0&d=%2Fa%2FNu000002lgXJ%2F6VSKC7Vn219eTbByKQkbOwWSTAHiUQPlVAHb8tLMiBI&asPdf=false))
:::

## Supported Versions

The DB2 connector is available for the following versions: 

* DB2 for z/OS
* DB2 for i (since scanner version 48)
* Linux, Unix, and Windows

## Installing the Plugin

From version 54 of the scanner, the DB2 connector is presented as a plugin. 

It can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with DB2, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `DB2` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>URL to access the DB2 database. See IBM documentation for DB2 for i: https://www.ibm.com/support/pages/using-jdbc-connector-connect-db2-iseries-as400.</td>
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
    <td>`filter`</td>
    <td>To filter datasets during the inventory. See [Filters](#filters).</td>
  </tr>
  <tr>
    <td>`lineage.view.enabled`</td>
    <td>
      <p>**Version 65 and later.**</p>
      <p>*Only available on DB2 for LUW and DB2 Cloud*.</p>
      <p>Enables the view lineage functionality. Value can be `true` or `false`.</p>
      <p>Default value is `false`.</p>
    </td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging.

For the DB2 for z/OS version, the user must have read access to the following tables:

* `SYSIBM.SYSTABLES`
* `SYSIBM.SYSINDEXES`
* `SYSIBM.SYSCOLUMNS`

For the DB2 for i version, the user must have read access to the following tables:

* `QSYS2.SYSTABLES`
* `QSYS2.SYSCOLUMNS2`
* `QSYS2.SYSCATALOGS`
* `QSYS2.SYSCST`
* `QSYS2.SYSKEYCST`
* `QSYS2.SYSREFCST`

For the Linux, Unix, Windows version, the user must have read access to the following tables:

* `SYSCAT.SCHEMATA`
* `SYSCAT.TABLES`
* `SYSCAT.COLUMNS`


## Filters

Since version 48 of the scanner, the DB2 connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](zeenea-filters.md)

| Criteria | Description | Databases |
| :--- | :--- | :--- |
| catalog | Database name | DB2 for i |
| schema | Schema name | DB2, DB2 for z/OS, DB2 for i | 
| table | Table or view name | DB2, DB2 for z/OS, DB2 for i |

## Data Extraction

To extract information, the connector runs requests to the previously cited tables.

## Collected Metadata

### Inventory

The inventory collects all data accessible by the user. 

### Dataset

A dataset can be a table or a view.

* **Name**
* **Source Description**
* **Technical Data**:
  * Catalog: source catalog
  * Schema: source schema
  * Table: table name
  * Type:
    * Alias
    * Clone table
    * Accelerator-only table
    * Created temporary table or Created global temporary table
    * Hierarchy table or History table
    * Detached table
    * Nickname
    * Materialized query table
    * Table that was implicitly created for XML columns
    * Archive table
    * Table
    * Typed table
    * View
    * Typed view
    * Auxiliary table

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Catalog: source catalog
  * Last Alter Time: last modification date
  * Table: source table name
 
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

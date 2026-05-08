# Adding a DB2 Connection

## Prerequisites

* In order to establish a connection to IBM DB2, the user must have sufficient [permissions](#user-permissions).
* Zeenea traffic flows towards DB2 must be open.  

> **Important:** The DB2 driver is not delivered with the connector with scanner version 34 and later. Download the DB2 driver related to your DB2 instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: [https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads](https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads). <br />For the **DB2 for i** version, use the jt400 driver: [https://www.ibm.com/docs/fr/was/9.0.5?topic=variables-configuring-toolbox-java](https://www.ibm.com/docs/fr/was/9.0.5?topic=variables-configuring-toolbox-java).

<br />

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

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
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with DB2, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `DB2` and this value must not be modified. |
| `connection.url` | URL to access the DB2 database. See IBM documentation for DB2 for i: [https://www.ibm.com/support/pages/using-jdbc-connector-connect-db2-iseries-as400](https://www.ibm.com/support/pages/using-jdbc-connector-connect-db2-iseries-as400). |
| `connection.username` | Username |
| `connection.password` | User password |
| `filter` | To filter datasets during the inventory. See [Filters](#Filters). |
| `lineage.view.enabled` | **Version 65 and later.** <br/> *Only available on DB2 for LUW and DB2 Cloud*. <br/> Enables the view lineage functionality. Value can be `true` or `false`. <br/> Default value is `false`. |

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

Read more: [Filters](../Scanners/zeenea-filters.md)

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

 Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |

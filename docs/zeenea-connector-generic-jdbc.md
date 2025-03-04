---
title: Generic JDBC
---

# Adding a Generic JDBC Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with a data source through the standard JDBC interface.
* Zeenea traffic flows towards the data source must be open.

:::note
A configuration template can be downloaded here: [generic-jdbc.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgmz&d=%2Fa%2FNu000002lgDx%2FTIhs3Z6koEWRhJET2LQmiAVBNZWujbGY7chVBzmNCEU&asPdf=false)
:::

## Supported Versions

:::note[IMPORTANT]
The JDBC connector requires the installation of the relevant JDBC driver in the /lib-ext folder of the scanner to be compatible with the required source system. 
:::


## Installing the Plugin

From version 54 of the scanner, the JDBC connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).
 
## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a JDBC instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `generic-jdbc` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address</td>
  </tr>
  <tr>
    <td>`connection.jdbc_driver_name`</td>
    <td>
        <p>**Scanner 69 and later.**</p>
        <p>(Optional) The long name of the JDBC Driver to use.</p>
        <p>Examples:</p>
          <ul>
            <li>`org.postgresql.Driver`</li>
            <li>`com.mysql.jdbc.Driver`</li>
            <li>`org.mariadb.jdbc.Driver`</li>
            <li>`com.microsoft.sqlserver.jdbc.SQLServerDriver`</li>
            <li>`oracle.jdbc.driver.OracleDriver`</li>
            <li>`com.ibm.db2.jcc.DB2Driver`</li>
          </ul>
    </td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging.
 
## Data Extraction

To extract information, the connector runs requests from the driver's capabilities.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

## Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**: 
  * Catalog
  * Schema
  * Type

## Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings
* **Multivalued**: Depending on field settings
* **Primary Key**: Depending on the "Primary Key" attribute
* **Technical Data**: 
  * Technical Name
  * Native type

## Unique Identifier Keys
 
 A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
 More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/schema/dataset name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**schema**: Object schema</li>
         <li>**dataset name**: Table or view name</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/database name/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**schema**: Object schema</li>
         <li>**dataset name**: Table or view name</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
 </table>

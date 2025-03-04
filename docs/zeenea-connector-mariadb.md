---
title: MariaDB  
---

# Adding a MariaDB Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with MariaDB.
* Zeenea traffic flows towards the database must be open.

:::note[IMPORTANT]
**The MariaDB driver is not delivered with the connector**. Download the MariaDB driver related to your MariaDB instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: [https://mariadb.com/downloads/connectors/connectors-data-access/](https://mariadb.com/downloads/connectors/connectors-data-access/).
:::

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)
:::

## Supported Versions

The MariaDB connector was developed and tested with version MariaDB 10. It is compatible with RDS versions of the Amazon Cloud service.

## Installing the Plugin

From version 54 of the scanner, the MariaDB connector is presented as a plugin.

It can be downloaded here and requires scanner version 64: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a MariaDB instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `mariadb` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address (example: `jdbc:mariadb://host:3306/database`)</td>
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

Here, the user must have read access to objects from the `INFORMATION_SCHEMA` schema.

## Data Extraction

To extract information, the connector runs requests on views from the `INFORMATION_SCHEMA` schema.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

## Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Catalog: Source catalog
  * Schema: Source schema
  * Table: table name
  * Type:
    * BASE TABLE
    * VIEW
    * SYSTEM VIEW
    * SYSTEM VERSIONED
    * SEQUENCE

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
 
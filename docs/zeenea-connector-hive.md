---
title: Hive
---

# Adding a Hive Connection

## Prerequisites

To catalog datasets stored in a Hadoop cluster Zeenea's scanner must access to Hive Server 2.

If the server is secured by the Kerberos protocol:

* Kerberos client must be installed and configured on the scanner's server,
* network flow to the Kerberos Domaine Controller (KDC) should be open,
* the Zeenea user should have a keytab file and should have read permissions on Hive tables that need to be documented.

The server is either on the same network as the Hive Server and technical services such as Kerberos through traffic flows.

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| Hive Server | TCP / HTTP | 10000 |

:::note
A link to the configuration template is available from this page: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Hive connector supports versions included in the following distributions: 

* CDH-5
* CDH-6
* HortonWorks HDP 2.6

## Installing the Plugin

From version 54 of the scanner, the Hive connector is presented as a plugin. It can be downloaded here according to your Hadoop cluster version:

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).


 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Hive, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `Hive` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>
      <p>Data source connection address. This can have many parameters. In order to set the right value:</p>
        <ol>
          <li>ask your Hive administrator,</li>
          <li>read the [official documentation](https://cwiki.apache.org/confluence/display/hive/hiveserver2+clients#HiveServer2Clients-ConnectionURLs),</li>
          <li>or read [this article](https://community.cloudera.com/t5/Community-Articles/HiveServer2-JDBC-Connection-URL-Examples/ta-p/244698).</li>
        </ol>
        <p>Template file contains several examples of a valid Hive connection URL.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.principal`</td>
    <td>Principal name.<br /><br />Used by Kerberos Authentication. Keep it `null` if kerberos is disabled.</td>
  </tr>
  <tr>
    <td>`connection.keytab`</td>
    <td>Kerberos Keytab authentication file.<br /><br />Used by Kerberos Authentication. Keep it `null` if kerberos is disabled.</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>
      <p>**Version 60 and later**</p>
      <p>User name.</p>
      <p>Used by user/password authentication. Keep it `null` otherwise.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>
      <p>**Version 60 and later**</p>
      <p>User password</p>
      <p>Used by user/password authentication. Keep it `null` otherwise.</p>
    </td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>
      <p>**Version 61 and later**</p>
      <p>Inventory dataset filter. See [Rich Filters](#rich-filters).</p>
    </td>
  </tr>
</table>

## User Permissions

In order to collect metadata and collect data statistics, the Hive principal's must have sufficient permissions.

The principal must have `SELECT` permission on bases and tables that need to be cataloged.

## Requests

The following are required requests. They are Thrift commands sent to the Hive server by the JDBC driver:

* `GetSchemas`
* `GetTables`: To list tables and extract their description
* `GetColumns`: To extract schema
* `ExecuteStatement describe formatted {database}.{table}`: To retrieve a table description
* `ExecuteStatement describe formatted {database}.{table} {column}`: To retrieve a column description and profile

## Rich Filters

Since version 61, the Hive connector benefits from the feature of rich filters in the configuration of the connector. The available keys to filter objects during the inventory are:

* database: the Hive database name
* schema: a synonym of database in the Hive context
* table: the table or view name.

Read more: [Filters](zeenea-filters.md)

## Collected Metadata

### Inventory

The inventory collects the list of tables the running user can access. 

### Dataset

A dataset is a table identified as a dataset by the rules of the connector. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Database: Name of the Database containing the table
  * File path
  * Table: Table name

### Fields

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Nullable**: Not supported. Default value `FALSE `.
* **Multivalued**: Not supported. Default value `FALSE `.
* **Primary Key**: Not supported. Default value `FALSE `.
* **Technical Data**:
  * Technical Name: field technical name
  * Native type: field native type

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
    <td>code/database name/dataset name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**database name**</li>
      <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/database name/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**database name**</li>
      <li>**dataset name**</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

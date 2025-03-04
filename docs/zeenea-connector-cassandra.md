---
title: Cassandra
---

# Adding a Cassandra Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Cassandra.
* Zeenea traffic flows towards the database must be open. 

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| Cassandra | datastax | 9042 |

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Cassandra connector is compatible with version 3.0 and later. 

## Installing the Plugin

The Cassandra connector can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Cassandra instance, the following parameters in the dedicated file are required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `cassandra` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.contact_points`</td>
    <td>Comma-separated list of the contact point using format `hostname:port. port`. Value is optional and `9042` is the default value.</td>
  </tr>
  <tr>
    <td>`connection.datacenter`</td>
    <td>Name of the datacenter</td>
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

In order to collect metadata, the running user's permissions do not need specific permissions, every user has read access to the system_schema keyspace.

## Data Extraction

To extract information, the connector uses the datastax driver's API. It collects from the Metadata interface the keyspace's list for the inventory and then, collects information for each object during the import.
  
## Collected Metadata

### Inventory

This connector collects the list of all tables and views.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Keyspace
  * Replication Strategy
  * Item Type
  * Clustering Order
  * Base Table Name

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**: Field type
* **Can be null**: Depending on field setting 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute
* Technical metadata:
  * Technical name
  * Native type
  * Clustering Order
  * Field kind: regular, clustering, partition
 
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
    <td>code/keyspace/dataset name</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**schema**:Dataset keyspace</li>
      <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/keyspace/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**schema**:Dataset keyspace</li>
      <li>**dataset name**</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

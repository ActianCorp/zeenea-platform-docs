---
title: MongoDB  
---

# Adding a MongoDB Connection

## Prerequisites

* To connect to a MongoDB cluster, a user with sufficient [permissions](#user-permissions) is required.
* The traffic flows from Zeenea towards the MongoDB cluster must be open.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

Since scanner version 26.9, the MongoDB plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

## Installing the Plugin

Since scanner version 26.9, the MongoDB plugin can be downloaded here: Connectors: download links

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection to a MongoDB cluster, specifying the following parameters in the dedicated file is required:

<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The type of connector to be used for the connection. Here, the value must be `Mongodb` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>MongoDB connection address.<br /><br />Example: `mongodb://mongodb.zeenea.local:27017/admin?authSource=admin`</td>
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
    <td>`tls.trust_store.type	`</td>
    <td>One of two values: `pkcs12` or `jks`</td>
  </tr>
  <tr>
    <td>`tls.trust_store.path`</td>
    <td>Path to the trust store containing the trust certificates. It must contain the certificate chain that generated the MongoDB Cluster Nodes certificates.</td>
  </tr>
  <tr>
    <td>`tls.trust_store.password	`</td>
    <td>Password of the Trust Store containing the Trust Certificates</td>
  </tr>
  <tr>
    <td>`schema_analysis.strategy`</td>
    <td>One of two values: `Map Reduce` or `Sample`</td>
  </tr>
  <tr>
    <td>`schema_analysis.sample.size`</td>
    <td>In case mode `Sample` is selected, this will limit the size of the sample. Default value is `1000`.</td>
  </tr>
  <tr>
    <td>`inventory.databases`</td>
    <td>(Optional) List of databases to be inventoried separated by spaces</td>
  </tr>
</table>

## Data Extraction

The MongoDB connector allows you to select between two modes for metadata extraction. Choosing one of these modes is necessary, as MongoDB does not use schemas. 

### MapReduce Mode

This mode uses the MongoDB MapReduce feature, which lists all fields (even those that are only used once). It is very resource consuming, and may result in a timeout failure if it takes too long. 

The MapReduce feature runs JavaScript on the database; this code is coming in from the agent. The code is constant, and is not subjected to any action or data from the user. 

The script engine mustn't be disabled (option `--noscripting`).

No actual data is extracted from the database.

### Sample Mode

This mode uses a sampling request. Because the request is probabilistic, rare fields can't be detected. 

The sample size is defined in the connector. 

There is no risk of a timeout failure, and no JavaScript code is ran on the MongoDB server; thus, this mode is compatible with the `--noscripting` option. 

Some data is read by the agent but it is never saved or sent, and is "forgotten" as soon as the information has been extracted.

## Choosing the Right Mode

The MapReduce mode was built first, however, after being faced with speed issues and timeout failures on large collections, the Sample mode was introduced. 

The MapReduce mode is most useful when the collection size is reasonably large and when it contains rare fields. 

Unfortunately, we do not know which resources are consumed, because this mode is dependent on multiple variables: server performance, collection size, number of fields, etc... 

The Sample mode is usually recommended, however it may not detect rare fields. More accurately, a rare field may appear temporarily when a schema is being updated, and disappear at the next update. This has not been observed or reported, but, statistically, it is a possibility. 

**We recommend trying the Sample mode first, as it is faster and lighter. If it is not applicable to your configuration, switching to the MapReduce mode remains possible.**

## User Permissions

In order to collect metadata, the running user must be able to list and read databases that need to be cataloged.

In case of limited rights to list databases **before version 4**, it is possible to use the inventory.databases parameter to select only the desired databases.

### Integrated Roles

The readAnyDatabase integrated role is enough to catalog the entire system. 

The read integrated role, when assigned to a database, allows the user to catalog that base's collections.

In the following example, the Zeenea account can catalog the sales and stock bases:

```
db.grantRolesToUser('zeenea', [
    { role: 'read', db: 'sales' },
    { role: 'read', db: 'stock' }
]);
``` 

### Zeenea Role

You may regroup permissions into one specific role for Zeenea:

```
db.createRole({
    role: "zeeneaRole",
    privileges: [],
    roles: [
        { role: 'read', db: 'sales' },
        { role: 'read', db: 'stock' }
    ]});

db.grantRolesToUser('zeenea', 'zeeneaRole');
```

## Collected Metadata

### Inventory

The inventory collects all databases and collections accessible by the user. 

## Datasets

Here, datasets are MongoDB collections.

* **Name**: collection name
* **Source Description**: not supported
* **Technical Data**:
  * Database: Database name
  * Collection: Collection name

### Field

Table fields. 

* **Name**: Field path in the JSON file, where items are separated by a period (e.g., `client.name`)
* **Source Description**: Not supported
* **Native type**: Field native type. If there are more than one native types, they are separated with a pipe (`|`).
* **Nullable**: constant, `TRUE`
* **Multivalued**: `TRUE` if the field contains a list
* **Technical Data**:
  * Technical Name: Field technical name
  * Native type: Field native type

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/database name/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
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
 
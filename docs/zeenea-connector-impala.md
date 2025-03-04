---
title: Impala  
---

# Adding a Impala  Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Impala.
* Zeenea traffic flows towards the data source must be open.  

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Impala connector was successfully developed and tested with CDP 7.1.7. It is compatible with Impala 2.2.0. 

## Installing the Plugin

The Impala plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with an Impala instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `impala` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address (example: `jdbc:impala://host:21050`).</td>
  </tr>
  <tr>
    <td colspan="2"> **Basic Auth**</td>
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
    <td colspan="2">**Kerberos**</td>
  </tr>
  <tr>
    <td>`connection.kerberos.principal`</td>
    <td>Kerberos principal name (example: `user/_HOST@KRB_REALM`)</td>
  </tr>
  <tr>
    <td>`connection.kerberos.keytab`</td>
    <td>Absolute path to the Kerberos Keytab authentication file</td>
  </tr>
  <tr>
    <td>`connection.kerberos.realm`</td>
    <td>Kerberos realm</td>
  </tr>
  <tr>
    <td>`connection.kerberos.host	`</td>
    <td>Kerberos host</td>
  </tr>
  <tr>
    <td>`connection.kerberos.userjdbc`</td>
    <td>JDBC User is "impala" by default but you can use the one you choose.</td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Cloudera servers are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must have `SELECT` access to the selected databases or tables.

In order to refresh metadata, the running user's permissions must have `REFRESH` access to the selected databases or tables.

If the running user's don't have `REFRESH` access, a `WARN` will be logged during the update and metadata could be not up to date.

## Data Extraction

To extract information, the connector runs following JDBC requests:

* `SHOW DATABASES`
* `USE`
* `SHOW TABLES`
* `INVALIDATE METADATA .`
* `DESCRIBE` .
* `DESCRIBE FORMATTED .`

## Collected Metadata

### Inventory

Will collect the list of Hive and Kudu tables accessible by the user.  

### Dataset

A dataset can be a Hive or Kudu table. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Creation Date
  * Location
  * Table Type
  * Owner
  * Source Database

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Supported for Kudu only. Default value `true`.
* **Multivalued**: Depending on the native type.
* **Primary Key**: Supported for Kudu only. Default value `false`.
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
    <td>code/database name/dataset name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**database name**</li>
        <li>**dataset name**: Table name</li>
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
        <li>**dataset name**: Table name</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

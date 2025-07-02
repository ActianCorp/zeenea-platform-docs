---
title: Matillion DPC
---

# Adding a Matillion DPC Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Matillion DPC.

:::note
The configuration template can be downloaded here: [matillion-dpc.conf](https://github.com/zeenea/connector-conf-templates/blob/main/templates/matillion-dpc.conf)
:::

## Supported Versions

The Matillion DPC module is compatible with the online version of the product. 

## Installing the Plugin

The Matillion DPC plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a Matillion DPC instance, the following parameters in the dedicated file are required:

### Changes in version 4.1.0

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
    <td>The type of connector to be used for the connection. Here, the value must be `matillion-dpc` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>The root path of Matillion files</td>
  </tr>
  <tr>
    <td>`default.warehouse`</td>
    <td>Replace the default value [Environment Default] for the parameter `warehouse` for every component</td>
  </tr>
  <tr>
    <td>`default.database`</td>
    <td>Replace the default value [Environment Default] for the parameter `database` for every component</td>
  </tr>
  <tr>
    <td>`default.schema`</td>
    <td>Replace the default value [Environment Default] for the parameter `schema` for every component</td>
  </tr>
</table>

### Changes in version 5.1.0

<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>
        <p>Path to file or folder containing description files.</p>
        <p>This value is mandatory if no git repository is declared.</p>
        <p>If a git repository is declared, the value can be null or a path relative to the repository root.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.repository`</td>
    <td>
        <p>Git repository URL. Optional, use `connection.path` instead.</p>
        <p>URL of the git repository where to read the files.</p>
        <p>Example: `https://github.com/acme/bigproject`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.branch`</td>
    <td>
        <p>Git branch to use. Optional.</p>
        <p>Branch to clone. By default, HEAD is used.</p>
        <p>Example: `https://github.com/acme/bigproject`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.token`</td>
    <td>
        <p>Git token. Optional.</p>
        <p>Authentication Token. Replaces the usage of the username/password parameters.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.username`</td>
    <td>
        <p>Git username. Optional.</p>
        <p>Git user name. Requires password. Replaces the usage of token parameter.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.password`</td>
    <td>
        <p>Git username. Optional.</p>
        <p>Git user password. Requires username. Replaces the usage of token parameter.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.workdir`</td>
    <td>Local working folder where the git repository will be cloned. Optional. Default: root directory.</td>
  </tr>
  <tr>
    <td>`connection.git.cleandir`</td>
    <td>
        <p>Boolean (`true`/`false`) indicating whether the working folder should be deleted after processing. If deleted, the repository will be cloned at each operation, otherwise only an update will be performed. Default value: `false`.</p>
        <p>If you configure Git:</p>
        <ul>
          <li>At least `connection.git.token` OR `connection.git.username` with `connection.git.password` must be provided.</li>
          <li>At least `connection.git.repository` or `connection.path` must be provided.</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>`environment-variable`</td>
    <td>
        <p>Replace environment variable starting with `${` and ending with `}`</p>
        <p>Configuration example:</p>
        <p>
          ```
          environment-variables = {
            "V_REPLICA_TABLE_NAME" : "album"
          }
          ```
        </p>
    </td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read folders and files that need cataloging.

## Data Extraction

The Matillion DPC connector feeds Zeenea Database with Data Processes. Like other Data Process connectors, it has a single job "synchronize" that discovers all items of interest and creates or updates their documentation in the catalog. Matillion items of interest are Jobs. So, for each Jobs in Matillion DPC, a Data Process should be created in Zeenea.

## Synchronization

This connector will harvest all transformation processes identified in the Matillion DPC instance, and automatically represent them in Zeenea.

## Lineage

The Matillion DPC connector is able to retrieve the lineage with:

* Matillion DPC for **Redshift**
* Matillion DPC for **Snowflake**
* Matillion DPC for **Oracle**
* Matillion DPC for **PostgreSQL**

## Collected Metadata

### Data Process

A data process is a Matillion transformation. 

* **Name**
* **Source Description**
* **Input**: Input datasets
* **Output**: Output datasets
* **Technical Data**:
  * YAML job definition
  * Warehouse
  * Database
  * Schema

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Data process</td>
     <td>code/name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**name**: job name</li>
       </ul>
     </td>
   </tr>
 </table>
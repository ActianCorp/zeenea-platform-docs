---
title: Agile Data Engine (Solita)
---

# Adding an Agile Data Engine Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Agile Data Engine.
* Zeenea traffic flows towards the data source must be open. 

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::
 
## Supported Versions
The Agile Data Engine connector is compatible with version 22.1 and later to take advantage of the Agile Data Engine version 2 metadata interface. 

## Installing the Plugin

You can download the plugin here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).
 
## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the "/connections" folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with an Agile Data Engine instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `solita-ade` and this value must not be modified.</td>
  </tr>
  <tr>
    <td colspan="2">**CSV files connection configuration**</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>Absolute folder path which contains metadata interface CSV files</td>
  </tr>
  <tr>
    <td colspan="2">**Database connection configuration**</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Datasource URL</td>
  </tr>
  <tr>
    <td>`connection.driver`</td>
    <td>Driver class name (example: `org.postgresql.Driver`)</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Database username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>Database user password</td>
  </tr>
  <tr>
    <td>`filter.includes`</td>
    <td>List of regular expressions with comma separated representing target entity package to include</td>
  </tr>
  <tr>
    <td>`filter.excludes`</td>
    <td>List of regular expressions with comma separated representing target entity package to exclude</td>
  </tr>
</table>



## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read files or databases that contain metadata. 
 
## Data Extraction

To extract information, the connector runs requests on following objects:

* workflow_load_target_entity
* workflow_load_usage
* workflow_load_source_entity
* package
* entity
* workflow_load
 
## Collected Metadata

### Data Process

A data process is an Agile Data Engine workflow load. 

* **Name**: Workflow load identifier
* **Source Description**
* **Technical Data**: 
  * Workflow Name
  * Workflow Cron
  * Target Entity Package
 
## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).

<table>
<tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
<tr>
  <td>Data process</td>
  <td>code/workflow load identifier</td>
  <td>
    <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**workflow load identifier**</li>
    </ul>
  </td>
</tr>
</table>

		
		
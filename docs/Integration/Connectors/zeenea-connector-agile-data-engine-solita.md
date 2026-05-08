# Adding an Agile Data Engine (Solita) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Agile Data Engine.
* Zeenea traffic flows towards the data source must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).
 
## Supported Versions

The Agile Data Engine connector is compatible with version 22.1 and later to take advantage of the Agile Data Engine version 2 metadata interface. 

## Installing the Plugin

You can download the plugin here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).
 
## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the "/connections" folder of the relevant scanner.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with an Agile Data Engine instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `solita-ade` and this value must not be modified. |
| **CSV files connection configuration** | |
| `connection.path` | Absolute folder path which contains metadata interface CSV files |
| **Database connection configuration** | |
| `connection.url` | Datasource URL |
| `connection.driver` | Driver class name (example: `org.postgresql.Driver`) |
| `connection.username` | Database username |
| `connection.password` | Database user password |
| `filter.includes` | List of regular expressions with comma separated representing target entity package to include |
| `filter.excludes` | List of regular expressions with comma separated representing target entity package to exclude |

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

More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/workflow load identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **workflow load identifier** |

		
		
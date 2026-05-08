# Adding a DBT Cloud Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with DBT Cloud.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The DBT Cloud module is compatible with the online version of the product. 

## Installing the Plugin

The DBT Cloud plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with a DBT Cloud instance, the following parameters in the dedicated file are required:

### Changes in version 4.1.0

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `dbt-cloud` and this value must not be modified. |
| `connection.account_prefix` | DBT Cloud account prefix (when environment are hosted by DBT Cloud : https://[account_prefix].us1.dbt.com) |
| `connection.token` | DBT Cloud personal access token |
| `connection.url` | DBT Cloud url (when hosted somewhere else) |
| `connection.offset_size` | (Technical) Offset size when retrieving runs (20 by default) |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read accounts, jobs and runs that need cataloging.

## Data Extraction

The DBT Cloud connector feeds Zeenea Database with Data Processes. Like other Data Process connectors, it has a single job "synchronize" that discovers all items of interest and creates or updates their documentation in the catalog. DBT Cloud items of interest are Jobs and Runs. So, for each Runs from a Job in DBT Cloud, multiple Data Processes should be created in Zeenea.

To extract information, the connector runs REST requests on following endpoints:

* GET: `/api/v3/accounts/`: To get available accounts.
* GET: `/api/v2/accounts/*/runs/`: To get run list from available account.
* GET: `/api/v2/accounts/*/runs/*/artifacts/manifest.json`: To get the manifest file result of job's latest run.

## Synchronization

This connector will harvest all job processes identified in the DBT Cloud instance for each account and latest run, and automatically represent them in Zeenea.

## Lineage

The DBT Cloud connector is able to retrieve the lineage with:

* DBT Cloud for **Snowflake**
* DBT Cloud for **Redshift**
* DBT Cloud for **PostgreSQL**

## Collected Metadata

### Data Process

A data process is a DBT Cloud job link between each nodes. 

* **Name**
* **Source Description**
* **Input**: Input datasets
* **Output**: Output datasets
* **Technical Data**:
  * Type
  * Package
  * Alias
  * Unique ID
  * Created At
  * SQL File Path
  * SQL Dialect
  * SQL Query

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **name**: DBT Cloud unique id |

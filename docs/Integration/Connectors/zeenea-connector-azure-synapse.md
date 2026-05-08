# Adding an Azure Synapse Analytics Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Synapse.
* Zeenea traffic flows towards the database must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Synapse connector is compatible with the online software version.

> **Note:** The connector is compatible with Lake Database datasets. Please use the SQL Server connector for dedicated SQL Serverless pools.
 
## Installing the Plugin

The Synapse plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with a Synapse instance, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `azure-synapse-data` and this value must not be modified. |
| `connection.oauth.client_id` | Application ID (client) as defined in Azure |
| `connection.oauth.client_secret` | Client secret |
| `connection.oauth.endpoint` | Azure Data Factory API endpoint. Must respect following format: `https://login.microsoftonline.com/{tenant ID}/oauth2/token`. |
| `subscription_list` | (Optional) List of Azure subscriptions to be inventoried |
| `workspace_list` | (Optional) List of Synapse workspace to be inventoried |
| `filter.includes` | (Optional) List of regular expressions with comma separated representing dataset to include during the inventory |
| `filter.excludes` | (Optional) List of regular expressions with comma separated representing dataset to exclude during the inventory |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the service principal must have access to Synapse workspace artifacts.

## Data Extraction

To extract information, the connector runs following requests on the Synapse Rest API:

* **GET** `https://management.azure.com/subscriptions?api-version=2022-09-01`: To get the list of available subscriptions
* **GET** `https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Synapse/workspaces?api-version=2022-09-01`: To get Synapse workspaces.
* **GET** `https://{workspaceName}.dev.azuresynapse.net/databases?api-version=2021-04-01`: To get workspaces databases.
* **GET** `https://{workspaceName}.dev.azuresynapse.net/databases/{databaseName}/tables?api-version=2021-04-01`: To get the list of database table.
* **GET** `https://{workspaceName}.dev.azuresynapse.net/databases/{databaseName}/tables/{tableName}?api-version=2021-04-01`: To get a table from a database.
* **GET** `https://{workspaceName}.dev.azuresynapse.net/databases/{databaseName}/relationships?api-version=2021-04-01`: To get the relationship between tables in the database.
 
## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the service principal.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Workspace Name
  * Format Type
  * Source Provider
  * Source Location

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
  * Native type
 
## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/workspace/database/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **workspace**: Synapse workspace name<br/>- **database**: Synapse database name<br/>- **dataset name**: Table or view name |
| Field | code/workspace/database/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **workspace**: Synapse workspace name<br/>- **database**: Synapse database name<br/>- **dataset name**: Table or view name<br/>- **field name** |

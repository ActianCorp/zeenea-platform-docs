---
title: Azure Synapse Analytics
---

# Adding a Synapse Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Synapse.
* Zeenea traffic flows towards the database must be open. 

:::note
A configuration template can be downloaded here: [azure-synapse-data.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgzt&d=%2Fa%2FNu000002lgdl%2F4Uzq73PSmLgsxN.NOULtWXV9aT0AVXrXUiZhE5K1C6s&asPdf=false)
:::

## Supported Versions

The Synapse connector is compatible with the online software version.

:::note
**The connector is compatible with Lake Database datasets. Please use the SQL Server connector for dedicated SQL Serverless pools.**
:::
 
## Installing the Plugin

The Synapse plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Synapse instance, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `azure-synapse-data` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Application ID (client) as defined in Azure</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Client secret</td>
  </tr>
  <tr>
    <td>`connection.oauth.endpoint`</td>
    <td>Azure Data Factory API endpoint. Must respect following format: `https://login.microsoftonline.com/{tenant ID}/oauth2/token`.</td>
  </tr>
  <tr>
    <td>`subscription_list`</td>
    <td>(Optional) List of Azure subscriptions to be inventoried</td>
  </tr>
  <tr>
    <td>`workspace_list`</td>
    <td>(Optional) List of Synapse workspace to be inventoried</td>
  </tr>
  <tr>
    <td>`filter.includes`</td>
    <td>(Optional) List of regular expressions with comma separated representing dataset to include during the inventory</td>
  </tr>
  <tr>
    <td>`filter.excludes`</td>
    <td>(Optional) List of regular expressions with comma separated representing dataset to exclude during the inventory</td>
  </tr>
    <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>
  <tr>
    <td>`proxy.scheme`</td>
    <td>Depending on the proxy, `http` or `https`</td>
  </tr>
  <tr>
    <td>`proxy.hostname`</td>
    <td>Proxy address</td>
  </tr>
  <tr>
    <td>`proxy.port`</td>
    <td>Proxy port</td>
  </tr>
  <tr>
    <td>`proxy.username`</td>
    <td>Proxy username</td>
  </tr>
  <tr>
    <td>`proxy.password`</td>
    <td>Proxy account password</td>
  </tr>
</table>

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

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identifier Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/workspace/database/dataset name</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**workspace**: Synapse workspace name</li>
      <li>**database**: Synapse database name</li>
      <li>**dataset name**: Table or view name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/workspace/database/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**workspace**: Synapse workspace name</li>
      <li>**database**: Synapse database name</li>
      <li>**dataset name**: Table or view name</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

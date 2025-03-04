---
title: Azure Data Factory
---

# Adding an Azure Data Factory Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Data Factory. 
* Zeenea traffic flows towards the data source must be open. 

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::
 
## Supported Versions

The Azure Data Factory connector is compatible with the product online version. 

## Installing the Plugin

The Azure plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with an Azure Data Factory instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| name | The name that will be displayed to catalog users for this connection | 
| code | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| connector_id | The type of connector to be used for the connection. Here, the value must be `azure-datafactory` and this value must not be modified. | 
| connection.url | Connection address (example: `https://management.azure.com/subscriptions/{subscription ID}`) | 
| connection.oauth.client_id |Application ID (client) as defined in Azure |
| connection.oauth.client_secret | Client secret |
| connection.oauth.endpoint	| Azure Data Factory API endpoint. Must respect following format: `https://login.microsoftonline.com/{tenant ID}/oauth2/token`. |
| connection.oauth.resource | Azure Data Factory URL: `https://management.azure.com` | 
| connection.factory.names | (Optional) Factory list names to be synchronized |
| connection.resource.group |	(Optional) Resource group name to be synchronized |
| multi_catalog.enabled | Set to `true` if the dataset source system is also configured as `multi catalog`. Default value `false`. |
| tls.truststore.path | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| tls.truststore.password | Password of the trust store file |
| tls.truststore.type | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| proxy.scheme | Depending on the proxy, `http` or `https` |
| proxy.hostname | Proxy address |
| proxy.port | Proxy port |
| proxy.username | Proxy username |
| proxy.password | Proxy account password |
 
## User Permissions

In order to collect metadata, the service principal's permissions must allow them to access and read pipelines that need cataloging. 

Here, the service principal must have the **Reader** role in the Data Factory.

## Data Extraction

To extract information, the connector runs requests on the Azure Data Factory Rest API.

During synchronize:

#### API Azure Data Factory

* **GET**`https://login.microsoftonline.com:443/{tenantId}/oauth2/token`
  * Resource: https://management.azure.com
* **GET** `https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.DataFactory/factories/{factoryName}?api-version=2018-06-01`
* **GET** `https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines?api-version=2018-06-01`
* **GET** `https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/linkedservices?api-version=2018-06-01`
* **GET** `https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/dataflows/{dataflowName}?api-version=2018-06-01`
* **GET** `https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}?api-version=2018-06-01`

#### Azure Key Vault

* **GET** `https://login.microsoftonline.com:443/{tenantId}/oauth2/token`
  * Resource: https://vault.azure.net
* **GET** `https://{azureKeyVaultUrl}/secrets/{secretName}?api-version=7.4`
* **GET** `https://{azureKeyVaultUrl}/secrets/{secretName}/{secretVersion}?api-version=7.4`
 
### Synchronization

The connector will synchronize all pipelines identified in the Data Factory and automatically represent them in the catalog.

### Lineage

The Azure Data Factory connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Azure Data Factory process. This feature is available for the following systems and, for it to work, an additional parameter is needed **in the configuration file of the source system connection** as configured in the Azure Data Factory connection configuration panel. For example, if the Azure Data Factory job uses a table coming from a SQL Server table, then a new alias parameter must be added in the SQL Server connection configuration file.

The table below summarizes the possible values of the `alias` parameter to be completed in the data source configuration file.

| Source System| Model | Example |
| :--- | :--- | :---- |
| [SQL Server](./zeenea-connector-sqlserver.md) | Server name:port/Database name | `alias = ["zeenea.database.windows.net:1433/db"]` * |
| [ADLS](./zeenea-connector-azure-data-lake.md) | Storage account.dfs.core.windows.net | `alias = [".dfs.core.windows.net"]` |
| [Snowflake](./zeenea-connector-snowflake.md) | Server name/Database name | `alias = ["kn999999.eu-west-1.snowflakecomputing.com/ZEENEA""]` * |

(*) Do not fill in the database name if the configuration of the connector is in `multi_catalog.enabled = true`.

### Data Process
A data process is the representation of a pipeline.

* **Name**
* **Source Description**
* **Technical Data**: 
  * Datafactory Name
  * Azure Group Name
  * Dataprocess Id
  * Dataprocess Modification Date
 
## Unique Identification Keys
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Data process</td>
    <td>code/dataprocess id</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**dataprocess id**: The pipeline's Azure identifier</li>
      </ul>
    </td>
  </tr>
</table>

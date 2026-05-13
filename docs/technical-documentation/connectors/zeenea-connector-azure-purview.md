# Adding an Azure Purview Connection

## Prerequisites

* A user with sufficient [permissions](#p100120 "title: Azure Purview") is required to establish a connection with Purview.
* Zeenea traffic flows towards the database must be open. 

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


## Supported Versions

The Purview connector is compatible with the product online version. 

## Installing the Plugin

The Azure plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

In order to establish a connection with a Purview instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `azure-purview` and this value must not be modified. |
| `connection.url` | Connection address (example: `https://{purview_account}.catalog.purview.azure.com`) |
| `connection.oauth.client_id` | Application ID (client) as defined in Azure |
| `connection.oauth.client_secret` | Client secret. |
| `connection.oauth.endpoint` | Purview API endpoint. Must respect following format: `https://login.microsoftonline.com/{tenant_ID}/oauth2/token`. |
| `connection.oauth.resource` | Purview URL: `https://purview.azure.net` |
| `asset.types` | Assets types to be inventoried. Possibles values: `azure_sql_table`, `azure_sql_view`, `powerbi_table`, and `powerbi_report`. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

## User Permissions

In order to collect metadata, the service principal permissions must allow them to access and read databases that need cataloging. 

Here, the service principal must have the **Data Readers** role on Azure Purview collections.

## Data Extraction

To extract information, the connector runs requests on the Purview Rest API.

During the inventory:

* Standard case:
     * **POST** `{Endpoint}/catalog/api/browse?api-version=2021-05-01-preview` with request body as assets type.
* PowerBI table case: 
     * **POST** `{Endpoint}/catalog/api/browse?api-version=2021-05-01-preview` with request body as powerbi datasets.
     * **GET** `{Endpoint}/catalog/api/atlas/v2/entity/guid/{Dataset guid}`

During the import:

* **GET** `{Endpoint}/catalog/api/atlas/v2/entity/guid/{guid}`

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Visualization

Only for `powerbi_report` object, a visualization is Power BI report.

* **Name**
* **Source Description**
* **Technical Data**:
     * PowerBI Report(s): Link to the report
     * Report Type

### Dataset

A dataset can be a table or a view.
 
* **Name**
* **Source Description**
* **Technical Data**:
     * Catalog
     * Schema
     * Table

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. Default value `false`. 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Data**:
     * Technical Name
     * Native type

## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md)

| Object | Identifier Key | Description |
|---|---|---|
| Visualization | code/type/report id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Assets type<br/>- **report id**: Power BI report's technical identifier |
| Dataset | code/type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Assets type<br/>- **dataset name** |
| Field | code/type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Assets type<br/>- **dataset name**<br/>- **field name** |


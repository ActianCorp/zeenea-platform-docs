# Adding an Azure Purview Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100120 "title: Azure Purview") is required to establish a connection with Purview.

- <!-- #p100039 -->
  Zeenea traffic flows towards the database must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100051 -->
## Supported Versions

<!-- #p100057 -->
The Purview connector is compatible with the product online version. 

<!-- #p100063 -->
## Installing the Plugin

<!-- #p100072 -->
The Azure plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100078 -->
## Declaring the Connection

<!-- #p100087 -->
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100096 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100102 -->
In order to establish a connection with a Purview instance, specifying the following parameters in the dedicated file is required:

<!-- #p100108 -->
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

<!-- #p100120 -->
## User Permissions

<!-- #p100126 -->
In order to collect metadata, the service principal permissions must allow them to access and read databases that need cataloging. 

<!-- #p100135 -->
Here, the service principal must have the **Data Readers** role on Azure Purview collections.

<!-- #p100141 -->
## Data Extraction

<!-- #p100147 -->
To extract information, the connector runs requests on the Purview Rest API.

<!-- #p100153 -->
During the inventory:

- <!-- #p100159 -->
  Standard case:

  - <!-- #p100171 -->
    **POST** `{Endpoint}/catalog/api/browse?api-version=2021-05-01-preview` with request body as assets type.

- <!-- #p100186 -->
  PowerBI table case: 

  - <!-- #p100198 -->
    **POST** `{Endpoint}/catalog/api/browse?api-version=2021-05-01-preview` with request body as powerbi datasets.

  - <!-- #p100213 -->
    **GET** `{Endpoint}/catalog/api/atlas/v2/entity/guid/{Dataset guid}`

<!-- #p100231 -->
During the import:

- <!-- #p100243 -->
  **GET** `{Endpoint}/catalog/api/atlas/v2/entity/guid/{guid}`

<!-- #p100255 -->
## Collected Metadata

<!-- #p100261 -->
### Inventory

<!-- #p100267 -->
Will collect the list of tables and views accessible by the user.  

<!-- #p100273 -->
### Visualization

<!-- #p100282 -->
Only for `powerbi_report` object, a visualization is Power BI report.

- <!-- #p100291 -->
  **Name**

- <!-- #p100303 -->
  **Source Description**

- <!-- #p100315 -->
  **Technical Data**:

  - <!-- #p100321 -->
    PowerBI Report(s): Link to the report

  - <!-- #p100330 -->
    Report Type

<!-- #p100348 -->
### Dataset

<!-- #p100354 -->
A dataset can be a table or a view. 

- <!-- #p100363 -->
  **Name**

- <!-- #p100375 -->
  **Source Description**

- <!-- #p100387 -->
  **Technical Data**:

  - <!-- #p100393 -->
    Catalog

  - <!-- #p100402 -->
    Schema

  - <!-- #p100411 -->
    Table

<!-- #p100429 -->
### Field

<!-- #p100435 -->
Dataset field. 

- <!-- #p100444 -->
  **Name**

- <!-- #p100456 -->
  **Source Description**

- <!-- #p100468 -->
  **Type**

- <!-- #p100483 -->
  **Can be null**: Not supported. Default value `false`. 

- <!-- #p100498 -->
  **Multivalued**: Not supported. Default value `false`.

- <!-- #p100513 -->
  **Primary Key**: Not supported. Default value `false`.

- <!-- #p100525 -->
  **Technical Data**:

  - <!-- #p100531 -->
    Technical Name

  - <!-- #p100540 -->
    Native type

<!-- #p100558 -->
## Unique Identification Keys

<!-- #p100564 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100573 -->
Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

<!-- #p100579 -->
| Object | Identifier Key | Description |
|---|---|---|
| Visualization | code/type/report id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Assets type<br/>- **report id**: Power BI report's technical identifier |
| Dataset | code/type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Assets type<br/>- **dataset name** |
| Field | code/type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **type**: Assets type<br/>- **dataset name**<br/>- **field name** |


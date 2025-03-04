---
title: Azure Purview
---

# Adding an Azure Purview Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Purview.
* Zeenea traffic flows towards the database must be open. 

## Supported Versions

The Purview connector is compatible with the product online version. 

## Installing the Plugin

The Azure plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Purview instance, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `azure-purview` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Connection address (example: `https://{purview_account}.catalog.purview.azure.com`)</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Application ID (client) as defined in Azure</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Client secret.</td>
  </tr>
  <tr>
    <td>`connection.oauth.endpoint`</td>
    <td>Purview API endpoint. Must respect following format: `https://login.microsoftonline.com/{tenant_ID}/oauth2/token`.</td>
  </tr>
  <tr>
    <td>`connection.oauth.resource`</td>
    <td>Purview URL: `https://purview.azure.net`</td>
  </tr>
  <tr>
    <td>`asset.types`</td>
    <td>Assets types to be inventoried. Possibles values: `azure_sql_table`, `azure_sql_view`, `powerbi_table`, and `powerbi_report`.</td>
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

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identifier Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Visualization</td>
    <td>code/type/report id</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**type**: Assets type</li>
      <li>**report id**: Power BI report's technical identifier</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/type/dataset name</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**type**: Assets type</li>
      <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/type/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**type**: Assets type</li>
      <li>**dataset name**</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

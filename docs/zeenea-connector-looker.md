---
title: Looker  
---

# Adding a Looker Connection

## Prerequisites

In order to connect to the Looker platform, the running user will need to have access to the required Dashboards.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The connector is compatible with the SaaS Looker solution. 

## Installing the Plugin

The Looker plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with Looker, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `looker` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.tenant`</td>
    <td>The tenant address: In URL address, it is the name of your server before `.cloud.looker.com`.</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Token name obtained within the Looker account menu</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Token secret</td>
  </tr>
  <tr>
    <td>`connection.timeout`</td>
    <td>(Optional) Customizable HTTP client timeout depending on Looker repository volume, in ms. Default value `10000` (10sec).</td>
  </tr>
  <tr>
    <td>`connection.fetch_offset_size`</td>
    <td>(Optional) Customizable offset size for the dashboard inventory. Default value is `100`.</td>
  </tr>
  <tr>
    <td>`connection.port`</td>
    <td>(Optional) Port address</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>(Optional) URL address</td>
  </tr>
  <tr>
    <td>`lineage`</td>
    <td>(Optional) Set to `true` to activate automatic lineage feature. Default value `false`.</td>
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
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Looker servers (or/and configured proxy) are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>

</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read dashboards that need cataloging. 

## Data Extraction

In order to extract information from Looker, the connector will scan all Dashboards the running user has access to and transform them into **Visualization** objects in Zeenea. Data sources are referenced as **Datasets**. Fields are recreated as **Field**-type objects in Zeenea. For each Looker Dataset, a **Data Process** is created to represent the lineage with the origin Dataset.

The connector executes the following requests:

<pre>
  GET /api/4.0/dashboards/<font className="codeHighlight">\{dashboard-id}</font>/search
  GET /api/4.0/connections/
  GET /api/4.0/folders/<font className="codeHighlight">\{folder-id}</font>/ancestors
  GET /api/4.0/lookml_models/<font className="codeHighlight">\{model-name}</font>/explores/<font className="codeHighlight">\{dataset-name}</font>
  POST /login
</pre>

## Collected Metadata

### Inventory

The inventory collects the list of Dashboards (along with their data sources) that the user can access. 

## Lineage

The Looker connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Looker dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Looker connection configuration panel.

<table>
  <tr>
    <th>Source System</th>
    <th>Possible value of `alias` parameter to be set in source system configuration file</th>
  </tr>
  <tr>
    <td>[BigQuery](./zeenea-connector-google-bigquery.md)</td>
    <td>BigQuery project name</td>
  </tr>
</table>

:::note
The connector creates a data process object for each dataset from Looker to represent the link with the source dataset (even if the source dataset is not present in the catalog).
:::

## Visualization

A Visualization is a Looker Dashboard.

* **Name**
* **Source Description**: Dashboard label
* **Datasets**: All datasets referenced in the Dashboard
* **Technical Data**:
  * Creation date: Creation date
  * Parent space: space containing the Dashboard
  * Last visualization date: Last visualization date
  * Number of views by web UI: Number of views by web UI

## Dataset

A dataset is a Data source used in a Looker Dashboard.

* **Name**
* **Source Description**: Dataset label
* **Technical Data**:
  * Explore name: Explore name Looker
  * Schema name: Schema name as it’s described in the database called
  * Model name: Model name
  * Connection name: Connection name

### Field

Dataset field. Can be used as a Dashboard report data. 

* **Name**
* **Source Description**: Field label
* **Type**
* **Can be null**: `false` (default)
* **Multivalued**: `false` (default)
* **Primary Key**: `false` (default)
* **Technical Data**:
  * Field type: Is the field whether a dimension or a measure

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Looker Dataset.

* **Name**: `import input/output_dataset name`


## Object Identifier Keys
 
An identification key is associated with each object in the catalog. In the case of a synchronized object (i.e., created via a connector), the identification key is generated by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
     <td>Visualization</td>
     <td>code/identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**identifier**: Looker technical object identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Dataset</td>
     <td>code/dataset/identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**identifier**: Looker technical object identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/dataset/identifier/field name	</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**identifier**: Looker technical object identifier</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Data process</td>
     <td>code/transformation/model name/dataset name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**model name**</li>
         <li>**dataset name**</li>
       </ul>
     </td>
   </tr>
 </table>
 
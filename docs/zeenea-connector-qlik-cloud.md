---
title: Qlik Cloud  
---

# Adding a Qlik Cloud Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Qlik Cloud.
* Zeenea traffic flows towards the data source must be open. 

:::note
A configuration template can be downloaded here: [qlik-cloud.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUd4N&d=%2Fa%2FNu000002lfbF%2F80tPNxbjIFWMcAlfEIBTkgJc5fS1urKbkL58rrMvRV0&asPdf=false).
:::

## Installing the Plugin

The Qlik Cloud plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a Qlik Cloud instance, specifying the following parameters in the dedicated file is required:

<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The connector type to use for the connection. Here, the value must be `qlik-cloud` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Instance address (`https://.eu.qlikcloud.com`)</td>
  </tr>
  <tr>
    <td>`connection.auth_mode`</td>
    <td>Qlik Cloud authentication mode (accepted values : `oauth`, `token`)</td>
  </tr>
  <tr>
    <td>`connection.auth.value`</td>
    <td>Header value for authentication, format: `domain\user name`</td>
  </tr>
  <tr>
    <td>`connection.token`</td>
    <td>Connection token for Qlik API</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>OAuth application ID (client)</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>OAuth client secret</td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter visualizations during the inventory. See [Rich Filters](#rich-filters).</td>
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

In order to collect metadata, the running user's permissions must allow them to access and read needed applications.

When authenticating with OAuth, you need to configure the following scopes for the OAuth application:

* user_default
* admin_classic
* admin.apps
* apps


## Rich Filters

Qlik Cloud connector benefits from the feature of rich filters in the configuration of the connector.

Available filtering key for Qlik Cloud is the following :

* `name`

Read more: [Filters](zeenea-filters.md).

## Data Extraction

To extract information, the connector runs REST requests on following endpoints:

* **GET** `/api/v1/items`: Get all visible applications
* **GET** `/api/v1/apps/`: Get application metadata
* **GET** `/api/v1/apps//data/metadata`: Get application datamodel
* **GET** `/api/v1/lineage-graphs/nodes/`: Get application lineage
* **GET** `/api/v1/users/`: Get user information
* **GET** `/api/v1/data-connections`: Get all configured data connections

## Collected Metadata

### Inventory

Will collect the list of applications accessible by the user.

## Lineage

Qlik Cloud connector is able to reconstruct the lineage of tables used in applications if they are used directly by them.


<table>
  <tr>
    <th>Source System</th>
    <th>Possible value of `alias` parameter to be set in source system configuration file</th>
  </tr>
  <tr>
    <td>[BigQuery](./zeenea-connector-google-bigquery.md)</td>
    <td>`bigquery.googleapis.com/{project name}`</td>
  </tr>
  <tr>
    <td>[Snowflake](./zeenea-connector-snowflake.md)</td>
    <td>`{snowflake account name}.snowflakecomputing.com/{database name}`</td>
  </tr>
</table>

:::caution[Warning]
If transformations are performed on the source data, Qlik Cloud will convert the data into Qlik files that cannot be interpreted by the connector. As a result, lineage will not be functional.
:::

### Visualization

A Visualization is a Qlik application.

* **Name**: Application name
* **Source Description**: Application description
* **Contacts**
* **Technical Data**:
  * Application Name: Application name
  * Application URL: Application URL
  * Created At: Application creation datetime
  * Modified At: Application update datetime
  * Reloaded At: Application last reload datetime
  * Created By: User name who created the application

### Dataset

A Dataset is a table from application's datamodel:

* **Name**: Table name
* **Source Description**: Table description
* **Technical Data**:
  * Byte Size: Byte size of table data
  * Number of Rows: Number of rows of loaded table

### Field

Dataset field.

* **Name**: Field name
* **Type**: Interpreted type
* **Can be null**: `true` if field is not primary key
* **Multivalued**: `false` by default
* **Primary Key**:`true` if field has `$key` tag

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Qlik application if lineage is found.

* **Name**: `import application-name`

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Visualization</td>
     <td>code/application id</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**application id**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Dataset</td>
     <td>code/application id/table name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**application id**</li>
         <li>**table name**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/application id/table name/field name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**application id**</li>
         <li>**table name**</li>
         <li>**field  name**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Data Process</td>
     <td>code/lineage/application id</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**application id**</li>
       </ul>
     </td>
   </tr>
 </table>
 
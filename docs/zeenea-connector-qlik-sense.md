---
title: Qlik Sense Enterprise on Windows  
---

# Adding a Qlik Sense Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Qlik Sense.
* Zeenea traffic flows towards the data source must be open. 

| Target | Protocol | Usual Ports |
| :--- | :--- | :---- |
| Qlik Sense Server | HTTP/HTTPS | 80/443 |

## Supported Versions

The Qlik Sense connector was developed and tested with Qlik Sense Server version 14.20.5. 

## Installing the Plugin

The Qlik plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a Qlik Sense instance, specifying the following parameters in the dedicated file is required:

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
    <td>The connector type to use for the connection. Here, the value must be `qlik-sense` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Qlik Sense server address (example: `https://hostname.port/virtual-proxy`)</td>
  </tr>
  <tr>
    <td>`connection.auth.key`</td>
    <td>Header name for authentication</td>
  </tr>
  <tr>
    <td>`connection.auth.value`</td>
    <td>Header value for authentication, format: `domain\user name`</td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Qlik Sense servers are delivered by a specific authority. It must contain the certification chain.</td>
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

:::note 
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read applications and sheets that need cataloging. 

Here, the user must have read access to correspondent applications and their sheets from the QRS API.

## Data Extraction

To extract information, the connector runs requests on the Qlik Sense API.

* To collect applications: `/qrs/app/full`
* To collect sheets: `/qrs/app/object/full`

## Collected Metadata

### Inventory

Will collect the list of sheets applications accessible by the user.  

### Visualization

A visualization is a sheet from an application. 

* **Name**: Sheet name
* **Source Description**: Sheet description
* **Contacts**
* **Technical Data**:
  * Application Name
  * Sheet Url
  * Creation Date
  * Modification Date
  * Publish Date

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Visualization</td>
     <td>code/application id/sheet id</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**application id**</li>
         <li>**sheet id**</li>
       </ul>
     </td>
   </tr>
 </table>
 
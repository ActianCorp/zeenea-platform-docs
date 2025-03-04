---
title: Informatica Data Integration  
---

# Adding an Informatica Data Integration Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Informatica Data Integration.
* Zeenea traffic flows towards the data source must be open.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Informatica Data Integration connector was developed and tested with the SaaS version of the product. 

## Installing the Plugin

The Informatica plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with an Informatica Data Integration instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `informatica-data-integration` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Instance address</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
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
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension</td>
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

In order to collect metadata, the running user's permissions must allow them to access and read workflows that need cataloging. 

## Data Extraction

To extract information, the connector runs the following requests on the Rest API:

* `GET /saas/api/v2/workflow`: To collect all the workflows
* `GET /saas/api/v2/mttask/`
* `GET /saas/api/v2/connection/`: To get information about connection

## Collected Metadata

### Synchronize

Will collect the list of workflow accessible by the user.  

### Lineage

The connector is able to retrieve the lineage to existing datasets from the catalog.

### Data Process

A data process is an Informatica workflow. 

* **Name**
* **Source Description**
* **Technical Data**:
  * ID
  * Created At
  * Created By
  * Updated At
  * Updated By


 ## Unique Identifier Keys
 
 A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
 More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Data process</td>
     <td>code/workflow id</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**workflow id**: Informatica technical workflow identifier</li>
       </ul>
     </td>
   </tr>
 </table>
 
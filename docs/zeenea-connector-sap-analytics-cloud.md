---
title: SAP Analytics Cloud  
---

# Adding an SAP Analytics Cloud Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SAP Analytics Cloud.
* Zeenea traffic flows towards the data source must be open. 

## Supported Versions

The SAP Analytics Cloud connector is compatible with the online version of the service. 

## Installing the Plugin

The SAP plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with SAP Analytics Cloud, specifying the following parameters in the dedicated file is required:

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
    <td>The connector type to use for the connection. Here, the value must be `sap-sac` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.oauth.endpoint`</td>
    <td>SAP Analytics Cloud endpoint<br />Example: `https://example.authentication.eu10.hana.ondemand.com/oauth/token`</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Client identifier</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Client secret</td>
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

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read stories that need cataloging. 

In our case, the configuration is done at the OAuth2 client level according to the SAP documentation described in the following article: https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/.

## Data Extraction

To extract information, the connector runs the followings requests on the API:

* `/oauth/token?grant_type=client_credentials`: To authenticate
* `/api/v1/stories?include=models`: To collect all the stories and related models

## Collected Metadata

### Inventory

Will collect the list of stories accessible by the user.  

### Lineage

The connector is able to reconstruct the lineage of the tables used in the stories if they are present in the catalog. This functionality is available when SAP Analytics Cloud uses datasets from the technologies mentioned below. In some cases, it is necessary to specify an additional parameter in the configuration files of the original connections of these tables as it is referenced in the configuration of SAP Analytics Cloud connections.

Summary table of possible values of the `alias` parameter to be completed in the data source configuration file.

| Source System| Model | Example |
| :--- | :--- | :---- |
| [SAP BW](./zeenea-connector-sap-bw-safyr.md) | N/A | N/A |

### Visualization

A visualization is an SAP Analytics Cloud story.

* **Name**
* **Source Description**
* **Technical Data**:
  * SAP Identifier
  * URL
  * Created At
  * Updated At
  * Created By
  * Updated By

### Dataset

A dataset is an SAP Analytics Cloud model. 

* **Name**
* **Source Description**
* **Technical Data**:
  * SAP Identifier

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each SAP Analytics Cloud model.

* **Name**: `import dataset_name`

### Fields

The connector does not return any information about the story fields. They are not exposed by the SAP Analytics Cloud API.

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Visualization</td>
     <td>code/story/technical identifier</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**technical identifier**: SAP technical identifier of the story</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Dataset</td>
     <td>code/model/technical identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**technical identifier**: SAP technical identifier of the model</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Data process</td>
     <td>code/transformation/technical identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**technical identifier**: SAP technical identifier of the model</li>
       </ul>
     </td>
   </tr>
 </table>
 
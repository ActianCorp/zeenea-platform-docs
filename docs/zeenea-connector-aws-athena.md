---
title: AWS Athena
---

# Adding an Athena Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Athena. 
* Zeenea traffic flows towards the data source must be open. 

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::
 
## Supported Versions

The Athena connector is compatible with the web version of the service. 

## Installing the Plugin

The AWS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with an Athena instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `aws-athena` and this value must not be modified. | 
| `connection.aws.profile` | AWS profile | 
| `connection.aws.access_key_id` | AWS key identifier | 
| `connection.aws.access_key_secret` | AWS secret access key | 
| `connection.aws.region` | AWS region | 
| `connection.fetch_page_size` | (Advanced) define the size of batch of items loaded by each request in inventory | 
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. | 
| `tls.truststore.password` | Password of the trust store file | 
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. | 
| `proxy.scheme` | Depending on the proxy, `http` or `https` | 
| `proxy.hostname` | Proxy address | 
| `proxy.port` | Proxy port | 
| `proxy.username` | Proxy username | 
| `proxy.password` | Proxy account password | 
 
## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have followings access:

* athena:GetDataCatalog
* athena:ListDatabases
* athena:GetDatabase
* athena:ListTableMetadata
* athena:GetTableMetadata
 
## Data Extraction

To extract information, the connector runs requests through the AWS SDK:

* AmazonAthena.ListDataCatalogs
* AmazonAthena.ListDatabases
* AmazonAthena.ListTableMetadata
* AmazonAthena.GetTableMetadata
 
## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**: 
  * Creation Date
  * Location
  * Table Type
  * Format
  * Partitioned By
 
### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings
* **Multivalued**: Not supported. Default value `false`.
* **Primary key**: Depending on the "Primary Key" field attribute
* **Technical Data**: 
  * Technical Name
  * Native type
 
## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).

 <table>
   <tr><th>Object</th><th  width="430">Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/region/catalog/schema/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**region**: AWS region</li>
         <li>**catalog**: Object catalog</li>
         <li>**schema**: Object schema</li>
         <li>**dataset name**: Table or view name</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/region/catalog/schema/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**region**: AWS region</li>
         <li>**catalog**: Object catalog</li>
         <li>**schema**: Object schema</li>
         <li>**dataset name**: Table or view name</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
</table>
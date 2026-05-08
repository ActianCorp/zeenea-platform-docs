# Adding an Informatica Data Integration Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Informatica Data Integration.
* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Informatica Data Integration connector was developed and tested with the SaaS version of the product. 

## Installing the Plugin

The Informatica plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with an Informatica Data Integration instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `informatica-data-integration` and this value must not be modified. |
| `connection.url` | Instance address |
| `connection.username` | Username |
| `connection.password` | User password |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

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
 
 More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/workflow id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **workflow id**: Informatica technical workflow identifier |
 
# Adding a Splunk Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Splunk.
* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Splunk connector was developed and tested with version 8.2.4. 

## Installing the Plugin

The Splunk plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with a Splunk instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `splunk` and this value must not be modified. |
| `connection.url` | Database address (example: `https://host:8092/`) |
| `connection.username` | Username |
| `connection.password` | User password |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Splunk servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file. (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have the `User` role access with `get_metadata` access granted.

## Data Extraction

To extract information, the connector runs the followings requests on the Splunk Rest API:

* **GET** `/servicesNS/admin`
* **GET** `/servicesNS/admin/{applicationName}/datamodel/model`

## Collected Metadata

### Inventory

Will collect the list of datasets accessible by the user.

### Dataset

* **Name**
* **Source Description**
* **Technical Data**:
  * Display Name
  * Model Name
  * Modification Date: Last dataset configuration modification date

### Field

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings
* **Multivalued**: Depending on field settings
* **Primary key**: Not supported. Default value `false`.
* **Technical Data**: 
  * Technical Name
  * Native type

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/application name/datamodel name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **application name**<br/>- **datamodel name**<br/>- **dataset name** |
| Field | code/application name/datamodel name/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **application name**<br/>- **datamodel name**<br/>- **dataset name** |

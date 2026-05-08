# Adding a Couchbase Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Couchbase.
* Zeenea traffic flows towards the database must be open. 

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| Couchbase | Java SDK | 8091 |

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Couchbase connector was developed and tested with version 7.0.2. It is compatible with versions 7.0 and later.

## Installing the Plugin

The Couchbase connector can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with a Couchbase instance, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `couchbase` and this value must not be modified. |
| `connection.url` | Database address (example: `couchbase://host:port`) |
| `connection.username` | Username |
| `connection.password` | User password |
| `schema_analysis.sample.size` | Limits the size of the sample for identifying the pattern of collections. Default value is `1000`. |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Kafka servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `tls.keystore.path` | The key Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Couchbase servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.keystore.password` | Password of the key store file. |
| `tls.keystore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging.

Here, the user must have the following roles:

* Read-Only Admin (`ro_admin`)
* Query Select (`query_select[*]`)

For more information, refer to the Couchbase docs: https://docs.couchbase.com/server/current/learn/security/roles.html

## Data Extraction

As Couchbase does not use schemas, knowing datasets format needs identification from data extracting.

This connector uses a sampling request. Because the request is probabilistic, rare fields can't be detected. 

The sample size is defined in the connector. There is no risk of a timeout failure, and no script code is run on the Couchbase server. Some data is read by the connector but it is never saved or sent and is "forgotten" as soon as the information has been extracted. 
  
## Collected Metadata

### Inventory

Will collect the list of collection accessible by the user.  

### Dataset

A dataset is a collection. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Bucket
  * Scope

### Field

Dataset field. 

* **Name**
* **Source Description**: N/A
* **Type**: Field type
* **Can be null**: Depending on field presence 
* **Multivalued**: Depending on field settings
* **Primary Key**: N/A
* Technical metadata:
  * Technical name
  * Native type
 
## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/bucket/scope/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **bucket**: Bucket name<br/>- **scope**: Scope name<br/>- **dataset name**: Collection name |
| Field | code/keyspace/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **bucket**: Bucket name<br/>- **scope**: Scope name<br/>- **dataset name**: Collection name<br/>- **field name** |

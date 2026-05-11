# Adding an Athena Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Athena. 
* Zeenea traffic flows towards the data source must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Athena connector is compatible with the web version of the service. 

## Installing the Plugin

You can download the AWS plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with an Athena instance, fill in the following parameters in the dedicated configuration file:

| Parameter   | Expected Value   |
| ----------- | ---------------- |
| `name` | Specifies the display name for the connection. |
| `code` | Specifies the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | Specifies the type of connector to be used for the connection. The value must be `aws-athena` and must not be modified. |
| `enabled` | Specifies whether to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Specifies the catalog code associated with the connection (`default` when empty). |
| `alias` | Specifies the list of aliases used by other connectors to generate lineage link. <br />For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | Specifies whether to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`. |
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.aws.profile` | Specifies the AWS profile for authentication. |
| `connection.aws.access_key_id` | Specifies the AWS access key identifier. |
| `connection.aws.secret_access_key` | Specifies the AWS secret access key. |
| `connection.aws.session_token` | Specifies the AWS session token. |
| `connection.aws.region` | Specifies the AWS region. |
| `connection.fetch_page_size` | (Advanced) Specifies the size of batch of items loaded by each request in inventory. |
| `tls.truststore.path` | Specifies the TLS trust store file path. This file must be provided in case TLS encryption is activated (protocol `https`) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Specifies the password of the trust store file. |
| `tls.truststore.type` | Specifies the type of the trust store file.<br />Possible values are `PKCS12` or `JKS`. Default value is discovered from the file extension. |
| `tls.bypass_certificate_validation` | Specifies whether to bypass certificate validation. <br />The default value is `false` (recommended to keep `false`). |
| `proxy.scheme` | Specifies the proxy protocol (`http` or `https`). |
| `proxy.hostname` | Specifies the proxy address. |
| `proxy.port` | Specifies the proxy port. |
| `proxy.username` | Specifies the proxy username. |
| `proxy.password` | Specifies the proxy account password. |


## User Permissions

To collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

The user must have following access:

* `athena:GetDataCatalog`
* `athena:ListDatabases`
* `athena:GetDatabase`
* `athena:ListTableMetadata`
* `athena:GetTableMetadata`

## Data Extraction

To extract information, the connector runs requests through the AWS SDK:

* `AmazonAthena.ListDataCatalogs`
* `AmazonAthena.ListDatabases`
* `AmazonAthena.ListTableMetadata`
* `AmazonAthena.GetTableMetadata`

## Collected Metadata

### Inventory

The inventory collects the list of tables and views accessible to the user.  

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
* **Can be null**: Depends on field settings
* **Multivalued**: Not supported. The default value is `false`.
* **Primary key**: Depends on the `Primary Key` field attribute.
* **Technical Data**: 
  * Technical Name
  * Native type

## Object Identification Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.

For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object  | Identifier Key | Description     |
| :------ | :------------- | :-------------- |
| Dataset | code/region/catalog/schema/dataset name  | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **region**: AWS region<br/>- **catalog**: Object catalog<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name |
| Field   | code/region/catalog/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **region**: AWS region<br/>- **catalog**: Object catalog<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name<br/>- **field name** |


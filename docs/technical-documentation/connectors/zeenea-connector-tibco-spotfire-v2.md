# Adding a Tibco Spotfire (V2) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Spotfire.
* Zeenea traffic flows towards the server must be open.

> **Note:** You can find the configuration file template in [tibco-spotfire-v2.conf](https://github.com/zeenea/connector-conf-templates/blob/main/templates/tibco-spotfire-v2.conf).

## Supported Versions

The Spotfire connector was developed and tested with Spotfire Server version 11.6.0.

## Installing the Plugin

You can download the Spotfire plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).
 
To establish a connection with a Spotfire Server instance, fill in the following parameters in the dedicated configuration file: 
 
| Parameter | Expected value |
| :----- | :---------- |
| `name` | Specifies the display name for the connection. |
| `code` | Defines the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `tibco-spotfire-v2` and must not be modified. |
| `enabled` | A boolean value to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Defines the catalog code associated with the connection (`default` when empty). |
| `alias` | The list of aliases used by other connectors to generate lineage link. For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | A boolean value defines secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`.|
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.strategy` | Defines the Spotfire connector strategy.<br />- `webservice`: SOAP integration mode<br />- `database`: JDBC integration mode<br />The default value is `webservice` |
| `connection.url` | **For `webservice` strategy:**<br />- Server address (for example: `https://spotfire.prod.client.ec2`)<br />**For `database` strategy:**<br />- Database JDBC URL (for example: `jdbc:postgresql://server:5432/spotfire_server`) |
| `connection.oauth.client_id` | Applicable only for the `webservice` strategy. <br />Specifies the OAuth2 client ID. |
| `connection.oauth.client_secret` | Applicable only for the `webservice` strategy. <br />Specifies the OAuth2 client secret. |
| `connection.auth_with_session` | Applicable only for the `webservice` strategy. <br />(Optional) The default value is `false`. Set to `true` to use the user session to download the DXP file. |
| `connection.username` | **For `webservice` strategy:**<br />- (Optional) Session user name to download the DXP file.<br />**For `database` strategy:**<br />- JDBC user name. |
| `connection.password` | **For `webservice` strategy:**<br />- (Optional) Session user password to download the DXP file.<br />**For `database` strategy:**<br />- JDBC user password. |
| `connection.jdbc_driver_name` | Applicable only for the `database` strategy.<br />JDBC driver name (for example: `org.postgresql.Driver`) |
| `tls.truststore.path` | Specifies the TLS trust store file path. This file must be provided in case TLS encryption is activated (protocol `https`) and when certificates of Spotfire servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Provides the password of the trust store file. |
| `tls.truststore.type` | Defines the type of the trust store file (`PKCS12` or `JKS`). <br />The default value is discovered from the file extension. |
| `tls.bypass_certificate_validation` | Bypasses certificate validation. <br />The default value is `false` (recommended to keep `false`). |
| `proxy.scheme` | Defines the proxy protocol (`http` or `https`). |
| `proxy.hostname` | Specifies the proxy address. |
| `proxy.port` | Sets the proxy port. |
| `proxy.username` | Provides the proxy username. |
| `proxy.password` | Provides the proxy account password. |
| `cache.enabled` | Enables cache usage. <br />The default value is `false`. |
| `cache.path` | (Optional) Defines a custom cache disk storage path. <br />The default value is the scanner cache folder. |

## User Permissions

To collect metadata, the running user's permissions must allow them to access and read Spotfire analytics that need cataloging.

If the connector's strategy is set to `webservice`, the user must have sufficient permissions to call the library-services web service. The client must have the following permissions:

```bash
export CONFIG_TOOL_PASSWORD=""
scope=-Sapi.soap.library-service
./config.sh register-api-client --tool-password="${CONFIG_TOOL_PASSWORD}" --name=zeenea-scanner $scope --client-profile=other -Gclient_credentials
```

If connector's strategy is set to `database`, configured user must have read access to the following Spotfire tables in associated database:

* `lib_data`
* `lib_items`
* `lib_item_types`
* `lib_resolved_depend`
* `lib_properties`
* `users`
 
## Data Extraction

To extract information, the connector runs requests on the Web Services API. During inventory, the connector collects the list of Spotfire analyses accessible to the configured client. When the connector's strategy is set to `database`, the inventory retrieves data directly from the Spotfire internal database. During inventory, the connector gets the `.dxp` file of the analysis and identifies datasets it contains. When importing datasets or analyses, the connector performs the same extraction from `.dxp` files. If caching is enabled (see `cache.enabled` property), inventory stores the analysis and dataset metadata in the cache and then reads from the cache during import.

## Collected Metadata

### Inventory

Collects the list of analyses and their contained datasets that the user can access.

### Lineage

The Spotfire connector can retrieve the lineage between datasets imported into the catalog. 
Datasets from other connections must be imported into the catalog before they can be linked to a Spotfire dataset.
This feature is available for the following systems. To enable it, an additional parameter is needed in the source system connection as configured in the Spotfire server.

| Source System| **Possible value of `alias` parameter to be assigned in the source system configuration file** |
| :--- | :--- | 
| [AWS Redshift](./zeenea-connector-aws-redshift.md) | `host:port/db` |
| [Tibco Data Virtualization](./zeenea-connector-tibco-data-virtualization.md) | `IP` |


### Visualization

A visualization represents a Spotfire analysis.

* **Name**
* **Source Description**
* **Technical Data**:
  * Path
  * Parent Id
  * Created By Domain Name
  * Modified By Domain Name
  * Creation Date
  * Modification Date
  * Page Count
  * Visualization Count
  * Table Count
  * Column Count
  * Embed All Source Data
  * Size
  * Total Table Load Time

### Dataset

A dataset is a data set used in a Spotfire analysis.

* **Name**
* **Source Description**: Description not retrieved
* **Technical Data**:
  * Database type
  * Catalog name
  * Schema name
  * Table type
  * Dataset group
  
  
### Fields

Dataset field. 

* **Name**
* **Source Description**: Description not retrieved
* **Type**
* **Can be null**: Not supported. Default value is `false`.
* **Multivalued**: Not supported. Default value is `false`.
* **Primary Key**: Not supported. Default value is `false`.
* **Technical Data**:
  * Technical Name
  * Type
  * Native type

## Unique Identifier Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object      | Identification Key  | Description   |
|:----------- | :------------------ | :------------ |
| Visualization | `code/visualization/path/analysis name`  | - **code**: Unique identifier of the connection noted in the configuration file<br />- **path**: Spotfire path to the analysis<br />- **analysis name** |
| Dataset | `code/dataset/path/analysis name/dataset name` | - **code**: Unique identifier of the connection noted in the configuration file<br />- **path**: Spotfire path to the analysis<br />- **analysis name**<br />- **dataset name** |
| Field | `code/dataset/path/analysis name/dataset name/field name` | - **code**: Unique identifier of the connection noted in the configuration file<br />- **path**: Spotfire path to the analysis<br />- **analysis name**<br />- **dataset name**<br />- **field name** |

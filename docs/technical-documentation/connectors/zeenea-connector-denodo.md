# Adding a Denodo Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Denodo.
* Zeenea traffic flows towards the data source must be open. 

!!! warning "Important"
    The Denodo JDBC driver is not included with the connector. Download the Denodo JDBC driver that matches your Denodo instance and copy the `.jar` file to the `/lib-ext` folder of your scanner. You can download the driver for your Denodo version from the resources provided by Denodo:

     * [Denodo 8](https://community.denodo.com/drivers/jdbc/8.0)
     * [Denodo 9](https://community.denodo.com/drivers/jdbc/9)

<br />

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


## Supported Versions

The Denodo connector was developed and tested with version 8.0 and 9.0.

Denodo Connector requires Denodo Data Catalog. This feature is not available in all versions.

In case you don't have this feature in your version, please consider our [Generic JDBC Connector](./zeenea-connector-generic-jdbc.md) instead.
 
## Installing the Plugin

The Denodo plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)
 
In order to establish a connection with a Denodo instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `denodo` and this value must not be modified. | 
| `connection.url` | Denodo Data Catalog address. <br/>For Example: `http://host:9090/denodo-data-catalog`<br/>**Note:** Any query parameters provided in the URL value will be included in the Data Catalog REST API requests made by the connector. |
| `connection.username` | Username |
| `connection.password` |	User password |
| `connection.jdbc.username` | Optional - see configuration template |
| `connection.jdbc.password` | Optional - see configuration template |
| `connection.jdbc.class_name` | Optional - see configuration template |
| `lineage.enabled` | Activates the lineage feature. The default value is `false`.<br /> The JDBC driver must be provided. For more information, see [Prerequisites](#prerequisites). |

| `vdp_server.list` | A space-separated list of VDP servers to inventory. You can specify servers by using a URL in the format `//host:port/admin`, a server ID number, or a combination of both.<br/>If this parameter is left empty (default), the connector inventories all VDP servers configured in the Denodo Data Catalog. <br/>Example: `304 305`<br/>Example: `401 //localhost:9999/admin` |
| `vdp_server.default.uri` | The URL of the default VDP server used to retrieve the list of all configured VDP servers from the Denodo Data Catalog.<br/>Example: `//localhost:9999/admin`  |
| `vdp_server.default.server_id` | The numeric identifier of the default VDP server used to retrieve the list of configured VDP servers.<br/>If neither `vdp_server.default.uri` nor `vdp_server.default.server_id` is specified, Denodo uses VDP server ID `1` by default.<br/>If both properties are specified, they must refer to the same VDP server.<br/>Example: `401` |

| `filter` | To filter datasets during the inventory. See [Filters](#filters) |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Denodo servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` |	Password of the trust store file |
| `tls.truststore.type` |	Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy Username |
| `proxy.password` | Proxy account password |
| `fingerprint.sampling_max_rows` | Max number of lines sampled from fingerprinting |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 
 
## Filters

Since version 1.1.0 of the plugin, the Denodo connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](../scanners/zeenea-filters.md)

The filter can apply to the following criteria:

| Criteria | Description |
| :--- | :--- |
| serverUrl | VDP Server URL<br />Example: `//denodo.example.com:9999/admin` |
| database | Database name |
| table | View name |
| type | View type<br />Possible values: `derived`, `interface`, and `base` |

## Data Extraction

To extract information, the connector runs the following requests on the Denodo Rest API:

* **GET**: `/public/api/configuration/servers`
* **GET**: `/public/api/views`
* **GET** `/public/api/view-details`

## Collected Metadata

### Inventory

Will collect the list of Denodo-derived views accessible by the user.  

### Dataset

A dataset is a Denodo derived view. 

* **Name**
* **Source Description**
* **Technical Data**: 

    * Display Name
    * Model Name
    * Modification Date: Last dataset configuration modification date
    * Path
    * Tags
    * Categories

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. Default value `false`.
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Data**: 

    * Technical Name
    * Native type
 
## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/server identifier/database name/view name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **server identifier**<br/>- **database name**<br/>- **view name** |
| Field | code/server identifier/database name/view name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **server identifier**<br/>- **database name**<br/>- **view name**<br/>- **field name** |

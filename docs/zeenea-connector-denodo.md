---
title: Denodo
---

# Adding a Denodo Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Denodo.
* Zeenea traffic flows towards the data source must be open. 

:::note
A configuration template can be downloaded here: [denodo.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUdyq&d=%2Fa%2FNu000002lgPF%2FAAs4RvtrRAnrwYuW4MZlsaJ.9zatvae68tk6.Rg9ReM&asPdf=false)
:::

## Supported Versions

The Denodo connector was developed and tested with version 8.0 and 9.0.

Denodo Connector requires Denodo Data Catalog. This feature is not available in all versions.

In case you don't have this feature in your version, please consider our [Generic JDBC Connector](./zeenea-connector-generic-jdbc.md) instead.
 
## Installing the Plugin

The Denodo plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Denodo instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `denodo` and this value must not be modified. | 
| `connection.url` | Denodo Data Catalog address. Example: `http://host:9090/denodo-data-catalog`. |
| `connection.username` | Username |
| `connection.password` |	User password |
| `connection.jdbc.username` | Optional - see configuration template |
| `connection.jdbc.password` | Optional - see configuration template |
| `connection.jdbc.class_name` | Optional - see configuration template |
| `filter` | To filter datasets during the inventory. See [Filters](#filters) |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Denodo servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` |	Password of the trust store file |
| `tls.truststore.type` |	Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy Username |
| `proxy.password` | Proxy account password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 
 
## Filters

Since version 1.1.0 of the plugin, the Denodo connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](zeenea-filters.md)

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

## Dataset

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

## Field

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

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/server identifier/database name/view name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**server identifier**</li>
        <li>**database name**</li>
        <li>**view name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/server identifier/database name/view name/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**server identifier**</li>
        <li>**database name**</li>
        <li>**view name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

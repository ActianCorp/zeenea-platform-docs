---
title: SAP BO  
---

# Adding an SAP BO Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to connect to SAP BO.
* Zeenea traffic flows towards the database must be opened. 

:::note
A template of the configuration file can be downloaded here: [sap-bo.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUbsA&d=%2Fa%2FNu000002lg13%2FjreF1E.n796hrp2hMHF2Sx439bB2NS79B2n35_HIsak&asPdf=false).
:::

## Supported Versions

The SAP BO connector is compatible with all recent versions in which the Rest API is exposed (necessary for the connector to access and harvest metadata). 

## Installing the Plugin

The SAP BO connector can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

The following parameters are required in order to establish a connection with SAP BO. 

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
    <td>The connector type to use for the connection. Here, the value must be `sap-bo` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>
      <p>URL towards the SAP BO REST API (e.g., `http://:6405`).</p>
      <p>This URL can be obtained from the Central Management Console (CMC)</p>
    </td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>User’s technical identifier</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`connection.auth_type`</td>
    <td>Authentication type (`secEnterprise`, `secLDAP`, `secWinAD`, `secSAPR3`). Default value `secEnterprise`.</td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (HTTPS protocol) and when the server's certificates have been delivered by a specific Certification Authority. The file must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Trust Store password</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Trust Store type. Possible options are `pkcs12` or `jks`.</td>
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
    <td>Proxy user password</td>
  </tr>
</table>

## User Permissions

In order for the connector to harvest metadata, the running user associated with it must be able to list and read objects that need to be cataloged. 

## Metadata Extraction

To harvest metadata, the connector will run the following API queries:

* **GET & POST** `/biprws/logon/long` : authentication query
* `/universes`
* `/universes/$param`
* `/documents`
* `/documents/$param`
* `/documents/$param/dataproviders`
* `/documents/$param/dataproviders/$param` to harvest all assets (visualizations, datasets, fields)

## Collected Metadata

### Inventory

The inventory lists all visualizations (Webi Documents) the running user has access to. 

### Visualization

A visualization is a Webi Document.

* **Name**
* **Source Description**
* **Technical Data**:
  * SAP ID
  * UUID

### Datasets

A dataset is a Data Provider or an SAP Universe.

* **Name**
* **Source Description**
* **Technical Data**:
  * SAP Identifier
  * RowNumber (Data Provider)
  * Universe type (SAP Universe)

### Fields

One field per table (dataset) column.

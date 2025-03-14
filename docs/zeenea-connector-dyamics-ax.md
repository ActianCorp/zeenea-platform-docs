---
title: Dynamics AX
---

# Adding a Dynamics AX Connection

## Prerequisites

:::note
**To connect Zeenea to Dynamics AX, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.**
:::

## Supported Versions

The Dynamics AX connector compatibility depends on Safyr capability.

## Installing the Plugin

The Silwood Safyr plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Dynamics AX, the following parameters in the dedicated file are required:
 
<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The connector type to use for the connection. Here, the value must be `safyr-dynamicsax` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`input.folder`</td>
    <td>The complete path to the folder containing files from the Silwood Safyr extraction</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## Data Extraction

To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

## Collected Metadata

## Inventory

Will collect the list of objects accessible by the user.  

### Dataset

A dataset is a Dynamics AX object. 

* **Name**
* **Source Description**
* **Technical Data**: 
  * Type
  * Row Count
  * Physical Name
  * Logical Name
 
### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field properties
* **Multivalued**: Depending on field properties
* **Primary Key**: Depending on field properties
* **Technical Data**: 
  * Technical Name
  * Native type
  * Size
  * Data Element
  * Domain
  * Physical Name
  * Logical Name

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/asset type/dataset name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**asset type**: Asset type as defined by Safyr</li>
        <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/asset type/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**asset type**: Asset type as defined by Safyr</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

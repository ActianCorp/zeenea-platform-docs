---
title: Aliyun DataWorks MaxCompute
---

# Adding an Aliyun DataWorks MaxCompute Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Aliyun DataWorks MaxCompute.
* Zeenea traffic flows towards the data source must be open.

:::note
A configuration template can be downloaded here: [aliyun-dataworks-maxcompute.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUeYI&d=%2Fa%2FNu000002lh6n%2F07h__Lafw5Z19SflxfWfXOkTVIGXjkBzqNCk8NYmggc&asPdf=false)
:::

## Installing the Plugin

The Aliyun DataWorks MaxCompute plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Aliyun DataWorks MaxCompute instance, specifying the following parameters in the dedicated file is required:

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
    <td>The connector type to use for the connection. Here, the value must be `aliyun-dataworks-maxcompute` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.region_id`</td>
    <td>The region ID. The complete list is available [here](https://www.alibabacloud.com/help/en/acr/user-guide/region-list).</td>
  </tr>
  <tr>
    <td>`connection.access_key_id`</td>
    <td>The user's access key id.<br /><br />This parameter is optional, the key can be provided through the environment variable `ALIBABA_CLOUD_ACCESS_KEY_ID`.<br /><br />If both are defined, the environment variable will be used.</td>
  </tr>
  <tr>
    <td>`connection.access_key_secret`</td>
    <td>The secret associated to the access key.<br /><br />This parameter is optional, the key can be provided through the environment variable  `ALIBABA_CLOUD_ACCESS_KEY_SECRET`.<br /><br />If both are defined, the environment variable will be used.<br />Example: `export ALIBABA_CLOUD_ACCESS_KEY_SECRET="abc654dqzER54C15674EZcazd"`</td>
  </tr>
  <tr>
    <td colspan="2">**Quota**</td>
  </tr>
  <tr>
    <td>`quota.max_retry`</td>
    <td>Maximum number of retries when a request encounters a quota expiration error.<br /> Default value: `3`.</td>
  </tr>
  <tr>
    <td>`quota.timeout_minute`</td>
    <td>Maximum waiting time when waiting for the availability of a quota, in minutes.<br />Default value: `1` minute.</td>
  </tr>
  <tr>
    <td>`quota.call_per_min`</td>
    <td>Calls per minute quota value. Default value: `50`.</td>
  </tr>
  <tr>
    <td colspan="2">**Proxy**</td>
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
    <td>Proxy account password</td>
  </tr>
</table>

## User Permissions

To collect the items, the technical user must be added to each project that needs cataloging.

## Data Extraction

To extract information, the connector runs requests on following services:

* [ListProjects](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-listprojects): Retrieve all projects.
* [GetMetaDBTableList](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetadbtablelist): Retrieve all project's tables.
* [GetMetaTableBasicInfo](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetatablebasicinfo): Retrieve table's info.
* [GetMetaTableColumn](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetatablecolumn): Retrieve all table's columns.
* [GetMetaTableLineage](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetatablelineage): Retrieve all table's lineage.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Type
  * Creation Date
  * Last Modification Date

## Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. Default value `FALSE`.
* **Multivalued**: Not supported. Default value `FALSE`.
* **Primary Key**: Depending on the field's "Primary Key" attribute.
* **Technical Data**: 
  * Native type
 
## Data Processes

To represent the data flow between tables, a Zeenea Data Process will be created for a table and its ancestors.

* **Name**: `import dataset_name`

## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about how it works can be found here: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/table ID</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**table ID**: Unique ID defined by the source system</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/column ID</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**column ID**: Unique ID defined by the source system</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Data process</td>
    <td>code/import/output table ID</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**output table ID**: Unique ID of the output table</li>
      </ul>
    </td>
  </tr>
</table>

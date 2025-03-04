---
title: Netezza  
---

# Adding a Netezza Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Netezza.
* Zeenea traffic flows towards the data source must be open.


| Target| Protocol | Usual Ports |
| :--- | :--- | :--- |
| Netezza | JDBC | 5480 |

:::note[IMPORTANT]
**The Netezza driver is not delivered with the connector**. Download the Netezza driver related to your Netezza instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: https://www.ibm.com/docs/en/psfa/7.2.1?topic=configuration-installing-uninstalling-client-tools-software
:::

:::note
A configuration template can be downloaded here: [netezza.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgjl&d=%2Fa%2FNu000002leNS%2F9BVybGOtOg1ELjcuy8dxgOOZj1UUO0thGUGCw.n9gNQ&asPdf=false).
:::

## Supported Versions

The Netezza connector was developed and tested with version 7.2.1. 

## Installing the Plugin

From version 54 of the scanner, the Netezza connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a Netezza instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `netezza` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address (example: `jdbc:netezza://main:5490/sales`)</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>
      <p>**Scanner 69 and later**.</p>
      <p>Optional. Rich filter to restrict the inventory scope.</p>
    </td>
  </tr>
  <tr>
    <td>`cache.enabled`</td>
    <td>
      <p>**Scanner 69 and later**.</p>
      <p>Enable the cache functionality. When the cache is activated, the schema update performs four queries in total instead of four per imported table. The result is greater efficiency.</p>
    </td>
  </tr>
  <tr>
    <td>`cache.folder`</td>
    <td>
      <p>**Scanner 69 and later**.</p>
      <p>Folder where caches are stored. The same folder can be used by several connections.</p>
      <p>The size of the cache file produced depends on the number of tables in the database (and not on the number of tables imported into Zeenea).</p>
      <p>If the folder is not specified, the cache is stored in memory.</p>
    </td>
  </tr>
  <tr>
    <td>`cache.ttl`</td>
    <td>
      <p>**Scanner 69 and later**.</p>
      <p>Cache validity period (default `23h`)</p>
      <p>As long as the cache is valid, requests that fill it are not executed.</p>
    </td>
  </tr>
</table>

## Rich Filters

**Scanner 69 and later**.

The Netezza connector benefits from the feature of rich filters in the configuration of the connector. The criteria that can be used to filter the elements are the standard ones for JDBC `schema` and `table`, plus two additional keys to filter objects by type: `type` and `objclass`.

Read more: [Filters](zeenea-filters.md)

The filter can apply to the following criteria:

 <table>
   <tr><th>Criteria</th><th>Description</th></tr>
   <tr>
     <td>schema</td>
     <td>Schema name</td>
   </tr>
   <tr>
     <td>table</td>
     <td>Table or view name</td>
   </tr>
   <tr>
     <td>type</td>
     <td>The name of the type of the object. Possible values are: `TABLE`, `VIEW`, or `MATERIALIZED VIEW`.</td>
   </tr>
   <tr>
     <td>objclass</td>
     <td>
      <p>The number that identify the type of the object.</p>
      <p>Possible values are:</p>
      <ul>
        <li>`4905` (TABLE)</li>
        <li>`4961` (TABLE)</li>
        <li>`4906` (VIEW)</li>
        <li>`4908` (MATERIALIZED VIEW)</li>
      </ul>
    </td>
   </tr>
 </table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have read access to the followings objects from the `DEFINITION_SCHEMA` schema:

* `_T_OBJECT`
* `_T_USER`
* `_T_OBJECT_CLASSES`
* `_T_DESCRIPTION`
* `_T_CONSTRAINT`
* `_T_ATTRIBUTE`
* `_T_CONST_RELATTR`
* `_T_CONST_REFATTR`
* `_T_TYPE`
* `_T_ATTRDEF`

If the data profiling feature was enabled, the user must have read access on impacted tables. Otherwise, this permission is not necessary.

## Data Extraction

To extract information, the connector runs requests on views from the `DEFINITION_SCHEMA` schema.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

## Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Catalog: Source catalog
  * Schema: Source schema
  * Table: table name

### Field

Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings
* **Multivalued**: Not supported. Default value `false`.
* **Primary key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type
  * Default Value


## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For Netezza technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table tableName.

```
SELECT
   field1, field2
   FROM tableName
   ORDER BY RANDOM() LIMIT 10000
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit of collected rows is 10.000.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Unique Identification Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/schema/dataset name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**schema**: Object schema</li>
         <li>**dataset name**: Table or view name</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/schema/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**schema**: dataset schema</li>
         <li>**dataset name**: Table or view name</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
 </table>
 
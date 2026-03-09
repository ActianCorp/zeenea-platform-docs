# Adding a Netezza Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Netezza.
* Zeenea traffic flows towards the data source must be open.

| Target| Protocol | Usual Ports |
| :--- | :--- | :--- |
| Netezza | JDBC | 5480 |

!!! important
    The Netezza driver is not delivered with the connector. Download the Netezza driver related to your Netezza instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: [https://www.ibm.com/docs/en/psfa/7.2.1?topic=configuration-installing-uninstalling-client-tools-software](https://www.ibm.com/docs/en/psfa/7.2.1?topic=configuration-installing-uninstalling-client-tools-software)

<br />

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Netezza connector was developed and tested with version 7.2.1. 

## Installing the Plugin

From version 54 of the scanner, the Netezza connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../../Features/zeenea-administration/zeenea-managing-connections.md)

In order to establish a connection with a Netezza instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
| --- | --- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `netezza` and this value must not be modified. |
| `connection.url` | Database address (example: `jdbc:netezza://main:5490/sales`) |
| `connection.username` | Username |
| `connection.password` | User password |
| `filter` | **Scanner 69 and later**.<br/>Optional. Rich filter to restrict the inventory scope. |
| `cache.enabled` | **Scanner 69 and later**.<br/>Enable the cache functionality. When the cache is activated, the schema update performs four queries in total instead of four per imported table. The result is greater efficiency. |
| `cache.folder` | **Scanner 69 and later**.<br/>Folder where caches are stored. The same folder can be used by several connections.<br/>The size of the cache file produced depends on the number of tables in the database (and not on the number of tables imported into Zeenea).<br/>If the folder is not specified, the cache is stored in memory. |
| `cache.ttl` | **Scanner 69 and later**.<br/>Cache validity period (default `23h`)<br/>As long as the cache is valid, requests that fill it are not executed. |

## Rich Filters

**Scanner 69 and later**.

The Netezza connector benefits from the feature of rich filters in the configuration of the connector. The criteria that can be used to filter the elements are the standard ones for JDBC `schema` and `table`, plus two additional keys to filter objects by type: `type` and `objclass`.

Read more: [Filters](../Scanners/zeenea-filters.md)

The filter can apply to the following criteria:

| Criteria | Description |
| --- | --- |
| schema | Schema name |
| table | Table or view name |
| type | The name of the type of the object. Possible values are: `TABLE`, `VIEW`, or `MATERIALIZED VIEW`. |
| objclass | The number that identify the type of the object.<br/>Possible values are:<br/>- `4905` (TABLE)<br/>- `4961` (TABLE)<br/>- `4906` (VIEW)<br/>- `4908` (MATERIALIZED VIEW) |
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

### Dataset

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

!!! important
    The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](../../Features/cross-application-features/zeenea-data-profiling.md).

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

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](../Scanners/zeenea-scanner-setup.md).

## Unique Identification Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md).
  
| Object | Identification Key | Description |
| --- | --- | --- |
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Object schema<br/>- **dataset name**: Table or view name |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: dataset schema<br/>- **dataset name**: Table or view name<br/>- **field name** |
 
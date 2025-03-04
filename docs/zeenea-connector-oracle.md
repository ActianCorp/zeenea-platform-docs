---
title: Oracle  
---

# Adding an Oracle Connection

## Prerequisites

* In order to connect an Oracle Database, an Oracle user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards the database must be open.

:::note[IMPORTANT]
**The Oracle JDBC driver is no longer provided with the connector starting from scanner version 41 (and beyond)**. Download the Oracle driver for your Oracle instance and move it to the /lib-ext folder of your scanner. You can find the driver in the sources provided by the vendor on their website: https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html.
:::

:::note
A configuration template can be downloaded here: [Oracle.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUTTH&d=%2Fa%2FNu000002lek2%2FeSkkr61nkCROhUx9ZqdydTtweb2StDPUGD31bOZHZ1Q&asPdf=false)
:::

## Supported Versions

The connector has been developed and tested with Oracle 11.2.0, and supports all following versions. It is compatible with the PolarDB versions of the Alibaba Cloud service as well as with the RDS versions of the Amazon Cloud service.

## Installing the Plugin

From version 54 of the scanner, the Oracle connector is presented as a plugin and can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with an Oracle instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `Oracle` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>A database URL. Oracle documentation can be accessed [here](https://docs.oracle.com/database/121/JJDBC/urls.htm#JJDBC28267). There are many possible syntaxes.</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>User with enough permissions to extract metadata and gather data statistics</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`connection.tcps_authentication`</td>
    <td>
      <p>Set to `true` to activate user authentication through TCPS. Client certificate must be set up to enable authentication.</p>
      <p>**NOTE**: This is the Oracle user authentication instead of the usual login & password. This is in addition to the client authentication when establishing the connection. Requires client Trust Store setting `tls.keystore`.</p>
    </td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>
      <p>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Oracle servers are delivered by a specific authority. It must contain the certification chain.</p>
      <p>**NOTE**: Oracle `ewallet.p12` and `cwallet.sso` implement a very specific version of PKCS#12, that is not compatible with Java. Thus, it is not possible to use them directly: you will need to create a new `*.p12` or `*.jks` trust store using the keytool.</p>
    </td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file: `pkcs12` or `jks`</td>
  </tr>
  <tr>
    <td>`oracle.tableset`</td>
    <td>Change the table set used for metadata collection. Can have two values:  `dba` or `all`. Default value is `dba`. When `dba` tableset is used, the Zeenea Oracle user required select permissions on the `DBA_*` views. When `all` tableset is used, the Zeenea Oracle user required select permissions on any table that need to be imported.</td>
  </tr>
  <tr>
    <td>`lineage.view.enabled`</td>
    <td>Set to `true`to activate the lineage feature. Default value `false`.</td>
  </tr>
</table>

## Rich Filters

The Oracle connector benefits from the feature of rich filters in the configuration of the connector. The keys that can be used to filter the elements are the standard ones for JDBC (`schema` and `table`).

The filter can apply to the following criteria:

* `schema`: Schema name
* `table`: Table or view name

Read more: [Filters](zeenea-filters.md)

## User Permissions

The Oracle User must have enough permissions to extract metadata and gather data statistics.

Oracle connector provides two different strategies:

* If `oracle.tableset` mode is set to `ALL`, the Oracle user will need to have `SELECT` access to the tables and view that needs to be cataloged.
* If `oracle.tableset` mode is set to `DBA` (default mode) connector will only use system views `DBA_*`. As a side effect, `SELECT` access to tables is not needed.

When using `DBA` mode, in order to extract metadata, the user will need to have a read-only access on the following tables and views:

* `dba_tab_columns`
* `dba_tab_comments`
* `dba_col_comments`
* `dba_constraints`
* `dba_cons_columns`
* `dba_objects`
* `dba_views`
* `dba_mviews`
* `dba_mview_comments`

If the data profiling feature was enabled, the user must have read access on impacted tables. Otherwise, this permission is not necessary.

## Collected Metadata

### Inventory

The inventory will collect the names of tables and their schemas, with the exception of tables belonging to the following schemas:

* `APEX`
* `APEX_%`
* `APPQOSSYS`
* `CTXSYS`
* `DBSNMP`
* `EXFSYS`
* `FLOWS_FILES`
* `MDSYS`
* `ORDDATA`
* `ORDSYS`
* `OUTLN`
* `SYS`
* `SYSMAN`
* `SYSTEM`
* `WMSYS`
* `XDB`
* `HR`

### Lineage

From version 49 of the scanner, the connector has the lineage feature on the views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

## Dataset

One dataset per table or view.

* **Name**
* **Source Description**: Table comment (`COMMENT ON TABLE`)
* **Primary key**: Yes, shown on the impacted Field type assets
* **Foreign keys**: Yes, not shown
* **Technical Data**:
  * schema name
  * table name
  * Table structure last update (LAST_DDL_TIME)
  * Type, possible values:
    * `CLUSTER`
    * `FUNCTION`
    * `INDEX`
    * `PACKAGE`
    * `PACKAGE BODY`
    * `PROCEDURE`
    * `SEQUENCE`
    * `SYNONYM`
    * `TABLE`
    * `TRIGGER`
    * `VIEW`

### Field

One per table field.

* **Name**
* **Source Description**: Column comment (`COMMENT ON COLUMN`)
* **Native type**: Oracle type rebuilt from Oracle metadata
* **Nullable**: Yes
* **Multivalued**: No

### Data Process

A data process represents the request to build a view.

* **Name**: `CREATEVIEW view-name`

## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For Oracle technologies, the connector executes the following request to get a data sample:

`SELECT COUNT(*) AS result FROM tableName` 

The request above defines the number of rows in the table tableName.

```
SELECT
   field1, field2
   FROM tableName
   SAMPLE (linesPercentage)
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/schema/dataset name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**schema**: Dataset schema</li>
         <li>**dataset name**</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/schema/dataset name/field name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**schema**: Dataset schema</li>
         <li>**dataset name**</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
 </table>
 
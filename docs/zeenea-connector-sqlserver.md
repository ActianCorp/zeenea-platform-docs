---
title: SQL Server
---

# Adding a SQL Server Connection

# Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Microsoft SQL Server.  
* Zeenea traffic flows towards SQL Server must be open.
* The only authentication mode supported by this connector requires the user's username and password.

:::note
A configuration template can be downloaded here: [SqlServer.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUa4v&d=%2Fa%2FNu000002lefD%2Fm7WHUv8_cdHEZLMMHkLzci43OnXCgHcO1yCe0m9wU3U&asPdf=false).
:::
 
## Supported Versions

The SQL Server connector was tested with the 2019 version and is compatible with all versions of the software. It is compatible with the Azure versions of the Microsoft service as well as with the RDS versions of the Amazon Cloud service.

## Installing the Plugin

From version 54 of the scanner, the SQL Server connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Version 65 and later

Integrated authentication is available for Windows. It requires configuration, which is carried out automatically when the Windows service is declared, provided the plug-in has been installed beforehand.

Each time the scanner or plug-in is updated, it will be necessary to update the service with the same procedure as for installation.

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with an SQL Server instance, specifying the following parameters in the dedicated file is required:
 
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
    <td>The connector type to use for the connection. Here, the value must be `SqlServer` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database URL<br /> Example: `jdbc:sqlserver://example.test.net;database=my_db;encrypt=true`</td>
  </tr>
  <tr>
    <td>`connection.database`</td>
    <td>Database name</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>User name. Can be the ID client of the Azure service principal.</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password. Can be the secret of the Azure service principal.</td>
  </tr>
  <tr>
    <td>`multi_catalog.enabled`</td>
    <td>
      <p>To activate multi-database connection configuration. Not compatible with Azure SQL Server. Default value `false`.</p>
      <p>**The "multi catalog" mode makes the connector incompatible with the lineage features available from some of other connectors such as PowerBI SaaS, etc.**</p>
    </td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter datasets during the inventory. See [Rich Filters](#rich-filters).</td>
  </tr>
  <tr>
    <td>`lineage.view.enabled`</td>
    <td>
      <p>To activate the lineage feature. Default value `false`.</p>
      <p>Example: `includes = "enterprise,equals:customers,contains:prod"`</p>
    </td>
  </tr>
  <tr>
    <td>`lineage.storedproc.enabled`</td>
    <td>
      <p>Enables the lineage on Stored Procedures (`false` by default)</p>
      <p>**Note**: This feature has technical limitation due to information provided by the database system catalog. The relation between the stored procedure and tables in another catalog (database) is not available. Queries containing temporary (#) tables are ignore by the db engine.</p>
      <p>So temporary tables are not part of the lineage, but table referenced by the request will be ignored as well, except if they are used in another query</p>
    </td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the permissions the technical account has must allow him to access and read databases that need cataloging.

The connector uses system views `sys.*`. To extract metadata, the user will need to have read-only access on the following tables and views: 

* `sys.objects`
* `sys.schemas`
* `sys.columns`
* `sys.types`
* `sys.extended_properties`

Information about primary and foreign keys are collected from the following procedures:

* `sp_pkeys`
* `sp_fkeys`

To collect this information, the zeenea user defined in the connection configuration must be able to connect to selected databases and also be granted the following permission:

`grant VIEW ANY DEFINITION to zeenea;`

If the lineage feature is enabled, the user must have read access to the followings tables:

* `sys.sql_expression_dependencies`
* `sys.objects`

If the data profiling feature is enabled, the user must have read access to impacted tables. Otherwise, this permission is not necessary.

## Rich Filters

Since version 47 of the scanner, the SQL Server connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](zeenea-filters.md).

## Data Extraction

To extract information, the connector runs requests on views from the sys schema.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Lineage

From version 47 of the scanner, the connector has the lineage feature on the views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Schema
  * Table
  * Rows
  * Type:
    * USER_TABLE
    * VIEW

### Fields

Table or view field.

* **Name**
* **Source Description**: Not supported
* **Type**
* **Can be null**: Depending on the field settings
* **Multivalued**: Not supported. Default value `FALSE`.
* **Primary Key**: Depending on the field "Primary Key" attribute
* **Technical Data**:
  * Technical Name
  * Native type: Field native type
 
### Data Process

A data process represents the request to build a view.

* **Name**: `CREATEVIEW "view-name"`
 
# Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: [Data Profiling](./zeenea-data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For SQL Server technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table tableName.

```
SELECT
   field1, field2
   FROM tableName
   TABLESAMPLE (linesPercentage)
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

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

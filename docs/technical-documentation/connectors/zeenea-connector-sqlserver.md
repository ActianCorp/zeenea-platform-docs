# Adding a SQL Server Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Microsoft SQL Server.
* Zeenea traffic flows towards SQL Server must be open.
* The only authentication mode supported by this connector requires the user's username and password.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).
 
## Supported Versions

The SQL Server connector was tested with the SQL Server 2019 and is compatible with all versions of the software. It is compatible with the Azure versions of the Microsoft service as well as with the RDS versions of the Amazon Cloud Service.

## Installing the Plugin

From version 54 of the scanner, the SQL Server connector is presented as a plugin.

The plugin can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Version 65 and later

Integrated authentication is available for Windows. It requires configuration, which is carried out automatically when the Windows service is declared, provided the plugin has been installed beforehand.

Each time the scanner or plugin is updated, you must update the service using the same installation procedure.

## Declaring the Connection
  
Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with an SQL Server instance, fill in the following parameters in the dedicated configuration file:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `SqlServer` and this value must not be modified. |
| `connection.url` | Database URL<br/> Example: `jdbc:sqlserver://example.test.net;database=my_db;encrypt=true` |
| `connection.database` | Database name |
| `connection.username` | User name. Can be the client ID of the Azure service principal. |
| `connection.password` | User password. Can be the secret for the Azure service principal. |
| `multi_catalog.enabled` | To activate multi-database connection configuration. Not compatible with Azure SQL Server. Default value `false`.<br/>**The "multi catalog" mode makes the connector incompatible with the lineage features available from some other connectors, such as Power BI SaaS.** |
| `filter` | To filter datasets during the inventory. See [Rich Filters](#rich-filters). |
| `lineage.view.enabled` | To activate the lineage feature. Default value `false`.<br/>Example: `includes = "enterprise,equals:customers,contains:prod"` |
| `lineage.storedproc.enabled` | Enables the lineage on Stored Procedures (`false` by default).<br/>**Note**: This feature has technical limitation due to information provided by the database system catalog. The relation between the stored procedure and tables in another catalog (database) is not available. Queries containing temporary (#) tables are ignored by the db engine.<br/>So, temporary tables are not part of the lineage, but tables referenced by the request will be ignored as well, except if they are used in another query. |

## User Permissions

To collect metadata, the technical account must have permissions to access and read databases that need to be cataloged. 

The connector uses system views `sys.*`. To extract metadata, the user must have read-only access to the following tables and views: 

* `sys.objects`
* `sys.schemas`
* `sys.columns`
* `sys.types`
* `sys.extended_properties`

Information about primary and foreign keys is collected using the following procedures:

* `sp_pkeys`
* `sp_fkeys`

To collect this information, the Zeenea user defined in the connection configuration must be able to connect to the selected databases and must be granted the following permission:

`grant VIEW ANY DEFINITION to zeenea;`

If the lineage feature is enabled, the user must have read access to the following tables:

* `sys.sql_expression_dependencies`
* `sys.objects`

If the data profiling feature is enabled, the user must have read access to impacted tables. Otherwise, this permission is not required.

## Rich Filters

Since version 47 of the scanner, the SQL Server connector supports rich filter feature in its configuration.

For more information, see [Filters](../Scanners/zeenea-filters.md).

## Data Extraction

To extract information, the connector runs requests on views from the sys schema.

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Lineage

From version 47 of the scanner, the connector has the lineage feature for views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

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
 
## Data Profiling

> **Important:** The Data Profiling feature, which can be enabled on this connection, allows Explorers to better understand the type of data stored in each field. This feature, which can be activated in the Scanner, runs by default on a weekly schedule, every Saturday. However, depending on the number of fields for which you enable this feature, the calculation can quickly become costly. Before enabling it, ensure that the estimated impact of this feature is acceptable and that the default frequency is appropriate.

The statistical profiles feature, also known as _Data Profiling_, is available for this connector. The impact of this feature must be evaluated before activating it on any of your connections. For more information about the resulting statistics, see [Data Profiling](../Zeenea_Explorer/zeenea-data-profiling.md).

To activate this feature, read access to the target tables is required. For SQL Server technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table `tableName`.

```
SELECT
   field1, field2
   FROM tableName
   TABLESAMPLE (linesPercentage)
``` 

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](../Scanners/zeenea-scanner-setup.md).

## Unique Identifier Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |

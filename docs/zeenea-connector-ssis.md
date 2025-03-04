---
title: SSIS - SQL Server Integration Services
---

# Adding an SSIS Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SSIS.  
* Zeenea traffic flows towards the ETL must be open. 

The only authentication mode supported by this connector requires the user's username and password.

:::note
A configuration template can be downloaded here: [SqlServer.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUa4v&d=%2Fa%2FNu000002lefD%2Fm7WHUv8_cdHEZLMMHkLzci43OnXCgHcO1yCe0m9wU3U&asPdf=false).
:::
 
## Supported Versions

The SSIS connector is compatible with SSIS 2019. 

## Installing the Plugin

The SSIS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with SSIS, the following parameters in the dedicated file are required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `ssis` and this value must not be modified.</td>
  </tr>
  <tr>
    <td colspan="2">**File System Mode**</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>(Optional) Path to the Visual Studio SSIS project directory to synchronize with the catalog</td>
  </tr>
  <tr>
    <td colspan="2">**JDBC Mode**</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>
      <p>(Optional) JDBC Url used to connect to the SSIS Server.</p>
      <p>The connection path will be used, when this parameter and the connection.path are set.</p>
      <p>In the connection string, the JDBC parameter `databaseName` must be set with `SSISDB` value.</p>
      <p>Example:</p>
      <p>`jdbc:sqlserver://;serverName=server_address;databaseName=SSISDB;encrypt=false;integratedSecurity=true;authenticationScheme=NTLM;useNTLMv2=true;domain=xyz`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>User name, without the domain</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td colspan="2">**Filter**</td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter visualizations during the inventory. See [Rich Filters](#rich-filters).</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the user must have sufficient privileges to list and read the transformations to be cataloged.

In our case, the rights of the service principal must be able to execute the queries described in the following link. The connector works with a built-in principal and not a SQL Server user.

Microsoft Documentation: [SSIS Catalogue - Permissions ](https://learn.microsoft.com/en-us/sql/integration-services/catalog/ssis-catalog?view=sql-server-ver16#Permissions)

## Rich Filters

The SSIS connector benefits from the feature of rich filters in the configuration of the connector. The key that can be used to filter the elements is `package`.

Read more: [Filters](zeenea-filters.md).

## Data Extraction

### File System Mode

When using the File System mode, the connector will discover `*.dtsx` and `*.conmgr` files in the given folder to find transformations.

### JDBC Mode

When using the JDBC Mode, the connector will run the following queries on the SSISDB system to retrieve the SSIS projects to be modeled:

#### To retrieve the list of available projects:

```
select f.name, p.name
    from catalog.projects p
    join catalog.folders f
    on p.folder_id = f.folder_id
```

#### To get the project files:

`catalog.get_project ?, ?`

## Collected Metadata

### Synchronization

The connector will synchronize all the transformations identified in the project to automatically represent them in the catalog.

### Lineage

The SSIS connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to data processes. This feature is available for the following JDBC connections:

* [PostgreSQL](./zeenea-connector-postgresql.md)
* [AWS Redshift](./zeenea-connector-aws-redshift.md)
* [SQL Server](./zeenea-connector-sqlserver.md)
* [Oracle](./zeenea-connector-oracle.md)
* [Snowflake](./zeenea-connector-snowflake.md)

To do so, an additional parameter is needed in the JDBC connection, as detailed below:

`alias = ["host:port/database"]`
 
In this instance, variables host, port and database need to be replaced with the actual JDBC values.

### Data Process

A data process is the representation of an SSIS transformation. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Process Name
  * Process Creation Date
  * Process Last Modification Date
  * Process Creator Name

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Data process</td>
    <td>code/transformation id</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**transformation id**: Transformation technical SSIS id</li>
      </ul>
    </td>
  </tr>
</table>

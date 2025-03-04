---
title: Talend ETL
---

# Adding a Talend Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Talend.
* Zeenea traffic flows towards the ETL must be open. 

## Supported Versions

The Talend connector is compatible with Talend Open Studio version 7.3 and higher. 

## Installing the Plugin

The Talend plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Talend, the following parameters in the dedicated file are required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `talend` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>Path of the directory containing Talend projects to synchronize with the catalog.</td>
  </tr>
  <tr>
    <td>`context.name`</td>
    <td>
      <p>(Optional) Used by the connector to get parameters stored in the job context for resolving values in jobs like database, schema, URL, etc.</p>
      <p>May contain values separate by a comma order by priority.<br />Example: `context.name = "DEV, PROD, Default"`</p>
      <p>If empty, the connector will use the last context name use in the job.</p>
    </td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter data processes during the synchronization. See [Rich Filters](#rich-filters).</td>
  </tr>
  <tr>
    <td>`multi_catalog.enabled`</td>
    <td>Set to `true` if the dataset source system is also configured as `multi catalog`. Default value `false`.</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the user the scanner is executed with must have enough privileges to access and read files from the directory specified in the dedicated parameter.


## Rich Filters

Since version 47 of the scanner, the Talend connector benefits from the feature of rich filters in the configuration of the connector. The key that can be used to filter the elements is `job`.

Read more: [Filters](zeenea-filters.md)

## Data Extraction

To extract information, the connector will parse the `.items` and `.properties` files of the directory to identify the transformations and the datasets linked to them.
 
## Collected Metadata

## Synchronization

The connector will synchronize all transformations identified in the project and automatically represent them in the catalog.

## Lineage

The Talend connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog in order to be linked to data processes. This feature is available for the following JDBC connections:

* [PostgreSQL](./zeenea-connector-postgresql.md)
* [AWS Redshift](./zeenea-connector-aws-redshift.md)
* [SQL Server](./zeenea-connector-sqlserver.md)
* [Oracle](./zeenea-connector-oracle.md)
* [Snowflake](./zeenea-connector-snowflake.md)

To do so, an additional parameter is needed in the JDBC connection, as detailed below:

* If `multi_catalog.enabled = false`:

    `alias = ["host:port/database"]`
 
* If `multi_catalog.enabled = true`:

    `alias = ["host:port"]`
 
In this instance, variables host, port and database need to be replaced with the actual JDBC values.

### Data Processes

A data process is the representation of a Talend transformation. 

* **Name**
* **Description**
* **Technical Data**:
  * Job name
  * Job ID
  * Job objective
  * Job version
  * Job creation date
  * Job last modification date

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
     <td>Data process</td>
     <td>code/identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**identifier**: Talend transformation technical identifier</li>
       </ul>
     </td>
   </tr>
 </table>
    

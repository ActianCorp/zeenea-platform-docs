---
title: SSAS - SQL Server Analysis Services
---

# Adding an SSAS Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SSAS.

## Installing the Plugin

The SSAS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with SSAS, the following parameters in the dedicated file are required:
 
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
    <td>The connector type to use for the connection. Here, the value must be `ssas` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>
      <p>Path to the SSAS project directory to synchronize with the catalog. These files will be parsed:</p>
      <ul>
        <li>`.cube` : cube file</li>
        <li>`.ds`: reference datasource file</li>
        <li>`.dsv`: reference datasource view file</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>URL to the data pump `MSMDPUMP.dll`</td>
  </tr>
  <tr>
    <td>`connection.server_mode`</td>
    <td>
      <p>Server or project mode for SSAS. Accepted values are:</p>
      <ul>
        <li>Empty or `tabular`: The target server/project is configured in "Tabular" mode.</li>
        <li>`multidimensional`: The target server/project is configured in "Multidimensional" mode.</li>
      </ul>
    </td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read files from the directory specified in the dedicated parameter.

When the URL parameter is configured, the connector goes through the `MSMDPUMP.dll` data pump.

For more information, refer to [Configure HTTP Access to Analysis Services on IIS 8.0](https://learn.microsoft.com/en-us/analysis-services/instances/configure-http-access-to-analysis-services-on-iis-8-0?view=asallproducts-allversions&redirectedfrom=MSDN).

## Data Extraction

To extract information, the connector runs requests on views from the `pg_catalog schema`.

## Collected Metadata

### Lineage

The connector only handles lineage from SQL queries. **M scripts are not handled**.

The connector is capable of reconstructing the lineage of manipulated tables in transformations if they are present in the catalog. This functionality is available when SSAS manipulates datasets from the following technologies:

* SqlServer

In this case, it is necessary to specify an additional parameter in the original connections of these tables following the format:

`alias = ["<host>:<port>/<database>"]`
 
where the variables `<host>`, `<port>`, and `<database>` are replaced with the values from the original connections.

### Dataset

A dataset corresponds to a table for a SSAS server in "Tabular" mode or a cube for a server in "Multidimensional" mode.

* **Name**
* **Source Description**
* **Technical Data**: 
  * Catalog
  * Creation date
  * Last modification date
 
### Field

A field is a field within a dataset.

* **Name**
* **Source Description**
* **Type**
* **Can be null**
* **Multivalued (Mode "Multidimensional" only)**
* **Primary Key**
* **Technical Data**: 
  * "Multidimensional" Mode:
    * Field Type (dimension or measure)
    * Measure Group
    * Aggregate Function
    * The table associated with the measure
    * Column associated with the measure
  * "Tabular" Mode:
    * Is Hidden
    * Is Unique
    * Last Modification Date

### Data Process

A data process represents lineage between a cube/table and its sources.

* **Name**: `CREATEVIEW view-name`
* **Input**: Datasets as input to the process
* **Output**: Dataset as output to the process
* **Technical  Data**:
  * "Tabular" Mode:
    * SQL Query used

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/catalog/[table or cube]</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**catalog**: Name of the catalog</li>
        <li>**table or cube**: Name of the table or cube</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/catalog/[table or cube]/column</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**catalog**: Name of the catalog</li>
        <li>**table or cube**: Name of the table or cube</li>
        <li>**column name**: Name of the column, the measure, or the dimension</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Data process</td>
    <td>code/catalog/dataprocess/import [table or cube]</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**catalog**: Name of the catalog</li>
        <li>**transformation**: Name of this transformation</li>
      </ul>
    </td>
  </tr>
</table>

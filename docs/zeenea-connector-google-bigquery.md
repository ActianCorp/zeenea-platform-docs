---
title: Google BigQuery
---

# Adding a BigQuery Connection

## Prerequisites

* In order to establish a connection to Google BigQuery, a BigQuery user with sufficient [permissions](#user-permissions) is required.
* Zeenea traffic flows towards Google BigQuery must be open.

Zeenea uses Google HTTP API to collect metadata. 

| Target| Protocol | Usual Ports |
| :--- | :--- | :--- |
| BigQuery | HTTPS | 443 |

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The BigQuery connector has been successfully tested with the Web version. 

There are two possible forms for this connector: 

* **BigQuery**: This connector will catalog all BigQuery tables for one project
* **BigQueryOrganization**: This connector catalogs all tables, for all projects inside an organization. The BigQueryOrganization connector allows for larger access to an organization's data, but it also requires a user with more permissions.

## Installing the Plugin

From version 54 of the scanner, the SQL Server connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with BigQuery, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `BigQuery` for project level or `BigQueryOrganization` for organization level. This value must not be modified. | 
| `connection.json_key` | Path to the access JSON Key. |
| `connection.billing_project_id` | (Optional) Identifier of the project used for the connection. The Google invoice is for this project. By default, one connection is established for each project that is scanned.<br /><br />NOTE: The retrieval of PK, FK requires this parameter. |
| `filter` | To filter datasets during the inventory. See [Rich Filters](#rich-filters). |
| `inventory.partition.pattern` | Parameter for confusing datasets represented in several tables. Must be completed with the variable part of the tables name. See examples in the template file. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

#### For project level only

 Parameter| Expected Value |
| :--- | :--- |
| `connection.project_id` | Project identifier |
| `fingerprint.project_id` | Specific Project ID |
| `fingerprint.json_key` | Path to the specific project access JSON Key |

## User Permissions

In order to collect metadata, the user permissions must allow them to list and read all sources that need to be cataloged. 
 
### Roles

To extract metadata, the technical account must have the following predefined roles: 

* For the BigQueryOrganization connector:
  * On the project where the service account is being managed:
    * Project/Browser (roles/Browser)
    * BigQuery Metadata viewer (roles/bigquery.metadataviewer)
  * On all projects that need to be cataloged:
    * BigQuery Metadata Viewer (roles/bigquery.metadataviewer)
* For the BigQuery connector:
   * On the project that needs to be cataloged:
     * BigQuery Metadata Viewer (roles/bigquery.metadataviewer)

The running user will also need this specific authorization: bigquery.jobs.create (required in order to retrieve Primary Keys & Foreign Keys)

If the data profiling feature is enabled, another technical account is used. The project on which the data profiling feature should focus also needs to be specified and the running user needs to have a read access on its tables.  

* BigQuery/BigQuery Data Viewer (roles/bigquery.dataViewer)

## Rich Filters

Since version 47 of the scanner, the BigQuery connector benefits from the feature of rich filters in the configuration of the connector. This functionality also applies if on the metadata "Roles" of the datasets.

Read more: [Filters](zeenea-filters.md)

The filter can apply to the following criteria:

| Criteria | Description | Connector |
| :--- | :--- | :--- |
| project | Google Cloud project name | BigQueryOrganization |
| dataset | BigQuery dataset name | BigQueryOrganization<br />BigQuery |
| table | Table or view name | BigQueryOrganization<br />BigQuery |

## Data Extraction

At the project level, the connector will crawl through all data sources to extract information. This action will be done on all projects at the organization level.

## Collected Metadata

### Inventory

The inventory collects all data sources that the user can access. 

## Dataset

A dataset is a Denodo derived view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Dataset Id
  * Table Id
  * Project
  * Dataset
  * Table
  * Type
  * Created
  * Expiration
  * Last modified
  * Long-Term Storage Size (bytes)
  * Number of rows
  * Size (bytes)
  * Data location
  * Is partitioned
  * Partitioned by
  * Partitioned on field
  * Clustered by
  * Labels

## Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field settings
* **Multivalued**: `TRUE` if the field type is `STRUCT`, `FALSE` otherwise
* **Primary Key**: Depending on field settings
* **Technical Data**:
  * Technical Name: Field technical name
  * Native type: Field native type
 
## Data Profiling

:::caution[IMPORTANT]
The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.
:::

The data profiling feature allows you to calculate statistical profiles on your datasets.More information on this feature can be found here: [Data Profiling](./zeenea-data-profiling.md).

To activate this feature, the account used must have a read access on the relevant tables. 

In order to retrieve the statistical profiles in BigQuery, the following requests are executed: 

`SELECT count(*) AS result FROM tableName`
 
The above request is used to determine the number of lines in the tableName table. Afterwards, the connector will then determine the size of the targeted data with the following request: 

```
SELECT sum(size_bytes) AS size
FROM datasetName.__TABLES__
WHERE table_id = 'tableId'
``` 
 
Knowing the size of the targeted data is important, as it is necessary for the algorithm to choose the most appropriate sampling request (otherwise, it would have to scan the entire table). 

#### Scenario 1, the targeted data size is less than 10Go:

```
SELECT
   field1, field2
   FROM tableName
   WHERE rand()  percentLines
``` 

#### Scenario 2, the size of the targeted data is greater than 10Go and the size of the collected lines is less than 10Go:

```
SELECT
   field1, field2
   FROM tableName
   TABLESAMPLE SYSTEM (percent10Go PERCENT)
   WHERE rand()  percentLinesFor10Go
   LIMIT 10000
``` 

#### Scenario 3, in which both the size of the targeted data and the size of the collected lines are greater than 10Go each (Optimization scenario):

```
SELECT
   field1, field2
   FROM tableName
   TABLESAMPLE SYSTEM (percentLines PERCENT)
   LIMIT 10000
``` 

The above requests will collect a data sample on fields where the feature has been enabled (fields 1 and 2). The sample contains a maximum of 10,000 lines (defined in the percentLines parameter).

This request can either be manually executed from the Admin portal, or it can be scheduled, according to the collect-fingerprint variable in the `application.conf` file. For more information on this, refer to [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>
      <ul>
        <li>BigQueryOrganization: code/project id/dataset id/table id</li>
        <li>BigQuery: code/dataset id/table id</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**project id**: BigQuery project id</li>
        <li>**dataset id**: BigQuery dataset name</li>
        <li>**table id**: Table name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>
      <ul>
        <li>BigQueryOrganization: code/project id/dataset id/table id/field name</li>
        <li>BigQuery: code/dataset id/table id/field name</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**project id**: BigQuery project id</li>
        <li>**dataset id**: BigQuery dataset name</li>
        <li>**table id**: Table name</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

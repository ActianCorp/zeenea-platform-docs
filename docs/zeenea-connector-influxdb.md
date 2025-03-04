---
title: InfluxDB  
---

# Adding an InfluxDB Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with InfluxDB.
* Zeenea traffic flows towards InfluxDB must be open. 

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The InfluxDB module was successfully tested with version 1.7.10 and is compatible with all 1.X versions. It is not however compatible with versions 2.X of InfluxDB.

## Installing the Plugin

Since scanner version 26.9, the InfluxDB plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with InfluxDB, specifying the following parameters in the dedicated file is required:

<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`nam`e</td>
    <td>The name that will be displayed to catalog users for this connection.</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The type of connector to be used for the connection. Here, the value must be `InfluxDB` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>InfluxDB connection URL (example: `http://influxdb.com:8086`)</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>InfluxDB username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`inventory.measurement_partition.pattern`</td>
    <td>List of regular expressions to be used. The separator is the space character.</td>
  </tr>
</table>

## Partitioned Virtual Measures 

The connector is able to manage virtual measures that have been partitioned on multiple real indexes. 

A Partitioned Virtual Measure is a collection of indexes containing the same dataset and which use the following naming convention: 

* Shared first part, used to identify the Partitioned Measure
* Specific second part, showing the contents of the partition.

For instance, in the case of the InfluxDB indexation of the Cogip application logs, best practices are to split the measures by time frames (for example, on a daily basis). The measures names will then be:

* `log-cogip-2020-06-02`
* `log-cogip-2020-06-03`
* `log-cogip-2020-06-04`

The shared part is `log-cogip`, whereas the part representing the partition can be described with the rational expression:

`\d{4}-\d{2}-\d{2}$`

Declaring the rational expression above will be enough for Zeenea to take into account the partitioned virtual measures.

During the inventory, Zeenea will replace the first occurrence of this model with a star. All indexes with the same name structure will be considered as being a part of the same partitioned virtual index. 

In our example above, all three partitions will be read as a unique dataset named `log-cogip-*`. 

If multiple models are used, all corresponding rational expressions must be declared and separated with spaces. The first of these expressions that returns a result will be used. 

For instance, if the following measures are used: 

* `log-cogip-2020-05-30`
* `log-cogip-2020-06-01`
* `log-acme-2020-06-03`
* `log-acme-2020-06-04`
* `x-files-01`
* `x-files-02`

By defining the setting Measurement Partition Pattern with the value: ` \d{4}-\d{2}-\d{2}$ \d{2}$`, Zeenea will display the following datasets: 

* `log-cogip-*`
* `log-acme-*`
* `x-files-*`

However, be mindful of the pattern order: if the above expression is replaced with `\d{2}$ \d{4}-\d{2}-\d{2}$`, the first option, replacing the last two digits with a star, will be used, and the datasets displayed by Zeenea will be the following: 

* `log-cogip-2020-05-*`
* `log-cogip-2020-06-*`
* `log-acme-2020-06-*`
* `x-files-*`

The pattern does not have to be at the end of a string; when using the rational expression `\d{4}-\d{2}-\d{2}` (**note the absence of the dollar sign**) on the following measures: 

* `cogip-2020-06-02-log`
* `cogip-2020-06-03-log`

will return the unique dataset `copgip-$-log`. 

On the other hand, a measure named `log-cogip-2020-06-01_2020-06-07` will be identified as `log-cogip-*_2020-06-07` when using an Measurement Partition Pattern value of ` \d{4}-\d{2}-\d{2}`, and `log-cogip-2020-06-01` with a value of `\d{4}-\d{2}-\d{2}$`.

It is then strongly recommended to use a rational expression as specific as possible to avoid unexpected results.

## User Permissions

The InfluxDB user used for the connection must be able to list and read databases that are to be cataloged.

## Data Extraction

The following requests are necessary:

* `show databases`
* `show measurements`
* `show tag keys`
* `show field keys`

## Collected Metadata

### Inventory

The inventory collects the list of InfluxDB measures accessible by the user. 

### Dataset

A dataset is an InfluxDB measure.

* **Name**: Name of the measure
* **Source Description**: Description of the measure
* **Technical Data**:
  * Measurement: InfluxDB measure
  * Database: Source Database

### Fields

A field is an InfluxDB measure field (or tag).

* **Name**
* **Source Description**
* **Type**
* **Can be null**: `true`
* **Multivalued**: `false`
* **Primary Key**: Tags are considered to be part of the primary key.
* **Technical Data**:
  * Technical Name: Field technical name
  * Native type: Field native type

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
 
<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/database/dataset name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**database**: Database measure</li>
        <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/database/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**database**: Database measure</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

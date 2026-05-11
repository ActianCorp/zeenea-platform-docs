# Adding an InfluxDB Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100531 "title: InfluxDB") is required to establish a connection with InfluxDB.

- <!-- #p100039 -->
  Zeenea traffic flows towards InfluxDB must be open. 

<!-- #p100054 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100060 -->
## Supported Versions

<!-- #p100066 -->
The InfluxDB module was successfully tested with version 1.7.10 and is compatible with all 1.X versions. It is not however compatible with versions 2.X of InfluxDB.

<!-- #p100072 -->
## Installing the Plugin

<!-- #p100081 -->
Since scanner version 26.9, the InfluxDB plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100090 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100096 -->
## Declaring the Connection

<!-- #p100105 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100114 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100120 -->
In order to establish a connection with InfluxDB, specifying the following parameters in the dedicated file is required:

<!-- #p100126 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `InfluxDB` and this value must not be modified. |
| `connection.url` | InfluxDB connection URL (example: `http://influxdb.com:8086`) |
| `connection.username` | InfluxDB username |
| `connection.password` | User password |
| `inventory.measurement_partition.pattern` | List of regular expressions to be used. The separator is the space character. |

<!-- #p100138 -->
## Partitioned Virtual Measures

<!-- #p100144 -->
The connector is able to manage virtual measures that have been partitioned on multiple real indexes. 

<!-- #p100150 -->
A Partitioned Virtual Measure is a collection of indexes containing the same dataset and which use the following naming convention: 

- <!-- #p100156 -->
  Shared first part, used to identify the Partitioned Measure

- <!-- #p100165 -->
  Specific second part, showing the contents of the partition.

<!-- #p100177 -->
For instance, in the case of the InfluxDB indexation of the Cogip application logs, best practices are to split the measures by time frames (for example, on a daily basis). The measures names will then be:

- <!-- #p100186 -->
  `log-cogip-2020-06-02`

- <!-- #p100198 -->
  `log-cogip-2020-06-03`

- <!-- #p100210 -->
  `log-cogip-2020-06-04`

<!-- #p100225 -->
The shared part is `log-cogip`, whereas the part representing the partition can be described with the rational expression:

<!-- #p100234 -->
`\d{4}-\d{2}-\d{2}$`

<!-- #p100240 -->
Declaring the rational expression above will be enough for Zeenea to take into account the partitioned virtual measures.

<!-- #p100246 -->
During the inventory, Zeenea will replace the first occurrence of this model with a star. All indexes with the same name structure will be considered as being a part of the same partitioned virtual index. 

<!-- #p100255 -->
In our example above, all three partitions will be read as a unique dataset named `log-cogip-*`. 

<!-- #p100261 -->
If multiple models are used, all corresponding rational expressions must be declared and separated with spaces. The first of these expressions that returns a result will be used. 

<!-- #p100267 -->
For instance, if the following measures are used: 

- <!-- #p100276 -->
  `log-cogip-2020-05-30`

- <!-- #p100288 -->
  `log-cogip-2020-06-01`

- <!-- #p100300 -->
  `log-acme-2020-06-03`

- <!-- #p100312 -->
  `log-acme-2020-06-04`

- <!-- #p100324 -->
  `x-files-01`

- <!-- #p100336 -->
  `x-files-02`

<!-- #p100351 -->
By defining the setting Measurement Partition Pattern with the value: ` \d{4}-\d{2}-\d{2}$ \d{2}$`, Zeenea will display the following datasets: 

- <!-- #p100360 -->
  `log-cogip-*`

- <!-- #p100372 -->
  `log-acme-*`

- <!-- #p100384 -->
  `x-files-*`

<!-- #p100399 -->
However, be mindful of the pattern order: if the above expression is replaced with `\d{2}$ \d{4}-\d{2}-\d{2}$`, the first option, replacing the last two digits with a star, will be used, and the datasets displayed by Zeenea will be the following: 

- <!-- #p100408 -->
  `log-cogip-2020-05-*`

- <!-- #p100420 -->
  `log-cogip-2020-06-*`

- <!-- #p100432 -->
  `log-acme-2020-06-*`

- <!-- #p100444 -->
  `x-files-*`

<!-- #p100462 -->
The pattern does not have to be at the end of a string; when using the rational expression `\d{4}-\d{2}-\d{2}` (**note the absence of the dollar sign**) on the following measures: 

- <!-- #p100471 -->
  `cogip-2020-06-02-log`

- <!-- #p100483 -->
  `cogip-2020-06-03-log`

<!-- #p100498 -->
will return the unique dataset `copgip-$-log`. 

<!-- #p100519 -->
On the other hand, a measure named `log-cogip-2020-06-01_2020-06-07` will be identified as `log-cogip-*_2020-06-07` when using an Measurement Partition Pattern value of ` \d{4}-\d{2}-\d{2}`, and `log-cogip-2020-06-01` with a value of `\d{4}-\d{2}-\d{2}$`.

<!-- #p100525 -->
It is then strongly recommended to use a rational expression as specific as possible to avoid unexpected results.

<!-- #p100531 -->
## User Permissions

<!-- #p100537 -->
The InfluxDB user used for the connection must be able to list and read databases that are to be cataloged.

<!-- #p100543 -->
## Data Extraction

<!-- #p100549 -->
The following requests are necessary:

- <!-- #p100558 -->
  `show databases`

- <!-- #p100570 -->
  `show measurements`

- <!-- #p100582 -->
  `show tag keys`

- <!-- #p100594 -->
  `show field keys`

<!-- #p100606 -->
## Collected Metadata

<!-- #p100612 -->
### Inventory

<!-- #p100618 -->
The inventory collects the list of InfluxDB measures accessible by the user. 

<!-- #p100624 -->
### Dataset

<!-- #p100630 -->
A dataset is an InfluxDB measure.

- <!-- #p100639 -->
  **Name**: Name of the measure

- <!-- #p100651 -->
  **Source Description**: Description of the measure

- <!-- #p100663 -->
  **Technical Data**:

  - <!-- #p100669 -->
    Measurement: InfluxDB measure

  - <!-- #p100678 -->
    Database: Source Database

<!-- #p100696 -->
### Fields

<!-- #p100702 -->
A field is an InfluxDB measure field (or tag).

- <!-- #p100711 -->
  **Name**

- <!-- #p100723 -->
  **Source Description**

- <!-- #p100735 -->
  **Type**

- <!-- #p100750 -->
  **Can be null**: `true`

- <!-- #p100765 -->
  **Multivalued**: `false`

- <!-- #p100777 -->
  **Primary Key**: Tags are considered to be part of the primary key.

- <!-- #p100789 -->
  **Technical Data**:

  - <!-- #p100795 -->
    Technical Name: Field technical name

  - <!-- #p100804 -->
    Native type: Field native type

<!-- #p100822 -->
## Object Identification Keys

<!-- #p100828 -->
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

<!-- #p100837 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100843 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/database/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database**: Database measure<br/>- **dataset name** |
| Field | code/database/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database**: Database measure<br/>- **dataset name**<br/>- **field name** |


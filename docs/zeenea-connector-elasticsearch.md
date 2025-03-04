---
title: Elasticsearch
---

# Adding an Elasticsearch Connection

## Prerequisites

* In case the Elasticsearch security has been enabled, the connector must reference a user with sufficient [permissions](#user-permissions).
* Zeenea traffic flows towards the base must be opened. 

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Elasticsearch module has been tested with versions 5, 6 and 7. 

Its behavior will differ based on the version, as to adapt itself to the changes in the Elasticsearch modeling (namely, the removal of mapping types). For instance, when cataloging on a version 5 instance, the dataset is the mapping type; whereas for versions 6 and 7, the dataset is the index. However, version 6 still displays the type, a unique value but whose name might have been customized.

## Installing the Plugin

Since scanner version 26.9, the Elasticsearch plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Elasticsearch, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `Elasticsearch` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.protocol`</td>
    <td>Connection protocol to the cluster. Possible values are `https` or `http`.</td>
  </tr>
  <tr>
    <td>`connection.nodes`</td>
    <td>
      <p>A list of cluster connection nodes separated with spaces.</p>
        <p>Each node is shown using the `host_name[:port]`. The port value is optional, and `9200` will be used as a default.</p>
        <p>Examples</p>
        <ul>
          <li>`es1.cogip.com:9200`</li>
          <li>`es1.cogip.com:9200`</li>
        </ul>
        <p>This list does not have to be complete, but it is recommended to have multiple nodes.</p>
    </td>
  </tr>
  <tr>
    <td>`tls.trust_store.type`</td>
    <td>Trust Store type. Possible values are `pkcs12` or `jks`.</td>
  </tr>
  <tr>
    <td>`tls.trust_store.path`</td>
    <td>This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Elasticsearch servers are delivered by a specific authority. It must contain the certification chain.<br /><br /> See https://www.elastic.co/guide/en/elasticsearch/reference/current/configuring-tls.html#node-certificates.</td>
  </tr>
  <tr>
    <td>`tls.trust_store.password`</td>
    <td>Trust Store password</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Name of the Elasticsearch user used to connect to Zeenea. The user must have sufficient permissions.</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`inventory.index_partition.pattern`</td>
    <td>The index partition pattern. Refer to [Partitioned Virtual Indexes](#partitioned-virtual-indexes) for more information.</td>
  </tr>
</table>

## Partitioned Virtual Indexes

The connector is able to manage virtual indexes that have been partitioned on multiple real indexes. 

A Partitioned Virtual Index is a collection of indexes containing the same dataset and whose use the following naming convention: 

* Shared first part, used to identify the Partitioned Index
* Specific second part, showing the contents of the partition.

For instance, in the case of the Elasticsearch indexation of the Cogip application logs, best practice is to split the indexes by time frames (for example, on a daily basis). The indexes names will then be:

* `log-cogip-2020-06-02`
* `log-cogip-2020-06-03`
* `log-cogip-2020-06-04`

The share part is `log-cogip`, whereas the part representing the partition can be described with the rational expression:

 `\d{4}-\d{2}-\d{2}$`

Declaring the rational expression above will be enough for Zeenea to take into account the partitioned virtual indexes.

During inventory, Zeenea will replace the first occurrence of this model with a star. All indexes with the same name structure will be considered as being a part of the same partitioned virtual index. 

In our example above, all three partitions will be read as a unique dataset named `log-cogip-*`. 

If multiple models are used, all corresponding rational expressions must be declared and separated with spaces. The first of these expressions that returns a result will be used. 

For instance, if the following indexes are used: 

* `log-cogip-2020-05-30`
* `log-cogip-2020-06-01`
* `log-acme-2020-06-03`
* `log-acme-2020-06-04`
* `x-files-01`
* `x-files-02`

By defining the setting Index Partition Pattern with the value: ` \d{4}-\d{2}-\d{2}$ \d{2}$`, Zeenea will display the following datasets: 

* `log-cogip-*`
* `log-acme-*`
* `x-files-*`

However, be mindful of the pattern order: if above expression is replaced with `\d{2}$ \d{4}-\d{2}-\d{2}$`, the first option, replacing the last two digits with a star, will be used, and the datasets displayed by Zeenea will be the following: 

* `log-cogip-2020-05-*`
* `log-cogip-2020-06-*`
* `log-acme-2020-06-*`
* `x-files-*`

The pattern does not have to be at the end of a string; when using the rational expression `\d{4}-\d{2}-\d{2}` (**note the absence of the dollar sign**) on the following indexes: 

* `cogip-2020-06-02-log`
* `cogip-2020-06-03-log`

will return the unique dataset `copgip-$-log`. 

On the other hand, an index named `log-cogip-2020-06-01_2020-06-07` will be identified as `log-cogip-*_2020-06-07` when using an Index Partition Pattern value of ` \d{4}-\d{2}-\d{2}`, and `log-cogip-2020-06-01` with a value of `\d{4}-\d{2}-\d{2}$`. 

It is then strongly recommended to use a rational expression as specific as possible to avoid unexpected results.

## User Permissions

The Elasticsearch user being used for the connection must have sufficient permissions to extract metadata and collect data statistics. 

The following requests are necessary: 

* `GET /`: Returns the search engine version
* `GET /_cat/indices`: Returns the list of indexes
* `GET /{index}/_mappings` or `GET /{index}/_mappings/{esType}` for versions before v7. Returns the index mapping.
* `GET /{index}/_stats`: Returns index stats
* `GET /{index}/_search`: Returns data profiles

## Collected Metadata

### Inventory

For Elasticsearch version 5, the inventory collects the names of indexes and their types. The dataset corresponds to the type. 

For Elasticsearch version 6, the inventory collects the names of indexes and their unique type. 

From version 7 onwards, the inventory collects the names of indexes. 

Indexes are unpartitioned using the procedure described in Partitioned Virtual Indexes. 

## Dataset

Based on the version of Elasticsearch, it is one dataset per index (v6 onwards) or one dataset per type (v5).

* **Name**:
  * The index name for v6 and onwards
  * An `Index/Type` template for v6
* **Source Description**: not managed
* **Technical Data**:
  * Index: Index name
  * Type: type name (mapping)
  * Dataset size: in octets
  * Number of records: in the table

### Field

* **Name**
* **Source Description**: Not managed
* **Type**
* **Can be null**: `true`
* **Multivalued**: `true`
* **Primary Key**: Not managed
* **Technical Data**: 
  * Technical Name
  * Native type
 
## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identification Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/keyspace/dataset name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**schema**: Dataset keyspace</li>
        <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/keyspace/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**schema**: Dataset keyspace</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

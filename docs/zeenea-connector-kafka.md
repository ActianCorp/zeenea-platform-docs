---
title: Kafka
---

# Adding a Kafka Connection

## Prerequisites

* A user with sufficient permissions is required to establish a connection with Kafka.
* Zeenea traffic flows towards the data source must be open. 

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| Kafka Broker | TCP | 9092 |
| Kafka Schema Registry | HTTP, HTTPS | 80, 443, 8081 |

## Supported Versions

The connector was developed and tested with Kafka Server version 2.8.0 and is compatible with 3.0 and earlier.

## Installing the Plugin

The Kafka connector is available as a plugin and can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Kafka instance, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `kafka` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.bootstrap_servers	`</td>
    <td>A comma-separated list of host:port pairs to use for establishing the initial connection to the Kafka cluster. Example: `broker1.example.com:9092,broker2.example.com:9092`</td>
  </tr>
  <tr>
    <td>`connection.security_protocol`</td>
    <td>Protocol used to communicate with brokers. (Property security.protocol of Kafka Client). Valid values are: `PLAINTEXT`, `SSL`. (`SASL_PLAINTEXT`, `SASL_SSL` coming soon). Default: `PLAINTEXT`</td>
  </tr>
  <tr>
    <td>`connection.schema_registry_url	`</td>
    <td>Kafka schema registry URL with the protocol (example: `http://schema-registry.example.com:8081`)</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username for Schema Registry basic authentication</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>Password for Schema Registry basic authentication</td>
  </tr>
  <tr>
    <td>`connection.api_key`</td>
    <td>API key name for Schema Registry API authentication</td>
  </tr>
  <tr>
    <td>`connection.api_secret`</td>
    <td>API key secret for Schema Registry API authentication</td>
  </tr>
  <tr>
    <td>`inventory.strategy`</td>
    <td>Inventory strategy. Possible values `topic_sample` or `schema_registry` depend on the desired mechanism for retrieving topic schemas.</td>
  </tr>
  <tr>
    <td>`inventory.sampling_size`</td>
    <td>Number of messages sampled by topic (default value `1000`).</td>
  </tr>
  <tr>
    <td>`inventory.topic_exclude`</td>
    <td>(Optional: default value is `_*`)  Name of topics to ignore in the form of a list of patterns separated by spaces. Each pattern can be a regular expression or a simple pattern (or `glob`) according to the `regex:` or `glob:` prefix. If no prefix is specified, the `glob` type is assumed.  If one of the patterns matches the full name of the topic, it will be ignored.  The operation is similar to that of the `~` operator in filters.<br />Example: `_* glob:test* regex:.*_(test|tu)_.*`</td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Kafka servers are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file. (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>
  <tr>
    <td>`tls.keystore.path`</td>
    <td>The key store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Kafka servers are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.keystore.password`</td>
    <td>Password of the key store file</td>
  </tr>
  <tr>
    <td>`tls.keystore.type`</td>
    <td>Type of the sey store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>
  <tr>
    <td>`tls.key.password`</td>
    <td>Password of the private key (if different from the key store password)</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## Data Extraction

### Topic Sample

The connector reads each topic to retrieve the last inventory.sampling_size messages to extract the schema. These messages must be in Avro format. Thus, it retrieves a sample of data to identify the schema used.

### Schema Registry

The connector will retrieve from the schema registry the topics whose name is suffixed by `-key` and `-value` to determine the list of topics and the list of their fields.
  
## Collected Metadata

### Inventory

Will collect the list of topics and its fields.  

### Dataset

A dataset is a topic. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Topic Format (topic_sample)
  * Schema Key Type (schema_registry)
  * Schema Key Version (schema_registry)
  * Schema Value Type (schema_registry)
  * Schema Value Version (schema_registry)

### Field

Topic field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: `yes`, by default 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Metadata**:
  * Schema Name (schema_registry)
 
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
    <td>code/topic/dataset name	</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**dataset name**: Topic name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/topic/dataset name/schema type/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**dataset name**: Topic name</li>
      <li>**schema type**: : `key` or `value` depending on the source of the schema registry field. `value` with the `topic_sample` strategy.</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

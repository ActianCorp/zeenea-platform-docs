---
title: AWS DynamoDB
---

# Adding a DynamoDB Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with DynamoDB.
* Zeenea traffic flows towards the data source must be open. 

:::note
A link to the configuration template is available from this page: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The DynamoDB connector was developed and tested with the web version of the product. 

## Installing the Plugin

The AWS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a DynamoDB instance, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `aws-dynamodb` and this value must not be modified.</td>
  </tr>
  <tr>
    <td colspan="2">**Optional, can be determined from the EC2 configuration**</td>
  </tr>
  <tr>
    <td>`connection.aws.url`</td>
    <td>Database DynamoDB address</td>
  </tr>
  <tr>
    <td>`connection.aws.profile`</td>
    <td>AWS profile</td>
  </tr>
  <tr>
    <td>`connection.aws.access_key_id`</td>
    <td>AWS key identifier</td>
  </tr>
  <tr>
    <td>`connection.aws.secret_access_key`</td>
    <td>AWS secret access key</td>
  </tr>
  <tr>
    <td>`connection.aws.region`</td>
    <td>AWS region</td>
  </tr>
  <tr>
    <td>`connection.fetch_page_size`</td>
    <td>(Advanced) define the size of batch of items loaded by each request in inventory</td>
  </tr>
  <tr>
    <td colspan="2">**Sampling**</td>
  </tr>
  <tr>
    <td>`schema_analysis.enable`</td>
    <td>Enable data sample in order to complete dataset fields. Default value is `false`.</td>
  </tr>
  <tr>
    <td>`schema_analysis.sample_size`</td>
    <td>Number of items retrieve for data sample. Default value is `1000`.</td>
  </tr>
   <tr>
    <td colspan="2">**Certificate & Proxy**</td>
  </tr>
 <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain.</td>
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
    <td>`proxy.scheme`</td>
    <td>Depending on the proxy, `http` or `https`</td>
  </tr>
  <tr>
    <td>`proxy.hostname`</td>
    <td>Proxy address</td>
  </tr>
  <tr>
    <td>`proxy.port`</td>
    <td>Proxy port</td>
  </tr>
  <tr>
    <td>`proxy.username`</td>
    <td>Proxy username</td>
  </tr>
  <tr>
    <td>`proxy.password`</td>
    <td>Proxy account password</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have the followings access rights:

* `dynamodb:ListTables`
* `dynamodb:DescribeTable`

If you want to determine the table's value pattern by means of sampling, the following additional access right is required:

* `dynamodb:PartiQLSelect`

## Data Extraction

To extract information, the connector runs requests on the API:

* `listTables`
* `describeTable`
* `executeStatement(Statement='select * from [table_name]', Limit=[sample_size])` (only with the sampling feature)
  
## Collected Metadata

### Inventory

Will collect the list of tables accessible by the user. 

### Dataset

A dataset is a DynamoDB table. 

* **Name**
* **Source Description**
* **Technical Data**:
  * AWS Region
  * Creation Date
  * Items Count
  * Table Size

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings 
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute
* **Technical Data**:
  * Technical Name
  * Native type: Field native type
  * Field Kind

## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identifier Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/region/dataset name</td>
    <td>
      <ul>
      <li>**code**: Unique identifier of the connection noted in the configuration file</li>
      <li>**region**: AWS object region</li>
      <li>**dataset name**: Table name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/region/dataset name/field name</td>
    <td>
      <ul>
      <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
      <li>**region**: AWS object region</li>
      <li>**dataset name**: Table name</li>
      <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

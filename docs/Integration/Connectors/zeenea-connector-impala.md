# Adding a Impala  Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100138 "title: Impala") is required to establish a connection with Impala.

- <!-- #p100039 -->
  Zeenea traffic flows towards the data source must be open.  

<!-- #p100054 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100060 -->
## Supported Versions

<!-- #p100066 -->
The Impala connector was successfully developed and tested with CDP 7.1.7. It is compatible with Impala 2.2.0. 

<!-- #p100072 -->
## Installing the Plugin

<!-- #p100081 -->
The Impala plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100090 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100096 -->
## Declaring the Connection

<!-- #p100105 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100114 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100120 -->
In order to establish a connection with an Impala instance, specifying the following parameters in the dedicated file is required:

<!-- #p100126 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `impala` and this value must not be modified. |
| `connection.url` | Database address (example: `jdbc:impala://host:21050`). |
| **Basic Auth** | |
| `connection.username` | Username |
| `connection.password` | User password |
| **Kerberos** | |
| `connection.kerberos.principal` | Kerberos principal name (example: `user/_HOST@KRB_REALM`) |
| `connection.kerberos.keytab` | Absolute path to the Kerberos Keytab authentication file |
| `connection.kerberos.realm` | Kerberos realm |
| `connection.kerberos.host ` | Kerberos host |
| `connection.kerberos.userjdbc` | JDBC User is "impala" by default but you can use the one you choose. |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Cloudera servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |

<!-- #p100138 -->
## User Permissions

<!-- #p100147 -->
In order to collect metadata, the running user's permissions must have `SELECT` access to the selected databases or tables.

<!-- #p100156 -->
In order to refresh metadata, the running user's permissions must have `REFRESH` access to the selected databases or tables.

<!-- #p100168 -->
If the running user's don't have `REFRESH` access, a `WARN` will be logged during the update and metadata could be not up to date.

<!-- #p100174 -->
## Data Extraction

<!-- #p100180 -->
To extract information, the connector runs following JDBC requests:

- <!-- #p100189 -->
  `SHOW DATABASES`

- <!-- #p100201 -->
  `USE`

- <!-- #p100213 -->
  `SHOW TABLES`

- <!-- #p100225 -->
  `INVALIDATE METADATA .`

- <!-- #p100237 -->
  `DESCRIBE` .

- <!-- #p100249 -->
  `DESCRIBE FORMATTED .`

<!-- #p100261 -->
## Collected Metadata

<!-- #p100267 -->
### Inventory

<!-- #p100273 -->
Will collect the list of Hive and Kudu tables accessible by the user.  

<!-- #p100279 -->
### Dataset

<!-- #p100285 -->
A dataset can be a Hive or Kudu table. 

- <!-- #p100294 -->
  **Name**

- <!-- #p100306 -->
  **Source Description**

- <!-- #p100318 -->
  **Technical Data**:

  - <!-- #p100324 -->
    Creation Date

  - <!-- #p100333 -->
    Location

  - <!-- #p100342 -->
    Table Type

  - <!-- #p100351 -->
    Owner

  - <!-- #p100360 -->
    Source Database

<!-- #p100378 -->
### Field

<!-- #p100384 -->
Dataset field. 

- <!-- #p100393 -->
  **Name**

- <!-- #p100405 -->
  **Source Description**

- <!-- #p100417 -->
  **Type**

- <!-- #p100432 -->
  **Can be null**: Supported for Kudu only. Default value `true`.

- <!-- #p100444 -->
  **Multivalued**: Depending on the native type.

- <!-- #p100459 -->
  **Primary Key**: Supported for Kudu only. Default value `false`.

- <!-- #p100471 -->
  **Technical Data**:

  - <!-- #p100477 -->
    Technical Name

  - <!-- #p100486 -->
    Native type: field native type

<!-- #p100504 -->
## Unique Identifier Keys

<!-- #p100510 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100519 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100525 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/database name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database name**<br/>- **dataset name**: Table name |
| Field | code/database name/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database name**<br/>- **dataset name**: Table name<br/>- **field name** |


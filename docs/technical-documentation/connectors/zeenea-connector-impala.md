# Adding a Impala  Connection

## Prerequisites

* A user with sufficient [permissions](#p100138 "title: Impala") is required to establish a connection with Impala.
* Zeenea traffic flows towards the data source must be open.  

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


## Supported Versions

The Impala connector was successfully developed and tested with CDP 7.1.7. It is compatible with Impala 2.2.0. 

## Installing the Plugin

The Impala plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

In order to establish a connection with an Impala instance, specifying the following parameters in the dedicated file is required:

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

## User Permissions

In order to collect metadata, the running user's permissions must have `SELECT` access to the selected databases or tables.

In order to refresh metadata, the running user's permissions must have `REFRESH` access to the selected databases or tables.

If the running user's don't have `REFRESH` access, a `WARN` will be logged during the update and metadata could be not up to date.

## Data Extraction

To extract information, the connector runs following JDBC requests:

* `SHOW DATABASES`
* `USE`
* `SHOW TABLES`
* `INVALIDATE METADATA .`
* `DESCRIBE` .
* `DESCRIBE FORMATTED .`

## Collected Metadata

### Inventory

Will collect the list of Hive and Kudu tables accessible by the user.  

### Dataset

A dataset can be a Hive or Kudu table. 

* **Name**
* **Source Description**
* **Technical Data**:
     * Creation Date
     * Location
     * Table Type
     * Owner
     * Source Database

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Supported for Kudu only. Default value `true`.
* **Multivalued**: Depending on the native type.
* **Primary Key**: Supported for Kudu only. Default value `false`.
* **Technical Data**:
     * Technical Name
     * Native type: field native type

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/database name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database name**<br/>- **dataset name**: Table name |
| Field | code/database name/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database name**<br/>- **dataset name**: Table name<br/>- **field name** |


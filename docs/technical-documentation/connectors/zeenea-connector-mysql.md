# Adding a MySQL Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100153 "title: MySQL") is required to establish a connection with MySQL.

- <!-- #p100039 -->
  Zeenea traffic flows towards the database must be open.

<!-- #p100054 -->
> **Important:** The MySQL driver is not delivered with the connector. Download the MySQL driver related to your MySQL instance and move it into the /lib-ext folder of your scanner. You will find the driver into sources provided by the editor on their website: [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)

<br />

<!-- #p100063 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100069 -->
## Supported Versions

<!-- #p100075 -->
The MySQL module was developed and tested with version MySQL Server 8.0. It is compatible with the PolarDB versions of the Alibaba Cloud service as well as with the RDS and Aurora versions of the Amazon Cloud service.

<!-- #p100081 -->
## Installing the Plugin

<!-- #p100087 -->
From version 54 of the scanner, the MySQL connector is presented as a plugin.

<!-- #p100096 -->
It can be downloaded here and requires a scanner version 64: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100105 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100111 -->
## Declaring the Connection

<!-- #p100120 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100129 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100135 -->
In order to establish a connection with a MySQL instance, specifying the following parameters in the dedicated file is required:

<!-- #p100141 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `Mysql` and this value must not be modified. |
| `connection.url` | Database address (example: `jdbc:mysql://host:3306/database`) |
| `connection.username` | Username |
| `connection.password` | User password |

<!-- #p100153 -->
## User Permissions

<!-- #p100159 -->
In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

<!-- #p100168 -->
Here, the user must have read access to objects from the `INFORMATION_SCHEMA` schema.

<!-- #p100174 -->
## Data Extraction

<!-- #p100183 -->
To extract information, the connector runs requests on views from the `INFORMATION_SCHEMA` schema.

<!-- #p100189 -->
## Collected Metadata

<!-- #p100195 -->
### Inventory

<!-- #p100201 -->
Will collect the list of tables and views accessible by the user.  

<!-- #p100207 -->
### Dataset

<!-- #p100213 -->
A dataset can be a table or a view. 

- <!-- #p100228 -->
  **Name**: Concatenation `schema name.object name` (**Object name**: Table or view name)

- <!-- #p100240 -->
  **Source Description**

- <!-- #p100252 -->
  **Technical Data**:

  - <!-- #p100258 -->
    Catalog: Source catalog

  - <!-- #p100267 -->
    Schema: Source schema

  - <!-- #p100276 -->
    Table: table name

<!-- #p100294 -->
### Field

<!-- #p100300 -->
One per table field.

- <!-- #p100309 -->
  **Name**: Field name

- <!-- #p100321 -->
  **Source Description**: Source field description

- <!-- #p100333 -->
  **Type**: Field type

- <!-- #p100345 -->
  **Can be null**: Depending on field settings

- <!-- #p100360 -->
  **Multivalued**: Not supported. Default value `false`.

- <!-- #p100372 -->
  **Primary key**: Depending on the "Primary Key" field attribute

- <!-- #p100384 -->
  **Technical Data**:

  - <!-- #p100390 -->
    Technical Name

  - <!-- #p100399 -->
    Native type: Field native type

<!-- #p100417 -->
## Unique Identification Keys

<!-- #p100423 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100432 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100438 -->
| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/schema/object name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Object schema<br/>- **object name**: Table or view name |
| Field | code/schema/object name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Object schema<br/>- **object name**: Table or view name<br/>- **field name** |


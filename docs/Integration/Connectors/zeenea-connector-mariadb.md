# Adding a MariaDB Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100156 "title: MariaDB") is required to establish a connection with MariaDB.

- <!-- #p100039 -->
  Zeenea traffic flows towards the database must be open.

<!-- #p100057 -->
> **Important:** The MariaDB driver is not delivered with the connector. Download the MariaDB driver related to your MariaDB instance and move it into the `/lib-ext` folder of your scanner. You will find the driver into sources provided by the editor on their website: [https://mariadb.com/downloads/connectors/connectors-data-access/](https://mariadb.com/downloads/connectors/connectors-data-access/).

<br />

<!-- #p100066 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100072 -->
## Supported Versions

<!-- #p100078 -->
The MariaDB connector was developed and tested with version MariaDB 10. It is compatible with RDS versions of the Amazon Cloud service.

<!-- #p100084 -->
## Installing the Plugin

<!-- #p100090 -->
From version 54 of the scanner, the MariaDB connector is presented as a plugin.

<!-- #p100099 -->
It can be downloaded here and requires scanner version 64: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100108 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100114 -->
## Declaring the Connection

<!-- #p100123 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100132 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100138 -->
In order to establish a connection with a MariaDB instance, specifying the following parameters in the dedicated file is required:

<!-- #p100144 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `mariadb` and this value must not be modified. |
| `connection.url` | Database address (example: `jdbc:mariadb://host:3306/database`) |
| `connection.username` | Username |
| `connection.password` | User password |

<!-- #p100156 -->
## User Permissions

<!-- #p100162 -->
In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

<!-- #p100171 -->
Here, the user must have read access to objects from the `INFORMATION_SCHEMA` schema.

<!-- #p100177 -->
## Data Extraction

<!-- #p100186 -->
To extract information, the connector runs requests on views from the `INFORMATION_SCHEMA` schema.

<!-- #p100192 -->
## Collected Metadata

<!-- #p100198 -->
### Inventory

<!-- #p100204 -->
Will collect the list of tables and views accessible by the user.  

<!-- #p100210 -->
### Dataset

<!-- #p100216 -->
A dataset can be a table or a view. 

- <!-- #p100225 -->
  **Name**

- <!-- #p100237 -->
  **Source Description**

- <!-- #p100249 -->
  **Technical Data**:

  - <!-- #p100255 -->
    Catalog: Source catalog

  - <!-- #p100264 -->
    Schema: Source schema

  - <!-- #p100273 -->
    Table: table name

  - <!-- #p100282 -->
    Type:

    - <!-- #p100288 -->
      BASE TABLE

    - <!-- #p100297 -->
      VIEW

    - <!-- #p100306 -->
      SYSTEM VIEW

    - <!-- #p100315 -->
      SYSTEM VERSIONED

    - <!-- #p100324 -->
      SEQUENCE

<!-- #p100348 -->
### Field

<!-- #p100354 -->
Dataset field. 

- <!-- #p100363 -->
  **Name**

- <!-- #p100375 -->
  **Source Description**

- <!-- #p100387 -->
  **Type**

- <!-- #p100399 -->
  **Can be null**: Depending on field settings

- <!-- #p100414 -->
  **Multivalued**: Not supported. Default value `false`.

- <!-- #p100426 -->
  **Primary Key**: Depending on the "Primary Key" field attribute

- <!-- #p100438 -->
  **Technical Data**:

  - <!-- #p100444 -->
    Technical Name

  - <!-- #p100453 -->
    Native type: field native type

<!-- #p100471 -->
## Unique Identifier Keys

<!-- #p100477 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100486 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100492 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |


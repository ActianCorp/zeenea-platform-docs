# Adding a PostgreSQL Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100216 "title: PostgreSQL") is required to establish a connection with PostgreSQL.

- <!-- #p100039 -->
  Zeenea traffic flows towards the database must be open.

- <!-- #p100048 -->
  In order to catalog datasets stored on PostgreSQL, Zeenea uses the JDBC API to extract metadata. The flow towards the PostgreSQL server must be open.

<!-- multiline -->
| <!-- #p100060 --> | <!-- #p100069 --> | <!-- #p100078 --> |
| Target            | Protocol          | Usual Ports       |
| --- | --- | --- |
| <!-- #p100090 --> | <!-- #p100099 --> | <!-- #p100108 --> |
| PostgreSQL        | JDBC              | 5432              |
|                   |                   |                   |

<!-- #p100126 -->
!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100132 -->
## Supported Versions

<!-- #p100138 -->
The PostgreSQL connector was developed and tested with version 10.4. It is compatible with version 9.5 and later. It is also compatible with the PolarDB versions of the Alibaba Cloud service as well as with the RDS and Aurora versions of the Amazon Cloud service.

<!-- #p100144 -->
## Installing the Plugin

<!-- #p100150 -->
From version 54 of the scanner, the PostgreSQL connector is presented as a plugin.

<!-- #p100159 -->
It can be downloaded here and requires a scanner version 64: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100168 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100174 -->
## Declaring the Connection

<!-- #p100183 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100192 -->
Read more: [Managing Connections](../../Features/zeenea-administration/zeenea-managing-connections.md)

<!-- #p100198 -->
In order to establish a connection with a PostgreSQL instance, fill out the following parameters in the dedicated file:

<!-- #p100204 -->
| Parameter | Expected value |
| --- | --- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `PgSql` and this value must not be modified. |
| `connection.url` | Database address (example: `jdbc:postgresql://postgresql.example.com:5432/database`) |
| `connection.username` | Username |
| `connection.password` | User password |
| `lineage.view.enabled` | Set to `true` to activate the lineage feature. Default value `false`. |

<!-- #p100216 -->
## User Permissions

<!-- #p100222 -->
In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

<!-- #p100231 -->
Here, the user must have read access to objects from the `pg_catalog` schema.

<!-- #p100237 -->
If the data profiling feature was enabled, the user must have read access on impacted tables. Otherwise, this permission is not necessary.

<!-- #p100243 -->
## Data Extraction

<!-- #p100252 -->
To extract information, the connector runs requests on the following views from the `pg_catalog` schema:

- <!-- #p100261 -->
  `pg_class`

- <!-- #p100273 -->
  `pg_namespace`

- <!-- #p100285 -->
  `pg_description`

- <!-- #p100297 -->
  `pg_attribute`

- <!-- #p100309 -->
  `pg_type`

<!-- #p100321 -->
## Collected Metadata

<!-- #p100327 -->
### Inventory

<!-- #p100333 -->
Will collect the list of tables and views accessible by the user.  

<!-- #p100339 -->
### Lineage

<!-- #p100345 -->
From version 56 of the plugin, the connector has the lineage feature on the views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

<!-- #p100351 -->
### Dataset

<!-- #p100357 -->
A dataset can be a table or a view. 

- <!-- #p100366 -->
  **Name**

- <!-- #p100378 -->
  **Source Description**

- <!-- #p100390 -->
  **Technical Data**:

  - <!-- #p100396 -->
    Catalog: Source catalog

  - <!-- #p100405 -->
    Schema: Source schema

  - <!-- #p100414 -->
    Table: table name

  - <!-- #p100423 -->
    Type:

    - <!-- #p100429 -->
      table

    - <!-- #p100438 -->
      view

    - <!-- #p100447 -->
      materialized view

    - <!-- #p100456 -->
      index

    - <!-- #p100465 -->
      sequence

    - <!-- #p100474 -->
      foreign table

    - <!-- #p100483 -->
      TOAST table

    - <!-- #p100492 -->
      composite type

    - <!-- #p100501 -->
      partitioned table

    - <!-- #p100510 -->
      partitioned index

<!-- #p100534 -->
### Field

<!-- #p100540 -->
Dataset field. 

- <!-- #p100549 -->
  **Name**

- <!-- #p100561 -->
  **Source Description**

- <!-- #p100573 -->
  **Type**

- <!-- #p100585 -->
  **Can be null**: Depending on field settings

- <!-- #p100600 -->
  **Multivalued**: Not supported. Default value `false`.

- <!-- #p100612 -->
  **Primary Key**: Depending on the "Primary Key" field attribute

- <!-- #p100624 -->
  **Technical Data**:

  - <!-- #p100630 -->
    Technical Name

  - <!-- #p100639 -->
    Native type: field native type

<!-- #p100657 -->
### Data Process

<!-- #p100663 -->
A data process represents the request to build a view.

- <!-- #p100675 -->
  **Name**: `CREATEVIEW "view-name"`

<!-- #p100687 -->
## Data Profiling

<!-- #p100693 -->
!!! important
    The Data Profiling feature, which can be enabled on this connection, allows Explorers to better understand the type of data stored in each field. This feature, which can be activated in the Scanner, runs by default on a weekly schedule, every Saturday. However, depending on the number of fields for which you enable this feature, the calculation can quickly become costly. Before enabling it, ensure that the estimated impact of this feature is acceptable and that the default frequency is appropriate.

<!-- #p100702 -->
The statistical profiles feature, also known as _Data Profiling_, is available for this connector. The impact of this feature must be evaluated before activating it on any of your connections. For more information about the resulting statistics, see [Data Profiling](../../Features/cross-application-features/zeenea-data-profiling.md).

<!-- #p100708 -->
To activate this feature, read access to the target tables is required. For PostgreSQL technologies, the connector executes the following request to get a data sample: 

<!-- #p100717 -->
`SELECT COUNT(*) AS result FROM tableName`

<!-- #p100723 -->
The request above defines the number of rows in the table `tableName`.

<!-- #p100729 -->
```
SELECT
   field1, field2
   FROM tableName
   TABLESAMPLE BERNOULLI (linesPercentage)
```

<!-- #p100744 -->
The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

<!-- #p100759 -->
These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in [Zeenea Scanner Setup](../Scanners/zeenea-scanner-setup.md).

<!-- #p100765 -->
## Unique Identifier Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md).

<!-- #p100786 -->
| Object | Identifier Key  | Description |
| --- | --- | --- |
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file.<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file.<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |


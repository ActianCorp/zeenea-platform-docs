# Adding a Redshift Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100432 "title: AWS Redshift") is required to establish a connection with Redshift.

- <!-- #p100039 -->
  Zeenea traffic flows towards Redshift must be open.

- <!-- #p100048 -->
  In order to catalog datasets stored on Redshift, Zeenea uses the JDBC API to extract metadata. The flow toward the Redshift server must be open.

<!-- multiline -->
| <!-- #p100060 --> | <!-- #p100069 --> | <!-- #p100078 --> |
| Target            | Protocol          | Usual Ports       |
| ----------------- | ----------------- | ----------------- |
| <!-- #p100090 --> | <!-- #p100099 --> | <!-- #p100108 --> |
| AWS Redshift      | JDBC              | 5439              |
|                   |                   |                   |

<!-- #p100126 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100132 -->
## Supported Versions

<!-- #p100138 -->
The Redshift connector is compatible with all versions supported by Amazon. 

<!-- #p100144 -->
## Installing the Plugin

<!-- #p100150 -->
From version 54 of the scanner, the Redshift connector is presented as a plugin.

<!-- #p100159 -->
It can downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100168 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100174 -->
## Declaring the Connection

<!-- #p100183 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100192 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100198 -->
In order to establish a connection with Redshift, specifying the following parameters in the dedicated file is required:

<!-- multiline -->
| <!-- #p100204 -->      | <!-- #p100213 -->                                                                                                                                                                                                 |
| Parameter              | Expected Value                                                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <!-- #p100228 -->      | <!-- #p100237 -->                                                                                                                                                                                                 |
| `name`                 | The name that will be displayed to catalog users for this connection                                                                                                                                              |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100252 -->      | <!-- #p100261 -->                                                                                                                                                                                                 |
| `code`                 | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100276 -->      | <!-- #p100288 -->                                                                                                                                                                                                 |
| `connector_id`         | The type of connector to be used for the connection. Here, the value must be `AWSRedshift` and this value must not be modified.                                                                                   |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100303 -->      | <!-- #p100315 -->                                                                                                                                                                                                 |
| `connection.url`       | AWS Redshift server address (example: `jdbc:redshift://redshift.example.com:5439/database`)                                                                                                                       |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100330 -->      | <!-- #p100339 -->                                                                                                                                                                                                 |
| `connection.username`  | Username                                                                                                                                                                                                          |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100354 -->      | <!-- #p100363 -->                                                                                                                                                                                                 |
| `connection.password`  | User password                                                                                                                                                                                                     |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100378 -->      | <!-- #p100390 -->                                                                                                                                                                                                 |
| `lineage.view.enabled` | To activate the lineage feature. Default value `false`.                                                                                                                                                           |
|                        |                                                                                                                                                                                                                   |
| <!-- #p100405 -->      | <!-- #p100417 -->                                                                                                                                                                                                 |
| `filter`               | To filter datasets during the inventory.See [Rich Filters](#p100486 "title: AWS Redshift").                                                                                                                       |
|                        |                                                                                                                                                                                                                   |

<!-- #p100432 -->
## User Permissions

<!-- #p100438 -->
In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

<!-- #p100447 -->
 Here, the user must have read access to objects from the `pg_catalog schema`.

<!-- #p100456 -->
 To catalog externals tables (Spectrum), the user must have additional rights on them. You can provide those rights to all tables of the external schema (named here `spectrum_schema_example`) through both requests below:

<!-- #p100465 -->
`grant usage on schema spectrum_schema_example to user;`

<!-- #p100474 -->
`grant select on all tables in schema spectrum_schema_example to user;`

<!-- #p100480 -->
If the data profiling feature was enabled, the user must have read access to impacted tables. Otherwise, this permission is not necessary.

<!-- #p100486 -->
## Rich filters

<!-- #p100492 -->
Since version 47 of the scanner, the Redshift connector benefits from the feature of rich filters in the configuration of the connector. This functionality also applies if on the metadata "Roles" of the datasets.

<!-- #p100501 -->
Read more: [Filters](../Scanners/zeenea-filters.md)

<!-- #p100507 -->
## Data Extraction

<!-- #p100516 -->
To extract information, the connector runs requests on views from the `pg_catalog schema`.

<!-- #p100522 -->
## Collected Metadata

<!-- #p100528 -->
### Inventory

<!-- #p100534 -->
Will collect the list of tables and views accessible by the user.

<!-- #p100540 -->
### Lineage

<!-- #p100546 -->
From version 54 of the scanner, the connector has the lineage feature on the views. This feature allows you to automatically recreate the lineage in your catalog of the tables that were used to build the view.

<!-- #p100552 -->
### Dataset

<!-- #p100558 -->
A dataset can be a table or a view. 

- <!-- #p100567 -->
  **Name**

- <!-- #p100579 -->
  **Source Description**

- <!-- #p100591 -->
  **Technical Data**: 

  - <!-- #p100597 -->
    Catalog

  - <!-- #p100606 -->
    Schema

  - <!-- #p100615 -->
    Table

  - <!-- #p100624 -->
    Type:

  - <!-- #p100633 -->
    table

  - <!-- #p100642 -->
    view

  - <!-- #p100651 -->
    materialized view

  - <!-- #p100660 -->
    index

  - <!-- #p100669 -->
    sequence

  - <!-- #p100678 -->
    foreign table

  - <!-- #p100687 -->
    TOAST table

  - <!-- #p100696 -->
    composite type

  - <!-- #p100705 -->
    partitioned table

  - <!-- #p100714 -->
    partitioned index

<!-- #p100732 -->
### Field

<!-- #p100738 -->
Dataset field.

- <!-- #p100747 -->
  **Name**

- <!-- #p100759 -->
  **Source Description**

- <!-- #p100771 -->
  **Type**

- <!-- #p100783 -->
  **Can be null**: Depending on the field settings

- <!-- #p100798 -->
  **Multivalued**: not supported, `FALSE` by default

- <!-- #p100810 -->
  **Primary Key**: depending on the field "Primary Key" attribute

- <!-- #p100822 -->
  **Technical Data**: 

  - <!-- #p100828 -->
    Technical Name

  - <!-- #p100837 -->
    Native type

<!-- #p100855 -->
### Data Process

<!-- #p100861 -->
A data process represents the request to build a view.

- <!-- #p100873 -->
  **Name**: `CREATEVIEW view-name`

<!-- #p100885 -->
## Data Profiling

<!-- #p100891 -->
> **Important:** The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency appropriate, before enabling it.

<!-- #p100900 -->
The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics in the following documentation: Data Profiling.

<!-- #p100906 -->
Read access on targeted tables is mandatory to activate the feature. For AWS Redshift technologies, the connector executes the following request to get a data sample: 

<!-- #p100915 -->
`SELECT COUNT(*) AS result FROM tableName`

<!-- #p100924 -->
The request above defines the number of rows in the table `tableName`.

<!-- #p100930 -->
```
SELECT
   field1, field2
   FROM tableName
   ORDER BY RANDOM() LIMIT 10000
```

<!-- #p100942 -->
The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit of collected rows is 10.000.

<!-- #p100957 -->
These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described in Zeenea Scanner Setup.

<!-- #p100963 -->
## Object Identification Keys

<!-- #p100969 -->
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

<!-- #p100978 -->
Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

<!-- #p100984 -->
| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |
| Data process | code/view/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name/**: View name |


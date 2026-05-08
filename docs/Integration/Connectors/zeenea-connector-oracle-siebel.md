# Adding an Oracle Siebel (Safyr) Connection

<!-- #p100021 -->
## Prerequisites

<!-- #p100030 -->
> **Note:** 
> * To connect Zeenea to Siebel, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.
> * You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100045 -->
## Supported Versions

<!-- #p100051 -->
The Siebel connector compatibility depends on Safyr capability.

<!-- #p100057 -->
## Installing the Plugin

<!-- #p100066 -->
The Silwood Safyr plugin plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100075 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100081 -->
## Declaring the Connection

<!-- #p100090 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100099 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100105 -->
In order to establish a connection with Siebel, specifying the following parameters in the dedicated file is required:

<!-- #p100111 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `safyr-siebel` and this value must not be modified. |
| `input.folder` | The complete path to the folder containing files from the Silwood Safyr extraction |
| `lineage` | To activate the lineage feature for tables and views |

<!-- #p100123 -->
## Data Extraction

<!-- #p100129 -->
To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

<!-- #p100135 -->
## Collected Metadata

<!-- #p100141 -->
### Inventory

<!-- #p100147 -->
Will collect the list of objects accessible by the user. 

<!-- #p100153 -->
### Lineage

<!-- #p100159 -->
The connector is able to reconstruct the lineage of tables referenced in views.

<!-- #p100165 -->
### Dataset

<!-- #p100171 -->
A dataset is a Siebel object (table or view). 

- <!-- #p100180 -->
  **Name**

- <!-- #p100192 -->
  **Source Description**

- <!-- #p100204 -->
  **Technical Data**:

  - <!-- #p100210 -->
    Type

  - <!-- #p100219 -->
    Row Count

  - <!-- #p100228 -->
    Physical Name

  - <!-- #p100237 -->
    Logical Name

<!-- #p100255 -->
### Field

<!-- #p100261 -->
Dataset field. 

- <!-- #p100270 -->
  **Name**

- <!-- #p100282 -->
  **Source Description**

- <!-- #p100294 -->
  **Type**

- <!-- #p100306 -->
  **Can be null**: Depending on field properties

- <!-- #p100318 -->
  **Multivalued**: Depending on field properties

- <!-- #p100330 -->
  **Primary Key**: Depending on field properties

- <!-- #p100342 -->
  **Technical Data**: 

  - <!-- #p100348 -->
    Technical Name

  - <!-- #p100357 -->
    Native type

  - <!-- #p100366 -->
    Size

  - <!-- #p100375 -->
    Data Element

  - <!-- #p100384 -->
    Domain

  - <!-- #p100393 -->
    Physical Name

  - <!-- #p100402 -->
    Logical Name

<!-- #p100420 -->
## Unique Identification Keys

<!-- #p100426 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100435 -->
Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

<!-- #p100441 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name** |
| Field | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**<br/>- **field name** |


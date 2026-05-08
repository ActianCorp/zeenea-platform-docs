# Adding an SAP (Safyr) Connection

<!-- #p100021 -->
## Prerequisites

<!-- #p100030 -->
> **Note:** 
> * To connect Zeenea to SAP, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.
> * You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100036 -->
## Supported Versions

<!-- #p100042 -->
The SAP connector is compatible with SAP and SAP/4HANA.

<!-- #p100048 -->
## Installing the Plugin

<!-- #p100057 -->
The Silwood Safyr plugin can be downloaded here:  [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100066 -->
> **ATTENTION:** Updating the connector to version 3.1.1 from a previous version impacts data processes identification and requires a manual deleting of existing data processes. If you documented your SAP data processes, please contact customer service to assist you in this migration.

<!-- #p100075 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100081 -->
## Declaring the Connection

<!-- #p100090 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100099 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100105 -->
In order to establish a connection with SAP, specifying the following parameters in the dedicated file is required:

<!-- #p100111 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `safyr-sap` and this value must not be modified. |
| `input.folder` | The complete path to the folder containing files from the Silwood Safyr extraction |
| `lineage` | To activate the lineage feature for tables and views |

<!-- #p100126 -->
> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

<!-- #p100132 -->
## Data Extraction

<!-- #p100138 -->
To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

<!-- #p100144 -->
## Collected Metadata

<!-- #p100150 -->
### Inventory

<!-- #p100156 -->
Will collect the list of objects accessible by the user.

<!-- #p100162 -->
### Lineage

<!-- #p100168 -->
The connector is able to reconstruct the lineage of tables referenced in views.

<!-- #p100174 -->
### Dataset

<!-- #p100180 -->
A dataset is an SAP object (table or view). 

- <!-- #p100189 -->
  **Name**

- <!-- #p100201 -->
  **Source Description**

- <!-- #p100213 -->
  **Technical Data**:

  - <!-- #p100219 -->
    Type

  - <!-- #p100228 -->
    Row Count

  - <!-- #p100237 -->
    Metadata Changed

  - <!-- #p100246 -->
    Physical Name

  - <!-- #p100255 -->
    Logical Name

<!-- #p100273 -->
### Field

<!-- #p100279 -->
Dataset field. 

- <!-- #p100288 -->
  **Name**

- <!-- #p100300 -->
  **Source Description**

- <!-- #p100312 -->
  **Type**

- <!-- #p100324 -->
  **Can be null**: Depending on field properties

- <!-- #p100336 -->
  **Multivalued**: Depending on field properties

- <!-- #p100348 -->
  **Primary key**: Depending on field properties

- <!-- #p100360 -->
  **Technical Data**: 

  - <!-- #p100366 -->
    Technical Name

  - <!-- #p100375 -->
    Native type

  - <!-- #p100384 -->
    Type: Unit, Measure, Dimension or Characteristic

  - <!-- #p100393 -->
    Size

  - <!-- #p100402 -->
    Data Element

  - <!-- #p100411 -->
    Metadata Changed

  - <!-- #p100420 -->
    Physical Name

  - <!-- #p100429 -->
    Logical Name

<!-- #p100447 -->
## Unique Identifier Keys

<!-- #p100453 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100462 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100468 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name** |
| Field | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**<br/>- **field name** |
| Data Process | code/reference/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**: Dataset name that is linked |


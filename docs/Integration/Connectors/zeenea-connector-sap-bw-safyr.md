# Adding an SAP BW (Safyr) Connection

<!-- #p100021 -->
## Prerequisites

<!-- #p100030 -->
> **Note:** 
> * To connect Zeenea to SAP BW, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.
> * You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100036 -->
## Supported Versions

<!-- #p100042 -->
The SAP BW connector is compatible with SAP BW.

<!-- #p100048 -->
## Installing the Plugin

<!-- #p100057 -->
The Silwood Safyr plugin can be downloaded here:  [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100063 -->
> **ATTENTION:**
> -  Updating the connector to version 3.0.0 from a previous version requires a data migration for the "Dataset" type objects representing Query. Please contact customer service to assist you in this migration.
> - Updating the connector to version 3.1.1 from a previous version impacts data processes identification and requires a manual deleting of existing data processes. If you documented your SAP BW data processes, please contact customer service to assist you in this migration.

<!-- #p100105 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100111 -->
## Declaring the Connection

<!-- #p100120 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100129 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100135 -->
In order to establish a connection with SAP BW, you need to fill out the following parameters in the dedicated file:

<!-- #p100141 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `safyr-sap` and this value must not be modified. |
| `input.folder` | The complete path to the folder containing files from the Silwood Safyr extraction |
| `input.display_name` | (Deprecated) To choose between the "Physical" and the "Logical" name of the objects |
| `input.dataset_display_name` | To choose between the "Physical" and the "Logical" name of datasets |
| `input.field_display_name` | To choose between the "Physical" and the "Logical" name of fields |
| `input.flatten_attributes` | Flatten the attribute's characteristics as new fields (`true` or `false`). Default value is `true`. |
| `lineage` | To activate the lineage feature for cubes and queries |

<!-- #p100156 -->
> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

<!-- #p100162 -->
## Data Extraction

<!-- #p100168 -->
To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

<!-- #p100174 -->
## Collected Metadata

<!-- #p100180 -->
### Inventory

<!-- #p100186 -->
Will collect the list of objects accessible by the user.  

<!-- #p100192 -->
### Lineage

<!-- #p100210 -->
The connector is able to reconstruct the lineage of **cubes** referenced in **cubes** as well as the lineage representing the **cubes** that are used by the **queries**.

<!-- #p100216 -->
### Dataset

<!-- #p100222 -->
A dataset can be the following SAP BW object: Data Store Object, Advanced Data Store Object, HANA Composite Provider, Info Sources, Data Sources, Cube, Query, or HANA Calculation View. 

- <!-- #p100231 -->
  **Name**

- <!-- #p100243 -->
  **Source Description**

- <!-- #p100255 -->
  **Technical Data**:

  - <!-- #p100261 -->
    Type

  - <!-- #p100270 -->
    Metadata Changed

  - <!-- #p100279 -->
    Physical Name

  - <!-- #p100288 -->
    Logical Name

<!-- #p100306 -->
### Field

<!-- #p100312 -->
Dataset field. 

- <!-- #p100321 -->
  **Name**

- <!-- #p100333 -->
  **Source Description**

- <!-- #p100345 -->
  **Type**

- <!-- #p100357 -->
  **Can be null**: Depending on field properties

- <!-- #p100369 -->
  **Multivalued**: Depending on field properties

- <!-- #p100381 -->
  **Primary key**: Depending on field properties

- <!-- #p100393 -->
  **Technical Data**: 

  - <!-- #p100399 -->
    Technical Name

  - <!-- #p100408 -->
    Native type

  - <!-- #p100417 -->
    Type: Unit, Measure, Dimension or Characteristic

  - <!-- #p100426 -->
    Size

  - <!-- #p100435 -->
    Data Element

  - <!-- #p100444 -->
    Metadata Changed

  - <!-- #p100453 -->
    Physical Name

  - <!-- #p100462 -->
    Logical Name

<!-- #p100480 -->
## Unique Identifier Keys

<!-- #p100486 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100495 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100501 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name** |
| Field | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**<br/>- **field name** |
| Data Process | code/reference/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**: Dataset name that is linked |


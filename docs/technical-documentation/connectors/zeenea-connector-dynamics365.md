# Adding a Dynamics 365  (Safyr) Connection

<!-- #p100021 -->
## Prerequisites

<!-- #p100030 -->
> **Note:** 
> * To connect Zeenea to Dynamics 365, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.
> * You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100045 -->
## Supported Versions

<!-- #p100051 -->
The Dynamics 365 connector compatibility depends on Safyr capability.

<!-- #p100057 -->
## Installing the Plugin

<!-- #p100066 -->
The Silwood Safyr plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100075 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100081 -->
## Declaring the Connection

<!-- #p100090 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100099 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100105 -->
In order to establish a connection with Dynamics 365, specifying the following parameters in the dedicated file is required:

<!-- #p100111 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `safyr-dynamics365` and this value must not be modified. |
| `input.folder` | The complete path to the folder containing files from the Silwood Safyr extraction |

<!-- #p100123 -->
## Data Extraction

<!-- #p100129 -->
To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

<!-- #p100135 -->
## Collected Metadata

<!-- #p100141 -->
### Inventory

<!-- #p100147 -->
Will collect the list of datasets accessible by the user.  

<!-- #p100153 -->
### Dataset

<!-- #p100159 -->
A dataset is a Dynamics 365 object. 

- <!-- #p100168 -->
  **Name**

- <!-- #p100180 -->
  **Source Description**

- <!-- #p100192 -->
  **Technical Data**:

  - <!-- #p100198 -->
    Type

  - <!-- #p100207 -->
    Row Count

  - <!-- #p100216 -->
    Physical Name

  - <!-- #p100225 -->
    Logical Name

<!-- #p100243 -->
### Field

- <!-- #p100252 -->
  **Name**

- <!-- #p100264 -->
  **Source Description**

- <!-- #p100276 -->
  **Type**

- <!-- #p100288 -->
  **Can be null**: Depending on field properties

- <!-- #p100300 -->
  **Multivalued**: Depending on field properties

- <!-- #p100312 -->
  **Primary Key**: Depending on field properties

- <!-- #p100324 -->
  **Technical Data**: 

  - <!-- #p100330 -->
    Technical Name

  - <!-- #p100339 -->
    Native type

  - <!-- #p100348 -->
    Size

  - <!-- #p100357 -->
    Data Element

  - <!-- #p100366 -->
    Domain

  - <!-- #p100375 -->
    Physical Name

  - <!-- #p100384 -->
    Logical Name

<!-- #p100402 -->
## Unique Identification Keys

<!-- #p100408 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100417 -->
Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

<!-- #p100423 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name** |
| Field | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**<br/>- **field name** |


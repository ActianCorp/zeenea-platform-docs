# Adding a Salesforce (Safyr) Connection

<!-- #p100021 -->
## Prerequisites

<!-- #p100030 -->
!!! note
    * To connect Zeenea to Salesforce, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.
    * You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


<!-- #p100036 -->
## Supported Versions

<!-- #p100042 -->
The Salesforce connector compatibility depends on Safyr capability.

<!-- #p100048 -->
## Installing the Plugin

<!-- #p100057 -->
The Silwood Safyr plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100066 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100072 -->
## Declaring the Connection

<!-- #p100081 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100090 -->
Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

<!-- #p100096 -->
In order to establish a connection with Salesforce, specifying the following parameters in the dedicated file is required:

<!-- #p100102 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to be used for the connection. Here, the value must be `safyr-salesforce` and this value must not be modified. |
| `input.folder` | The complete path to the folder containing files from the Silwood Safyr extraction. |

<!-- #p100117 -->
!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).


## Data Extraction

To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

## Collected Metadata

### Inventory

Will collect the list of objects accessible by the user.  

### Dataset

A dataset is a Salesforce object. 

* **Name**
* **Source Description**
* **Technical Data**:
     * Type
     * Row Count
     * Metadata Changed
     * Physical Name
     * Logical Name

### Field

Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on field properties
* **Multivalued**: Depending on field properties
* **Primary Key**: Depending on field properties
* **Technical Data**:
     * Technical Name
     * Native type
     * Size
     * Data Element
     * Domain
     * Physical Name
     * Logical Name

## Unique Identifier Keys

<!-- #p100423 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100432 -->
More information about unique identification keys in this documentation: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

<!-- #p100438 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name** |
| Field | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**<br/>- **field name** |


# Adding an Oracle JD Edwards (Safyr) Connection

## Prerequisites

!!! note
    * To connect Zeenea to JD Edwards, Zeenea provides a collaborative solution with Silwood Technology and his Safyr software. This integration must be validated with our customer services.
    * You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


## Supported Versions

The JD Edwards connector compatibility depends on Safyr capability.

## Installing the Plugin

The Silwood Safyr plugin plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

In order to establish a connection with JD Edwards, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `safyr-jdedwards` and this value must not be modified. |
| `input.folder` | The complete path to the folder containing files from the Silwood Safyr extraction. |
| `lineage` | To activate the lineage feature for tables and views |

## Data Extraction

To extract information, the connector identifies metadata from the JSON files of the Silwood Safyr extraction.

## Collected Metadata

### Inventory

Will collect the list of objects accessible by the user. 

### Dataset

A dataset is a JD Edwards object (table or view). 

* **Name**
* **Source Description**
* **Technical Data**:
     * Type
     * Row Count
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

## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md)

| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name** |
| Field | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **asset type**: Asset type as defined by Safyr<br/>- **dataset name**<br/>- **field name** |


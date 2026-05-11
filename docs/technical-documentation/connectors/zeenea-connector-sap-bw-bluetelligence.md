# Adding an SAP BW (Bluetelligence) Connection

## Overview
The file-based SAP BW connector automatically extracts metadata using the Bluetelligence Metadata API and generates five XML-formatted export files.

The following are the five export files:
* **Details File**<br />Contains **object level** information on **Datasets**. Every `<entity>` element (except TRFN) represents a separate Dataset. Transformations (TRFN) are imported as **Data Processes**.
* **Relations File**<br />Contains **object level** information on how each entities are connected. The `<edge>` elements indicate the source and target Datasets.
* **Buildups File**<br />Contains **field level** information for **Datasets**. The `<parent>` element has an `id` property that points to an entity in the Details file.
* **Buildup Descriptions File**<br />Contains the **field level** description information for the datasets listed in the Buildups file.
* **Mappings File**<br />Contains the **field level** mappings between InfoObjects, fields, and rules across BW Queries, InfoProvider, DataSource, and Transformations that translate into nodes and edges. The `<edge>` elements indicate how Fields are mapped between Datasets.

For more information about the installation and configuration of the Metadata API command-line utility, see [Preparation and installation](https://bluetelligence.atlassian.net/wiki/spaces/DMA/pages/3026288655/Preparation+and+installation).

## Prerequisites

Place the `license.lic` file and the Bluetelligence app settings file (`appsettings.json`) in the `<ZEENA_SCANNER>/connections/bluetelligence/` folder.
These files are located in the Bluetelligence installation directory under the `Core` folder.

The following SAP access details are required to configure a Metadata API instance:

* System Number
* Client
* Prefix
* Delimiter
* BW ERP SID
* Server
* Languages
* User
* Password
 
## Supported Versions

The SAP BW connector supports SAP BW/4HANA 2023 Feature Pack 04 (released on February 25, 2025) and Metadata API version 1.7.0 (released on September 01, 2025).

## Installing the Plugin

You can download the Bluetelligence SAP BW plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for changes and resynchronizes automatically.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with SAP BW, fill in the following parameters in the dedicated configuration file located in the `./connections` folder inside the scanner installation directory:

| Parameter | Expected Value |
|-----------|----------------|
| `name` | The name displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified, or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. The value must be `bluetelligence-sap-bw` and must not be modified. |
| `enabled` | A Boolean value that enables or disables the connection (`true` or `false`). The default value is `true`. |
| `metadata_api.path` | Optional. The root path of Bluetelligence exported files. Default is `bluetelligence-data`.  |
| `metadata_api.cmd` | Optional. The command (with all parameters) to run Bluetelligence extractor. This allows you to run a different version than the one embedded. For example, under Unix: `/opt/bluetelligence/DataLineage.sh extract-all -s A4H`. |
| `metadata_api.license` | Optional. By default, the license file `license.lic` must be placed in the scanner folder `connections/bluetelligence/`. |
| `metadata_api.app_settings` | Optional. By default, the appsettings file `appsettings.json` must be placed in the scanner folder `connections/bluetelligence/`. |
| `metadata_api.timeout` | Optional. Timeout in seconds. Default is `300`. |
| `metadata_api.core_path` | Optional. If you use an external version of the Bluetelligence extractor, you need to provide the `Core` path folder. The license file and app settings file will be copied to this folder at every scanner startup. |
| `metadata_api.keep_old_files` | Optional. By default, when a Synchronize action runs, the connector removes all `XML` files found in `connection.cmd`. |
| `description_language` | Description language for all items. Default language is English ("E").  <br />All available languages are defined in SAP and must respect the language from the Buildup Descriptions file. |
| `filters` | Defines filtering rules to include or exclude specific items using universal filters. See [Universal Filters](#universal-filters). |

> **Note:** You can find the configuration file template in [bluetelligence-sap-bw.conf](https://github.com/zeenea/connector-conf-templates/blob/main/templates/bluetelligence-sap-bw.conf).

## Universal Filters

Use the universal filter language to include or exclude items based on the following criteria:

| Criteria | Description |
| :------- | :---------- |
| `"Technical Name"` | Name of entity. |
| `UID`              | UUID of entity. |
| `Type`             | Type of entity. |   
| `"Info Area"`      | The info area attach to the entity. |
| `universe_path`     | The path of the universe. Use this to filter specific universes during import. |

**Example:**

```bash
filters = [
  {
    id="accept_zeenea_dataset"
    action = ACCEPT
    rules {
      "Info Area" = "Zeenea"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

For more information about universal filters, see [Universal Filters](../Scanners/zeenea-universal-filters.md).

## Data Extraction

To harvest metadata, the connector automatically runs the Bluetelligence extractor and parses the generated XML files to load the information into the data catalog platform.

## Collected Metadata

### Synchronization

The connector synchronizes all SAP BW objects from the Bluetelligence extracted files and automatically represents them in the catalog.

### Dataset
A dataset can be one of the following SAP BW objects: Data Store Object, Advanced Data Store Object, HANA Composite Provider, Info Sources, Data Sources, Cube, Query, or HANA Calculation View. 

* **Name and ID**
* **Description**
* **Technical Data**:
  * UID
  * Type
  * Info Area
  * Label
  * Space
  * System

### Data Process
A data process is the following SAP BW object: Transformation.

* **Name and ID**
* **Technical Data**:
  * UID
  * Type

### Field
Dataset field. 

* **Name and ID**
* **Description**
* **Technical Data**: 
  * Data Type
  * Associated Object
  * Navigation Attribute
  * Semantics
  * Length

## Unique Identifier Keys
 
Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object       | Identifier Key                        | Description |
|--------------|---------------------------------------|-------------|
| Dataset      | code/asset type/dataset name          | - **code**: Unique identifier of the connection noted in the configuration file.<br />- **asset type**: Asset type as defined by Bluetelligence.<br />- **dataset name** |
| Field        | code/asset type/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file.<br />- **asset type**: Asset type as defined by Bluetelligence.<br />- **dataset name**<br />- **field name** |
| Data Process | code/reference/asset type/dataset name | - **code**: Unique identifier of the connection noted in the configuration file.<br />- **asset type**: Asset type as defined by Bluetelligence.<br />- **dataset name**: Dataset name that is linked. |

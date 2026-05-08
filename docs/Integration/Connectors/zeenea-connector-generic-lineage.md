# Adding an Generic Lineage Connection (Deprecated)

<!-- #p100021 -->
## Deprecated

<!-- #p100033 -->
This connector is deprecated. You can use the new [ZDF Lineage](zeenea-connector-zdf.md# "title: Zeenea Descriptor Format (ZDF)") connector instead.

<!-- #p100039 -->
## Prerequisites

<!-- #p100048 -->
The technical user the scanner is executed with must have sufficient [permissions](#p100171 "title: Generic Lineage (Deprecated)") to be able to process the metadata. 

<!-- #p100057 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100063 -->
## Supported Versions

<!-- #p100072 -->
The Lineage connector is compatible with `.zeenea` files written in JSON format and which respect the format below.

<!-- #p100081 -->
The connector is able to recreate the data transformations described in the JSON file as a Data Process object in Zeenea. A `.zeenea` descriptor file can describe several transformations but the connector is also able to detect and collect information from several files placed in a directory or in a git repository.

<!-- #p100093 -->
To reference in or out an existing dataset in the catalog, you can use the `connectionCode` and `zeepath` pair or its identification key to target it.

<!-- #p100099 -->
```
{
  "lineage": [
    {
      "name": "",
      "description": "",
      "owner": {
        "role": "",
        "email": "",
        "lastname": "",
        "firstname": ""
      },
      "inputs": [
        {
          "identificationKey": ""
        },
        {
          "connectionCode": "",
          "zeepath": ""
        }
      ],
      "outputs": [
        {
          "identificationKey": ""
        },
        {
          "connectionCode": "",
          "zeepath": ""
        }
      ]
    }
  ]
}
```

<!-- #p100105 -->
## Installing the Plugin

<!-- #p100114 -->
The lineage plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100123 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100129 -->
## Declaring the Connection

<!-- #p100138 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100147 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100153 -->
In order to establish a connection with an lineage connector, specifying the following parameters in the dedicated file is required:

<!-- #p100159 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `lineage` and this value must not be modified. |
| `connection.git.repository` | URL of the git repository where to read the files |
| `connection.git.branch` | Git branch |
| `connection.git.token` | Git token |
| `connection.git.workdir` | Local storage path of the Git repository. **Be careful: this folder must be a new empty directory as the data already present will be deleted**. |
| `connection.git.cleandir` | Boolean for deleting the local storage folder from the repository after import. Default value `false`. |
| `path` | Path of a local directory |

<!-- #p100171 -->
## User Permissions

<!-- #p100180 -->
In order to collect metadata, the Zeenea Scanner technical user's permissions must allow the connector to access and read folders or repositories that contain the description files (`*.zeenea`). 

<!-- #p100186 -->
## Data Extraction

<!-- #p100195 -->
To extract the information, the connector will identify the transformations described in the `.zeenea` files.

<!-- #p100201 -->
### Synchronization

<!-- #p100207 -->
The connector will synchronize all the transformations identified in the project to automatically modelize them in the catalog.

<!-- #p100213 -->
### Lineage

<!-- #p100219 -->
The Lineage connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the data processes.

<!-- #p100225 -->
## Collected Metadata

<!-- #p100231 -->
### Data Process

<!-- #p100237 -->
A data process represents a transformation as described in the descriptor file. 

- <!-- #p100246 -->
  **Name**

- <!-- #p100258 -->
  **Source Description**

- <!-- #p100270 -->
  **Inputs datasets**

- <!-- #p100282 -->
  **Output datasets**

- <!-- #p100294 -->
  **Technical Data**:

  - <!-- #p100300 -->
    Owner

  <!-- #p100312 -->
## Unique Identifier Keys

  <!-- #p100318 -->
  A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

  <!-- #p100327 -->
  More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

  <!-- #p100333 -->
| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/transformation/transformation name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **transformation name**: Name of the transformation as defined in the JSON file. Must be unique. |


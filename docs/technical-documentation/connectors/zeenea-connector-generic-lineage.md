# Adding an Generic Lineage Connection (Deprecated)

## Deprecated

This connector is deprecated. You can use the new [ZDF Lineage](zeenea-connector-zdf.md# "title: Zeenea Descriptor Format (ZDF)") connector instead.

## Prerequisites

The technical user the scanner is executed with must have sufficient [permissions](#p100171 "title: Generic Lineage (Deprecated)") to be able to process the metadata. 

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Lineage connector is compatible with `.zeenea` files written in JSON format and which respect the format below.

The connector is able to recreate the data transformations described in the JSON file as a Data Process object in Zeenea. A `.zeenea` descriptor file can describe several transformations but the connector is also able to detect and collect information from several files placed in a directory or in a git repository.

To reference in or out an existing dataset in the catalog, you can use the `connectionCode` and `zeepath` pair or its identification key to target it.

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

## Installing the Plugin

The lineage plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

In order to establish a connection with an lineage connector, specifying the following parameters in the dedicated file is required:

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

## User Permissions

In order to collect metadata, the Zeenea Scanner technical user's permissions must allow the connector to access and read folders or repositories that contain the description files (`*.zeenea`). 

## Data Extraction

To extract the information, the connector will identify the transformations described in the `.zeenea` files.

### Synchronization

The connector will synchronize all the transformations identified in the project to automatically modelize them in the catalog.

### Lineage

The Lineage connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the data processes.

## Collected Metadata

### Data Process

A data process represents a transformation as described in the descriptor file. 

* **Name**
* **Source Description**
* **Inputs datasets**
* **Output datasets**
* **Technical Data**:
     * Owner

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/transformation/transformation name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **transformation name**: Name of the transformation as defined in the JSON file. Must be unique. |


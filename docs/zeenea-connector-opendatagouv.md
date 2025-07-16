---
title: Open Data Gouv
---


# Adding a Data Gouv connection

## Prerequisites
`
Data Gouv account and API key

## Supported Versions

The Open Data Gouv connector is compatible with the v1 version of the Data Gouv API.

https://www.data.gouv.fr/dataservices/api-catalogue-des-donnees-ouvertes-data-gouv-fr/

## Installing the Plugin

The Open Data Gouv plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Data Gouv, specifying the following parameters in the dedicated file is required:


| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `open-data-gouv` and this value must not be modified. | 
| `connection.endpoint` | Data Gouv API URL, defaults to "https://www.data.gouv.fr/api/1" |
| `connection.api_key`	| Mandatory, your Data Gouv API KEY |
| `inventory.limit` | Optional, limits the amount of datasets returned during inventory |
| `inventory.organization_id` | Optional, filters datasets with this organization ID |


## Collected Metadata

### Inventory

Will collect the list of datasets accessible by the user. To this day only CSV and zipped CSV datasets are inventoried.


## Dataset

* **ID** 
* **Description**
* Properties
	* Resource URL
	* Separator
	* Resource Format
	* Header (presence)
## Field

* **ID**
* **Name**
* **Type**
* Native Index
* Native type

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).



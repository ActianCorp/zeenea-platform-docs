---
title: Google Data Catalog
---

# Adding a Google Data Catalog Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Google Data Catalog.
* Zeenea traffic flows towards the data source must be open.  

:::note
A configuration template can be downloaded here: [google-data-lineage.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgrp&d=%2Fa%2FNu000002lgNd%2FbRicJ3d4gnHLqe.Ay3rVGy3.uQYr2EGnNxECGmPH6ho&asPdf=false).
:::

## Supported Versions

The Google Data Catalog connector has been successfully tested with the Web version.

## Installing the Plugin

The Google Data Catalog plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Google Data Catalog instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `google-cloud.data-catalog`. **This value must not be modified**. | 
| `connection.json_key` | <p>JSON Key.</p><p>**Careful**: use three double quotes to encapsulate the JSON key.</p><p>Example: `"""{my:"json"}"""`</p> |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `quota.read_per_minute` | Reads per minute quota value.<br /><br />Default value: `6000` (default value of Google Data Catalog). |
| `quota.search_per_user_per_minute` | Search quota value per user per minute.<br /><br />Default value: `180` (default value in Google Data Catalog). |
| `quota.timeout_minute` | Maximum waiting time when waiting for the availability of a quota.<br /><br />Default value: `10` minutes. |
| `quota.max_retry` | Maximum number of retries when a request encounters a quota expiration error |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

### Role

To extract metadata, the technical account must have the following predefined role:

* Data Catalog Viewer (roles/datacatalog.viewer)

## Collected Metadata

### Inventory

Will collect the list of tables and views accessible by the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Project Id
  * Dataset Id
  * Table Id
  * Origin
  * Dataset Type

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings.
* **Multivalued**: `true` for array fields, `false` otherwise.
* **Primary Key**: Not supported. Default value `false`.

### Tags

It's possible to get all the tags applied to your Data Catalog objects through a specified configuration in your dedicated scanner. You just need to define the tag model you want to get into your Zeenea Data Catalog in the `application.conf` file of your scanner.

Here is an example of a configuration file `application.conf` that retrieves select tags:

```
connector.google_data_catalog.tags = """
[
    {
        "id": "data_governance",
        "name": "Data Governance",
        "fields": [
            {
                "id": "data_governor",
                "name": "Data Governor",
                "type": "STRING"
            },
            {
                "id": "data_classification",
                "name": "Data Classification",
                "type": "ENUM"
            },
            {
                "id": "approved_by_governance",
                "name": "Approved By Governance",
                "type": "BOOL"
            },
            {
                "id": "approved_by_governance_date",
                "name": "Date of Governance Approval",
                "type": "DATETIME"
            }
        ]
    }
]"""
```

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/bigquery/project id/dataset id/table id</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**project id**: BigQuery project id</li>
        <li>**dataset  id**: BigQuery dataset name</li>
        <li>**table id**: Table name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/bigquery/project id/dataset id/table id/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**project id**: BigQuery project name</li>
        <li>**dataset  id**: BigQuery dataset name</li>
        <li>**table id**: Table name</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
</table>

# Adding a Google Data Catalog Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100588 "title: Google Data Catalog") is required to establish a connection with Google Data Catalog.

- <!-- #p100039 -->
  Zeenea traffic flows towards the data source must be open.  

<!-- #p100054 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100060 -->
## Supported Versions

<!-- #p100066 -->
The Google Data Catalog connector has been successfully tested with the Web version.

<!-- #p100072 -->
## Installing the Plugin

<!-- #p100081 -->
The Google Data Catalog plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100090 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100096 -->
## Declaring the Connection

<!-- #p100105 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100114 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100120 -->
In order to establish a connection with Google Data Catalog instance, specifying the following parameters in the dedicated file is required:

<!-- multiline -->
| <!-- #p100126 -->                  | <!-- #p100135 -->                                                                                                                                                                                                 |
| Parameter                          | Expected Value                                                                                                                                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <!-- #p100150 -->                  | <!-- #p100159 -->                                                                                                                                                                                                 |
| `name`                             | The name that will be displayed to catalog users for this connection                                                                                                                                              |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100174 -->                  | <!-- #p100183 -->                                                                                                                                                                                                 |
| `code`                             | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100198 -->                  | <!-- #p100213 -->                                                                                                                                                                                                 |
| `connector_id`                     | The type of connector to be used for the connection. Here, the value must be `google-cloud.data-catalog`. **This value must not be modified**.                                                                    |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100228 -->                  | <!-- #p100288 -->                                                                                                                                                                                                 |
| `connection.json_key`              | <p>JSON Key.</p><p>**Careful**: use three double quotes to encapsulate the JSON key.</p><p>Example: `"""{my:"json"}"""`</p>                                                                                       |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100303 -->                  | <!-- #p100318 -->                                                                                                                                                                                                 |
| `proxy.scheme`                     | Depending on the proxy, `http` or `https`                                                                                                                                                                         |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100333 -->                  | <!-- #p100342 -->                                                                                                                                                                                                 |
| `proxy.hostname`                   | Proxy address                                                                                                                                                                                                     |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100357 -->                  | <!-- #p100366 -->                                                                                                                                                                                                 |
| `proxy.port`                       | Proxy port                                                                                                                                                                                                        |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100381 -->                  | <!-- #p100390 -->                                                                                                                                                                                                 |
| `proxy.username`                   | Proxy username                                                                                                                                                                                                    |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100405 -->                  | <!-- #p100414 -->                                                                                                                                                                                                 |
| `proxy.password`                   | Proxy account password                                                                                                                                                                                            |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100429 -->                  | <!-- #p100459 -->                                                                                                                                                                                                 |
| `quota.read_per_minute`            | Reads per minute quota value.<br /><br />Default value: `6000` (default value of Google Data Catalog).                                                                                                            |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100474 -->                  | <!-- #p100504 -->                                                                                                                                                                                                 |
| `quota.search_per_user_per_minute` | Search quota value per user per minute.<br /><br />Default value: `180` (default value in Google Data Catalog).                                                                                                   |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100519 -->                  | <!-- #p100549 -->                                                                                                                                                                                                 |
| `quota.timeout_minute`             | Maximum waiting time when waiting for the availability of a quota.<br /><br />Default value: `10` minutes.                                                                                                        |
|                                    |                                                                                                                                                                                                                   |
| <!-- #p100564 -->                  | <!-- #p100573 -->                                                                                                                                                                                                 |
| `quota.max_retry`                  | Maximum number of retries when a request encounters a quota expiration error                                                                                                                                      |
|                                    |                                                                                                                                                                                                                   |

<!-- #p100588 -->
## User Permissions

<!-- #p100594 -->
In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

<!-- #p100600 -->
### Role

<!-- #p100606 -->
To extract metadata, the technical account must have the following predefined role:

- <!-- #p100612 -->
  Data Catalog Viewer (roles/datacatalog.viewer)

<!-- #p100624 -->
## Collected Metadata

<!-- #p100630 -->
### Inventory

<!-- #p100636 -->
Will collect the list of tables and views accessible by the user.  

<!-- #p100642 -->
### Dataset

<!-- #p100648 -->
A dataset can be a table or a view. 

- <!-- #p100657 -->
  **Name**

- <!-- #p100669 -->
  **Source Description**

- <!-- #p100681 -->
  **Technical Data**:

  - <!-- #p100687 -->
    Project Id

  - <!-- #p100696 -->
    Dataset Id

  - <!-- #p100705 -->
    Table Id

  - <!-- #p100714 -->
    Origin

  - <!-- #p100723 -->
    Dataset Type

<!-- #p100741 -->
### Field

<!-- #p100747 -->
Dataset field. 

- <!-- #p100756 -->
  **Name**

- <!-- #p100768 -->
  **Source Description**

- <!-- #p100780 -->
  **Type**

- <!-- #p100792 -->
  **Can be null**: Depending on the field settings.

- <!-- #p100810 -->
  **Multivalued**: `true` for array fields, `false` otherwise.

- <!-- #p100825 -->
  **Primary Key**: Not supported. Default value `false`.

<!-- #p100837 -->
### Tags

<!-- #p100846 -->
It's possible to get all the tags applied to your Data Catalog objects through a specified configuration in your dedicated scanner. You just need to define the tag model you want to get into your Zeenea Data Catalog in the `application.conf` file of your scanner.

<!-- #p100855 -->
Here is an example of a configuration file `application.conf` that retrieves select tags:

<!-- #p100861 -->
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

<!-- #p100867 -->
## Object Identification Keys

<!-- #p100873 -->
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

<!-- #p100882 -->
More information about how it works can be found here: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100888 -->
| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/bigquery/project id/dataset id/table id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project id**: BigQuery project id<br/>- **dataset id**: BigQuery dataset name<br/>- **table id**: Table name |
| Field | code/bigquery/project id/dataset id/table id/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project id**: BigQuery project name<br/>- **dataset id**: BigQuery dataset name<br/>- **table id**: Table name<br/>- **field name** |


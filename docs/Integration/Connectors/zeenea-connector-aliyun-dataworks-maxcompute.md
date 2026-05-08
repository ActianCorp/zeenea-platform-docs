# Adding an Aliyun DataWorks MaxCompute Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100126 "title: Aliyun DataWorks MaxCompute") is required to establish a connection with Aliyun DataWorks MaxCompute.

- <!-- #p100039 -->
  Zeenea traffic flows towards the data source must be open.

<!-- #p100054 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100060 -->
## Installing the Plugin

<!-- #p100069 -->
The Aliyun DataWorks MaxCompute plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads").

<!-- #p100078 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100084 -->
## Declaring the Connection

<!-- #p100093 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

<!-- #p100102 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100108 -->
In order to establish a connection with a Aliyun DataWorks MaxCompute instance, specifying the following parameters in the dedicated file is required:

<!-- #p100114 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `aliyun-dataworks-maxcompute` and this value must not be modified. |
| `connection.region_id` | The region ID. The complete list is available [here](https://www.alibabacloud.com/help/en/acr/user-guide/region-list). |
| `connection.access_key_id` | The user's access key id.<br/><br/>This parameter is optional, the key can be provided through the environment variable `ALIBABA_CLOUD_ACCESS_KEY_ID`.<br/><br/>If both are defined, the environment variable will be used. |
| `connection.access_key_secret` | The secret associated to the access key.<br/><br/>This parameter is optional, the key can be provided through the environment variable `ALIBABA_CLOUD_ACCESS_KEY_SECRET`.<br/><br/>If both are defined, the environment variable will be used.<br/>Example: `export ALIBABA_CLOUD_ACCESS_KEY_SECRET="abc654dqzER54C15674EZcazd"` |
| **Quota** | |
| `quota.max_retry` | Maximum number of retries when a request encounters a quota expiration error.<br/> Default value: `3`. |
| `quota.timeout_minute` | Maximum waiting time when waiting for the availability of a quota, in minutes.<br/>Default value: `1` minute. |
| `quota.call_per_min` | Calls per minute quota value. Default value: `50`. |
| **Proxy** | |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

<!-- #p100126 -->
## User Permissions

<!-- #p100132 -->
To collect the items, the technical user must be added to each project that needs cataloging.

<!-- #p100138 -->
## Data Extraction

<!-- #p100144 -->
To extract information, the connector runs requests on following services:

- <!-- #p100153 -->
  [ListProjects](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-listprojects): Retrieve all projects.

- <!-- #p100165 -->
  [GetMetaDBTableList](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetadbtablelist): Retrieve all project's tables.

- <!-- #p100177 -->
  [GetMetaTableBasicInfo](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetatablebasicinfo): Retrieve table's info.

- <!-- #p100189 -->
  [GetMetaTableColumn](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetatablecolumn): Retrieve all table's columns.

- <!-- #p100201 -->
  [GetMetaTableLineage](https://www.alibabacloud.com/help/en/dataworks/developer-reference/api-getmetatablelineage): Retrieve all table's lineage.

<!-- #p100213 -->
## Collected Metadata

<!-- #p100219 -->
### Inventory

<!-- #p100225 -->
Will collect the list of tables and views accessible by the user.  

<!-- #p100231 -->
### Dataset

<!-- #p100237 -->
A dataset can be a table or a view. 

- <!-- #p100246 -->
  **Name**

- <!-- #p100258 -->
  **Source Description**

- <!-- #p100270 -->
  **Technical Data**:

  - <!-- #p100276 -->
    Type

  - <!-- #p100285 -->
    Creation Date

  - <!-- #p100294 -->
    Last Modification Date

<!-- #p100312 -->
### Field

<!-- #p100318 -->
Dataset field. 

- <!-- #p100327 -->
  **Name**

- <!-- #p100339 -->
  **Source Description**

- <!-- #p100351 -->
  **Type**

- <!-- #p100366 -->
  **Can be null**: Not supported. Default value `FALSE`.

- <!-- #p100381 -->
  **Multivalued**: Not supported. Default value `FALSE`.

- <!-- #p100393 -->
  **Primary Key**: Depending on the field's "Primary Key" attribute.

- <!-- #p100405 -->
  **Technical Data**: 

  - <!-- #p100411 -->
    Native type

<!-- #p100429 -->
### Data Processes

<!-- #p100435 -->
To represent the data flow between tables, a Zeenea Data Process will be created for a table and its ancestors.

- <!-- #p100447 -->
  **Name**: `import dataset_name`

<!-- #p100459 -->
## Unique Identification Keys

<!-- #p100465 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100474 -->
More information about how it works can be found here: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100480 -->
| Object | Identifier Key | Description |
|---|---|---|
| Dataset | code/table ID | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **table ID**: Unique ID defined by the source system |
| Field | code/column ID | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **column ID**: Unique ID defined by the source system |
| Data process | code/import/output table ID | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **output table ID**: Unique ID of the output table |


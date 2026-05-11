# Adding a Google Data Lineage Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Google Data Lineage API.
* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Data Lineage connector was developed and tested with the web version of the product. 

## Installing the Plugin

The Google plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with a Data Lineage instance, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `google-data-lineage` and this value must not be modified. |
| `connection.json_key` | JSON access key.<br /><br />The key can be indicated directly or put in a separate file. In the latter case, this parameter indicates the path to the file in the form of a URI of scheme `file:`.<br /><br />Example: `file:///opt/zeenea-scanner/connections/gdc_json_key.json`<br /><br />**Warning**: If you indicate directly the token, you must use triple quotes to encapsulate the key as a parameter. Example: `"""{my: "json"}"""`. |
| `scope.project_id` | List of project ids separated by comma |
| `scope.location_id` | List of location ids separated by comma |
| `filter` | To filter synchronized data process. See [Rich Filters](#rich-filters). |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `quota.read_per_minute` | Reads per minute quota value. Default value: `1000` (default value of Google Data Lineage). |
| `quota.search_per_user_per_minute` | Search quota value per user per minute. Default value: `180`. |
| `quota.timeout_minute` | Maximum waiting time when waiting for the availability of a quota. Default value: `10` minutes. |
| `quota.max_retry` | Maximum number of retries when a request encounters a quota expiration error |

## Rich Filters

The Data Lineage connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](../Scanners/zeenea-filters.md)

The filter can apply to the following criteria:

| Criteria | Description |
| :--- | :--- |
| name | Process name |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to read data lineage information. 

Here, the user must have the followings authorizations:

* `datalineage.events.list`
* `datalineage.processes.list`
* `datalineage.runs.list`

## Data Extraction

To extract information, the connector runs the following request on the Google Data Lineage API:

* `projects.locations.processes.list`
* `projects.locations.processes.runs.list`
* `projects.locations.processes.runs.lineageEvents.list`
  
## Collected Metadata

### Synchronize

Collects the list of data processes accessible by the user from Google Data Lineage API.  

### Lineage

The connector will synchronize all processes identified in Google Data Lineage and automatically represent them in the catalog.

List of supported systems:

* BigQuery
* Dataplex
* Redshift
* MySQL
* Oracle
* PostgreSQL
* SQL Server
* Snowflake
* DB2
* Hive Metastore
* Google Cloud Storage

### Data Process

A data process is a Google Data Lineage transformation. 

* **Name**
* **Input**: Input datasets
* **Output**: Output datasets
* **Technical Data**:
  * Project : Project identifier of the process
  * Location : Location identifier of the process
  * Origin : Google job's origin
  * Job ID : BigQuery job identifier
  * Id : Process identifier

## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Data process | code/project\_id/location\_id/process\_id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project_id**: Google project identifier<br/>- **location_id**: Google location identifier<br/>- **process_id**: Google process identifier |
    

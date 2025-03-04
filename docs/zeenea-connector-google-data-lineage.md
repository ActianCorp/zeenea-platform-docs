---
title: Google Data Lineage
---

# Adding a Google Data Lineage Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Google Data Lineage API.
* Zeenea traffic flows towards the data source must be open.

:::note
A configuration template can be downloaded here: [google-data-lineage.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgTd&d=%2Fa%2FNu000002lfPx%2FM0kQjkCnBJfcDLofYg0XHgM0m_C_fCX5jM4E6rfw4oc&asPdf=false)
:::

<font color="red">There are 2 configuration templates attached to the Community article. The only difference is that `filter = ""` is commented out in one. Was it intentional to include both?</font>

## Supported Versions

The Data Lineage connector was developed and tested with the web version of the product. 

## Installing the Plugin

The Google plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Data Lineage instance, specifying the following parameters in the dedicated file is required:
 
<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection.</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The type of connector to be used for the connection. Here, the value must be `google-data-lineage` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.json_key`</td>
    <td>
      <p>JSON access key.<br /><br />The key can be indicated directly or put in a separate file. In the latter case, this parameter indicates the path to the file in the form of a URI of scheme `file:`.</p>
      <p>Example: `file:///opt/zeenea-scanner/connections/gdc_json_key.json`</p>
      <p>**Warning**: If you indicate directly the token, you must use triple quotes to encapsulate the key as a parameter. Example: `"""{my: "json"}"""`.</p>
    </td>
  </tr>
  <tr>
    <td>`scope.project_id`</td>
    <td>List of project ids separated by comma</td>
  </tr>
  <tr>
    <td>`scope.location_id`</td>
    <td>List of location ids separated by comma</td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter synchronized data process. See [Rich Filters](#rich-filters).</td>
  </tr>
  <tr>
    <td>`proxy.scheme`</td>
    <td>Depending on the proxy, `http` or `https`</td>
  </tr>
  <tr>
    <td>`proxy.hostname`</td>
    <td>Proxy address</td>
  </tr>
  <tr>
    <td>`proxy.port`</td>
    <td>Proxy port</td>
  </tr>
  <tr>
    <td>`proxy.username`</td>
    <td>Proxy username</td>
  </tr>
  <tr>
    <td>`proxy.password`</td>
    <td>Proxy account password</td>
  </tr>
  <tr>
    <td>`quota.read_per_minute`</td>
    <td>Reads per minute quota value. Default value: `1000` (default value of Google Data Lineage).</td>
  </tr>
  <tr>
    <td>`quota.search_per_user_per_minute`</td>
    <td>Search quota value per user per minute. Default value: `180`.</td>
  </tr>
  <tr>
    <td>`quota.timeout_minute`</td>
    <td>Maximum waiting time when waiting for the availability of a quota. Default value: `10` minutes.</td>
  </tr>
  <tr>
    <td>`quota.max_retry`</td>
    <td>Maximum number of retries when a request encounters a quota expiration error</td>
  </tr>
</table>

## Rich Filters

The Data Lineage connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](zeenea-filters.md)

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

## Synchronize

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

Read more: [Identification Keys](./zeenea-identification-keys.md)

 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
     <td>Data process</td>
     <td>code/project_id/location_id/process_id</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**project_id**: Google project identifier</li>
         <li>**location_id**: Google location identifier</li>
         <li>**process_id**: Google process identifier</li>
       </ul>
     </td>
   </tr>
 </table>
    

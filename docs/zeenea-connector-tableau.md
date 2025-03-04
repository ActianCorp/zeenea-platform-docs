---
title: Tableau
---

# Adding a Tableau Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with the Tableau solution. Please read [User Permissions](#user-permissions) below.
* The Zeenea traffic flows towards Tableau must be open. If you want to connect Zeenea to a Tableau installed on your own server, you must activate the Tableau API Metadata. See documentation here: https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server

## Supported Versions

The Tableau connector was tested on the SaaS solution. 

## Installing the Plugin

:::warning
**This version of the connector is NOT compatible with previous versions (3.XX and earlier) of Tableau Connector!**

All the items you may have already imported **MUST** be deleted and reimported.

If you need to export your documentation before upgrading, please contact our support before proceeding.
:::

The Tableau plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
 Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
 Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with Tableau, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `Tableau` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>URL of the server hosting Tableau. Example: `https://eu-west-1a.online.tableau.com/`</td>
  </tr>
  <tr>
    <td>`connection.site`</td>
    <td>
      <p>Name of the website created on the aforementioned server. The site name can be found in the URL.</p>
      <p>Example: https<span>:</span>//eu-west-1a.online.tableau.com/#/site/<b><i>site-name</i></b>/home</p>
    </td>
  </tr>
  <tr>
    <td>`connection.token.name`</td>
    <td>Token name obtained within the Tableau account menu. Official documentation can be found [here](https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens).</td>
  </tr>
  <tr>
    <td>`connection.token.secret`</td>
    <td>Token secret</td>
  </tr>
  <tr>
    <td>`connection.timeout`</td>
    <td>(Optional; Advanced) Timeout delay of the GraphQL request. Delay in milliseconds.<br /> Default: `10000` ms.</td>
  </tr>
  <tr>
    <td>`lineage`</td>
    <td>
      <p>(Optional) **Version 4.2.0 and later**</p>
      <p>Three modes available:</p>
      <ul>
        <li>`full`: do the full lineage</li>
        <li>`simplified`: ignore embedded data sources when they they are linked to a unique published data source. The workbook is then directly linked to this published data source.</li>
        <li>`disabled`: only data sources linked to the workbook are loaded.</li>
      </ul>
      <p>For compatibility with earlier version, `true` is a synonym of `full` and `false` is a synonym of `disabled`. Use canonical names whenever possible.</p>
      <p>This value should not be changed after having been enabled and items have been imported.</p>
      <p>**Version 4.1.0 and earlier**</p>
      <p>Default value `false`. Set to `true` to activate automatic lineage feature.</p>
    </td>
  </tr>
  <tr>
    <td>`multi_catalog.enabled`</td>
    <td>(Optional) Default value `false`. Set to `true` if lineage source system is also configured with multi catalog option.</td>
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
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Tableau servers (or/and configured proxy) are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

A Personal Access Token must be generated to access the metadata.

In order to generate this token, log into Tableau with a User having Site Administrator privilege.

Then, make sure you can create a Personal Access Token for the site (see instructions here: https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens).

In case you are using Tableau Server, you also have to activate Tableau Metadata API. Instructions are provided here: https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server.

Finally, create a PAT (Personal Access Token) and paste it into your Tableau Connection configuration file.

## Data Extraction

In order to extract information from Tableau, the connector will scan all workbooks within the solution and transform them into **Visualization** objects in Zeenea. All related Data Sources are then collected and transferred to Zeenea. Data sources are referenced as **Datasets**. Fields are recreated as **Field** type objects in Zeenea. <font color="red">Is this a cut/paste error? Refers to Looker:</font> For each Looker Dataset, a **Data Process** is created to represent the lineage with the origin Dataset.

To identify the objects in the source system, the connector uses the technical identifiers produced by Tableau. In cases where these are changed (following a modification for example), this will lead to the duplication of the object in the catalog.
 
## Collected Metadata

### Inventory

The inventory collects the list of reports (along with their data sources) that the user can access. 

## Lineage

<font color="red">Is this a cut/paste error? Refers to Looker:</font>

The Tableau connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Looker dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Tableau connection configuration panel.

<table>
  <tr>
    <th>Source System</th>
    <th>Possible value of `alias` parameter to be set in source system configuration file</th>
  </tr>
  <tr>
    <td>[BigQuery](./zeenea-connector-google-bigquery.md)</td>
    <td>`bigquery-{project name}`</td>
  </tr>
  <tr>
    <td>[Snowflake](./zeenea-connector-snowflake.md)</td>
    <td>`snowflake-{database name}`</td>
  </tr>
  <tr>
    <td>[Redshift](./zeenea-connector-aws-redshift.md)</td>
    <td>`bigquery-{project name}`</td>
  </tr>
  <tr>
    <td>[SQL Server](./zeenea-connector-sqlserver.md)</td>
    <td>`redshift-{database name}`</td>
  </tr>
  <tr>
    <td>[Oracle](./zeenea-connector-oracle.md)</td>
    <td>`oracle-{database name}`</td>
  </tr>
</table>

:::note
The connector creates a data process object for each dataset from Tableau to represent the link with the source dataset (even if the source dataset is not present in the catalog).
:::

### Visualization

A Visualization is a Tableau workbook. 

* **Name**
* **Description**
* **Technical Data**:
  * Project
  * Workbook
  * Workbook URL
  * Created at
  * Updated at
  * Contact: Link to the already created contact in the catalog
  
### Dataset

A Dataset is a Data source used in a Tableau report. 

* **Name**
* **Source Description**: Not supported

### Field

Dataset field. Can be used as a Tableau report metric. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: `false` (default)
* **Multivalued**: `false` (default)
* **Primary Key**: `false` (default)
* **Technical Data**:
  * Technical Name
  * Native type: Field native type

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Tableau Dataset.

* **Name**: `import input/output dataset name`

## Object Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
     <td>Visualization</td>
     <td>code/workbook identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**workbook identifier**: Workbook Tableau technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Dataset</td>
     <td>code/dataset/data source identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**data source identifier**: Data Source Tableau technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/dataset/data source identifier/field identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**data source identifier**: Data Source Tableau technical identifier</li>
         <li>**field identifier**: Field Tableau technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Data process</td>
     <td>code/transformation/data source identifier</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**data source identifier**: Data Source Tableau technical identifier</li>
       </ul>
     </td>
   </tr>
 </table>
    

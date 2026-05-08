# Adding a Tableau Connection (Deprecated)

## Deprecated

The Tableau (V1) plugin has been deprecated. You can use the [Tableau (V2)](./zeenea-connector-tableau-v2.md) connector instead.

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with the Tableau solution. Please read [User Permissions](#user-permissions) below.
* The Zeenea traffic flows towards Tableau must be open. If you want to connect Zeenea to a Tableau installed on your own server, you must activate the Tableau API Metadata. See documentation here: [https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server](https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server)

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Tableau connector was tested on the SaaS solution. 

## Installing the Plugin

> **Warning:** 
> * This version of the connector is NOT compatible with previous versions (3.XX and earlier) of Tableau Connector.
> * All the items you may have already imported **MUST** be deleted and reimported.
> * If you need to export your documentation before upgrading, please contact our support before proceeding.

The Tableau plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with Tableau, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `Tableau` and this value must not be modified. |
| `connection.url` | URL of the server hosting Tableau. Example: `https://eu-west-1a.online.tableau.com/` |
| `connection.site` | Name of the website created on the aforementioned server. The site name can be found in the URL.<br/>Example: https:&#47;&#47;eu-west-1a.online.tableau.com/#/site/**_site-name_**/home |
| `connection.token.name` | Token name obtained within the Tableau account menu. Official documentation can be found [here](https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens). |
| `connection.token.secret` | Token secret |
| `connection.timeout` | (Optional; Advanced) Timeout delay of the GraphQL request. Delay in milliseconds.<br/> Default: `10000` ms. |
| `lineage` | (Optional) **Version 4.2.0 and later**<br/>Three modes available:<br/>- `full`: do the full lineage<br/>- `simplified`: ignore embedded data sources when they they are linked to a unique published data source. The workbook is then directly linked to this published data source.<br/>- `disabled`: only data sources linked to the workbook are loaded.<br/>For compatibility with earlier version, `true` is a synonym of `full` and `false` is a synonym of `disabled`. Use canonical names whenever possible.<br/>This value should not be changed after having been enabled and items have been imported.<br/>**Version 4.1.0 and earlier**<br/>Default value `false`. Set to `true` to activate automatic lineage feature. |
| `multi_catalog.enabled` | (Optional) Default value `false`. Set to `true` if lineage source system is also configured with multi catalog option. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Tableau servers (or/and configured proxy) are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

A Personal Access Token must be generated to access the metadata.

In order to generate this token, log into Tableau with a User having Site Administrator privilege.

Then, make sure you can create a Personal Access Token for the site (see instructions here: [https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens](https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens).

In case you are using Tableau Server, you also have to activate Tableau Metadata API. Instructions are provided here: [https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server](https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server)

Finally, create a PAT (Personal Access Token) and paste it into your Tableau Connection configuration file.

## Data Extraction

[comment]: <> (Text refers to Looker. Is this a cut/paste error?)

In order to extract information from Tableau, the connector will scan all workbooks within the solution and transform them into **Visualization** objects in Zeenea. All related Data Sources are then collected and transferred to Zeenea. Data sources are referenced as **Datasets**. Fields are recreated as **Field** type objects in Zeenea. For each Looker Dataset, a **Data Process** is created to represent the lineage with the origin Dataset.

To identify the objects in the source system, the connector uses the technical identifiers produced by Tableau. In cases where these are changed (following a modification for example), this will lead to the duplication of the object in the catalog.
 
## Collected Metadata

### Inventory

The inventory collects the list of reports (along with their data sources) that the user can access. 

### Lineage

[comment]: <> (Text refers to Looker. Is this a cut/paste error?)

The Tableau connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Looker dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Tableau connection configuration panel.

| Source System | Possible value of `alias` parameter to be set in source system configuration file |
|---|---|
| [BigQuery](./zeenea-connector-google-bigquery.md) | `bigquery-{project name}` |
| [Snowflake](./zeenea-connector-snowflake.md) | `snowflake-{database name}` |
| [Redshift](./zeenea-connector-aws-redshift.md) | `bigquery-{project name}` |
| [SQL Server](./zeenea-connector-sqlserver.md) | `redshift-{database name}` |
| [Oracle](./zeenea-connector-oracle.md) | `oracle-{database name}` |

> **Note:** The connector creates a data process object for each dataset from Tableau to represent the link with the source dataset (even if the source dataset is not present in the catalog).

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

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Visualization | code/workbook identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **workbook identifier**: Workbook Tableau technical identifier |
| Dataset | code/dataset/data source identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **data source identifier**: Data Source Tableau technical identifier |
| Field | code/dataset/data source identifier/field identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **data source identifier**: Data Source Tableau technical identifier<br/>- **field identifier**: Field Tableau technical identifier |
| Data process | code/transformation/data source identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **data source identifier**: Data Source Tableau technical identifier |
  

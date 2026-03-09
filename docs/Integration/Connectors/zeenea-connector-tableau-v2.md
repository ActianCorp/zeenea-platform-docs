# Adding a Tableau (V2) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with the Tableau solution. Please read [User Permissions](#user-permissions) below.
* The Zeenea traffic flows towards Tableau must be open. If you want to connect Zeenea to a Tableau installed on your own server, you must activate the Tableau API Metadata. See documentation here: [https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server](https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server)

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Tableau connector was tested on the SaaS solution. 

## Installing the Plugin

!!! warning
    Migrating from Tableau (V1) connector to Tableau (V2) connector will need specific operations. Please contact customer service to assist you in this migration.

The Tableau plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../../Features/zeenea-administration/zeenea-managing-connections.md)
 
In order to establish a connection with Tableau, specifying the following parameters in the dedicated file is required:
 
| Parameter                     | Expected value  |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `tableau-v2` and this value must not be modified. |
| `connection.url` | URL of the server hosting Tableau. Example: `https://eu-west-1a.online.tableau.com/` |
| `connection.site` | Name of the website created on the aforementioned server. The site name can be found in the URL.  <br/> Example: https://eu-west-1a.online.tableau.com/#/site/**_site-name_**/home |
| `connection.token.name` | Token name obtained within the Tableau account menu. Official documentation can be found [here](https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens). |
| `connection.token.secret` | Token secret |
| `connection.timeout` | (Optional; Advanced) Timeout delay of the GraphQL request. Delay in milliseconds.  <br/> Default: `10000` ms. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Tableau servers (or/and configured proxy) are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |




## User Permissions

A Personal Access Token must be generated to access the metadata.

In order to generate this token, log into Tableau with a User having Site Administrator privilege.

Then, make sure you can create a Personal Access Token for the site. See instructions here: [https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens](https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens).

In case you are using Tableau Server, you also have to activate Tableau Metadata API. Instructions are provided here: [https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server](https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server).

Finally, create a PAT (Personal Access Token) and paste it into your Tableau Connection configuration file.

## Universal Filters

Use universal filter language to filter and root items with the following criteria:

| Criteria | Description |
| :--- | :--- |
| `site`        | (String) Site if multi-site enabled |
| `id`          | (UUID) Item ID |
| `type`        | (String Enum) Item type (workbook/publisheddatasource) |
| `project_name`| (String) Project name |
| `name`        | (String) Item name |

#### Example:

```
filters = [
  {
    id="accept_zeenea_project"
    action = ACCEPT
    rules {
      project_name = "Zeenea"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

Read more: [Universal Filters](../Scanners/zeenea-universal-filters.md)

## Data Extraction

In order to extract information from Tableau, the connector will scan all workbooks within the solution and transform them into **Visualization** objects in Zeenea. All related Data Sources are then collected and transferred to Zeenea. Data sources are referenced as **Datasets**. Fields are recreated as **Field** type objects in Zeenea. For each Tableau Dataset, a **Data Process** is created to represent the lineage with the origin Dataset.

To identify the objects in the source system, the connector uses the technical identifiers produced by Tableau. In cases where these are changed (following a modification, for example), this will lead to the duplication of the object in the catalog.
 
## Collected Metadata

### Inventory

The inventory collects the list of reports (along with their data sources) that the user can access. 

### Lineage

The Tableau connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Tableau dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Tableau connection configuration panel.


The Tableau (V2) connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Tableau (V2) dataset through a new Data Process object.  This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Tableau connection configuration panel. For example, if the Tableau dataset comes from a SQL Server table, then a new alias parameter must be added in the SQL Server connection configuration file.

The following table summarizes the possible values of the `alias` parameter to be completed in the data source configuration file.

| Source System| Model | Example |
| :--- | :--- | :--- |
| [SQL Server](./zeenea-connector-sqlserver.md) | Server name:port/Database name | `alias = ["zeenea.database.windows.net:1433/db"]` * |
| [BigQuery](./zeenea-connector-google-bigquery.md) | BigQuery project identifier	| `alias = ["zeenea-project"]` |
| [AWS Redshift](./zeenea-connector-aws-redshift.md) | Server name:port/Database name | `alias = ["zeenea.cthwlv3ueke2.eu-west-3.redshift.amazonaws.com:5439/database"]` |
| [Snowflake](./zeenea-connector-snowflake.md) | Server name/Database name | `alias = ["kn999999.eu-west-1.snowflakecomputing.com/ZEENEA""]` * |
| [Oracle](./zeenea-connector-oracle.md) | Server name:port/Service Name | `alias = ["oracle.example.com:1521/XE"]` |
| [Denodo](./zeenea-connector-denodo.md) | Server name:ODBC port | `alias = ["denodo.database.com:9996"]` |

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

* **Name**: `IMPORT dataset_name`

## Object Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

Read more: [Identification Keys](../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md)

| Object       | Identification Key                                            | Description |
| --- | --- | --- |
| Visualization | code/workbook/`id` | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **id**: Workbook Tableau technical identifier |
| Dataset       | code/publisheddatasource/`id` | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **id**: Data Source Tableau technical identifier |
| Field         | code/publisheddatasource/`id`/`field_identifier` | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **id**: Data Source Tableau technical identifier  <br/> - **field_identifier**: Field Tableau technical identifier |
| Data process  | code/workbook/`id`/process  <br/> code/publisheddatasource/`id`/process | - **code**: Unique identifier of the connection noted in the configuration file  <br/> - **id**: Workbook or Data Source Tableau technical identifier |

  

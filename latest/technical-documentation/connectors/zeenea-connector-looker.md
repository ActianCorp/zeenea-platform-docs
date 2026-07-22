# Adding a Looker Connection

## Prerequisites

To connect to the Looker platform, the running user must have access to the required Dashboards.

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


## Supported Versions

The Looker connector is compatible with the SaaS Looker instances hosted on Google Cloud (`*.cloud.looker.com`). 
!!! note
    Legacy AWS-hosted Looker instances (URLs without `cloud`) are not supported.


## Installing the Plugin

You can download the Looker plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

For more information about managing connections, see [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md).

To establish a connection with Looker, fill in the following parameters in the dedicated configuration file using a **JSON-Style** format:

| Parameter | Expected value |
|----|-----|
| `name` | Specifies the display name for the connection. |
|  |  |
| `code` | Defines the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
|  |  |
| `connector_id` | The type of connector to be used for the connection. The value must be `looker` and must not be modified. |
|  |  |
| `enabled` | A boolean value to enable or disable the connection. The default value is `true`. |
|  |  |
| `catalog_code` | Defines the catalog code associated with the connection ("default" when empty). |
|  |  |
| <code>secret_manager {<br>&nbsp;&nbsp;&nbsp;enabled =<br>&nbsp;&nbsp;&nbsp;key =<br>}</code> | Configuration for a secret manager. <br />This configuration works only with Scanner version 73 or later and requires a functional secret manager configured in the scanner configuration file.<br /><br />Where:<br />• `enabled`: A boolean value to enable or disable the secret manager. The default value is `true`.<br />• `key`: Specifies the name of the secret. |
|  |  |
| <code>connection {<br>&nbsp;&nbsp;&nbsp;tenant =<br>&nbsp;&nbsp;&nbsp;oauth {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;client_id =<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;client_secret =<br>&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;timeout =<br>&nbsp;&nbsp;&nbsp;fetch_offset_size =<br>}</code> | Connection settings<br /><br />Where:<br />• `tenant`: The tenant address. In URL address, it is the name of your server before `.cloud.looker.com`.<br />• `client_id`: Token name obtained within the Looker account menu.<br />• `client_secret`: Token secret.<br />• `timeout`: (Optional) Customizable HTTP client timeout depending on Looker repository volume, in ms. The default value is `10000` (10 sec).<br />• `fetch_offset_size`: (Optional) Customizable offset size for the dashboard inventory. The default value is `100`. |
|  |  |
| `lineage` | (Optional) A boolean value to activate the automatic lineage feature. The default value is `true`. |
|  |  |
| <code>proxy {<br>&nbsp;&nbsp;&nbsp;scheme =<br>&nbsp;&nbsp;&nbsp;hostname =<br>&nbsp;&nbsp;&nbsp;port =<br>&nbsp;&nbsp;&nbsp;username =<br>&nbsp;&nbsp;&nbsp;password =<br>}</code> | Proxy configuration<br /><br />Where:<br />• `scheme`: Defines the proxy protocol (`http` or `https`).<br />• `hostname`: Specifies the proxy address.<br />• `port`: Sets the proxy port.<br />• `username`: Provides the proxy username.<br />• `password`: Provides the proxy account password. |
|  |  |
| <code>tls {<br>&nbsp;&nbsp;&nbsp;truststore {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path =<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password =<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type =<br>&nbsp;&nbsp;&nbsp;}<br>}</code> | TLS Truststore settings<br /><br />Where:<br />• `path`: Specifies the TLS trust store file path. This file must be provided in case TLS encryption is activated (protocol `https`) and when certificates of Looker servers (or/and configured proxy) are delivered by a specific authority. It must contain the certification chain.<br />• `password`: Provides the password of the trust store file.<br />• `type`: Defines the type of the trust store file (`PKCS12` or `JKS`). The default value is discovered from the file extension. |

## User Permissions

To collect metadata, the running user's permissions must allow them to access and read dashboards that need cataloging. 

## Data Extraction

To extract information from Looker, the connector will scan all Dashboards the running user has access to and transform them into **Visualization** objects in Zeenea. Data sources are referenced as **Datasets**. Fields are recreated as **Field**-type objects in Zeenea. For each Looker Dataset, a **Data Process** is created to represent the lineage with the origin Dataset.

The connector executes the following requests:
```bash
  GET /api/4.0/dashboards/\{dashboard-id}/search
  GET /api/4.0/connections/
  GET /api/4.0/folders/\{folder-id}/ancestors
  GET /api/4.0/lookml_models/\{model-name}/explores/\{dataset-name}
  POST /login
```
## Collected Metadata

### Inventory

The inventory collects the list of Dashboards (along with their data sources) that the user can access. 

### Lineage

The Looker connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Looker dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Looker connection configuration panel.

| Source System | Possible value of `alias` parameter to be set in source system configuration file |
|---|---|
| [BigQuery](./zeenea-connector-google-bigquery.md) | BigQuery project name |

!!! note
    The connector creates a data process object for each dataset from Looker to represent the link with the source dataset (even if the source dataset is not present in the catalog).


### Visualization

A Visualization is a Looker Dashboard.

* **Name**
* **Source Description**: Dashboard label
* **Datasets**: All datasets referenced in the Dashboard
* **Technical Data**:

    * Creation date: Creation date
    * Parent space: space containing the Dashboard
    * Last visualization date: Last visualization date
    * Number of views by web UI: Number of views by web UI

### Dataset

A dataset is a Data source used in a Looker Dashboard.

* **Name**
* **Source Description**: Dataset label
* **Technical Data**:

    * Explore name: Explore name Looker
    * Schema name: Schema name as it’s described in the database called
    * Model name: Model name
    * Connection name: Connection name

### Field

Dataset field. Can be used as a Dashboard report data. 

* **Name**
* **Source Description**: Field label
* **Type**
* **Can be null**: `false` (default)
* **Multivalued**: `false` (default)
* **Primary Key**: `false` (default)
* **Technical Data**:

    * Field type: Is the field whether a dimension or a measure

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Looker Dataset.

* **Name**: `import input/output_dataset name`

## Object Identifier Keys
 
An identification key is associated with each object in the catalog. In the case of a synchronized object (i.e., created via a connector), the identification key is generated by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).
  
| Object | Identification Key | Description |
|---|---|---|
| Visualization | code/identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **identifier**: Looker technical object identifier |
| Dataset | code/dataset/identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **identifier**: Looker technical object identifier |
| Field | code/dataset/identifier/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **identifier**: Looker technical object identifier<br/>- **field name** |
| Data process | code/transformation/model name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **model name**<br/>- **dataset name** |
 
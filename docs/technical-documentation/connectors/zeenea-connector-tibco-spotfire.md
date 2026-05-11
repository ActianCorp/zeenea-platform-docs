# Adding a Tibco Spotfire Connection (Deprecated)

## Deprecated

The Tibco Spotfire (V1) plugin has been deprecated. You can use the [Tibco Spotfire (V2)](./zeenea-connector-tibco-spotfire-v2.md) connector instead.

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Spotfire.
* Zeenea traffic flows towards the server must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Spotfire connector was developed and tested with Spotfire Server version 11.6.0.

## Installing the Plugin

The Spotfire plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)
 
In order to establish a connection with a Spotfire Server instance, specifying the following parameters in the dedicated file is required:
 
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `tibco-spotfire` and this value must not be modified. |
| `connection.strategy` | Spotfire connector strategy<br/>- **webservice**: SOAP integration mode<br/>- **database**: JDBC integration mode<br/>Default value: `webservice` |
| `connection.url` | Webservice strategy:<br/>- Server address (example: `https://spotfire.prod.client.ec2`)<br/>Database strategy:<br/>- Database JDBC URL (example: `jdbc:postgresql://server:5432/spotfire_server`) |
| `connection.oauth.client_id` | Webservice strategy **only**.<br/><br/>OAuth2 client ID |
| `connection.oauth.client_secret` | Webservice strategy **only**.<br/><br/>OAuth2 client secret |
| `connection.auth_with_session` | Webservice strategy **only**.<br/><br/>**Optional**.<br/><br/>Default value `false`. Set to `true` to use user session to download the dxp file. |
| `connection.username` | Webservice strategy:<br/>- **Optional**<br/>- Session user to download the dxp file.<br/>Database strategy:<br/>- JDBC username |
| `connection.password` | Webservice strategy:<br/>- **Optional**<br/>- Session user password to download the dxp file.<br/>Database strategy:<br/>- JDBC user password |
| `connection.jdbc_driver_name` | Database strategy **only**<br/><br/>JDBC driver name (example: `org.postgresql.Driver`) |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Spotfire servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read Spotfire analytics that need cataloging.

If the connector's strategy is set to `webservice`, the user must have sufficient rights to call the library-services web service. The client must have the following rights:

```
export CONFIG_TOOL_PASSWORD=""
scope=-Sapi.soap.library-service
./config.sh register-api-client --tool-password="${CONFIG_TOOL_PASSWORD}" --name=zeenea-scanner $scope --client-profile=other -Gclient_credentials
```

If connector's strategy is set to `database`, configured user must have read access to the following Spotfire tables in associated database:

* `lib_data`
* `lib_items`
* `lib_item_types`
* `lib_resolved_depend`
* `lib_properties`
* `users`
 
## Data Extraction

To extract information, the connector runs requests on the Web Services API. During the inventory, the connector collects the list of Spotfire Analysis reachable by the configured client. If connector's strategy is set to `database`, inventory will be made through data retrieved from Spotfire internal database. During the import of the selected Analysis, the connector gets the .dxp file of the Analysis and identifies datasets it contains. The metadata are sent to the catalog.

## Collected Metadata

### Inventory

Will collect the list of visualizations accessible by the user.

### Lineage

The Spotfire connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Spotfire dataset through a new data process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Spotfire server.

| Source System| **Possible value of `alias` parameter to be assigned in the source system configuration file** |
| :--- | :--- | 
| [AWS Redshift](./zeenea-connector-aws-redshift.md) | `host:port/db` |
| [Tibco Data Virtualization](./zeenea-connector-tibco-data-virtualization.md) | `IP` |

> **Note:** The connector creates a data process object for each dataset from Spotfire to represent the link with the source dataset even if the source dataset is not present in the catalog.

### Visualization

A Visualization is a Spotfire Analysis.

* **Name**
* **Source Description**
* **Technical Data**:
  * Path
  * Parent Id
  * Created By Domain Name
  * Modified By Domain Name
  * Creation Date
  * Modification Date
  * Page Count
  * Visualization Count
  * Table Count
  * Column Count
  * Embed All Source Data
  * Size
  * Total Table Load Time

### Dataset

A dataset is a data set used in a Spotfire Analysis.

* **Name**
* **Source Description**: Description not retrieved

### Fields

Dataset field. 

* **Name**
* **Source Description**: Description not retrieved
* **Type**
* **Can be null**: Not supported. Default value `false`.
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Data**:
  * Technical Name
  * Native type: field native type

### Data Process

To represent the data flow from an external source. One Data Process will be created for each Spotfire Dataset.

* **Name**: `import input/output_dataset name`

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

Read more: [Identification Keys](../Stewardship/zeenea-identification-keys.md)

| Object | Identification Key | Description |
|---|---|---|
| Visualization | code/path/analysis name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Spotfire path to the analysis<br/>- **analysis name** |
| Dataset | code/dataset/path/analysis name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Spotfire path to the analysis<br/>- **analysis name**<br/>- **dataset name** |
| Field | code/dataset/path/analysis name/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Spotfire path to the analysis<br/>- **analysis name**<br/>- **dataset name**<br/>- **field name** |
| Data Process | code/dataprocess/path/analysis name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **path**: Spotfire path to the analysis<br/>- **analysis name**<br/>- **dataset name** |

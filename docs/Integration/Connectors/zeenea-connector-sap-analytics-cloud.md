# Adding an SAP Analytics Cloud Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100138 "title: SAP Analytics Cloud") is required to establish a connection with SAP Analytics Cloud.

- <!-- #p100039 -->
  Zeenea traffic flows towards the data source must be open. 

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100051 -->
## Supported Versions

<!-- #p100057 -->
The SAP Analytics Cloud connector is compatible with the online version of the service. 

<!-- #p100063 -->
## Installing the Plugin

<!-- #p100072 -->
The SAP plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100081 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100087 -->
## Declaring the Connection

<!-- #p100096 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100105 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100111 -->
In order to establish a connection with SAP Analytics Cloud, specifying the following parameters in the dedicated file is required:

<!-- #p100117 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `sap-sac` and this value must not be modified. |
| `connection.oauth.endpoint` | SAP Analytics Cloud endpoint<br/>Example: `https://example.authentication.eu10.hana.ondemand.com/oauth/token` |
| `connection.oauth.client_id` | Client identifier |
| `connection.oauth.client_secret` | Client secret |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

<!-- #p100132 -->
> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

<!-- #p100138 -->
## User Permissions

<!-- #p100144 -->
In order to collect metadata, the running user's permissions must allow them to access and read stories that need cataloging. 

<!-- #p100150 -->
In our case, the configuration is done at the OAuth2 client level according to the SAP documentation described in the following article: [https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/).

<!-- #p100156 -->
## Data Extraction

<!-- #p100162 -->
To extract information, the connector runs the followings requests on the API:

- <!-- #p100171 -->
  `/oauth/token?grant_type=client_credentials`: To authenticate

- <!-- #p100183 -->
  `/api/v1/stories?include=models`: To collect all the stories and related models

<!-- #p100195 -->
## Collected Metadata

<!-- #p100201 -->
### Inventory

<!-- #p100207 -->
Will collect the list of stories accessible by the user.  

<!-- #p100213 -->
### Lineage

<!-- #p100219 -->
The connector is able to reconstruct the lineage of the tables used in the stories if they are present in the catalog. This functionality is available when SAP Analytics Cloud uses datasets from the technologies mentioned below. In some cases, it is necessary to specify an additional parameter in the configuration files of the original connections of these tables as it is referenced in the configuration of SAP Analytics Cloud connections.

<!-- #p100228 -->
Summary table of possible values of the `alias` parameter to be completed in the data source configuration file.

<!-- multiline -->
| <!-- #p100234 -->                                                   | <!-- #p100243 --> | <!-- #p100252 --> |
| Source System                                                       | Model             | Example           |
| ------------------------------------------------------------------- | ----------------- | ----------------- |
| <!-- #p100267 -->                                                   | <!-- #p100276 --> | <!-- #p100285 --> |
| [SAP BW](zeenea-connector-sap-bw-safyr.md# "title: SAP BW (Safyr)") | N/A               | N/A               |
|                                                                     |                   |                   |

<!-- #p100300 -->
### Visualization

<!-- #p100306 -->
A visualization is an SAP Analytics Cloud story.

- <!-- #p100315 -->
  **Name**

- <!-- #p100327 -->
  **Source Description**

- <!-- #p100339 -->
  **Technical Data**:

  - <!-- #p100345 -->
    SAP Identifier

  - <!-- #p100354 -->
    URL

  - <!-- #p100363 -->
    Created At

  - <!-- #p100372 -->
    Updated At

  - <!-- #p100381 -->
    Created By

  - <!-- #p100390 -->
    Updated By

<!-- #p100408 -->
### Dataset

<!-- #p100414 -->
A dataset is an SAP Analytics Cloud model. 

- <!-- #p100423 -->
  **Name**

- <!-- #p100435 -->
  **Source Description**

- <!-- #p100447 -->
  **Technical Data**:

  - <!-- #p100453 -->
    SAP Identifier

<!-- #p100471 -->
### Data Process

<!-- #p100477 -->
To represent the data flow from an external source, a Zeenea Data Process will be created for each SAP Analytics Cloud model.

- <!-- #p100489 -->
  **Name**: `import dataset_name`

<!-- #p100501 -->
### Fields

<!-- #p100507 -->
The connector does not return any information about the story fields. They are not exposed by the SAP Analytics Cloud API.

<!-- #p100513 -->
## Unique Identifier Keys

<!-- #p100519 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100528 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100534 -->
| Object | Identifier Key | Description |
|---|---|---|
| Visualization | code/story/technical identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **technical identifier**: SAP technical identifier of the story |
| Dataset | code/model/technical identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **technical identifier**: SAP technical identifier of the model |
| Data process | code/transformation/technical identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **technical identifier**: SAP technical identifier of the model |


# Adding a Qlik Sense Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100201 "title: Qlik Sense Enterprise on Windows") is required to establish a connection with Qlik Sense.

- <!-- #p100039 -->
  Zeenea traffic flows towards the data source must be open. 

<!-- multiline -->
| <!-- #p100051 --> | <!-- #p100060 --> | <!-- #p100069 --> |
| Target            | Protocol          | Usual Ports       |
| ----------------- | ----------------- | ----------------- |
| <!-- #p100081 --> | <!-- #p100090 --> | <!-- #p100099 --> |
| Qlik Sense Server | HTTP/HTTPS        | 80/443            |
|                   |                   |                   |

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100114 -->
## Supported Versions

<!-- #p100120 -->
The Qlik Sense connector was developed and tested with Qlik Sense Server version 14.20.5. 

<!-- #p100126 -->
## Installing the Plugin

<!-- #p100135 -->
The Qlik plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100144 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100150 -->
## Declaring the Connection

<!-- #p100159 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100168 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100174 -->
In order to establish a connection with a Qlik Sense instance, specifying the following parameters in the dedicated file is required:

<!-- #p100180 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `qlik-sense` and this value must not be modified. |
| `connection.url` | Qlik Sense server address (example: `https://hostname.port/virtual-proxy`) |
| `connection.auth.key` | Header name for authentication |
| `connection.auth.value` | Header value for authentication, format: `domain\user name` |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Qlik Sense servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

<!-- #p100195 -->
> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

<!-- #p100201 -->
## User Permissions

<!-- #p100207 -->
In order to collect metadata, the running user's permissions must allow them to access and read applications and sheets that need cataloging. 

<!-- #p100213 -->
Here, the user must have read access to correspondent applications and their sheets from the QRS API.

<!-- #p100219 -->
## Data Extraction

<!-- #p100225 -->
To extract information, the connector runs requests on the Qlik Sense API.

- <!-- #p100234 -->
  To collect applications: `/qrs/app/full`

- <!-- #p100246 -->
  To collect sheets: `/qrs/app/object/full`

<!-- #p100258 -->
## Collected Metadata

<!-- #p100264 -->
### Inventory

<!-- #p100270 -->
Will collect the list of sheets applications accessible by the user.  

<!-- #p100276 -->
### Visualization

<!-- #p100282 -->
A visualization is a sheet from an application. 

- <!-- #p100291 -->
  **Name**: Sheet name

- <!-- #p100303 -->
  **Source Description**: Sheet description

- <!-- #p100315 -->
  **Contacts**

- <!-- #p100327 -->
  **Technical Data**:

  - <!-- #p100333 -->
    Application Name

  - <!-- #p100342 -->
    Sheet Url

  - <!-- #p100351 -->
    Creation Date

  - <!-- #p100360 -->
    Modification Date

  - <!-- #p100369 -->
    Publish Date

<!-- #p100387 -->
## Unique Identifier Keys

<!-- #p100393 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100402 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100408 -->
| Object | Identifier Key | Description |
|---|---|---|
| Visualization | code/application id/sheet id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **application id**<br/>- **sheet id** |


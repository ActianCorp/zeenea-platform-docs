# Adding an OpenAPI Connection

<!-- #p100021 -->
## Prerequisites

- <!-- #p100030 -->
  A user with sufficient [permissions](#p100153 "title: OpenAPI") is required to establish a connection with OpenAPI.

- <!-- #p100039 -->
  Zeenea traffic flows towards the data source must be open.

<!-- #p100054 -->
> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

<!-- #p100060 -->
## Supported Versions

<!-- #p100066 -->
The OpenAPI connector was developed  and tested with OpenAPI requirements 3.0.0 and 3.0.1 and should be compatible later.

<!-- #p100072 -->
The OpenAPI connector accepts JSON and YAML formats.

<!-- #p100078 -->
## Installing the Plugin

<!-- #p100087 -->
The OpenAPI plugin can be downloaded here: [Zeenea Connector Downloads](zeenea-connectors-list.md# "title: Zeenea Connector Downloads")

<!-- #p100096 -->
For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](zeenea-connectors-install-as-plugin.md# "title: Installing and Configuring Connectors as a Plugin").

<!-- #p100102 -->
## Declaring the Connection

<!-- #p100111 -->
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

<!-- #p100120 -->
Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

<!-- #p100126 -->
In order to establish a connection with a OpenAPI interface, specifying the following parameters in the dedicated file is required:

<!-- #p100132 -->
| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `openapi` and this value must not be modified. |
| `connection.url` | Path to the `swagger.json` local file or an URL to a remote server.<br/><br/>Examples:<br/>`connection.url = "file:///var/path/to/my/swagger.json"`<br/>or<br/>`connection.url = "https://my-api.my-domain.com:8443"` |
| `connection.swagger.endpoint` | Optional when the `connection.url` contains a local file path.<br/> Mandatory when the `connection.url` is a URL to a server.<br/><br/>Example:<br/>` # Given this URL: "[https://my-api.my-domain.com:8443/api/v1/swagger.json](https://my-api.my-domain.com:8443/api/v1/swagger.json)""` <br/>`# The connector must be configured like :` <br/>`connection.url = "[https://my-api.my-domain.com:8443](https://my-api.my-domain.com:8443)""` <br/>`connection.swagger.endpoint = "/api/v1/swagger.json" ` |
| **From a basic auth protocol** | |
| `connection.username` | Username |
| `connection.password` | User password |
| **From an OAuth2 protocol** | |
| `connection.oauth.endpoint` | API endpoint |
| `connection.oauth.client_id` | Application ID (client) |
| `connection.oauth.client_secret` | Application password (client) |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

<!-- #p100147 -->
> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

<!-- #p100153 -->
## User Permissions

<!-- #p100159 -->
In order to collect metadata, the running user's permissions must allow them to access and read datasets that need cataloging. 

<!-- #p100165 -->
Here, the user must have read access to the specification API file.

<!-- #p100171 -->
## Data Extraction

<!-- #p100177 -->
To extract information, the connector identifies the datasets exposed by the API from each GET endpoint defined in the specification file. Then, it defined the object's data model as described in the file.

<!-- #p100183 -->
## Collected Metadata

<!-- #p100189 -->
### Inventory

<!-- #p100195 -->
The inventory collects the list of unique GET endpoints described in the JSON specification file.  

<!-- #p100201 -->
### Dataset

- <!-- #p100210 -->
  **Name**

- <!-- #p100222 -->
  **Source Description**

- <!-- #p100234 -->
  **Technical Data**:

  - <!-- #p100240 -->
    Endpoint

  - <!-- #p100249 -->
    Swagger Name

  - <!-- #p100258 -->
    Specification Version

<!-- #p100276 -->
### Field

<!-- #p100282 -->
Dataset attribute. 

- <!-- #p100291 -->
  **Name**

- <!-- #p100303 -->
  **Source Description**: Not supported

- <!-- #p100315 -->
  **Type**

- <!-- #p100327 -->
  **Can be null**: Depending on field settings

- <!-- #p100339 -->
  **Multivalued**: Depending on field settings

- <!-- #p100354 -->
  **Primary key**: Not supported. Default value `false`.

- <!-- #p100366 -->
  **Technical Data**:

  - <!-- #p100372 -->
    Technical Name

  - <!-- #p100381 -->
    Native type

<!-- #p100399 -->
## Unique Identification Keys

<!-- #p100405 -->
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

<!-- #p100414 -->
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

<!-- #p100420 -->
| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/component name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **component name**: Exposed object's name |
| Field | code/component name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **component name**: Exposed object's name<br/>- **field name**: Complete path of the attribute |


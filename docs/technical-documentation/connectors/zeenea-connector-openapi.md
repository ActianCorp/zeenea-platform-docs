# Adding an OpenAPI Connection

## Prerequisites

* A user with sufficient [permissions](#p100153 "title: OpenAPI") is required to establish a connection with OpenAPI.
* Zeenea traffic flows towards the data source must be open.

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).


## Supported Versions

The OpenAPI connector is developed and tested with OpenAPI requirements 3.0.0 and 3.0.1 and should be compatible with later versions.

The OpenAPI connector accepts JSON and YAML formats.

## Installing the Plugin

You can download the OpenAPI plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

For more information about managing connections, see  [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

To establish a connection with a OpenAPI interface, specifying the following parameters in the dedicated file is required:

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

!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).


## User Permissions

To collect metadata, the running user's permissions must allow them to access and read datasets that need cataloging. 

Here, the user must have read access to the specification API file.

## Data Extraction

To extract information, the connector identifies the datasets exposed by the API from each `GET` endpoint defined in the specification file. 
The connector creates a dataset for any `GET` endpoint that:

- Returns a 2xx (success) response
- Uses the `application/json` content type

The schema can be defined either in a referenced component or as an inline schema within the response definition.

## Collected Metadata

### Inventory

The inventory collects the list of unique GET endpoints described in the JSON specification file.  

### Dataset

Response component or schema.

* **Name**
* **Source Description**
* **Technical Data**:
     * Endpoint
     * Swagger Name
     * Specification Version

### Field

Dataset attribute. 

* **Name**
* **Source Description**: Not supported
* **Type**
* **Can be null**: Depending on field settings
* **Multivalued**: Depending on field settings
* **Primary key**: Not supported. Default value `false`.
* **Technical Data**:
     * Technical Name
     * Native type

## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

For more information about identifier keys, see [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **dataset name**: The name of the dataset |
| Field | code/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **dataset name**: The name of the dataset<br/>- **field name**: Complete path of the attribute |

### Dataset Name

The dataset name is derived using the following rules:

1. If the schema is defined by a reference to a component, the dataset name is the component name.
2. If the schema is defined inline and the endpoint has an `operationId`, the dataset name is `<operationID>_Response`.
3. If the schema is defined inline and the endpoint does not have an `operationId`, the dataset name is `<endpoint_path>_Response`.
   The path is normalized by removing slashes and parameter syntax and converting the name to camel case. For example, if the path is `/report-status/{reportId}`, the dataset name is `reportStatusReportId_Response`.
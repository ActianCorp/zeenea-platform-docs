---
title: OpenAPI  
---

# Adding an OpenAPI Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with OpenAPI.
* Zeenea traffic flows towards the data source must be open.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The OpenAPI connector was developed  and tested with OpenAPI requirements 3.0.0 and 3.0.1 and should be compatible later.

The OpenAPI connector accepts JSON and YAML formats.

## Installing the Plugin

The OpenAPI plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a OpenAPI interface, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `openapi` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>
      <p>Path to the `swagger.json` local file or an URL to a remote server.</p>
      <p>Examples:</p>
      <p>`connection.url = "file:///var/path/to/my/swagger.json"`</p>
      <p>or</p>
      <p>`connection.url = "https://my-api.my-domain.com:8443"`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.swagger.endpoint`</td>
    <td>
      <p>Optional when the `connection.url` contains a local file path.<br /> Mandatory when the `connection.url` is a URL to a server.</p>
      <p>Example:</p>
      <p>
      ```
      # Given this URL: "https://my-api.my-domain.com:8443/api/v1/swagger.json""
      # The connector must be configured like :
      connection.url = "https://my-api.my-domain.com:8443""
      connection.swagger.endpoint = "/api/v1/swagger.json"
      ```
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2"> **From a basic auth protocol**</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td colspan="2"> **From an OAuth2 protocol**</td>
  </tr>
  <tr>
    <td>`connection.oauth.endpoint`</td>
    <td>API endpoint</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Application ID (client)</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Application password (client)</td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
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
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read datasets that need cataloging. 

Here, the user must have read access to the specification API file.

## Data Extraction

To extract information, the connector identifies the datasets exposed by the API from each GET endpoint defined in the specification file. Then, it defined the object's data model as described in the file.

## Collected Metadata

### Inventory

The inventory collects the list of unique GET endpoints described in the JSON specification file.  

## Dataset

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
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/component name</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**component name**: Exposed object's name</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/component name/field name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**component name**: Exposed object's name</li>
         <li>**field name**: Complete path of the attribute</li>
       </ul>
     </td>
   </tr>
 </table>
 
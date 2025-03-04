---
title: Palantir Foundry  
---

# Adding a Palantir Foundry Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Palantir. 
* Zeenea traffic flows towards the data source must be open.

:::note
A link to the configuration template can be found here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).
:::

## Supported Versions

The Palantir connector was developed and tested with the Palantir Foundry SaaS version.

## Installing the Plugin

The Palantir plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a Palantir instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must not be modified.<br /> <font color="red">Should this say "...value must be `palantir`" as with other connectors?</font></td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Database address (example: `https://tenant.palantirfoundry.fr/`)</td>
  </tr>
  <tr>
    <td>`connection.oauth.endpoint`</td>
    <td>(Optional) API's endpoint. Default value is from `connection.url` parameter completed by `/multipass/api/oauth2/token`.</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Application ID (client) as defined in Palantir</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Application's password (client) as defined in Palantir</td>
  </tr>
  <tr>
    <td>`connection.token`</td>
    <td>Authentication token</td>
  </tr>
  <tr>
    <td colspan="2">**Google Cloud Storage**</td>
  </tr>
  <tr>
    <td>`connection.google_cloud.json_key`</td>
    <td>
      <p>JSON key. Use either as:  </p>
      <ul>
        <li>an embedded raw value (use triple quotes `"""{ "json: "here" }""")`</li>
        <li>or as a file by setting a absolute file URL<br />(e.g., `file:///etc/bigquery/zeenea-key.json`)</li>
      </ul>
      <p>Using the file URL to an external JSON key file is recommended.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.google_cloud.project_id`</td>
    <td>Project Id used at connection. Invoices will be sent to this project.</td>
  </tr>
  <tr>
    <td colspan="2">
      <p>**AWS - S3**</p>
      <p>The following parameters can be set to specify a region and an access key. If not set, information will be taken from:</p>
      <ol>
        <li>Environment variables</li>
        <li>Shared credential and config files</li>
        <li>ECS container or EC2 instance role</li>
      </ol>
      <p>See [Amazon documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html)</p>
    </td>
  </tr>
  <tr>
    <td>`connection.aws.region`</td>
    <td>Amazon S3 region</td>
  </tr>
  <tr>
    <td>`connection.aws.access_key_id`</td>
    <td>
      <p>Amazon S3 Access Key Identifier.</p>
      <p>*Prefer to use container or instance role.*</p>
    </td>
  </tr>
  <tr>
    <td>`connection.aws.secret_access_key`</td>
    <td>
      <p>Amazon S3 Secret Access Key</p>
      <p>*Prefer to use container or instance role.*</p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p>**Azure ADLS Gen 2**</p>
      <p>Two authentication methods are available:</p>
      <ol>
        <li>Service Account OAuth2 credentials (`client_id`, `client_secret`, `tenant_id`)</li>
        <li>Account Key (`account_name`, `account_key`)</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>`connection.azure.tenant_id`</td>
    <td>Tenant Identifier</td>
  </tr>
  <tr>
    <td>`connection.azure.client_id`</td>
    <td>Client Application Identifier</td>
  </tr>
  <tr>
    <td>`connection.azure.client_secret`</td>
    <td>Client Application Secret</td>
  </tr>
  <tr>
    <td>`connection.azure.account_name`</td>
    <td>Storage Account Name</td>
  </tr>
  <tr>
    <td>`connection.azure.account_key`</td>
    <td>Storage Account Secret Key</td>
  </tr>
  <tr>
    <td colspan="2">**Inventory**</td>
  </tr>
  <tr>
    <td>`inventory.file_path`</td>
    <td>
      <p>Path to the file containing the Resource Identifier (RID) in case the inventory is provided.</p>
      <p>The path must be formatted like:</p>
      <ol>
        <li>**AWS S3**: `s3://[bucket_name]/[optional_prefix]/[file_name]`</li>
        <li>**Google Storage**: `gs://[bucket_name]/[optional_prefix]/[file_name]`</li>
        <li>**Local File System**: `file:///path/to/file` or `/path/to/file`</li>
        <li>**Azure ADLS Gen 2**: `http://[account_name].dfs.core.windows.net/[container_name]/[optional_prefix]/[file_name]`</li>
      </ol>
      <p>Examples:</p>
      <p>`connection.path = "aws://palantir-bucket/rids.txt"`</p>
      <p>or</p>
      <p>`connection.path = "/var/palantir/rids.txt"`</p>
      <p>The file should contain a list of Resource Identifiers (RID), with one identifier per line.</p>
      <p>Example:</p>
      ```
      ri.foundry.main.dataset.4bbacdc9-3965-45ff-b44a-1d8f64b822bb
      ri.foundry.main.dataset.6bf56e27-2106-42fb-aa81-4a012f865f84
      ri.foundry.main.dataset.30399d1c-a942-4cb2-85eb-25f69db6fd72
      ri.foundry.main.dataset.746fb5dd-9153-4a4a-b2c6-052ada4a900c
      ```
    </td>
  </tr>
  <tr>
    <td>`inventory.from_datacatalog`</td>
    <td>Default value `false`. Set to `true` to filter on Palantir's data catalog objects.</td>
  </tr>
  <tr>
    <td>`inventory.with_ontology`</td>
    <td>Default value `false`. Set to `true` to list datasets from ontology objects. They will be prefixed by `/ontology` only in the Zeenea selection import window.</td>
  </tr>
  <tr>
    <td colspan="2">**Filter**</td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter collections associated with datasets.</td>
  </tr>
  <tr>
    <td colspan="2">**Others**</td>
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
    <td>`proxy.hostname	`</td>
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

To communicate with Palantir, the connector supports two authentication modes:

* OAuth2 (Grant Type: client_credentials)
* Token

OAuth2 protocol is recommended. To select a mode, fill in the corresponding parameters.

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

* In the case of Token protocol authentication: the token must have access to the resources that need to be cataloged.
* In the case of OAuth2 protocol authentication: rights about objects that need cataloging must be added to the user associated with the declared application.

## Rich Filters

Since version 1.2.0 of the plugin, the Palantir connector benefits from the feature of rich filters in the configuration of the connector. This filter is compatible only with the "collection" key to filter the values of the collected metadata.

Read more: [Filters](zeenea-filters.md)

## Data Extraction

Inventory can be performed from a file containing a list of object identifiers (RID).

If a file is configured, the connector will connect to the file system to retrieve it, then make a call per RID to check its existence and retrieve its name:

* `/compass/api/resources/{rid}`: To get the name of a collection dataset

If no file is provided to the connector, it will automatically discover available objects with the following calls:

* If `from_datacatalog` option value is **false**:
  * `/compass/api/all-resources (pagined)` <font color="red">Should `pagined` be `pageid`?</font>: To get the list of available resources
* If `from_datacatalog` option value is **true**:
  * `/compass/api/collections (pagined)` <font color="red">Should `pagined` be `pageid`?</font>: To get the list of available collections
  * `/compass/api/collections/{collection.rid}/children`: To get collections datasets
  * `/compass/api/resources/{rid}`: To get the name of a collection dataset
* If with_ontology option value is **true**:
  * `/phonograph2/api/objects/registry/ontology/all`: To get the list of available objects
  * `/ontology-metadata/api/ontology/ontology/bulkLoadEntities`: To get objects datasets
  * `/compass/api/resources/{rid}`: To get the name of an object dataset

The import is done with the following calls:

* `/compass/api/resources/{rid}`: To extract objects metadata
* `/foundry-metadata/api/schemas/datasets/{rid}/branches/master`: To extract datasets fields
* `/foundry-metadata/api/metadata/datasets/{dataset.rid}/branches/master/view`: To extract fields description

## Collected Metadata

### Inventory

Inventory can be conducted from a file stored on the cloud/local storage, or the inventory will collect the list of datasets accessible by the user.  

## Dataset

* **Name**
* **Source Description**
* **Technical Data**:
  * Project
  * Location
  * Dataset Format
  * Organization
  * Creation Date
  * Modification Date
  * From
  * Collections
  * Object Types
  * Marking

### Field

Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. Default value `false`.
* **Multivalued**: Not supported. Default value `false`.
* **Primary key**: Not supported. Default value `false`.
* **Technical Data**:
  * Technical Name
  * Native type: field native type
  * Object Types

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
   <tr>
     <td>Dataset</td>
     <td>code/ri.foundry.main.dataset.rid	</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**rid**: Palantir Foundry dataset technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/ri.foundry.main.dataset.rid/field name</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**rid**: Palantir Foundry dataset technical identifier</li>
         <li>**field name**</li>
       </ul>
     </td>
   </tr>
 </table>
 
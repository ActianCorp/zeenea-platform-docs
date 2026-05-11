# Adding a Palantir Foundry Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Palantir. 
* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Palantir connector was developed and tested with the Palantir Foundry SaaS version.

## Installing the Plugin

The Palantir plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with a Palantir instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `palantir` and must not be modified. |
| `connection.url` | Database address (example: `https://tenant.palantirfoundry.fr/`) |
| `connection.oauth.endpoint` | (Optional) API's endpoint. Default value is from `connection.url` parameter completed by `/multipass/api/oauth2/token`. |
| `connection.oauth.client_id` | Application ID (client) as defined in Palantir |
| `connection.oauth.client_secret` | Application's password (client) as defined in Palantir |
| `connection.token` | Authentication token |
| **Google Cloud Storage** | |
| `connection.google_cloud.json_key` | JSON key. Use either as: - an embedded raw value (use triple quotes `"""{ "json: "here" }"""`)<br/>- or as a file by setting a absolute file URL<br/>(e.g., `file:///etc/bigquery/zeenea-key.json`)<br/>Using the file URL to an external JSON key file is recommended. |
| `connection.google_cloud.project_id` | Project Id used at connection. Invoices will be sent to this project. |
| **AWS - S3**<br/>The following parameters can be set to specify a region and an access key. If not set, information will be taken from:<br/>- Environment variables<br/>- Shared credential and config files<br/>- ECS container or EC2 instance role<br/>See [Amazon documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html) | |
| `connection.aws.region` | Amazon S3 region |
| `connection.aws.access_key_id` | Amazon S3 Access Key Identifier.<br/>*Prefer to use container or instance role.* |
| `connection.aws.secret_access_key` | Amazon S3 Secret Access Key<br/>*Prefer to use container or instance role.* |
| **Azure ADLS Gen 2**<br/>Two authentication methods are available:<br/>- Service Account OAuth2 credentials (`client_id`, `client_secret`, `tenant_id`)<br/>- Account Key (`account_name`, `account_key`) | |
| `connection.azure.tenant_id` | Tenant Identifier |
| `connection.azure.client_id` | Client Application Identifier |
| `connection.azure.client_secret` | Client Application Secret |
| `connection.azure.account_name` | Storage Account Name |
| `connection.azure.account_key` | Storage Account Secret Key |
| **Inventory** | |
| `inventory.file_path` | Path to the file containing the Resource Identifier (RID) in case the inventory is provided.<br/>The path must be formatted like:<br/>- **AWS S3**: `s3://[bucket_name]/[optional_prefix]/[file_name]`<br/>- **Google Storage**: `gs://[bucket_name]/[optional_prefix]/[file_name]`<br/>- **Local File System**: `file:///path/to/file` or `/path/to/file`<br/>- **Azure ADLS Gen 2**: `http://[account_name].dfs.core.windows.net/[container_name]/[optional_prefix]/[file_name]`<br/>Examples:<br/>`connection.path = "aws://palantir-bucket/rids.txt"`<br/>or<br/>`connection.path = "/var/palantir/rids.txt"`<br/>The file should contain a list of Resource Identifiers (RID), with one identifier per line.<br/>Example: ``` ri.foundry.main.dataset.4bbacdc9-3965-45ff-b44a-1d8f64b822bb ri.foundry.main.dataset.6bf56e27-2106-42fb-aa81-4a012f865f84 ri.foundry.main.dataset.30399d1c-a942-4cb2-85eb-25f69db6fd72 ri.foundry.main.dataset.746fb5dd-9153-4a4a-b2c6-052ada4a900c ``` |
| `inventory.from_datacatalog` | Default value `false`. Set to `true` to filter on Palantir's data catalog objects. |
| `inventory.with_ontology` | Default value `false`. Set to `true` to list datasets from ontology objects. They will be prefixed by `/ontology` only in the Zeenea selection import window. |
| **Filter** | |
| `filter` | To filter collections associated with datasets. |
| **Others** | |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
 
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

Read more: [Filters](../Scanners/zeenea-filters.md)

## Data Extraction

Inventory can be performed from a file containing a list of object identifiers (RID).

If a file is configured, the connector will connect to the file system to retrieve it, then make a call per RID to check its existence and retrieve its name:

* `/compass/api/resources/{rid}`: To get the name of a collection dataset

If no file is provided to the connector, it will automatically discover available objects with the following calls:

* If `from_datacatalog` option value is **false**:
  * `/compass/api/all-resources`: To get the list of available resources
* If `from_datacatalog` option value is **true**:
  * `/compass/api/collections`: To get the list of available collections
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

### Dataset

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
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/ri.foundry.main.dataset.rid | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **rid**: Palantir Foundry dataset technical identifier |
| Field | code/ri.foundry.main.dataset.rid/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **rid**: Palantir Foundry dataset technical identifier<br/>- **field name** |
 
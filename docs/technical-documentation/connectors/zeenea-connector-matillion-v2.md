# Adding a Matillion Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Matillion.
* Zeenea traffic flows towards the ELT must be open.

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Matillion module is compatible with the "Basic" edition of the online version of the product.

## Installing the Plugin

The Matillion plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md)

In order to establish a connection with a Matillion instance, the following parameters in the dedicated file are required:

### Configuration

| Parameter | Expected value |
| --- | --- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `matillion` and this value must not be modified. |
| `connection.url` | Matillion instance URL |
| `connection.username` | Username |
| `connection.password` | Password |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Matillion servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `filter` | Filter the jobs (transformation only for now) that should be synchronized. See [Filters](#filters) below. |
| `versions` | - List of version rules separated by a comma.<br/>- Only one version of a project is synchronized.<br/>- The rules are used to define which version of a project should be synchronized.<br/>- Each rule consists of three segments separated by a slash `/`.<br/>- The first segment is a pattern that should match the group name.<br/>- The second segment is a pattern that should match the project name.<br/>- The last one is the version name to use. It can uses variable if capturing groups have been defined in the other regex.<br/>- If the project matches no rule, the synchronized version will be `default`.<br/>Example:<br/>`versions="g1/p1/v1,group(\d+)/project(\d+)/version_$1_$2,.*/.*/other_default"`<br/>- The synchronized version of project `p1` from group `g1` is `v1`.<br/>- The version of project p25 from group `g42` is `v_42_25`.<br/>- The version of others projects is `other_default`. |
| `lineage.view.enabled` | When set to `true`, the connector also considers View components (in addition to Table components) when building lineage. Default value is `false`. |
| `proxy.scheme ` | Depending on the proxy, `http` or `https`. |
| `proxy.hostname ` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read transformations that need cataloging.

## Filters


Use universal filter language to filter and root items with the criteria bellow

| Criteria | Description |
| :--- | :--- |
| `group` | (String) Group name |
| `project` | (String) Project name |
| `job` | (String) Job name |

#### Example:
```
filters = [
  {
    id = "accept_zeenea_project"
    action = ACCEPT
    rules {
      project = "zeenea_project"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

Read more: [Universal Filters](#zeenea-universal-filters.html)

## Data Extraction

The Matillion connector feeds Zeenea Database with Data Processes. Like other Data Process connectors, it has a single job "synchronize" that discovers all items of interest and creates or updates their documentation in the catalog. Matillion items of interest are Transformations. So, for each Transformation in Matillion, a Data Process should be created in Zeenea.

We can logically split the process into two steps, the discovery of the transformations and the extraction of the transformation's metadata.

To discover the transformations, the connector does a top-down crawl of the Matillion object.

1. List groups from the endpoint `/rest/v1/group`.
2. For each group, list the projects with the `/rest/v1/group/name/{group_name}/project` endpoint.
3. For each project, export the default environment with the `/rest/v1/group/name/{group_name}/project/name/{project_name}/environment/export` endpoint.
4. For each project, list the versions with the `/rest/v1/group/name/{group_name}/project/name/{project_name}/version` endpoint.
   1. The connector selects the version matching the rule configured for the connection. If no rule is configured or no rule matches, `default` is used.
   2. If no version matching the expected name is found among the available versions, the project is skipped.
5. For the selected version, list the transformations with the `/rest/v1/group/name/{group_name}/project/name/{project_name}/version/name/{version_name}/transformation` endpoint.

For each transformation, the connector gathers metadata from the following endpoint:

1. Transformation job export: `/rest/v1/group/name/{group_name}/project/name/{project_name}/version/name/{version_name}/job/name/{job_name}/export`.

In addition, the connector is able to detect whether tables are involved in transformations through SQL Components and thus includes the link to these tables in the lineage.

## Synchronization

This connector will harvest all transformation processes identified in the Matillion instance, and automatically represent them in Zeenea.

## Lineage

The Matillion connector is able to retrieve the lineage with:

* Matillion for **Redshift**
* Matillion for **Snowflake**

### Redshift

To do so, an alias must be defined in the Redshift connection, as detailed below:

 `alias = ["<host>:<port>/<database>"]`

In this instance, variables `<host>`, `<port>` and `<database>` need to be replaced with the actual Redshift values.

### Snowflake

An alias should be defined in the Snowflake connection. Its value must match the Snowflake account URL configured in the Matillion environment:

`alias = ["[org_id]-[account_id].snowflakecomputing.com"]`

Where `[org_id]` is the Snowflake organization identifier and `[account_id]` is the Snowflake account identifier.

## Collected Metadata

### Data Process

A data process is a Matillion transformation.

* **Name**
* **Source Description**
* **Input**: Input datasets
* **Output**: Output datasets
* **Technical Data**:
  * Group
  * Project
  * Version
  * Id
  * Name
  * Description
  * Creation Date
  * Link to Source

## Unique Identifier Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

More information about unique identification keys in this documentation: [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
| --- | --- | --- |
| Data process | code/group/project/transformation | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **group**: group name<br/>- **project**: project name<br/>- **transformation**: transformation name |

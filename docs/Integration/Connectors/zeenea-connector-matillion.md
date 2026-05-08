# Adding a Matillion Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Matillion.
* Zeenea traffic flows towards the ELT must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Matillion module is compatible with the "Basic" edition of the online version of the product. 

## Installing the Plugin

The Matillion plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with a Matillion instance, the following parameters in the dedicated file are required:

### Changes in version 4.1.0

Since version 4.1.0, [rich filters](../Scanners/zeenea-filters.md) replace the old filters.

Due to a name conflict between the new parameter (filter) and the old parameters, we were unable to ensure a smooth migration period during which both setting modes could be used.

The `filter.includes` and `filter.exclude`s parameters are replaced by the single `filter` parameter.

The `filter.versions` parameter is replaced by the `versions` parameter, which works in exactly the same way.

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `matillion` and this value must not be modified. |
| `connection.url` | Matillion instance URL |
| `connection.username` | Username |
| `connection.password` | Password |
| `multi_catalog.enabled` | Indicates whether the backing database is configured with the multi catalog option or not. The value should be the same as in the corresponding connection. |
| `tls.truststore.path` | The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of Matillion servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Password of the trust store file |
| `tls.truststore.type` | Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension. |
| `filter` | **Since version 4.1.0**.<br /> Filter the jobs (transformation only for now) that should be synchronized. See [Filters](#filters) below. |
| `filter.includes` | **Up to version 4.0.0 (replaced by filter)**.<br />List of regular expression with comma separated representing elements to include. |
| `filter.excludes` | **Up to version 4.0.0 (replaced by filter)**.<br />List of regular expression with comma separated representing elements to exclude. |
| **Since version 4.1.0**: <br/>`filter`<br/><br/>**Since version 4.0.0**:<br/>`filter.versions` | - List of version rules separated by a comma.<br/>- Only one version of a project is synchronized.<br/>- The rules are used to define which version of a project should be synchronized.<br/>- Each rule consists of three segments separated by a slash `/`.<br/>- The first segment is a pattern that should match the group name.<br/>- The second segment is a pattern that should match the project name.<br/>- The last one is the version name to use. It can uses variable if capturing groups have been defined in the other regex.<br/>- If the project matches no rule, the synchronized version will be `default`.<br/>Example:<br/>`versions="g1/p1/v1,group(\d+)/project(\d+)/version_$1_$2,.*/.*/other_default"`<br/>- The synchronized version of project `p1` from group `g1` is `v1`.<br/>- The version of project p25 from group `g42` is `v_42_25`.<br/>- The version of others projects is `other_default`. |
| `proxy.scheme ` | Depending on the proxy, `http` or `https`. |
| `proxy.hostname ` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read transformations that need cataloging.

## Filters

Since version 4.1.0 the Matillion connector benefits from the feature of rich filters in the configuration of the connector.

| Criteria | Description |
| :--- | :--- |
| group | Group name |
| project | Project name |
| job | Transformation job name |

Read more: [Filters](../Scanners/zeenea-filters.md)

## Data Extraction

The Matillion connector feeds Zeenea Database with Data Processes. Like other Data Process connectors, it has a single job "synchronize" that discovers all items of interest and creates or updates their documentation in the catalog. Matillion items of interest are Transformations. So, for each Transformation in Matillion, a Data Process should be created in Zeenea.

We can logically split the process into two steps, the discovery of the transformations and the extraction of the transformation's metadata.

To discover the transformations, the connector does a top-down crawl of the Matillion object.

It lists the groups with the `/group` endpoint.

1. List group from the endpoint `/group`.
2. For each group, list the projects with the `/group/name/{group_name}/project` endpoint.
3. For each project, list the versions with the `/group/name/{group_name}/project/name/{project_name}/version` endpoint.
   1. If only a single version is returned, it is selected for synchronization.
   2. If several versions are returned, the connector will select the version configured for the connection. If no version is configured, "default" version will be considered.
4. For the selected version, list the transformations with the `/group/name/{group_name}/project/name/{project_name}/version/name/{version_name}/transformation` endpoint.

For each transformation, the connector gathers metadata from two endpoints:

1. Transformation job export: `group/name/%s/project/name/%s/version/name/%s/job/name/%s/export`.
2. Project export: `group/name/%s/project/name/%s/export`.

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

**Since 4.0.0**

The `multi_catalog.enabled` parameter should have the same value as the parameter of the same name in the Snowflake connection.

An alias should also be defined in the Snowflake connection. Its value depends on the value of `multi_catalog.enabled`.

* If `multi_catalog.enabled` is **`true`**:

    `alias = ["[org_id]-[account_id].snowflakecomputing.com"]`
    
* If `multi_catalog.enabled` is **`false`**:

    `alias = ["[org_id]-[account_id].snowflakecomputing.com/[db_name]"]`
 
Where `[org_id]` is the Snowflake organization identifier, `[account_id]` is the snowflake account identifier, and `[db_name]` is the database of the Snowflake connection.

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

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).
  
| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/group/project/transformation | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **group**: group name<br/>- **project**: project name<br/>- **transformation**: transformation name |
 
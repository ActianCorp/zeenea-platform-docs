---
title: DBT
---

# Adding a DBT Connection

## Prerequisites

* A user with sufficient permissions is required to establish a connection with DBT.
* Zeenea traffic flows towards DB2 must be open.  

:::note
A configuration template can be downloaded here: [dbt.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUNpN&d=%2Fa%2FNu000002leSI%2FDJxA.g_pmwx5m9BHegpbWc3dqZOUOH2Dzv9MRK46yRk&asPdf=false)
:::

## Supported Versions

The DBT connector was tested with version 1.3. It is compatible with version 1.3 and earlier. 

:::note
The DBT connector is currently **NOT** compatible with DBT Cloud.
:::

## Installing the Plugin

The dbt plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

 ## Declaring the Connection
  
Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.
 
Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with an DBT instance, specifying the following parameters in the dedicated file is required:
 
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
    <td>The type of connector to be used for the connection. Here, the value must be `dbt` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>
      <p>Path to the DBT projects. Must be formatted like:</p>
        <ul>
          <li>AWS S3: `s3://[bucket_name]/[optional_prefix]`</li>
          <li>Google Storage: `gs://[bucket_name]/[optional_prefix]`</li>
          <li>Local File System: `file:///path/to/project/folder/root` or `/path/to/project/folder/root`</li>
          <li>(**≥2.8.0**) Azure ADLS Gen 2: `http://[account_name].dfs.core.windows.net/[container_name]/[optional_prefix]`</li>
          <li>(**< 2.7.0**) Azure Storage: `az://[bucket_name]/[optional_prefix]`</li>
        </ul>
        <p>Examples:<br /><br />`connection.path = "aws://dbt-bucket/projects"`<br />or<br />`connection.path = "/var/dbt/projects"`</p>
    </td>
  </tr>
  <tr>
    <td colspan="2">**Google Cloud Storage**</td>
  </tr>
  <tr>
    <td>`connection.google_cloud.json_key`</td>
    <td>
      <p>JSON key either as:</p>
      <ul>
        <li>an embedded raw value (use triple quotes `"""{ "json: "here" }"""`)</li>
        <li>or as a file by setting a absolute file URL<br /> (e.g., `file:///etc/bigquery/zeenea-key.json`)</li>
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
      <p>In **version 2.7.0 and later**, the connector uses the official Amazon SDK. So the following parameters can be set to specify a region and an access key. If not set, information will be taken from:</p>
        <ol>
          <li>environment variables</li>
          <li>shared credential and config files</li>
          <li>ECS container or EC2 instance role</li>
        </ol>
        <p>See [Amazon documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html).</p>
    </td>
  </tr>
  <tr>
    <td>`connection.aws.region`</td>
    <td>**Added in 2.7.0**<br /><br />Amazon S3 region</td>
  </tr>
  <tr>
    <td>`connection.aws.access_key_id`</td>
    <td>Amazon S3 Access Key Identifier.<br /><br />*Prefer to use container or instance role for versions 2.7.0 and later*.</td>
  </tr>
  <tr>
    <td>`connection.aws.secret_access_key`</td>
    <td>Amazon S3 Secret Access Key.<br /><br />*Prefer to use container or instance role for versions 2.7.0 and later*.</td>
  </tr>
  <tr>
    <td colspan="2">
    <p>**Azure ADLS Gen 2**</p>
      <p>In **version 2.8.0 and later**, the connector can fetch the files from ADLS Gen 2.</p>
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
    <td colspan="2">
      <p>**Azure Storage**</p>
      <p>*Azure Storage support is discontinued in version 2.7.0 of the connector.<br />If you need it, please contact support for it to be added again.*</p>
    </td>
  </tr>
  <tr>
    <td>`connection.azure.account_name`</td>
    <td>**Before 2.7.0**<br /><br />The Storage Account Name</td>
  </tr>
  <tr>
    <td>`connection.azure.account_key`</td>
    <td>**Before 2.7.0**<br /><br />Account Key; can be retrieved in the Access Key section of the Azure menu.</td>
  </tr>
  <tr>
    <td>`multi_catalog.enabled`</td>
    <td>Set to `true` if the dataset source system is also configured as `multi catalog`.<br />Default value `false`.</td>
  </tr>
  <tr>
    <td>`dbt.profiles_yml`</td>
    <td>
      <p>(Optional) Path to the profiles file. Must be formatted like:</p>
        <ul>
          <li>Amazon S3: `s3://bucket_name/path/to/profiles.yml`</li>
          <li>Google Storage: `gs://bucket_name/path/to/profiles.yml`</li>
          <li>(≥2.8.0) Azure ADLS Gen 2: `http://[account_name].dfs.core.windows.net/[container_name]/[optional_prefix]`</li>
          <li>File System: `file:///path/to/profiles.yml` or `/path/to/profiles.yml`</li>
        </ul>
        <p>If not set, the first found file will be used:</p>
        <ul>
          <li>`$DBT_PROFILES_DIR/profiles.yml`</li>
          <li>`$HOME/.dbt/profiles.yml`</li>
          <li>`/profiles.yml`</li>
        </ul>
        <p>Note: the YAML should not contain anchors or references.</p>
    </td>
  </tr>
  <tr>
    <td>`dbt.target`</td>	
    <td>(Optional) Target environment name. If not set the default target of the profile is used.</td>
  </tr>
</table>

## Data Extraction

In order to collect metadata, the user must provide the dbt files to the connector. 

These files can be in the file system of the computer where the scanner is installed. The file system can be local or a mounted network file system (an NFS mount, for instance). It can also be an Amazon S3 or a Google Cloud Storage bucket.

![](/img/zeenea-dbt.png)

### Finding Projects

First, the connector walk though the file storage from the root given in the parameter `connection.path` and search for files with the name `dbt_project.yml`.

For each `dbt_project.yml` file found, it will consider the folder to be a dbt project. The identifier of items from a project is prefixed by the path of the project folder relative to the connection.path in order to ensure the identifier unicity.

### Extracting Metadata

Metadata is extracted from manifest.json and catalog.json. These two files are produced when running the dbt process. Their location is given by the optional target-path entry in `dbt_project.yml`. If not set, they will be found in the target subfolder of the project.

The connector needs some extra information about the data source from the `profile.yml` file. This file can be shared by all project. It can be the same file used in production are a similar one with all connection information except the credentials.

For a given project, the connector uses the profile defined by the `profile` entry in `dbt_project.yml`. The target used is either the target defined by `dbt.target` in the connector configuration or the default one defined in the profile.

### Pre-required dbt commands

`manifest.json` and `catalog.json` are produced when running dbt. To ensure they are complete, the following commands should be executed.

* **dbt seed**: https://docs.getdbt.com/reference/commands/seed
* **dbt run**: https://docs.getdbt.com/reference/commands/run
* **dbt docs generate**: https://docs.getdbt.com/reference/commands/cmd-docs

## Collected Metadata

### Synchronization

The connector will synchronize all DBT project's job and automatically represent them in the catalog.

### Lineage

The DBT connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the DBT process. This feature is available for the following systems and, for it to work, an additional parameter is needed in **the configuration file of the source system connection** as configured in the DBT connection configuration panel. For example, if the DBT process uses a table coming from a SQL Server table, then a new alias parameter must be added in the SQL Server connection configuration file.

Table summarizing the possible values of the `alias` parameter to be completed in the data source configuration file:


| Source System| Model | Example |
| :--- | :--- | :---- |
| [SQL Server](./zeenea-connector-sqlserver.md) | Server name:port/Database name | `alias = ["zeenea.database.windows.net:1433/db"]` * |
| [Snowflake](./zeenea-connector-snowflake.md) | Server name/Database name | `alias = ["kn999999.eu-west-1.snowflakecomputing.com/ZEENEA""]` * |
| [BigQuery](./zeenea-connector-google-bigquery.md) | `bigquery.googleapis.com/` + BigQuery project identifier | `alias = ["bigquery.googleapis.com/zeenea-project"]` |
| [AWS Redshift](./zeenea-connector-aws-redshift.md) | Server name:port/Database name | `alias = ["zeenea.cthwlv3ueke2.eu-west-3.redshift.amazonaws.com:5439/database"]` * |

\* Do not fill in the database name if the configuration of the connectors is in `multi_catalog.enabled = true`.

### Data Process

* **Name**
* **Source Description**
* **Technical Data**:
  * Project
  * Doc Generation Time
  * Owner
  * Database
  * Schema
  * Type
 
## Unique Identification Keys

A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.

 Read more: [Identification Keys](./zeenea-identification-keys.md)

<table>
  <tr>
    <th>Object</th>
    <th>Identifier Key</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/path/type.package_name.resource_name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**path**: (Optional) Path to the project folder</li>
        <li>**type**: Kind of materialization</li>
        <li>**package_name**: Package name</li>
        <li>**resource_name**: Resource name</li>
      </ul>
    </td>
  </tr>
</table>

# Adding a Snowflake Connection

!!! warning "Password authentication is being removed for service users"
    Snowflake no longer allows password authentication for service users
    (`TYPE = SERVICE`). Enforcement is scheduled to complete by the end of October 2026.
    
    Use key pair authentication or a Programmatic Access Token (PAT). For more information, see [Authentication](#authentication).

## Prerequisites

* In order to establish a connection with Snowflake, a user with sufficient [permissions](#user-permissions) is required.
* A route between the Actian Data Intelligence scanner and the database must be open to allow traffic between the two.

!!! note
    You can find a link to the configuration template in [Connector Downloads](../connectors-list.md).


## Supported Versions

The Snowflake connector has been tested with the cloud version of this service. 

## Installing the Plugin

From version 54 of the scanner, the Snowflake connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Connector Downloads](../connectors-list.md).

For more information on how to install a plugin, refer to the following article: [Installing and Configuring Connectors as a Plugin](../connectors-install-as-plugin.md).
 
!!! note
    For users of Java 17 and later, the Snowflake driver use old private Java API. A special option should be added on the scanner command line in order to provide access to this API.

    `-J--add-opens=java.base/java.nio=ALL-UNNAMED`

    You can pass it directly to zeenea-scanner. If on Linux, it can be added to the `conf/application.ini` file. Create it if it doesn't exist already.


## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../../features-applications/administration/managing-connections.md)
 
In order to establish a connection with Snowflake, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection | 
| `code` | Unique identifier of the connection on the Actian Data Intelligence Platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `Snowflake` and this value must not be modified. | 
| `connection.url` | Database address.<br /><br />Example: `jdbc:snowflake://<account_identifier>.snowflakecomputing.com/?db=<database>&role=<role>&warehouse=<warehouse>`<br /><br />The `db` parameter is always required to initialize the connection.<br />The `role` and `warehouse` parameters are required if no default values are defined for the user. |
| `connection.username` | Username |
| `connection.password` | Programmatic Access Token (PAT). Not required when using key pair authentication. |
| `connection.privateKeyPath` | Full path to the PKCS#8 private key file, for example `rsa_key.p8`. |
| `connection.passphrase` | Passphrase that protects the private key. Leave unset if the key is not encrypted. |
| `dataClassification.enabled` | Option to enable retrieval of "Privacy Category" and "Semantic Category" metadata related to Snowflake data classification features |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `cache.enabled` | Enable the cache functionality. When the cache is activated, the schema update performs four queries per database instead of four per imported table. The result is greater efficiency. |
| `cache.folder` | Folder where caches are stored. The same folder can be used by several connections.<br />The size of the cache file produced depends on the number of tables in the database (and not on the number of tables imported into Actian Data Intelligence).<br />If the folder is not specified, the cache is stored in memory. |
| `cache.ttl` | Cache validity period (default `12h`). As long as the cache is valid, requests that fill it are not executed. |
| `lineage.view.enabled` | Option to enable view lineage feature. Default value `false`. |
| `lineage.pipe.enabled` | Option to enable Snowpipe lineage feature. Default value `false`. |
| `lineage.history.enabled` | Option to enable execution history lineage feature. Default value `false`. |
| `lineage.history.warehouse` | The name of the Warehouse where the queries are executed. |
| `lineage.history.period` | Number of days to analyze the queries between the start of the extraction and this number. |
| `filter` | To filter datasets during the inventory. See [Rich Filters](#rich-filters). |
| `multi_catalog.enabled` | To activate multi-database connection configuration. Default value `false`. |
| `multi_account.enabled` | **Plugin v73 and higher**.<br />To activate multi account support (`true` or `false`). Default is `false`.<br />When multi account is activated, `multi_catalog` is activated as well and overrides `multi_catalog.enabled` parameter to `true`.<br />**Warning**: this parameter should not be changed after datasets have been imported because it changes the ways they are identified. |
| `multi_account.list` | **Plugin v73 and higher**.<br />(Optional) List of accounts to be inventoried. It consists of a succession of Snowflake account identifiers separated by a space. Account identifiers must be in the form “-” (see [Snowflake documentation](https://docs.snowflake.com/en/user-guide/admin-account-identifier)).<br />If unset, the organization's account list is retrieved and used. |

!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).


You can have snowflake datasets with "multi-catalog = true"  /my\_db/my\_schema/my\_table or /my\_schema/my\_table

If the platform receives a reference like /my\_schema/my\_table and the imported dataset has the ZeePath /my\_db/my\_schema/my\_table

If the platform can't find the ZeePath directly, it removes the first segment and searches with /my\_schema/my\_table 

## User Permissions

In order to collect metadata, the running user must have read-only access to databases that need cataloging.

If the data profiling feature was enabled, the user must have read access to impacted tables. Otherwise, this permission is not necessary.

If a lineage feature is enabled, the user must have the following rights:

`GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE SCANNER`

If the Snowpipe lineage feature is enabled, the user must have MONITOR rights on each Snowpipe.

`GRANT MONITOR ON PIPE [nom du Snowpipe] TO ROLE SCANNER`
 
## Rich Filters

Since version 47 of the scanner, the Snowflake connector benefits from the feature of rich filters in the configuration of the connector.

Read more: [Filters](../../scanners/filters.md)

## Authentication

The following authentication methods are supported:

* **Key pair authentication (recommended)**: Register the public key on the Snowflake user, then set `connection.privateKeyPath` to the PKCS#8 private key file and `connection.passphrase` if the key is encrypted. The key does not expire or require rotation.
* **Programmatic Access Token (PAT)**: Generate a token for the Snowflake user and set it as `connection.password`. The service user must be covered by a network policy that allows the scanner's outbound IP addresses. Tokens expire after a maximum of 365 days, so plan to rotate them.

!!! tip "Secrets"
    Credentials can be resolved from the scanner's Secret Manager instead of being stored in clear text in the configuration file.

### Multiple Accounts

The Snowflake connector supports multi-account mode. When enabled, the list of accounts to scan can be determined in one of the following ways:

* Provide the list through the `multi_account.list` parameter as a space-separated list of Snowflake account identifiers. Identifiers must use the format `<organization_name>-<account_name>` (see the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/admin-account-identifier)).

    Example:

    ```hocon
    multi_account.list = "abcdefg-kn67972 abcdefg-kh90823"
    ```

* If no list is provided, the connector runs the following query to retrieve the accounts available in the organization:

    ```sql
    SELECT ACCOUNT_LOCATOR, REGION FROM SNOWFLAKE.ORGANIZATION_USAGE.ACCOUNTS
    ```

Credentials are per-account: a key pair is registered on a user of a given account, and a PAT is valid only for the account where it was issued. Credentials cannot be shared across accounts. Each account requires its own credentials.

To declare per-account credentials, prefix each connection parameter with the account identifier:

* `"<account_identifier>.url"`
* `"<account_identifier>.username"`
* `"<account_identifier>.privateKeyPath"`
* `"<account_identifier>.passphrase"`
* `"<account_identifier>.password"`

If a parameter is not set for a given account, the connector falls back to the `connection.*` value.

A `connection.url` is always required because it initializes the primary connection used to list the accounts, even when every account defines its own URL.

!!! note "PAT constraints apply per-account"
    Each account has its own token, which must be rotated before it expires. Each service user must be covered by a network policy on its own account that allows the scanner's outbound IP addresses.

#### Example Using Key Pair Authentication (Recommended)

The following example shows a secret that uses key pair authentication (PKCS#8 keys):

```hocon
my-secret {
  "abcdefg-kn67972.username":"kn67972_user",
  "abcdefg-kn67972.privateKeyPath":"/etc/zeenea/keys/zeenea-kn67972.p8",
  "abcdefg-kn67972.passphrase":"kn67972_key_passphrase",
  "abcdefg-kn67972.url":"jdbc:snowflake://abcdefg-kn67972.snowflakecomputing.com/?db=ZEENEA_PS_TEST&role=CNTY&warehouse=SMALL_COMPUTE_WH",
  "abcdefg-kh90823.username":"kh90823_user",
  "abcdefg-kh90823.privateKeyPath":"/etc/zeenea/keys/zeenea-kh90823.p8",
  "abcdefg-kh90823.passphrase":"kh90823_key_passphrase",
  "abcdefg-kh90823.url":"jdbc:snowflake://abcdefg-kh90823.snowflakecomputing.com/?db=ZEENEA_PS_TEST&role=CNTY&warehouse=SMALL_COMPUTE_WH"
}
```

With the following configuration file:

```hocon
# ...
secret_manager {
  enabled = true
  key = "my-secret"
}
connection {
  url = ${secret_manager.abcdefg-kn67972.url}
}
multi_account {
  enabled = true
  list = "abcdefg-kn67972 abcdefg-kh90823"
}
```

The connector processes the list of accounts and retrieves credentials from the secret manager.

#### Example Using a Programmatic Access Token (PAT)

The following example shows a secret that uses PATs:

```
my-secret {
  "abcdefg-kn67972.username":"username1",
  "abcdefg-kn67972.password":"<PAT_ACCOUNT_1>",
  "abcdefg-kn67972.url":"jdbc:snowflake://abcdefg-kn67972.snowflakecomputing.com/?db=ZEENEA_PS_TEST&role=CNTY&warehouse=SMALL_COMPUTE_WH",
  "abcdefg-kh90823.username":"username2",
  "abcdefg-kh90823.password":"<PAT_ACCOUNT_2>",
  "abcdefg-kh90823.url":"jdbc:snowflake://abcdefg-kh90823.snowflakecomputing.com/?db=ZEENEA_PS_TEST&role=CNTY&warehouse=SMALL_COMPUTE_WH"
}
```

With the following configuration file:

```
name = "snowflake"
code = "snowflake"
connector_id = "Snowflake"
enabled = true
secret_manager {
  enabled = true
  key = "my-secret"
}
connection {
  url = ${secret_manager.abcdefg-kn67972.url}
  username = ${secret_manager.abcdefg-kn67972.username}
  password = ${secret_manager.abcdefg-kn67972.password}
}
multi_account.enabled = true
```

The connector uses this connection information to run the query that lists all accounts and then retrieves the matching credentials from the secret manager to collect metadata on each of them.

## Data Extraction

To extract information, the connector runs requests on the information_schema.tables table. The connector will also use results from the following commands:

* `show columns in account`
* `show  primary keys in account`
* `show imported keys in account`

## Collected Metadata

### Inventory

The inventory collects all tables and views accessible by the user.

### Lineage

Starting with **version 44 of the Plugin**, the Snowflake connector integrates the lineage functionality to identify and represent the origin of the data. This functionality can be activated through the configuration settings and is used in several use cases:

* **Views**: The creation of views in Snowflake can be represented automatically in Actian Data Intelligence. A **data process** object will be created for each view with the tables used for its construction as input and the target view as output.
* **Snowpipe**: Snowpipe will be modeled in Actian Data Intelligence in case of data ingestion from external sources. Datasets from other types of systems will have to be imported from the corresponding connectors. The Snowflake connector will be able to identify them and make the necessary link through a **data process** that will be created in the catalog for each Snowpipe of the platform.
* **(BETA) Execution history**: The connector is able to analyze query executions to identify data insertions from other tables of the same Snowflake instance. The query will be presented in the catalog as a **data process**.
 
### Dataset

Here, a dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
     * Catalog: Database catalog
     * Last Alter Time: Last time the table was updated
     * Schema: Database schema
     * Table: Table name
     * Type:
          * base table
          * temporary table
          * view

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings
* **Multivalued**: Not supported. Default value `FALSE`.
* **Primary Key**: Depending on the field's "Primary Key" attribute
* **Technical Data**: 
     * Technical Name: field technical name
     * Native type: field native type
     * Privacy Category
     * Semantic Category
 
### Data Process

A data process can be the representation of a Snowpipe, a view construction request or a data insertion.

* **Name**
* **Source Description**
* **Snowpipe Technical data**:
     * Is Auto-ingest Enabled
     * Definition
     * Last Forwarded File Path
     * Notification Channel Name
 
## Data Profiling

!!! warning "Important"
    The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each fields. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Ensure the estimated impact of this feature is acceptable and that the default frequency is appropriate before enabling it.


The statical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics here: [Data Profiling](../../../features-applications/cross-application-features/data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For Snowflake technologies, the connector executes the following request to get a data sample: 

`SELECT COUNT(*) AS result FROM tableName`
 
The request above defines the number of rows in the table tableName.

`SELECT field1, field2  FROM tableName TABLESAMPLE (linesPercentage)`
 
The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10.000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter collect-fingerprint from the application.conf file, as described here: [Actian Data Intelligence Scanner Setup](../../scanners/scanner-setup.md).

## Data Classification

Since version 43 of the scanner, the connector is compatible with the data classification functionality offered by Snowflake. In order to benefit from the **Semantic Category** and **Privacy Category** metadata, the user account configured in the scanner for the connection must have read rights on the `snowflake.account_usage.tag_references` view.

You can find the details of how this feature works directly in the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/governance-classify-concepts.html).

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](../../../features-applications/studio/stewardship/identification-keys.md).

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/schema/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name** |
| Field | code/schema/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **schema**: Dataset schema<br/>- **dataset name**<br/>- **field name** |

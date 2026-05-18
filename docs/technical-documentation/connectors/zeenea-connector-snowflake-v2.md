# Adding a Snowflake Connection

## Prerequisites

* In order to establish a connection with Snowflake, a user with sufficient [permissions](#user-permissions) is required.
* A route between the Zeenea scanner and the database must be open to allow traffic between the two.

!!! note
    You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Snowflake connector has been tested with the cloud version of this service.

## Installing the Plugin

From version 96 of the scanner, the Snowflake connector is presented as a plugin.

It can be downloaded here and requires a scanner version 64 or later: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

!!! note
    For users of Java 17 and later, the Snowflake driver uses old private Java API. A special option should be added on the scanner command line in order to provide access to this API.

    `-J--add-opens=java.base/java.nio=ALL-UNNAMED`

    You can pass it directly to zeenea-scanner. If on Linux, it can be added to the `conf/application.ini` file. Create it if it doesn't exist already.

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../../Features/zeenea-administration/zeenea-managing-connections.md)

In order to establish a connection with Snowflake, specifying the following parameters in the dedicated file is required:

| Parameter | Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection |
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `snowflake-v2` and this value must not be modified. |
| `connection.url` | Database address.<br /><br />Example: `jdbc:snowflake://<org>-<account>.snowflakecomputing.com/?db=<database>&role=<role>&warehouse=<warehouse>`<br /><br />The `db` parameter is always required to initialize the connection.<br />The `role` and `warehouse` parameters are required if no default values are defined for the user. |
| `connection.username` | Username |
| `connection.password` | User password. (Optional during key pair authentication use.) |
| `connection.private_key_path` | Full path to the `rsa_key.p8` type file for key pair authentication |
| `connection.passphrase` | Key password |
| `data_classification.enabled` | Option to enable retrieval of "Privacy Category" and "Semantic Category" metadata related to Snowflake data classification features |
| `user_defined_tags.enabled` | Option to enable retrieval of user-defined Snowflake object tags on datasets and fields |
| `cache.enabled` | Enable the cache functionality. When the cache is activated, the schema update performs four queries per database instead of four per imported table. The result is greater efficiency. |
| `cache.folder` | Folder where caches are stored. The same folder can be used by several connections.<br />The size of the cache file produced depends on the number of tables in the database (and not on the number of tables imported into Zeenea).<br />If the folder is not specified, the cache is stored in memory. |
| `cache.ttl` | Cache validity period in ISO-8601 duration format (default `PT12H`). As long as the cache is valid, requests that fill it are not executed. |
| `lineage.view.enabled` | Option to enable view lineage feature. Default value `true`. |
| `lineage.dynamic_table.enabled` | Option to enable dynamic table lineage feature. Default value `true`. |
| `lineage.pipe.enabled` | Option to enable Snowpipe lineage feature. Default value `false`. |
| `lineage.history.enabled` | Option to enable execution history lineage feature. Default value `false`. |
| `lineage.history.warehouse` | The name of the Warehouse where the queries are executed. |
| `lineage.history.period` | Number of days to analyze the queries between the start of the extraction and this number. Default value `2`. |
| `filter` | To filter datasets during the inventory. See [Rich Filters](#rich-filters). |
| `multi_account.list` | (Optional) List of accounts to be inventoried. It consists of a succession of Snowflake account identifiers separated by a space. Account identifiers must be in the form `<org>-<account>` (see [Snowflake documentation](https://docs.snowflake.com/en/user-guide/admin-account-identifier)).<br />If unset, the organization's account list is retrieved automatically. |

!!! note
    A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user must have read-only access to databases that need cataloging.

If the data profiling feature was enabled, the user must have read access to impacted tables. Otherwise, this permission is not necessary.

If a lineage feature is enabled, the user must have the following rights:

`GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE SCANNER`

If the Snowpipe lineage feature is enabled, the user must have MONITOR rights on each Snowpipe.

`GRANT MONITOR ON PIPE [nom du Snowpipe] TO ROLE SCANNER`

## Universal Filters

Use universal filter language to filter and root items with the criteria bellow

| Criteria | Description |
| :--- | :--- |
| `account` | (String) Account name |
| `catalog` | (String) Catalog name |
| `schema` | (String) Schema name |
| `table` | (String) Table name |

#### Example:
```
filters = [
  {
    id = "accept_zeenea_schema"
    action = ACCEPT
    rules {
      schema = "zeenea_schema"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

Read more: [Universal Filters](#zeenea-universal-filters.html)

## Multi Account Support

Snowflake connector supports a multi-account mode.

The list of accounts to scan can be determined in two ways:

* The list can be provided by the parameter `multi_account.list` as a list of Snowflake account identifiers separated by a space. Account identifiers must be in the form `<org>-<account>` (see Snowflake documentation).

    Example:

    `multi_account.list = "myorg-account1 myorg-account2"`

* If no list is provided, the connector executes the following SQL query to get the accounts available in the organization:

    ```sql
    SELECT ACCOUNT_LOCATOR, REGION
      FROM SNOWFLAKE.ORGANIZATION_USAGE.ACCOUNTS
    ```

!!! note
    Account identifiers must use the modern `<organization>-<account>` format. Classic single-part account identifiers are not supported and will be ignored with a warning.

### Authentication

If all accounts can be accessed with the same username and password, you can define the credentials at the connection level as with a single-account connection.

Otherwise, per-account credentials can be configured by prefixing the account identifier to the parameter name:

* `<org>-<account>.url`
* `<org>-<account>.username`
* `<org>-<account>.password`
* `<org>-<account>.private_key_path`
* `<org>-<account>.passphrase`

If a per-account key is not found, the connector falls back to the value defined at the connection level.

### Example with password

```hocon
name = "snowflake"
code = "snowflake"
connector_id = "snowflake-v2"
enabled = true

connection.url      = "jdbc:snowflake://myorg-account1.snowflakecomputing.com/?db=MY_DB&role=SCANNER&warehouse=MY_WH"
connection.username = "scanner_user"
connection.password = "default_password"

multi_account.list = "myorg-account1 myorg-account2"

myorg-account1.url      = "jdbc:snowflake://myorg-account1.snowflakecomputing.com/?db=MY_DB&role=SCANNER&warehouse=MY_WH"
myorg-account1.username = "username1"
myorg-account1.password = "password1"

myorg-account2.url      = "jdbc:snowflake://myorg-account2.snowflakecomputing.com/?db=MY_DB&role=SCANNER&warehouse=MY_WH"
myorg-account2.username = "username2"
myorg-account2.password = "password2"
```

### Example with PKCS#8 Key

```hocon
name = "snowflake"
code = "snowflake"
connector_id = "snowflake-v2"
enabled = true

connection.url = "jdbc:snowflake://myorg-account1.snowflakecomputing.com/?db=MY_DB&role=SCANNER&warehouse=MY_WH"

multi_account.list = "myorg-account1 myorg-account2"

myorg-account1.url              = "jdbc:snowflake://myorg-account1.snowflakecomputing.com/?db=MY_DB&role=SCANNER&warehouse=MY_WH"
myorg-account1.username         = "account1_user"
myorg-account1.private_key_path = "/etc/zeenea/keys/zeenea-account1.p8"
myorg-account1.passphrase       = "account1_key_passphrase"

myorg-account2.url              = "jdbc:snowflake://myorg-account2.snowflakecomputing.com/?db=MY_DB&role=SCANNER&warehouse=MY_WH"
myorg-account2.username         = "account2_user"
myorg-account2.private_key_path = "/etc/zeenea/keys/zeenea-account2.p8"
myorg-account2.passphrase       = "account2_key_passphrase"
```

In this case, the connector walks through the list of accounts and uses the per-account credentials to connect to each one. Setting a `connection.url` at the connection level is still mandatory as it is used to initialize the primary connection.

## Data Extraction

To extract information, the connector runs requests on the `information_schema.tables` and `information_schema.columns` tables.

## Collected Metadata

### Inventory

The inventory collects all tables and views accessible by the user.

### Lineage

The Snowflake connector integrates the lineage functionality to identify and represent the origin of the data. This functionality can be activated through the configuration settings and is used in several use cases:

* **Views**: The creation of views in Snowflake can be represented automatically in Zeenea. A **data process** object will be created for each view with the tables used for its construction as input and the target view as output.
* **Dynamic Tables**: Dynamic table definitions are extracted and represented as a **data process** with their upstream dependencies as inputs and the dynamic table as output. Enabled by default.
* **Snowpipe**: Snowpipe will be modeled in Zeenea in case of data ingestion from external sources. The Snowflake connector will identify them and create a **data process** in the catalog for each Snowpipe of the platform.
* **(BETA) Execution history**: The connector is able to analyze query executions to identify data insertions from other tables of the same Snowflake instance. The query will be presented in the catalog as a **data process**.

### Dataset

Here, a dataset can be a table or a view.

* **Name**
* **Source Description**
* **Technical Data**:
  * Account: Snowflake account locator
  * Catalog: Database name
  * Schema: Database schema
  * Table: Table name
  * Type: Object type (TABLE, VIEW, etc.)
  * Is dynamic table: Whether the object is a Snowflake Dynamic Table

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
  * Privacy Category (when `data_classification.enabled = true`)
  * Semantic Category (when `data_classification.enabled = true`)

### Data Process

A data process can be the representation of a Snowpipe, a view construction request, a dynamic table definition, or a data insertion.

* **Name**
* **Source Description**
* **Snowpipe Technical data**:
  * Is Auto-ingest Enabled
  * Definition
  * Last Forwarded File Path
  * Notification Channel Name

## Data Profiling

!!! important
    The Data Profiling feature, which can be enabled on this connection, allows your Explorers to get a better grasp on the type of data stored in each field. This feature, which can be activated in the Scanner, is by default set to run on a weekly basis, every Saturday. However, depending on the number of fields you've activated this feature for, the calculation can quickly become costly. Please make sure the estimated impact of this feature is acceptable and that the default frequency is appropriate, before enabling it.

The statistical profiles feature, also named "data profiling", is available for this connector. The impact of this feature must be evaluated before its activation on any of your connections. You can find more information about the resulting statistics here: [Data Profiling](../../Features/cross-application-features/zeenea-data-profiling.md).

Read access on targeted tables is mandatory to activate the feature. For Snowflake technologies, the connector executes the following request to get a data sample:

`SELECT COUNT(*) AS result FROM tableName`

The request above defines the number of rows in the table `tableName`.

`SELECT field1, field2 FROM tableName TABLESAMPLE (linesPercentage)`

The request above collects a data sample for each field where the feature is activated through the studio (`field1`, `field2`). The limit is 10,000 lines (`linesPercentage` parameter) deduced from a calculation with the number of rows set in the previous request.

These requests will be executed, whether manually, in case of user action directly on the admin portal, or periodically according to the parameter `collect-fingerprint` from the `application.conf` file, as described here: [Zeenea Scanner Setup](../Scanners/zeenea-scanner-setup.md).

## Data Classification

The connector is compatible with the data classification functionality offered by Snowflake. In order to benefit from the **Semantic Category** and **Privacy Category** metadata, the user account configured in the scanner for the connection must have read rights on the `snowflake.account_usage.tag_references` view.

You can find the details of how this feature works directly in the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/governance-classify-concepts.html).

## Object Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md).

| Object | Identification Key | Description |
| --- | --- | --- |
| Dataset | catalog/schema/dataset name | - **catalog**: Snowflake database name<br/>- **schema**: Dataset schema<br/>- **dataset name**: Table or view name |
| Field | catalog/schema/dataset name/field name | - **catalog**: Snowflake database name<br/>- **schema**: Dataset schema<br/>- **dataset name**: Table or view name<br/>- **field name**: Column name |
| Data process (history lineage) | type/hash | - **type**: Operation type<br/>- **hash**: Hash of the access history entry |
| Data process (pipe lineage) | catalog/schema/pipe name | - **catalog**: Snowflake database name<br/>- **schema**: Schema name<br/>- **pipe name**: Snowpipe name |

!!! note
    The identification key format has changed compared to the previous Snowflake connector. A migration step may be required when upgrading from the legacy  connector to `snowflake-v2`.
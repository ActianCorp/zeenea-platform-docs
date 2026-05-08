# Adding an AWS Glue (Data Catalog) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with AWS Glue.
* Zeenea traffic flows towards the database must be open. 

The Agent's host server must have sufficient credentials to connect to AWS Glue. The available authentication methods are: 

* Instance Role
* Environment Variable
* Configuration File

| Target | Protocol	| Usual Ports |
| :--- | :--- | :--- |
| AWS Glue | HTTP | 443 |

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The AWS Glue connector is compatible with the online application. 

## Installing the Plugin

You can download the AWS Glue plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection
  
Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).
 
To establish a connection with an AWS Glue instance, fill in the following parameters in the dedicated configuration file:
 
| Parameter | Expected value |
|---|---|
| `name` | Specifies the display name for the connection. |
| `code` | Specifies the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | Specifies the type of connector to be used for the connection. The value must be `aws.glue` and must not be modified. |
| `enabled` | Specifies whether to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Specifies the catalog code associated with the connection (`default` when empty). |
| `alias` | Specifies the list of aliases used by other connectors to generate lineage link. <br />For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | Specifies whether to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`. |
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.aws.profile` | Specifies the AWS profile for authentication. |
| `connection.aws.access_key_id` | Specifies the AWS access key identifier. |
| `connection.aws.secret_access_key` | Specifies the AWS secret access key. |
| `connection.aws.session_token` | Specifies the AWS session token. |
| `connection.aws.region` | Specifies the AWS region. |
| `connection.aws.multi_account.enabled ` | Specifies whether to allow a single connection to retrieve data from other AWS account data catalog.<br />To connect to multiple accounts, configure AWS cross access between accounts. For more information, see [AWS documentation](https://docs.aws.amazon.com/glue/latest/dg/cross-account-access.html).<br />The default value is `false`.<br />*Since version 3.3.1* |
| `connection.aws.multi_account.list` | Specifies which account or region to connected to. It must be a list of `account:region` entries, separated by a space.<br />For example: `123456789012:eu-west-2 987654321098:eu-west-2`<br />*Since version 3.3.1* |
| `connection.fetch_page_size` | (Advanced) Specifies the size of batch of items loaded by each request in inventory.<br />*Since version 1.0.3* |
| `filter` | Specifies the filter based on specific characteristics. For more information, see [Rich Filters](#rich-filters).<br />*Since version 3.4.1* |

## User Permissions

To collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

### Roles

The user must be able to run the following actions on the target bucket and the objects it contains: 

* `glue:GetTable`
* `glue:GetTables`
* `glue:GetDatabases`
 
Example for cataloging a bucket (in JSON):

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SearchTables",
      "Effect": "Allow",
      "Action": [
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetDatabases"
      ],
      "Resource": "*"
    }
  ]
}
```

## Rich Filters

Starting with version 3.4.1, the connector includes a rich filter mechanism that allows you to extract specific tables or databases based on defined criteria.


| Criteria | Description |
| :--- | :--- |
| database | Database name |
| table | Table name |

For example:

```
filter = """
        database in ('production', 'qa') 
    and table ~ /(?:hr|it|market)_figures/
"""
```

> **Note:** The `filter` attribute can contain either a raw value or a file URL to the content. (for example, `file:///path/to/zeenea/connections/aws-glue-inventory-filter.json`). When you use a side-file, any changes to the filter are applied without restarting the scanner.

For more information about filters, see [Filters](../Scanners/zeenea-filters.md).

## Data Extraction

To extract information, the connector requests AWS Glue to get tables and metadata.

## Collected Metadata

### Inventory

The inventory collects the list of tables and views accessible to the user.  

### Dataset

A dataset can be a table or a view. 

* **Name**
* **Source Description**
* **Technical Data**:
  * AWS Region
  * Database Name
  * Location
  * Owner
  * CreateTime
  * UpdateTime
  * LastAccessTime
  * LastAnalyzeTime
  * TableType

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depends on field settings. 
* **Multivalued**: Depends on field settings.
* **Primary Key**: Not supported. The default value is `false`.

## Object Identification Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.

For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/aws region/dataset identifier | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **aws region**: AWS region code<br/>- **dataset identifier**: Table name<br/> Database schema name<br/>S3 bucket key |
| Field | code/aws region/dataset identifier/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **aws region**: AWS region code<br/>- **dataset identifier**: <br/>Database schema name<br/>S3 bucket key<br/>- **field name** |

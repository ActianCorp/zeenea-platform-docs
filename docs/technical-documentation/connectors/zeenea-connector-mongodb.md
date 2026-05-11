# Adding a MongoDB Connection

## Prerequisites

* To connect to a MongoDB cluster, a user with sufficient [permissions](#p100255 "title: MongoDB") is required.
* The traffic flows from Zeenea towards the MongoDB cluster must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

Since scanner version 26.9, you can download the MongoDB plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md)..

## Installing the Plugin

Since scanner version 26.9, you can download the MongoDB plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for changes and resynchronizes automatically.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection to a MongoDB cluster, fill in the following parameters in the dedicated configuration file:

| Parameter | Expected value |
|---|---|
| `name` | Specifies the display name for the connection. |
| `code` | Defines the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `Mongodb` and must not be modified. |
| `enabled` | A Boolean value to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Defines the catalog code associated with the connection (`default` when empty). |
| `alias` | Defines the list of aliases used by other connectors to generate lineage link. <br />For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | A Boolean value to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`.|
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.url` | MongoDB connection address.<br /> For example: `mongodb://mongodb.zeenea.local:27017/admin?authSource=admin` |
| `connection.username` | User name |
| `connection.password` | User password |
| `tls.trust_store.type` | Specifies the type of the trust store file. <br />Possible values are `pkcs12` or `jks`. |
| `tls.trust_store.path` | Path to the trust store containing the trust certificates. It must contain the certificate chain that generated the MongoDB Cluster Nodes certificates. |
| `tls.trust_store.password` | Password of the Trust Store containing the Trust Certificates. |
| `schema_analysis.strategy` | Specifies the schema analysis strategy. <br />Possible values are `Map Reduce` or `Sample`. |
| `schema_analysis.sample.size` | If the `Sample` strategy is selected, this limits the size of the sample. <br />The default value is `1000`. |
| `schema_analysis.mapreduce.timeout` | Specifies the timeout in minutes for Map Reduce jobs when the `Map Reduce` strategy is selected. <br />The value `0` means no timeout. The default value is `5`. |
| `inventory.databases` | (Optional) List of databases to be inventoried separated by spaces. |
| `log.collection_statistics` | A Boolean value to enable or disable logging of statistics for collections (at INFO level) when importing collections. <br />The default value is `true`. If set to `false`, the collection statistics are not logged. |


## Data Extraction

The MongoDB connector allows you to select between two modes for metadata extraction. Choosing one of these modes is necessary, as MongoDB does not use schemas. 

### MapReduce Mode

This mode uses the MongoDB MapReduce feature, which lists all fields (even those that are only used once). It is very resource consuming, and may result in a timeout failure if it takes too long. 

The MapReduce feature runs JavaScript on the database; this code is coming in from the agent. The code is constant, and is not subjected to any action or data from the user. 

The script engine mustn't be disabled (option `--noscripting`).

No actual data is extracted from the database.

### Sample Mode

This mode uses a sampling request. Because the request is probabilistic, rare fields can't be detected. 

The sample size is defined in the connector. 

There is no risk of a timeout failure, and no JavaScript code is run on the MongoDB server; thus, this mode is compatible with the `--noscripting` option. 

Some data is read by the agent but it is never saved or sent, and is "forgotten" as soon as the information has been extracted.

## Choosing the Right Mode

The MapReduce mode was built first, however, after being faced with speed issues and timeout failures on large collections, the Sample mode was introduced. 

The MapReduce mode is most useful when the collection size is reasonably large and when it contains rare fields. 

Unfortunately, we do not know which resources are consumed, because this mode is dependent on multiple variables: server performance, collection size, number of fields, etc... 

The Sample mode is usually recommended, however it may not detect rare fields. More accurately, a rare field may appear temporarily when a schema is being updated, and disappear at the next update. This has not been observed or reported, but, statistically, it is a possibility. 

> **Note:** We recommend trying the Sample mode first, as it is faster and lighter. If it is not applicable to your configuration, switching to the MapReduce mode remains possible.

## Logging Details

When `schema_analysis.strategy` is set to `Sample`, the `schema_analysis.sample.size` value is logged at INFO level.

When `schema_analysis.strategy` is set to `Map Reduce`, the `schema_analysis.mapreduce.timeout` value is logged at INFO level.

## User Permissions

To collect metadata, the running user must be able to list and read databases that need to be cataloged.

In case of limited rights to list databases **before version 4**, it is possible to use the inventory.databases parameter to select only the desired databases.

### Integrated Roles

The `readAnyDatabase` integrated role is enough to catalog the entire system. 

The read integrated role, when assigned to a database, allows the user to catalog that base's collections.

In the following example, the Zeenea account can catalog the sales and stock bases:

```
db.grantRolesToUser('zeenea', [
    { role: 'read', db: 'sales' },
    { role: 'read', db: 'stock' }
]);
```

### Zeenea Role

You may regroup permissions into one specific role for Zeenea:

```
db.createRole({
    role: "zeeneaRole",
    privileges: [],
    roles: [
        { role: 'read', db: 'sales' },
        { role: 'read', db: 'stock' }
    ]});

db.grantRolesToUser('zeenea', 'zeeneaRole');
```

## Collected Metadata

### Inventory

The inventory collects all databases and collections accessible by the user. 

### Datasets

Datasets are MongoDB collections.

* **Name**: Collection name
* **Source Description**: Not supported
* **Technical Data**:
  * Database: Database name
  * Collection: Collection name

### Field

Table fields. 

* **Name**: Field path in the JSON file, where items are separated by a period (e.g., `client.name`)
* **Source Description**: Not supported
* **Native type**: Field native type. If there are more than one native types, they are separated with a pipe (`|`).
* **Nullable**: Constant, `TRUE`
* **Multivalued**: `TRUE` if the field contains a list
* **Technical Data**:
  * Technical Name: Field technical name
  * Native type: Field native type

## Object Identification Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.

For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identification Key | Description |
|---|---|---|
| Dataset | code/database name/dataset name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database name**<br/>- **dataset name** |
| Field | code/database name/dataset name/field name | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **database name**<br/>- **dataset name**<br/>- **field name** |


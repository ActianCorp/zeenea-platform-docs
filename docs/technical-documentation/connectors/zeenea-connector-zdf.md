# Adding a Zeenea Descriptor Format (ZDF) Connection

## Connectors

Zeenea Descriptor Format (ZDF) plugin describes a set of three connectors allowing the management of datasets, visualizations and data processes based on declarative files.

> **Note:** These connectors must be used in very specific cases where a traditional connector is not an option. By using a description of the items instead of the discoverability mechanism used by regular connectors, you must ensure that you comply with the assertions that other connectors respect, such as the existence of elements.<br />For more information about these connectors, contact your Customer Success Manager.

## Adding a Connection

These three connectors work the same way and share the same configuration parameters.

###  Plugin Installation

These connectors are available in the zdf-connector-plugin.

It can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Connection Settings

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

### Configuration Templates:

The following links can be used to download configuration templates:

* [zdf-dataset.conf](https://github.com/zeenea/connector-conf-templates/blob/405bf0f006425f6d5a117c3032af483d02005b94/templates/zdf-dataset.conf)
* [zdf-visualization.conf](https://github.com/zeenea/connector-conf-templates/blob/405bf0f006425f6d5a117c3032af483d02005b94/templates/zdf-visualization.conf)
* [zdf-lineage.conf](https://github.com/zeenea/connector-conf-templates/blob/405bf0f006425f6d5a117c3032af483d02005b94/templates/zdf-lineage.conf)
* [empty_dataprocess_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUfit&d=%2Fa%2FNu000002lf4z%2Fdt8mFO7tuHk.0ooicZNgT31A.LNQqWPFcADrsBvG6Fk&asPdf=false)
* [example_dataprocess_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgLZ&d=%2Fa%2FNu000002lf6b%2Fz4jLoeVL1zmw0wI6wSvN84do7byKhfPt.2jdDLDme8g&asPdf=false)
* [empty_visualization_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUbKL&d=%2Fa%2FNu000002lf8D%2F70sgTuXPSUK9jX3JbeFdVFmxV63xry3ISEbEqJseyNs&asPdf=false)
* [example_datasets_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUYuM&d=%2Fa%2FNu000002ldXr%2FhSvnsS0Gz4hj5yjjtXexDXIKO4eEP9p6JAy3nZgthPM&asPdf=false)
* [empty_datasets_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUe5J&d=%2Fa%2FNu000002lf9p%2FhJuTKF9YdDxLF6yEwgnRJw9Zd.qaaeL0gFCB3alppBo&asPdf=false)
* [example_visualization_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUPr6&d=%2Fa%2FNu000002lfBR%2FA49pkIUsaja4qRMCu87JESPPHSuO847kIXOXe63nWHI&asPdf=false)

To connect to an instance, the parameters of the connection file must be completed with the following values:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `zdf-dataset`, `zdf-visualization`, or `zdf-lineage`. Once defined, this value must not be modified. |
| `enabled` | Optional<br/>Boolean (`true`/`false`) indicating whether the connection is active or not.<br/>Default value: `true` |
| `connection.path` | Path to file or folder containing description files.<br/>This value is mandatory if no git repository is declared.<br/>If a git repository is declared, the value can be null or a path relative to the repository root. |
| `connection.git.repository` | Optional<br/>URL of the git repository where to read the files.<br/>Example: `https://github.com/acme/bigproject` |
| `connection.git.branch` | Optional<br/>Branch to clone. By default, HEAD is used.<br/>Example: `https://github.com/acme/bigproject` |
| `connection.git.token` | Optional<br/>Authentication Token<br/>Replaces the usage of the username/password parameters. |
| `connection.git.username` | Optional<br/>Git user name. Requires password. |
| `connection.git.token` | Optional<br/>Git user password. Requires username. |
| `connection.git.workdir` | Optional<br/>Local working folder where the git repository will be cloned. |
| `connection.git.cleandir` | Optional<br/>Boolean (`true`/`false`) indicating whether the working folder should be deleted after processing. If deleted, the repository will be cloned at each operation, otherwise only an update will be performed.<br/>Default value: `false` |

## zdf-dataset

This is a Dataset connector.

It operates according to the inventory/import/update cycle. The objects inventoried are Datasets.

Description files are in JSON format. The root is an object containing two attributes.

| Attribute | Type | Description |
|---|---|---|
| datasets | `List<ZdfDataset>` | Dataset list |
| lineage | `List<ZdfProcess>` | List of lineage links linked to datasets |

## zdf-visualization

This is a Visualization connector.

It operates according to the inventory/import/update cycle. The objects inventoried are the Visualizations.

Description files are in JSON format. The root is an object containing two attributes.

| Attribute | Type | Description |
|---|---|---|
| visualizations | `List<ZdfVisualization>` | Visualization list |
| lineage | `List<ZdfProcess>` | List of lineage links between visualizations' internal datasets and external datasets |

## zdf-lineage

This is a Data Process connector.

It works with a single synchronization operation.

Description files are in JSON format. The root is an object containing an attribute.

| Attribute | Type | Description |
|---|---|---|
| lineage | `List<ZdfProcess>` | List of lineage links between the Data Process and its datasets |

## Description File Discovery

The connector recursively searches all ordinary files with the extension `.zeenea` starting from the search root. The root can also refer to a single valid file.

If no git repository is declared, the root is specified by the `connection.path` parameter.

If a git repository is declared, the repository is cloned into the working folder, or updated if the clone is already present. The root folder is the concatenation of the working folder and the `connection.path` parameter. At the end of processing, if the `connection.git.cleandir` option is `true`, the working folder is deleted.

## Format Details

> **Note:** Attributes marked "*" are mandatory for Items to be ingested by the platform. If not defined in a file, the Item will be rejected.

### ZdfDataset

Dataset description.

| Attribute | Type | Description |
|---|---|---|
| `path` | `Text` | Path identifying the dataset in relation to the connection.<br/>If not specified, the path will be `/dataset/`. Example: `/crm_db/sap/customer`. |
| `name`* | `Text` | Dataset name |
| `description` | `Text` | Dataset description |
| `owner` | ZdfOwner | Dataset owner contact |
| `fields`* | `List<ZdfField>` | Dataset field list |
| `foreignKeys` | `List<ZdfForeignKey>` | Foreign key list |
| `type` | `Text` | Source property `type` |
| `label` | `Text` | Source property `label`.<br/>**Note**: This is different from the `name` property. |
| `format` | `Text` | Source property `format` |
| `numberOfRows` | `Text` | Source property `number of rows` |
| `diskUsage` | `Text` | Source property `disk usage` |
| `location` | `Text` | Source property `location` |
| `project` | `Text` | Source property `project` |
| `catalog` | `Text` | Source property `catalog` |
| `schema` | `Text` | Source property `schema` |
| `database` | `Text` | Source property `database` |
| `replicationFactor` | `Text` | Source property `replication factor` |
| `tags` | `Text` | Source property `tags` |
| `sourceSystem` | `Text` | Source property `source system` |
| `origin` | `Text` | Source property `origin` |
| `creationDate` | `Text` | Source property `creation date` |
| `updateDate` | `Text` | Source property `update date` |
| `createdBy` | `Text` | Source property `created by` |
| `updatedBy` | `Text` | Source property `updated by` |
| `comments` | `Text` | Source property `comments` |

### ZdfVisualization

A visualization description.

| Attribute | Type | Description |
|---|---|---|
| `path` | `Text` | Path identifying the view in the connection.<br/> If not specified, the path will be `/report/` (example: `/report/sales_evolutions`). |
| `name`* | `Text` | Visualization name |
| `description` | `Text` | Visualization description |
| `owner` | `ZdfOwner` | Visualization owner contact |
| `datasets`* | `List<ZdfDataset>` | List of the visualization's internal datasets.<br/><br/>**Note**: these objects represent access to visualization data. They belong to the visualization and cannot be shared. Their lifecycle is the same as that of the visualization to which they are attached.<br/><br/>Shared datasets must be produced in another connection with the zdf-dataset connector. |

### ZdfProcess

Process description.

| Attribute | Type | Description |
|---|---|---|
| `path` | `Text` | Path identifying the process in relation to the connection.<br/>If not specified, the path will be `/transformation/`.<br/>Example: `/transformation/47ccd226-11e1-11ef-9b10-00155d60aaf0` |
| `name`* | `Text` | Process name |
| `description` | `Text` | Process description |
| `owner` | `ZdfOwner` | Process owner contact |
| `inputs` | `List<ZdfDatasetRef>` | List of process input dataset references |
| `outputs` | `List<ZdfDatasetRef>` | List of process output dataset references |

### ZdfField

A field description.

| Attribute | Type | Description |
|---|---|---|
| `name`* | `Text` | Field name |
| `description` | `Text` | Field description |
| `nativeType` | `Text` | Native type of the field.<br/>If unset, the `dataType` value is used. |
| `dataType` | `Text` | Zeenea type of the field.<br/>If unset, the `nativeType` value is used.<br/>Allowed values are:<br/>- `boolean`<br/>- `byte`<br/>- `short`<br/>- `integer`<br/>- `long`<br/>- `float`<br/>- `double`<br/>- `string`<br/>- `date`<br/>- `timestamp`<br/>- `binary`<br/>- `struct`<br/>- `unknown` |
| `isNullable` | `Boolean` | The field can be null. Default value `false`. |
| `isMultivalued` | `Boolean` | The field can contain multiple values. Default value `false`. |
| `isPrimaryKey` | `Boolean` | The field is part of the primary key. Default value `false`. |
| `encoding` | `Text` | Source property `encoding` |
| `format` | `Text` | Source property `format` |
| `length` | `Text` | Source property `length` |

## ZdfDatasetRef

A link to a dataset.

The link can be represented either with the identification key, or with the connection code and identification path.

One of the attributes `identificationKey` or `path` must be filled in.

| Attribute | Type | Description |
|---|---|---|
| `identificationKey` | `Text` | Dataset [identification key](./zeenea-identification-keys.md) |
| `connectionCode` | `Text` | Connection code. Leave blank if this is the current connection. It is possible to use one of the connection aliases. |
| `zeepath` | `Text` | Dataset path |

## ZdfOwner

A contact description.

| Attribute | Type | Description |
|---|---|---|
| `role`* | `Text` | Contact role |
| `email`* | `Text` | Contact email address |
| `firstname` | `Text` | Contact first name |
| `lastname` | `Text` | Contact last name |

## ZdfForeignKey

A foreign key description.

| Attribute | Type | Description |
|---|---|---|
| `dataset`* | `Text` | Path of the target dataset (the one with the primary key) |
| `sourceFields`* | `List` | Source dataset field list |
| `targetFields` | `List` | Target dataset field list |
| `name` | `Text` | Foreign key name | 

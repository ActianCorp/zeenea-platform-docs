# Adding a Google Dataplex (V2) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Dataplex.

* Zeenea traffic flows towards the data source must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Dataplex connector was developed and tested with the web version of the product.


## Installing the Plugin

You can download the Google plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with a Dataplex instance, fill in the following parameters in the dedicated configuration file:

 
| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `google-dataplex-v2` and must not be modified. |
| `enabled` | A boolean value to enable or disable the connection (`true` or `false`). The default value is `true`. |
| `catalog_code` | The catalog code associated with the connection (`default` when empty). |
| `alias` | The list of aliases used by other connectors to generate lineage link. |
| `secret_manager.enabled` | Configuration for a secret manager. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. |
| `secret_manager.key` | The name of the secret. |
| `connection.json_key` | JSON access key.<br />You can either specify the key directly or store it in a separate file. If stored in a separate file, this parameter indicates the path to the file in the form of a URI of scheme `file:`. For example: `file:///opt/zeenea-scanner/connections/gdc_json_key.json`<br />**Warning**: If you specify the token directly, you must enclose the key in triple quotes (`"""`) as a parameter. For example: `"""{my:"json"}"""` |
| `scope.project_id` | List of project ids separated by a comma. |
| `scope.location_id` | Unique location id. Location id corresponds to GCP region (for example: `"europe-west3,us-west1"`). See [https://cloud.google.com/compute/docs/regions-zones#available](https://cloud.google.com/compute/docs/regions-zones#available). |
| `filters` | Universal filters. See [Universal Filters](#universal-filters). |
| `proxy.scheme` | Depending on the proxy, `http` or `https`. |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `quota.read_per_minute` | Reads per minute quota value. The default value is `6000` (default value of Google Data Catalog). |
| `quota.search_per_user_per_minute` | Search quota value per user per minute. The default value is `180` (default value in Google Data Catalog). |
| `quota.timeout_minute` | Maximum waiting time when waiting for the availability of a quota. The default value is `10` minutes. |
| `quota.max_retry` | Maximum number of retries when a request encounters a quota expiration error. |


## Universal Filters

Use the universal filter language to filter and root items based on the following criteria:

| Criteria | Description |
| :--- | :--- |
| entry_group | Dataplex Entry Group (@bigquery) |
| project | Dataplex Entry project |
| dataset | Dataplex Entry dataset |
| table | Dataplex Entry table |

**Example:**

```bash
filters = [
  {
    id="accept_zeenea_dataset"
    action = ACCEPT
    rules {
      dataset = "ZEENEA*"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

For more information about universal filters, see [Universal Filters](../Scanners/zeenea-universal-filters.md).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging.

The user must have the following authorizations:

* `dataplex.entryGroups.list`
* `dataplex.entryGroups.get`
* `dataplex.entries.list`
* `dataplex.entries.get`


## Data Extraction

To extract information, the connector runs the following request on the Google Dataplex API:

* `projects.locations.entryGroups.list`
* `projects.locations.entryGroups.get`
* `projects.locations.entries.list`
* `projects.locations.entries.get`
 
## Collected Metadata


### Inventory

Will collect the list of objects accessible by the user.

### Dataset

A dataset is a Google Dataplex object.
* **Name**
* **Source Description**
* **Technical Data**:
  * Project Id
  * Location Id
  * Entry Id
  * Created At
  * Updated At
  * Type

### Field
Dataset field.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Depending on the field settings.
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Depending on the "Primary Key" field attribute.
* **Technical Data**:
  * Technical Name
  * Native type

## Unique Identifier Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
| :--- | :--- | :--- |
| Dataset | `code/entry_group/project/dataset/table name` | - **code**: Unique identifier of the connection noted in the configuration file<br />- **entry_group**: Dataplex Entry Group<br />- **project**: Entry Project<br />- **dataset**: Entry Dataset<br />- **table name**: Entry Table name |
| Field | `code/entry_group/project/dataset/table name/field name` | - **code**: Unique identifier of the connection noted in the configuration file<br />- **entry_group**: Dataplex Entry Group<br />- **project**: Entry Project<br />- **dataset**: Entry Dataset<br />- **table name**: Entry Table name<br />- **field name**: Field name |

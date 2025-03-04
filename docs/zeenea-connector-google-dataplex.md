---
title: Google Dataplex
---

# Adding a Dataplex Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Dataplex.
* Zeenea traffic flows towards the data source must be open.  

:::note
A configuration template can be downloaded here: [google-dataplex.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUZ8o&d=%2Fa%2FNu000002lgKP%2FpUZP6TX6TDPvQYZqyp2v.IlPAzZY5nWzjzJ.vrThghY&asPdf=false).
:::

## Supported Versions

The Dataplex connector was developed and tested with the web version of the product. 

## Installing the Plugin

The Google plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)
 
In order to establish a connection with a Dataplex instance, specifying the following parameters in the dedicated file is required:

| Parameter| Expected Value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. | 
| `code` | Unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. | 
| `connector_id` | The type of connector to be used for the connection. Here, the value must be `google-dataplex` and this value must not be modified. | 
| `connection.json_key` | <p>JSON access key.</p><p>The key can be indicated directly or put in a separate file. In the latter case, this parameter indicates the path to the file in the form of a URI of scheme `file:`. Example: `file:///opt/zeenea-scanner/connections/gdc_json_key.json`</p><p>**Warning**: If you indicate directly the token, you must use triple quotes to encapsulate the key as a parameter.</p><p>Example: `"""{my:"json"}"""`</p> |
| `connection.project_id` | List of project ids separated by a comma |
| `connection.location_id` | List of location ids separated by a comma. Location id corresponds to GCP region (example: `"europe-west3,us-west1"`). |
| `proxy.scheme` | Depending on the proxy, `http` or `https` |
| `proxy.hostname` | Proxy address |
| `proxy.port` | Proxy port |
| `proxy.username` | Proxy username |
| `proxy.password` | Proxy account password |
| `quota.read_per_minute` | Reads per minute quota value. Default value: `6000` (default value of Google Data Catalog). |
| `quota.search_per_user_per_minute` | Search quota value per user per minute. Default value: `180` (default value in Google Data Catalog). |
| `quota.timeout_minute` | Maximum waiting time when waiting for the availability of a quota. Default value: `10` minutes. |
| `quota.max_retry` | Maximum number of retries when a request encounters a quota expiration error. |

## Rich Filters

The Dataplex connector benefits from the feature of rich filters in the configuration of the connector.

| Criteria | Description |
| :--- | :--- |
| lake | Dataplex lake name |
| zone | Dataplex zone name |
| entity | Dataplex entity name |

Read more: [Filters](zeenea-filters.md)

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have the followings authorizations:

* `dataplex.zones.list`
* `dataplex.lakes.list`
* `dataplex.entities.list`
* `dataplex.entities.get`

## Data Extraction

To extract information, the connector runs the following request on the Google Dataplex API:

* `projects.locations.lakes.zones.entities.get`

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
  * Lake Id
  * Zone Id
  * Entity Id
  * Created At
  * Updated At
  * Type
  * Data Path
  * Source System
  * Format 

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

## Unique Identification Keys

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about how it works can be found here: [Identification Keys](./zeenea-identification-keys.md).

<table>
  <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
  <tr>
    <td>Dataset</td>
    <td>code/project/location/lake/zone/dataset name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**project**: Object project</li>
        <li>**location**: Project location</li>
        <li>**lake**: Object lake</li>
        <li>**zone**: Object zone</li>
        <li>**dataset name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/project/location/lake/zone/dataset name/field name</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**project**: Object project</li>
        <li>**location**: Project location</li>
        <li>**lake**: Object lake</li>
        <li>**zone**: Object zone</li>
        <li>**dataset name**</li>
        <li>**field name**</li>
     </ul>
    </td>
  </tr>
</table>

# Adding an SAP BO Connection

## Prerequisites

* You must have a user account with sufficient [permissions](#user-permissions) to connect to SAP BO.
* Zeenea traffic flows towards the database must be open. 

> **Note:** You can find the configuration file template in the [GitHub repository](https://github.com/zeenea/connector-conf-templates/blob/main/templates/sap-bo.conf).

## Supported Versions

The SAP BO connector is compatible with all recent versions that expose the REST API. The REST API is required for the connector to access and harvest metadata. 

## Installing the Plugin

You can download the SAP BO plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with SAP BO, fill in the following parameters in the dedicated configuration file: 

| Parameter | Expected value |
|---|---|
| `name` | Specifies the display name for the connection. |
| `code` | Defines the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified. Otherwise, the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `sap-bo` and must not be modified. |
| `enabled` | A boolean value to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Defines the catalog code associated with the connection (`default` when empty). |
| `alias` | Defines the list of aliases used by other connectors to generate lineage link. <br />For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | A boolean value to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`.|
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.url` | URL towards the SAP BO REST API (for example, `http://:6405`).<br/>This URL can be obtained from the Central Management Console (CMC) |
| `connection.username` | The username for authentication. |
| `connection.password` | The password for authentication. |
| `connection.auth_type` | Authentication type. Possible values are `secEnterprise`, `secLDAP`, `secWinAD`, `secSAPR3`. <br />The default value is `secEnterprise`. |
| `connection.fetch_page_size` | (Advanced) Defines the size of the batch of items loaded by each request in the inventory. |
| `connection.timeout` | Custom HTTP client timeout in milliseconds. The default value is `10000` ms. |
| `tls.truststore.path` | Specifies the TLS trust store file path. This file must be provided in case TLS encryption is activated (protocol `https`) and when certificates are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Provides the password of the trust store file. |
| `tls.truststore.type` | Defines the type of the trust store file (`PKCS12` or `JKS`). <br />The default value is discovered from the file extension. |
| `tls.bypass_certificate_validation` | A boolean value to bypass certificate validation. <br />The default value is `false` (recommended to keep `false`). |
| `proxy.scheme` | Defines the proxy protocol (`http` or `https`). |
| `proxy.hostname` | Specifies the proxy address. |
| `proxy.port` | Sets the proxy port. |
| `proxy.username` | The username for proxy authentication. |
| `proxy.password` | The password for proxy authentication. |
| `filter` | Defines the filters to apply during inventory. See [Rich Filters](#rich-filters). |

## User Permissions

To harvest metadata, the user account associated with the connector must have permission to list and read the objects that need to be cataloged. 

## Rich Filters

The SAP BO connector supports rich filters in the configuration of the connector. You can use the following keys to filter objects during inventory:

* `name`: Filters based on the document name.<br />For example:
  ```
  filter = """
          name in ('my_document1', 'my_second_document')
      and (
              not ( name contains 'tmp' ) or not ( name equals 'to_delete' )
          )
  """
  ```
* `universe_path`: Filters based on the universe path.<br />For example:
  ```
  filter = """
          universe_path contains 'PATH_UNIVERSE_'
      and (
              not (
                  universe_path contains 'PATH_UNIVERSE_2'
              )
          )
  """
  ```



> **Note:** The filter can contain either a raw value or a file URL to the content (for example, `file:///path/to/zeenea/connections/filter.json`). When you use a side-file, any changes to the filter are applied without restarting the scanner.

For more information about filters, see [Filters](../Scanners/zeenea-filters.md).

## Metadata Extraction

To harvest metadata, the connector runs the following API queries:

* **GET &amp; POST** `/biprws/logon/long` : authentication query
* `/universes`
* `/universes/$param`
* `/documents`
* `/documents/$param`
* `/documents/$param/dataproviders`
* `/documents/$param/dataproviders/$param` to harvest all assets (visualizations, datasets, fields)

## Collected Metadata

### Inventory

The inventory lists all visualizations (Webi Documents) that the running user can access.

### Visualization

A visualization is a Webi Document.

* **Name**
* **Source Description**
* **Technical Data**:
  * SAP ID
  * UUID

### Datasets

A dataset is a Data Provider or an SAP Universe.

* **Name**
* **Source Description**
* **Technical Data**:
  * SAP Identifier
  * RowNumber (Data Provider)
  * Universe type (SAP Universe)

### Fields

Each field represents a column in a table (dataset).



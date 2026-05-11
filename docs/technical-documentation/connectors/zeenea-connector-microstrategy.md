# Adding a MicroStrategy Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with MicroStrategy.
* Zeenea traffic flows towards MicroStrategy must be open.

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The MicroStrategy connector is available for the SaaS and the on-prem product version. 

## Installing the Plugin

You can download the Microstrategy plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for changes and resynchronizes automatically.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with a MicroStrategy instance, fill in the following parameters in the dedicated configuration file:

| Parameter | Expected value |
|---|---|
| `name` | Specifies the display name for the connection. |
| `code` | Specifies the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | Specifies the type of connector to be used for the connection. The value must be `microstrategy` and must not be modified. |
| `enabled` | Specifies whether to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Specifies the catalog code associated with the connection (`default` when empty). |
| `alias` | Specifies the list of aliases used by other connectors to generate lineage link. <br />For example, `["localhost:1234/db","https://some-url.org"]` |
| `secret_manager.enabled` | Specifies whether to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`. |
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.url` | Specifies the MicroStrategy portal URL. |
| `connection.login_mode` | Specifies the login mode. <br />Possible values are `standard` or `anonymous`. |
| `connection.username` | Specifies the username. |
| `connection.password` | Specifies the user password. |
| `proxy.scheme` | Specifies the proxy protocol (`http` or `https`). <br />The default value is `http`. |
| `proxy.hostname` | Specifies the proxy address. |
| `proxy.port` | Specifies the proxy port. |
| `proxy.username` | Specifies the proxy username. |
| `proxy.password` | Specifies the proxy account password. |
| `dossier_category_path_level` | (Optional) Specifies the position of the segment to use to get the folder category from the path. |
| `lineage.enabled` | (Optional) Specifies whether to enable or disable the lineage feature (`true` or `false`). <br />The default value is `false`. |
| `inventory.root_folder_list` | (Optional) Specifies a filter to limit inventory to specified folder. <br />For example: `\MobileDossier\System Objects\Reports;\MicroStrategy Tutorial\System Objects\Reports` |
| `inventory.fetch_page_size` | (Optional) Specifies the maximum size of the pages to be inventoried. |
| `tls.truststore.path` | Specifies the TLS trust store file path. This file must be provided in case TLS encryption is activated (protocol `https`) and when certificates of servers are delivered by a specific authority. It must contain the certification chain. |
| `tls.truststore.password` | Specifies the password of the trust store file. |
| `tls.truststore.type` | Specifies the type of the trust store file. <br />Possible values are `PKCS12` or `JKS`. Default value is discovered from the file extension. |

## User Permissions

To collect metadata, the running user's permissions must allow them to access folders and portfolios that need cataloging.

## Data Extraction

To extract information, the connector runs the following API requests:

* `GET /api/searches/results?type=55`: To get the list of the dossiers.
* `GET /api/projects: To get the name of the dossiers`
* `GET /api/v2/dossiers/[dossier-id]/definition : To get metadata from each dossier`
* `GET /api/documents/[dossier-id]/cubes : To get the list of the cubes linked to a dossier`
* `GET /api/v2/cubes/[cube-id] : To get cube metadata (attributes and metrics)`
* `GET /api/object/[dossier-id]?type=55`: To retrieve the file definition and extract metadata (creation date, last modification date, owner ID, certification status, category).
* `GET /api/users/[user-id]`: To retrieve the owner's name in metadata, and if this email exists, create a contact.
* `GET /api/model/metrics/[metric-id]`: To retrieve the associated formula.

## Collected Metadata

### Inventory

Will collect the list of portfolios accessible by the user.

### Lineage

> **Note:** Available only with MicroStrategy version 2021 update 7 or later. The Modeling Service must be configured and enabled on the machine.

The connector is able to reconstruct the lineage of tables used in the folders if they are present in the catalog. This feature is available when MicroStrategy uses datasets from the technologies mentioned below. In this case, it is necessary to specify an additional parameter in the original connections of these tables as referenced in the MicroStrategy connection configuration.

| Source System | Possible value of `alias` parameter to be set in source system configuration file |
|---|---|
| [BigQuery](./zeenea-connector-google-bigquery.md) | BigQuery project identifier. Example: `alias = ["project_id"]` |
| [PostgreSQL](./zeenea-connector-postgresql.md), [Oracle](./zeenea-connector-oracle.md), [Redshift](./zeenea-connector-aws-redshift.md), [SQLServer](./zeenea-connector-sqlserver.md) | Database address. Example: `alias = ["host:port/database"]` |

The following API calls are made to obtain the lineage information:

* `GET /api/model/attributes/[attribute-id]`: Allows you to retrieve the id of the table where this attribute is attached.
* `GET /api/model/datasources/[source-system-id]`: Allows you to retrieve the ID of the connection that is associated with it.
* `GET /api/model/connections/[connection-id]`: Allows to build the connection code for the Zeenea lineage.

> **Note:** The connector will create a data process object for each MicroStrategy dataset in order to link it with the original dataset(s) even if the original dataset(s) are not present in the catalog.

### Visualization

A visualization object is a MicroStrategy portfolio. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Project Id
  * Project Name
  * Dossier Id
  * Dossier Name
  * Link To The Dossier
  * Certified
  * Creation Date
  * Last Modification Date
  * Dossier Category
  * Owner

### Dataset

A dataset is a table used in a visualization object. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Dataset Id
  * Dataset Name

### Field

A field can be an attribute, a metric, or a field from the dataset. 

* **Name**
* **Source Description**: Formula if available (Available only in MicroStrategy version 2021 update 7 and later. Modeling service must be configured and enabled on the machine).
* **Type**
* **Can be null**: Not supported. Default value `false`.
* **Multivalued**: nNot supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Data**:
  * Technical name
  * Native type
  * Type: can be `attribute`, `metric`, or `attribute form`
  * dataType
  * baseFormCategory
  * baseFormType

## Object Identification Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.

For more information about identifier keys, see [Identification Keys](../Stewardship/zeenea-identification-keys.md).
 
| Object | Identification Key | Description |
|---|---|---|
| Visualization | code/project id/dossier id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project id**: MicroStrategy project technical identifier<br/>- **dossier id**: MicroStrategy dossier technical identifier |
| Dataset | code/project id/dataset id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project id**: MicroStrategy project technical identifier<br/>- **dataset id**: MicroStrategy dataset technical identifier |
| Field | code/project id/dataset id/field id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project id**: MicroStrategy project technical identifier<br/>- **dataset id**: MicroStrategy dataset technical identifier<br/>- **field id**: MicroStrategy field technical identifier |
| Data process | code/transformation/project id/dataset id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **project id**: MicroStrategy project technical identifier<br/>- **dataset id**: MicroStrategy dataset technical identifier |

## Additional Information

The connector is able to retrieve portfolios from MicroStrategy, including, **under certain conditions**, those with a "prompt". (NOTE: hereafter, we use the term "prompt" also used in MicroStrategy's English literature).

The prompts can be of one of the following types: 

* `UNSUPPORTED`, `VALUE`, `ELEMENTS`, `EXPRESSION`, `OBJECTS`, `LEVEL`.

The possible types of values for the "VALUE" prompts are :

* `TEXT`, `NUMERIC`, `DATE`.

Because a MicroStrategy portfolio with a prompt must be accessed with values requested by the prompt in order to be analyzed, they can only be retrieved by the Connector under the following conditions:

* The prompt is not mandatory
* OR the prompt has a predefined response field,
* OR the prompt has a default value,
* OR the prompt is of type `VALUE` or `ELEMENTS`.

The Connector will therefore try to guess possible values for the expected elements to reach the portfolio definition since the MicroStrategy API requires it to return the portfolio metadata.

### Configure the response of a prompt

When the prompt autocomplete mechanism is not sufficient, it is possible to configure a response value.

#### Setting

To do this, you must fill in the `inventory.prompt_answers` parameter. This parameter can contain either a content in JSON format or a URL (`file:` protocol) to the local JSON file.

When there is only one value to fill, it can be convenient to put the content directly in the configuration file. In this case, it is useful to use a multiline string that starts and ends with three quotes (`"""`). The use of an external file will quickly become advantageous as soon as the number of responses increases. Moreover, the modifications in the external file are taken into account without having to restart the scanner.

#### Example of configuration

With external file:

```
inventory {
    # Semicolon separated list of folder paths. '\' or '/' can be used interchangeably.
    #root_folder_list = 
    #fetch_page_size = 1000

    prompt_answers = "file:///opt/zeenea-scanner/connections/prompt_answers.json"
}
```

With an internal value:

```
inventory {
    # Semicolon separated list of folder paths. '\' or '/' can be used interchangeably.
    #root_folder_list = 
    #fetch_page_size = 1000

    prompt_answers = """
        [ 
            { 
                "id": "FDC7791206C4BA721D6A0A55AC600BCC",
                "type" : "ELEMENTS",
                "answers" : [
                    {
                        "id": "hVALUE;39CFA940E411A7A6CB8D1052EB41BF71",
                        "name": "VALUE"
                    }
                ]
            },
            {
                "key": "9EC55F9D44B19BB0B960BEB97341C520@0@10",
                "name": "Select a Time Period",
                "type": "EXPRESSION",
                "answers": {
                    "content": "Month = Sep 2010",
                    "expression": {
                        "operator": "And",
                        "operands": [
                            {
                                "operator": "In",
                                "operands": [
                                    {
                                        "type": "attribute",
                                        "id": "8D679D4411D3E4981000E787EC6DE8A4",
                                        "name": "Month"
                                    },
                                    {
                                        "type": "elements",
                                        "elements": [
                                            {
                                                "id": "8D679D4411D3E4981000E787EC6DE8A4:201009",
                                                "name": "Sep 2010"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    """
}
```

#### JSON format of responses

JSON is an array of objects that represent a prompt with its response.

Each object contains: 

* a `type` field that indicates the type of prompt as provided by the API description of the prompt `GET {{baseUrl}}/api/documents/{{folderId}}/instances/{instanceFolder}}/prompts`
* at least one identification field: `key`, `id`, or `name`
* an `answers` field

The format of the `answers` field depends on the type of the prompt and has many variants. It is not interpreted by Zeenea and passed as is to the `PUT {{baseUrl}}/api/documents/{{folderId}}/instances/{instanceFolder}}/prompts/answers` response API.

See the MicroStrategy documentation for details of this format.

When the connector needs to respond to a prompt, before using the default value or calculating a possible response, it checks to see if any response in the list matches the prompt to be processed.

A response matches a prompt, if:

* they have the same type,
* they have the same `VALUE` type, they have the same `data type`,
* one of the fields `key`, `id`, `name` are equal

If several entries match, the one with the same `key` has priority, then the one with the same `id`, and finally the one with the same `name`.
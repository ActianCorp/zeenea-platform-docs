---
title: MicroStrategy  
---

# Adding a MicroStrategy Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with MicroStrategy.
* Zeenea traffic flows towards MicroStrategy must be open.

## Supported Versions

The MicroStrategy connector is available for the SaaS and the on-prem product version. 

## Installing the Plugin

The Microstrategy connector is available as a plugin and can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a MicroStrategy instance, specifying the following parameters in the dedicated file is required:

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
    <td>The type of connector to be used for the connection. Here, the value must be `microstrategy` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>MicroStrategy portal URL</td>
  </tr>
  <tr>
    <td>`connection.login_mode`</td>
    <td>Can be `standard` or `anonymous`</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>Password</td>
  </tr>
  <tr>
    <td>`dossier_category_path_level`</td>
    <td>(Optional) To set the position of the segment to use to get the folder category from the path.</td>
  </tr>
  <tr>
    <td>`lineage.enabled`</td>
    <td>(Optional) Set to `true` to enable the lineage feature. Default value `false`.</td>
  </tr>
  <tr>
    <td>`inventory.root_folder_list`</td>
    <td>(Optional) Filter to limit inventory to specified folder. Example: `\MobileDossier\System Objects\Reports;\MicroStrategy Tutorial\System Objects\Reports`</td>
  </tr>
  <tr>
    <td>`inventory.fetch_page_size`</td>
    <td> (Optional) Maximum size of the pages to be inventoried</td>
  </tr>
  <tr>
    <td>`tls.truststore.path`</td>
    <td>The Trust Store file path. This file must be provided in case TLS encryption is activated (protocol https) and when certificates of servers are delivered by a specific authority. It must contain the certification chain.</td>
  </tr>
  <tr>
    <td>`tls.truststore.password`</td>
    <td>Password of the trust store file</td>
  </tr>
  <tr>
    <td>`tls.truststore.type`</td>
    <td>Type of the trust store file (`PKCS12` or `JKS`). Default value is discovered from the file extension.</td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access folders and portfolios that need cataloging.

## Data Extraction

To extract information, the connector runs the following API requests:

* `GET /api/searches/results?type=55`: To get the list of the dossiers
* `GET /api/projects: To get the name of the dossiers`
* `GET /api/v2/dossiers/[dossier-id]/definition : To get metadata from each dossier`
* `GET /api/documents/[dossier-id]/cubes : To get the list of the cubes linked to a dossier`
* `GET /api/v2/cubes/[cube-id] : To get cube metadata (attributes and metrics)`
* `GET /api/object/[dossier-id]?type=55`: To retrieve the file definition and extract metadata (creation date, last modification date, owner ID, certification status, category)
* `GET /api/users/[user-id]`: To retrieve the owner's name in metadata, and if this email exists, create a contact
* `GET /api/model/metrics/[metric-id]`: To retrieve the associated formula

## Collected Metadata

### Inventory

Will collect the list of portfolios accessible by the user.

### Lineage

:::caution[NOTE]
**Available only with MicroStrategy version 2021 update 7 or later. The Modeling Service must be configured and enabled on the machine.**
:::

The connector is able to reconstruct the lineage of tables used in the folders if they are present in the catalog. This feature is available when MicroStrategy uses datasets from the technologies mentioned below. In this case, it is necessary to specify an additional parameter in the original connections of these tables as referenced in the MicroStrategy connection configuration.

<table>
  <tr>
    <th>Source System</th>
    <th>Possible value of `alias` parameter to be set in source system configuration file</th>
  </tr>
  <tr>
    <td>[BigQuery](./zeenea-connector-google-bigquery.md)</td>
    <td>BigQuery project identifier. (example: `alias = ["project_id"]`)</td>
  </tr>
  <tr>
    <td>[PostgreSQL](./zeenea-connector-postgresql.md), [Oracle](./zeenea-connector-oracle.md), [Redshift](./zeenea-connector-aws-redshift.md), [SQLServer](./zeenea-connector-sqlserver.md)</td>
    <td>Database address. (example: `alias = ["host:port/database"]`)</td>
  </tr>
</table>

The following API calls are made to obtain the lineage information:

* `GET /api/model/attributes/[attribute-id]`: Allows you to retrieve the id of the table where this attribute is attached.
* `GET /api/model/datasources/[source-system-id]`: Allows you to retrieve the ID of the connection that is associated with it.
* `GET /api/model/connections/[connection-id]`: Allows to build the connection code for the Zeenea lineage.

:::note
The connector will create a data process object for each MicroStrategy dataset in order to link it with the original dataset(s) even if the original dataset(s) are not present in the catalog.
:::

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

An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.

More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
 
 <table>
   <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
     <td>Visualization</td>
     <td>code/project id/dossier id</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**project id**: MicroStrategy project technical identifier</li>
         <li>**dossier id**: MicroStrategy dossier technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Dataset</td>
     <td>code/project id/dataset id</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**project id**: MicroStrategy project technical identifier</li>
         <li>**dataset id**: MicroStrategy dataset technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Field</td>
     <td>code/project id/dataset id/field id</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**project id**: MicroStrategy project technical identifier</li>
         <li>**dataset  id**: MicroStrategy dataset technical identifier</li>
         <li>**field id**: MicroStrategy field technical identifier</li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>Data process</td>
     <td>code/transformation/project id/dataset id</td>
     <td>
       <ul>
         <li>**code**: Unique identifier of the connection noted in the configuration file</li>
         <li>**project id**: MicroStrategy project technical identifier</li>
         <li>**dataset  id**: MicroStrategy dataset technical identifier</li>
       </ul>
     </td>
   </tr>
 </table>
    

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
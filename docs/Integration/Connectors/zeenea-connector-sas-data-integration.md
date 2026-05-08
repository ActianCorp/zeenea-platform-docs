# Adding an SAS Data Integration Connection

> **Note:** The current version of this connector is not final and it will be updated. 

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SAS.
* Zeenea traffic flows towards the data source must be open. 

> **Important:**
> * The SAS proprietary libraries are not provided with the connector.<br />Please download them and place them in the `/lib-ext` folder of the scanner: [https://www.ibm.com/docs/en/psfa/7.2.1?topic=configuration-installing-uninstalling-client-tools-software](https://www.ibm.com/docs/en/psfa/7.2.1?topic=configuration-installing-uninstalling-client-tools-software)
> * If you are using **Java 11** to run your scanner, you'll also need to download and copy these libraries to the `/lib-ext` folder:
>   * [glassfish-corba-internal-api-4.2.4.jar](https://repo1.maven.org/maven2/org/glassfish/corba/glassfish-corba-internal-api/4.2.4/glassfish-corba-internal-api-4.2.4.jar)
>   * [glassfish-corba-omgapi-4.2.4.jar](https://repo1.maven.org/maven2/org/glassfish/corba/glassfish-corba-omgapi/4.2.4/glassfish-corba-omgapi-4.2.4.jar)
>   * [glassfish-corba-orb-4.2.4.jar](https://repo1.maven.org/maven2/org/glassfish/corba/glassfish-corba-orb/4.2.4/glassfish-corba-orb-4.2.4.jar)
>   * [pfl-basic-4.1.2.jar](https://repo1.maven.org/maven2/org/glassfish/pfl/pfl-basic/4.1.2/pfl-basic-4.1.2.jar)
>   * [pfl-tf-4.1.2.jar](https://repo1.maven.org/maven2/org/glassfish/pfl/pfl-tf/4.1.2/pfl-tf-4.1.2.jar)

<br />

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The SAS connector was developed and tested with SAS version 9.4 and is compatible with **scanner version 44** and later. 

## Installing the Plugin

The SAS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md)

In order to establish a connection with a SAS instance, specifying the following parameters in the dedicated file is required:

| Parameter | Expected value |
|---|---|
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The connector type to use for the connection. Here, the value must be `sas-dataintegration` and this value must not be modified. |
| `connection.server` | SAS Server name |
| `connection.port` | SAS Server port |
| `connection.username` | Username |
| `connection.password` | User password |
| `filter.job_name.includes` | Comma-separated list of elements to include jobs in the synchronization using the following keywords: `begins`, `contains`, `equals`, `between`<br/>Example: `includes = "enterprise,equals:customers,contains:prod"` |
| `filter.job_name.excludes` | Comma separated list of elements to exclude jobs during synchronization using the following keywords: `begins`, `contains`, `equals`, `between`<br/>Example: `excludes = "enterprise,equals:customers,contains:prod"` |
| `filter` | To filter data processes during the synchronization. See [Rich Filters](#rich-filters) |

> **Note:** A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have read access to all SAS metadata objects.

## Rich Filters

The SAS connector benefits from the feature of rich filters in the configuration of the connector. The keys that can be used to filter the elements are `path` or `name`.

Read more: [Filters](../Scanners/zeenea-filters.md)

## Data Extraction

To extract information from SAS Metadata, the connector will connect using the SAS proprietary libraries and use the various objects provided to retrieve the following objects: 

* Physical Table
* Job
* Server Component
* SAS Library

## Collected Metadata

### Synchronize

Will collect the list of jobs accessible by the user.  

### Lineage

The connector is able to retrieve the lineage to existing datasets from the catalog.

### Data Process

A data process is an SAS job. 

* **Name**
* **Source Description**
* **Technical Data**:
  * Technical Name
    * Repository
    * SAS ID
    * Creation Time
    * Folder
    * Created By

## Unique Identifier Keys
 
A key is associated with each item of the catalog. When the object comes from an external system, the key is built and provided by the connector.
 
More information about unique identification keys in this documentation: [Identification Keys](../Stewardship/zeenea-identification-keys.md).

| Object | Identifier Key | Description |
|---|---|---|
| Data process | code/repository/data process id | - **code**: Unique identifier of the connection noted in the configuration file<br/>- **repository**: Object repository<br/>- **data process id**: Job SAS technical identifier |

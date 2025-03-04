---
title: SAS Data Integration  
---

# Adding an SAS Data Integration Connection

:::note
The current version of this connector is not final and it will be updated. 
:::

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with SAS.
* Zeenea traffic flows towards the data source must be open. 

:::note[IMPORTANT]
* **The SAS proprietary libraries are not provided with the connector**.<br />
Please download them and place them in the `/lib-ext` folder of the scanner: https://www.ibm.com/docs/en/psfa/7.2.1?topic=configuration-installing-uninstalling-client-tools-software
* If you are using **Java 11** to run your scanner, you'll also need to download and copy these libraries to the `/lib-ext` folder:
  * [glassfish-corba-internal-api-4.2.4.jar](https://repo1.maven.org/maven2/org/glassfish/corba/glassfish-corba-internal-api/4.2.4/glassfish-corba-internal-api-4.2.4.jar)
  * [glassfish-corba-omgapi-4.2.4.jar](https://repo1.maven.org/maven2/org/glassfish/corba/glassfish-corba-omgapi/4.2.4/glassfish-corba-omgapi-4.2.4.jar)
  * [glassfish-corba-orb-4.2.4.jar](https://repo1.maven.org/maven2/org/glassfish/corba/glassfish-corba-orb/4.2.4/glassfish-corba-orb-4.2.4.jar)
  * [pfl-basic-4.1.2.jar](https://repo1.maven.org/maven2/org/glassfish/pfl/pfl-basic/4.1.2/pfl-basic-4.1.2.jar)
  * [pfl-tf-4.1.2.jar](https://repo1.maven.org/maven2/org/glassfish/pfl/pfl-tf/4.1.2/pfl-tf-4.1.2.jar)
:::

## Supported Versions

The SAS connector was developed and tested with SAS version 9.4 and is compatible with **scanner version 44** and later. 

## Installing the Plugin

The SAS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a SAS instance, specifying the following parameters in the dedicated file is required:

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
    <td>The connector type to use for the connection. Here, the value must be `sas-dataintegration` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.server`</td>
    <td>SAS Server name</td>
  </tr>
  <tr>
    <td>`connection.port`</td>
    <td>SAS Server port</td>
  </tr>
  <tr>
    <td>`connection.username`</td>
    <td>Username</td>
  </tr>
  <tr>
    <td>`connection.password`</td>
    <td>User password</td>
  </tr>
  <tr>
    <td>`filter.job_name.includes`</td>
    <td>
      <p>Comma-separated list of elements to include jobs in the synchronization using the following keywords: `begins`, `contains`, `equals`, `between`</p>
      <p>Example: `includes = "enterprise,equals:customers,contains:prod"`</p>
    </td>
  </tr>
  <tr>
    <td>`filter.job_name.excludes`</td>
    <td>
      <p>Comma separated list of elements to exclude jobs during synchronization using the following keywords: `begins`, `contains`, `equals`, `between`</p>
      <p>Example: `includes = "enterprise,equals:customers,contains:prod"`</p>
      <p><font color="red">Should this be `excludes = "enterprise,equals:customers,contains:prod"`?</font></p>
    </td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>To filter data processes during the synchronization. See [Rich Filters](#rich-filters)</td>
  </tr>
</table>

:::note
A template of the configuration file is available in [this repository](https://github.com/zeenea/connector-conf-templates/tree/main/templates).
:::

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read databases that need cataloging. 

Here, the user must have read access to all SAS metadata objects.

## Rich Filters

The SAS connector benefits from the feature of rich filters in the configuration of the connector. The keys that can be used to filter the elements are `path` or `name`.

Read more: [Filters](zeenea-filters.md)

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
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
 <table>
   <tr><th>Object</th><th>Identifier Key</th><th>Description</th></tr>
   <tr>
     <td>Data process</td>
     <td>code/repository/data process id</td>
     <td>
       <ul>
         <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
         <li>**repository**: Object repository</li>
         <li>**data process id**: Job SAS technical identifier</li>
       </ul>
     </td>
   </tr>
 </table>
 
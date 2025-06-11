---
title: Power BI SaaS  
---

# Adding a Power BI SaaS Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with PowerBI SaaS.
* For the PowerBI v2 plugin to connect to a tenant of PowerBI Online, a Service Principal account is needed to authenticate to MS Azure via a registered application using OAuth 2.0, an application ID, and a secret key. Refer to [Creating a Service Principal in Azure](#creating-a-service-principal-in-azure) below for details.

:::note 
The configuration template can be downloaded here: [powerbi.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUbtm&d=%2Fa%2FNu000002lg4H%2FaccvqwXA6moiD6Jy3bOWkDoT7IpIcp6CXYsZj0JT.MI&asPdf=false) 

<font color="red">Is this template still valid with the v2 plugin?</font>
:::

### Creating a Service Principal in Azure

To create a service principal in Azure, you'll first need to register an application in Azure Active Directory (Azure AD). This application registration will automatically create a corresponding service principal, which represents the application's identity in your Microsoft Entra tenant. You'll need to note the **Application (client) ID** and the **Client Secret** from the app registration, which will be needed for the Zeenea Scanner configuration. Finally, you'll need to grant the service principal the necessary roles and permissions to access the resources it needs.

Access to the PowerBI Admin API must be enabled for service principals using the Microsoft Fabric Admin Portal or Power BI Admin Portal and linked to a security group created using the Microsoft Entra Admin Center.

To configure **Admin API settings** in Azure, you typically need to enable service principal authentication for admin APIs within the Admin portal, especially when using features like Microsoft Fabric. This involves signing into the Microsoft Fabric Admin Portal, navigating to tenant settings, and enabling the switch for service principal access to read-only admin APIs. You also need to assign a specific security group created during application creation to the Admin API settings.

:::note
The user logged via Entra ID or Active Directory requires MS Fabric Admin role to complete the steps below.
:::

#### 1. Register an Application in Azure Entra ID (formerly known as Active Directory)

 1. Log in to the Azure portal: https://portal.azure.com/
 2. Go to **Azure Entra ID**.
 3. Select **App registrations**.
 4. Click **New registration**.
 5. Enter a name for your application.
 6. Choose the appropriate supported account types.
 7. Select the redirect URI.

     For example: `https://login.microsoftonline.com/20057ce9-1386-4770-8b04-e7824ef632be/oauth2/v2.0/token`
 8. Click **Register**.
 
#### 2. Note the Application (client) ID
 
Once the app registration is complete, note the **Application (client) ID**. You'll need this later to authenticate with the service principal. 

#### 3. Add a Client Secret

You can add a client secret to provide a password-based credential for authentication.

1. Go to **Certificates & secrets** under the app registration.
2. Click **New client secret**.
3. Enter a description and expiry date, then click **Add**.

    :::caution[IMPORTANT]
    Copy the value of the client secret immediately after creation, as you won't be able to retrieve it later. 
    :::

#### 4. Grant Permissions

1. Go to the Azure resource you want the service principal to access.
2. Select **Access control (IAM)**.
3. Click **Add role assignment**.
4. Choose the appropriate privileged administrator role (e.g., “Contributor”).
5. Add member by selecting the service principal created by the registered application.
6. Click **Save**. 

#### 5. Create a Security Group using the Microsoft Entra Admin Center

1. Sign in to the Microsoft Entra admin center: https://entra.microsoft.com/. Access the Entra admin center with appropriate permissions (at least a Groups Administrator role).
2. Go to **Identity** > **Groups** > **All groups**.
3. Click **New group**.
4. Provide Group Details:
    * Group type: Select **Security**.
    * Group name: Enter a descriptive name for the group.
    * Description: (Optional) Add a description for the group.
    * Membership type: Choose **Assigned** for manually-assigned members or **Dynamic** for automatically-managed members based on rules.
5. Click **Create** to finalize the group creation.
6. Add the previously-created service principal to the security group as a direct member.

#### 6. Configure Admin API Settings

1. Access the Admin Portal: https://app.powerbi.com/admin-portal/tenantSettings?experience=power-bi.
2. Navigate to the Admin portal within your Azure subscription.
3. Go to the **Tenant Settings** section.
4. Find the **Admin API settings** section within the tenant settings:

    ![](/img/zeenea-ms-fabric1.png)

    ![](/img/zeenea-ms-fabric2.png)

    * Enable Service Principal Authentication.
    * Enable the switch that allows service principals to access read-only Admin APIs.
    * Enable the switch that allows service principals to access read-only Admin APIs used for updates.
    * Enable the switch that allows for enhanced Admin API responses with detailed metadata.
    * Assign the security group created in the previous step to the Admin API settings enabled.

#### 7. Add the Service Principal

Add the Service Principal to PowerBI Online users for the workspace(s).

<font color="red">Under [User Permissions](#user-permissions) below, there is a bullet for "Add the service principal to Power BI group". Is this step what that is referring to, and is the info under that bullet still correct?</font>

## Supported Versions

The Power BI SaaS connector is compatible with the product online version. 

## Installing the Plugin

The Power BI SaaS plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md) <font color="red">Need link for v2 plugin for the Connector Downloads page.</font>


:::caution[ATTENTION]
Updating the connector to version 1.7.0 from a previous version requires a data migration for the "Data process" type objects. Please contact customer service to assist you in this migration.

<font color="red">Do you need to do this before updating to v2 if you haven't already done so for v1.7.0?</font>

:::

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a PowerBI SaaS instance, specifying the following parameters in the dedicated file is required:

<font color="red">Are any additions/updates to parameters needed for v2?</font>

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
    <td>The connector type to use for the connection. Here, the value must be `powerbi` and this value must not be modified.</td>
  </tr>
  <tr>
    <td>`connection.tenant`</td>
    <td>Tenant's technical identifier</td>
  </tr>
  <tr>
    <td>`connection.url`</td>
    <td>Connection address. Default value `https://api.powerbi.com`.</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_id`</td>
    <td>Application ID (client) as defined in Azure</td>
  </tr>
  <tr>
    <td>`connection.oauth.client_secret`</td>
    <td>Client's secret</td>
  </tr>
  <tr>
    <td>`connection.oauth.endpoint`</td>
    <td>API Scanner endpoint. Must respect following format: `https://login.microsoftonline.com/\<tenants-technical-identifier>/oauth2/v2.0/token`</td>
  </tr>
  <tr>
    <td>`dsn.configuration`</td>
    <td>To define the list of DSNs configured in PowerBI Desktop. Must be filled in to get the lineage to external sources from DSNs. See the template to complete the field.</td>
  </tr>
  <tr>
    <td>`cache.path`</td>
    <td>(Optional) To customize the cache disk storage path. Default value in the scanner cache folder.</td>
  </tr>
  <tr>
    <td>`proxy.scheme`</td>
    <td>Depending on the proxy, `http` or `https`</td>
  </tr>
  <tr>
    <td>`proxy.hostname`</td>
    <td>Proxy address</td>
  </tr>
  <tr>
    <td>`proxy.port`</td>
    <td>Proxy port</td>
  </tr>
  <tr>
    <td>`proxy.username`</td>
    <td>Proxy username</td>
  </tr>
  <tr>
    <td>`proxy.password`</td>
    <td>Proxy account password</td>
  </tr>
  <tr>
    <td>`path.cache`</td>
    <td>
      <p>(Optional) To define a cache custom path. Used to avoid PowerBI API call limits. The connector will store workspace information in a file on disk during inventory. This property must target an existing file on disk. (You can both set an absolute or a relative path, however, relative paths are dependent of the current directory at the scanner launch time.</p>
      <p>Filter use to keep or not workspaces and reports.</p>
      <p>Example:</p>
      <p>`filter = "workspace starts with 'zeenea_' and not report ends with 'test'"`</p>
    </td>
  </tr>
  <tr>
    <td>`filter`</td>
    <td>
      <p>Filter use to keep or not workspaces and reports. Example:</p>
      <p>`filter = "workspace starts with 'zeenea_' and not report ends with 'test'"`</p>
    </td>
  </tr>
  <tr>
    <td>`contact.role_filter`</td>
    <td>
      <p>Enables you to extract only the contacts that do have a role matching the filter. To achieve this, use the `role` key to filter the contacts. Example:</p>
      <p>`contact.role_filter = "role in ('Owner', 'Read')"`</p>
    </td>
  </tr>
</table>

## User Permissions

<font color="red">Some of this section appears to overlap with the new Creating a Service Principal section above. Are any changes required to this section?</font>

In order to collect metadata, the running user's permissions must allow them to access and read reports that need cataloging.

The user must be able to do the following:

* Get the client identifier and associated secret.
* Register an application as a service principal in the Azure environment.
  To communicate with Power BI, the connector uses the option suggested in paragraph [Create a new client secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#option-3-create-a-new-client-secret) from the Microsoft documentation.
* Add the service principal to Power BI group.

  Once the client id and secret are obtained with the necessary rights, the service principal must be added as a user of a security group authorized to browse workspaces. To do so, do the following:

  1. **Create an Azure AD group**. See the documentation above to create a group with reading access to all the workspaces. More information on how to create Azure AD Group can be found here: https://docs.microsoft.com/en-us/power-bi/enterprise/read-only-apis-service-principal-authentication.
  2. **Add a service principal to the Azure AD group**.
      :::note
      The service principal must not have specific rights (e.g., `Tenant.Read.All`) related to Power BI in the Azure AD configuration as this could generate conflict with security group rights on the Power BI side.
      :::

### API Scanner Authorization

Documentation about the configuration of this specific access is described here:

https://docs.microsoft.com/en-us/power-bi/admin/service-admin-metadata-scanning-setup

### Retrieving Page Names from a Report

To retrieve the list of page names from a report, the connector uses the API:

`/groups/[workspace ID]/reports/[report ID]/pages`

For this service to return the list, the service principal used by the connector must be added as a viewer:

1. Go to the Workspace.
2. Click on "Manage access" then "Add people".
3. Search for the service principal, select "Viewer", then add.

If this action is performed after importing a report, the list of pages will be automatically added to the visualization on its next update.

## Rich Filters

## Workspaces and Reports

Starting with version 1.11.0 the connector has a rich filter available that enables you to extract only the Workspaces and Reports that do have names matching the filter.

| Criteria | Description |
| :--- | :--- |
| workspace | The name of the Workspace |
| report | The name of the Report |

#### Example:

`filter = "workspace starts with 'zeenea_' and not report ends with 'test'"`

## Contacts

Starting with version 1.9.0 the connector has a rich filter available that enables you to extract only the contacts that do have a role matching the filter.

| Criteria | Description |
| :--- | :--- |
| role | The role name to filter. The values list is available [here](https://learn.microsoft.com/fr-fr/rest/api/power-bi/admin/workspace-info-get-scan-result#reportuseraccessright). |

#### Example:

`contact.role_filter = "role in ('Owner', 'Read')"`

Read more: [Filters](zeenea-filters.md)

## Data Extraction

To extract information, the connector runs successively the following API requests:

* **GET**` https://api.powerbi.com/v1.0/myorg/admin/workspaces/modified`: To get the workspaces list excluding personal workspaces.
* **POST**` https://api.powerbi.com/v1.0/myorg/admin/workspaces/getInfo`:
  * Parameter: Workspaces list (100 workspaces limit)
  * Response: Scan identifier
* **GET** `https://api.powerbi.com/v1.0/myorg/admin/workspaces/scanStatus/`:
  * Parameter: Scan identifier
  * Response: Scan status: `NOT_STARTED`, `RUNNING`, `SUCCEEDED`
* **GET** `https://api.powerbi.com/v1.0/myorg/admin/workspaces/scanResult/`:
  * Parameter: Scan identifier
  * Response: Object with all the metadata of report from scanned workspaces

## Collected Metadata

### Inventory

Collects the list of reports accessible by the user.

### Lineage

The Power BI SaaS connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Power BI SaaS dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in **the configuration file of the source system connection** as configured in the Power BI SaaS connection configuration panel. For example, if the Power BI dataset comes from a SQL Server table, then a new alias parameter must be added in the SQL Server connection configuration file.

Table summarizing the possible values of the `alias` parameter to be completed in the data source configuration file.

| Source System| Model | Example |
| :--- | :--- | :---- |
| [SQL Server](./zeenea-connector-sqlserver.md) | Server name:port/Database name | `alias = ["zeenea.database.windows.net:1433/db"]` * |
| [BigQuery](./zeenea-connector-google-bigquery.md) | BigQuery project identifier	| `alias = ["zeenea-project"]` |
| [AWS Redshift](./zeenea-connector-aws-redshift.md) | Server name:port/Database name | `alias = ["zeenea.cthwlv3ueke2.eu-west-3.redshift.amazonaws.com:5439/database"]` |
| [AWS Athena](./zeenea-connector-aws-athena.md) | N/A | N/A |
| [Snowflake](./zeenea-connector-snowflake.md) | Server name/Database name | `alias = ["kn999999.eu-west-1.snowflakecomputing.com/ZEENEA""]` * |
| [Oracle](./zeenea-connector-oracle.md) | Server name:port/Service Name | `alias = ["oracle.example.com:1521/XE"]` |
| [Denodo](./zeenea-connector-denodo.md) | Server name:ODBC port | `alias = ["denodo.database.com:9996"]` |

:::note
The connector creates a data process object for each dataset from Power BI SaaS to represent the link with the source dataset (even if the source dataset is not present in the catalog).
:::

### Visualization

A visualization object is a Power BI report. 

* **Name**
* **Source Description**
* **Contacts**
* **Technical Data**:
  * Report WebURL: Link to the report
  * Report Type
  * Workspace Name
  * Application: URL to the PowerBI application which this report is attached
  * Source Server Name
  * Endorsement
  * Certified By
  * Created By
  * Creation Date
  * Modified By
  * Modified Date
  * Report's page

### Dataset

A dataset is a table included in a dataset PowerBI. 

* **Name**
* **Source Description**
* **Technical Data**:
  * PowerBI Dataset: Name of the PowerBI dataset
  * Power Query

## Field

Dataset field or measure.

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. Default value `false`.
* **Multivalued**: Not supported. Default value `false`.
* **Primary Key**: Not supported. Default value `false`.
* **Technical Data**: 
  * Technical Name
  * Native type
  * DAX Measure

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Power BI SaaS Dataset.

* **Name**: `import dataset_name`

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
    <td>Visualization</td>
    <td>code/group id.report.id</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**group id**: Power BI SaaS Group technical identifier</li>
        <li>**id**: Power BI object technical identifier</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/group id.dataset.id</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**group id**: Power BI SaaS Group technical identifier</li>
        <li>**id**: Power BI object technical identifier</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/group id.dataset.id/field name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**group id**: Power BI SaaS Group technical identifier</li>
        <li>**id**: Power BI object technical identifier</li>
        <li>**field name**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Data process</td>
    <td>code/data process name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**data process name**</li>
      </ul>
    </td>
  </tr>
</table>
 
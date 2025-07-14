---
title: Power BI Online (V2)
---

# Adding a Power BI Online (V2) Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with PowerBI Online.
* Zeenea's scanner traffic flows towards Power BI's instance and Azure must be open. Refer to the following:

  * https://login.microsoftonline.com
  * https://api.powerbi.com

:::note 
The Power BI Online (V2) connector configuration file can be downloaded here: [powerbi-v2.conf](https://github.com/zeenea/connector-conf-templates/blob/main/templates/powerbi-v2.conf))
:::

## Supported Versions

The Power BI Online (V2) connector is compatible with the product online version. 

## Installing the Plugin

The Power BI Online (V2) plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md)

:::caution[ATTENTION]
Migrating from PowerBI (V1) connector to PowerBI (V2) connector requires specific operations. Please contact customer service to assist you in this migration.
:::

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

Read more: [Managing Connections](./zeenea-managing-connections.md)

In order to establish a connection with a PowerBI Online instance, specifying the following parameters in the dedicated file is required:

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
    <td>Client secret</td>
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
    <td>`cache.enabled`</td>
    <td>Enable cache usage (default value is `false`)</td>
  </tr>
  <tr>
    <td>`cache.path`</td>
    <td>(Optional) To customize the cache disk storage path. Default value is the scanner cache folder.</td>
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
    <td>`contact.role_filter`</td>
    <td>
      <p>Enables you to extract only the contacts that do have a role matching the filter. To achieve this, use the `role` key to filter the contacts. Example:</p>
      <p>`contact.role_filter = "role in ('Owner', 'Read')"`</p>
    </td>
  </tr>
    <tr>
    <td>`filters`</td>
    <td>
      <p>Universal filters. Refer to [Universal Filters](#universal-filters) below.</p>
    </td>
  </tr>
</table>

## User Permissions

In order to collect metadata, the running user's permissions must allow them to access and read reports that need cataloging.
A Service Principal account is needed to authenticate to MS Azure via a registered application using OAuth 2.0, an application ID, and a secret key.

To create a service principal in Azure, you will first need to register an application in Azure Active Directory (Azure AD). This application registration will automatically create a corresponding service principal, which represents the application's identity in your Microsoft Entra tenant. You'll need to note the Application (client) ID and the Client Secret from the app registration, which will be needed for the Zeenea Scanner configuration. Finally, you'll need to grant the service principal the necessary roles and permissions to access the resources it needs.

Access to the PowerBI Admin API must be enabled for service principals using the Microsoft Fabric Admin Portal or Power BI Admin Portal and linked to a security group created using the Microsoft Entra Admin Center

To configure Admin API settings in Azure, you typically need to enable service principal authentication for admin APIs within the Admin portal, especially when using features like Microsoft Fabric. This involves signing into the Microsoft Fabric Admin Portal, navigating to tenant settings, and enabling the switch for service principal access to read-only admin APIs. You also need to assign a specific security group created during application creation to the Admin API settings.

### Detailed PowerBI setup 

#### Microsoft Azure Portal : https://portal.azure.com/

1. **Register an Application in Azure Entra ID (fka Active Directory)**:
   * Log in to the Azure portal.
   * Go to Azure Entra ID.
   * Select **App registrations**.
   * Click **New registration**.
   * Enter a name for your application.
   * Choose the appropriate supported account types.
   * Select the redirect URI.
     * Example: `https://login.microsoftonline.com/20057ce9-1386-4770-8b04-e7824ef632be/oauth2/v2.0/token`
   * Click **Register**. 

2. **Note the Application (client) ID**: 
   * Once the app registration is complete, note the Application (client) ID. You'll need this later to authenticate with the service principal. 

3. **Add a Client Secret**: 
   * You can add a client secret to provide a password-based credential for authentication. 
   * Go to **Certificates & secrets** under the app registration. 
   * Click **New client secret**. 
   * Enter a description and expiry date, then click **Add**.
  
      :::caution[IMPORTANT]
      Copy the value of the client secret immediately after creation, as you won't be able to retrieve it later. 
      :::

4. **Grant Permissions**:
   * Go to the Azure resource you want the service principal to access.
   * Select **Access control (IAM)**.
   * Click **Add role assignment**.
   * Choose the appropriate privileged administrator role (e.g., "Contributor")
   * Add members by selecting the service principal created by the registered application.
   * Click **Save**. 

#### Microsoft Entra Admin Center: https://entra.microsoft.com/

5. Create Security Group using the Microsoft Entra Admin Center:
   * Sign in to the Microsoft Entra admin center. Access the Entra admin center with appropriate permissions (at least a Groups Administrator role).
   * Navigate to Groups: Go to **Identity** > **Groups** > **ALL groups**.
   * Create a new group: Click on **New group**.
   * Provide Group Details:
     * Group type: Select **Security**.
     * Group name: Enter a descriptive name for the group.
     * Description: (Optional) Add a description for the group.
     * Membership type: Choose **Assigned** for manually assigned members or **Dynamic** for automatically managed members based on rules.
   * Choose Create: Select **Create** to finalize the group creation.
   * Add previously created service principal to the security group as a direct member.

#### Microsoft Fabric Admin Portal or PowerBI Admin Portal : https://app.powerbi.com/admin-portal/tenantSettings?experience=power-bi

6. Configure Admin API Settings:
   * Access the Admin Portal: Navigate to the Admin portal within your Azure subscription. 
   * Navigate to Tenant Settings:
     * Within the Admin portal, locate the **Tenant Settings** section. 
   * Locate Developer Settings:
     * Find the **Developer settings** section within the tenant settings. 
   * Enable Service Principal Authentication:
     * Enable the switch that allows service principals to call Fabric public APIs.
   * Locate Admin API Settings:
     * Find the **Admin API settings** section within the tenant settings. 
   * Enable Service Principal Authentication:
     * Enable the switch that allows service principals to access read-only Admin APIs.
     * Enable the switch that allows service principals to access read-only Admin APIs used for updates
     * Enable the switch that allows for enhanced Admin API responses with detailed metadata. 
       * Assign the security group created in the previous step to the Admin API settings enabled.

#### PowerBI Online Application : https://app.powerbi.com

7. Give permission to PowerBI Workspaces:
   * Access PowerBI Online Application
   * Navigate to Workspaces section 
   * Grant "Viewer" permission set to the service principal to every Workspace that needs to be cataloged
     * Do not grant the "Viewer" permission set to security group, otherwise it won't work

## Rich Filters

Filter and extract only the contacts that do have a role matching the filter.

| Criteria | Description |
| :--- | :--- |
| role | The role name to filter. The values list is available [here](https://learn.microsoft.com/fr-fr/rest/api/power-bi/admin/workspace-info-get-scan-result#reportuseraccessright). |

#### Example:

`contact.role_filter = "role in ('Owner', 'Read')"`

Read more: [Filters](zeenea-filters.md)


## Universal Filters

Use universal filter language to filter and root items with the criteria bellow

| Criteria | Description |
| :--- | :--- |
| `workspace_id`        | (UUID) PowerBI Workspace
| `type`                | (String Enum) Object type (dataset/report)
| `id`                  | (UUID) PowerBI Report   
| `dataset_name`        | (String) Name of table in semantic model
| `semantic_model_name` | (String) Semantic Model Name
| `workspace_name`      | (String) Workspace Name
| `name`                | (String) Report Name

#### Example:

```
filters = [
  {
    id = "accept_zeenea_workspace"
    action = ACCEPT
    catalog = "Zeenea Catalog"
    rules {
      workspace_name = "Zeenea"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```

Read more: [Universal Filters](./zeenea-universal-filters.md)

## Data Extraction

To extract information, the connector runs successively the following API requests:

* **GET** ` https://api.powerbi.com/v1.0/myorg/admin/workspaces/modified`: 
  * Response: To get the workspaces list excluding personal workspaces.
* **POST** ` https://api.powerbi.com/v1.0/myorg/admin/workspaces/getInfo`:
  * Parameter: Workspaces list (100 workspaces limit)
  * Response: Scan identifier
* **GET** `https://api.powerbi.com/v1.0/myorg/admin/workspaces/scanStatus/`:
  * Parameter: Scan identifier
  * Response: Scan status: `NOT_STARTED`, `RUNNING`, `SUCCEEDED`
* **GET** `https://api.powerbi.com/v1.0/myorg/admin/workspaces/scanResult/`:
  * Parameter: Scan identifier
  * Response: Object with all the metadata of report from scanned workspaces
* **GET** `https://api.powerbi.com/v1.0/myorg/admin/apps`:
  * Response: Object with all the apps in the organization
* **GET** `https://api.powerbi.com/v1.0/myorg/groups/<workspace_id>/reports/<report_id>/pages`:
  * Parameters: Workspace ID and Report ID
  * Response: Object with all the pages within the specified report from the specified workspace
* **GET** `https://api.powerbi.com/v1.0/myorg/groups/<workspace_id>/reports/<report_id>/export`:
  * Parameters: Workspace ID and Report ID
  * Response: PBIX file of the specified report from the specified workspace

## Collected Metadata

### Inventory

Collects the list of reports accessible by the user.

### Lineage

The Power BI Online (V2) connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Power BI Online (V2) dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in **the configuration file of the source system connection** as configured in the Power BI Online (V2) connection configuration panel. For example, if the Power BI dataset comes from a SQL Server table, then a new alias parameter must be added in the SQL Server connection configuration file.

The following table summarizes the possible values of the `alias` parameter to be completed in the data source configuration file.

| Source System| Model | Example |
| :--- | :--- | :---- |
| [SQL Server](./zeenea-connector-sqlserver.md) | Server name:port/Database name | `alias = ["zeenea.database.windows.net:1433/db"]` * |
| [BigQuery](./zeenea-connector-google-bigquery.md) | BigQuery project identifier	| `alias = ["zeenea-project"]` |
| [AWS Redshift](./zeenea-connector-aws-redshift.md) | Server name:port/Database name | `alias = ["zeenea.cthwlv3ueke2.eu-west-3.redshift.amazonaws.com:5439/database"]` |
| [Snowflake](./zeenea-connector-snowflake.md) | Server name/Database name | `alias = ["kn999999.eu-west-1.snowflakecomputing.com/ZEENEA""]` * |
| [Oracle](./zeenea-connector-oracle.md) | Server name:port/Service Name | `alias = ["oracle.example.com:1521/XE"]` |
| [Denodo](./zeenea-connector-denodo.md) | Server name:ODBC port | `alias = ["denodo.database.com:9996"]` |

:::note
The connector creates a data process object for each dataset from Power BI Online (V2) to represent the link with the source dataset (even if the source dataset is not present in the catalog).
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
  * Created By
  * Creation Date
  * Modified By
  * Modified Date
  * Report's page

### Dataset

A dataset is a table inside a PowerBI semantic model. 

* **Name**
* **Source Description**
* **Technical Data**:
  * PowerBI Dataset: Name of the PowerBI dataset
  * Workspace: Link to PowerBI workspace
  * Semantic Model: Link to PowerBI semantic model
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
  * Type
  * Expression

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Power BI Online Dataset.

* **Name**: `IMPORT dataset_name`

## Object Identification Keys
 
An identification key is associated with each object in the catalog. In the case of the object being created by a connector, the connector builds it.
 
More information about unique identification keys in this documentation: [Identification Keys](./zeenea-identification-keys.md).
  
<table>
  <tr><th>Object</th><th>Identification Key</th><th>Description</th></tr>
  <tr>
    <td>Visualization</td>
    <td>code/workspace_id/report/report_id</td>
    <td>
      <ul>
        <li>**code**: Unique identifier of the connection noted in the configuration file</li>
        <li>**workspace_id**: Power BI Online workspace technical identifier</li>
        <li>**report_id**: Power BI report technical identifier</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Dataset</td>
    <td>code/workspace_id/dataset/dataset_id/dataset_name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**workspace_id**: Power BI Online Group technical identifier</li>
        <li>**dataset_id**: Power BI technical semantic model technical identifier</li>
        <li>**dataset_name**: Power BI table name from semantic model</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Field</td>
    <td>code/workspace_id/report/report_id/dataset/field_name<br />code/workspace_id/dataset/dataset_id/dataset_name/field_name</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**workspace_id**: Power BI Online Group technical identifier</li>
        <li>**dataset_id**: Power BI semantic model technical identifier</li>
        <li>**dataset_name**: Power BI technical table name from semantic model</li>
        <li>**field_name**: PowerBI field technical name</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Data process</td>
    <td>code/workspace_id/report/report_id/dataset/process<br />code/workspace_id/dataset/dataset_id/dataset_name/process</td>
    <td>
      <ul>
        <li>**code**:  Unique identifier of the connection noted in the configuration file</li>
        <li>**workspace_id**: Power BI Online Group technical identifier</li>
        <li>**report_id**: Power BI report technical identifier</li>
        <li>**dataset_id**: Power BI technical semantic model technical identifier</li>
        <li>**dataset_name**: Power BI table name from semantic model</li>
      </ul>
    </td>
  </tr>
</table>
 
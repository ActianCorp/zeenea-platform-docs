# Adding a Microsoft Fabric Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Microsoft Fabric.
* The Fabric connector uses Fabric and Power BI APIs to obtain metadata.<br />The main metadata scan is performed using Power BI APIs, and most of the setup for the Fabric connector is common with the Power BI connector.
* Zeenea's scanner traffic flows towards PowerBI/Fabric's instance and Azure must be open. See following:

   * [https://login.microsoftonline.com](https://login.microsoftonline.com)
   * [https://api.powerbi.com](https://api.powerbi.com)

> **Note:** You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).

## Supported Versions

The Microsoft Fabric connector is compatible with the product online version. 

## Installing the Plugin

You can download the Microsoft Fabric plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

For more information about managing connections, see [Managing Connections](../../features-applications/administration/zeenea-managing-connections.md).

To establish a connection with a Microsoft Fabric instance, fill in the following parameters in the dedicated configuration file:

| Parameter                         | Expected value |
|:----------------------------------|:----------------|
| `name` | Specifies the display name for the connection. |
| `code` | Specifies the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | Specifies the type of connector to be used for the connection. The value must be `ms-fabric` and must not be modified. |
| `enabled` | Specifies whether to enable or disable the connection (`true` or `false`). <br />The default value is `true`. |
| `catalog_code` | Specifies the catalog code associated with the connection (`default` when empty). |
| `secret_manager.enabled` | Specifies whether to enable or disable the secret manager for the connection. <br />This configuration works only with Scanner 73 or later and requires a functional secret manager configured in the scanner configuration file. <br />The default value is `true`. |
| `secret_manager.key` | Specifies the name of the secret. |
| `connection.tenant` | Specifies the tenant's technical identifier. |
| `connection.url` | Specifies the connection address. <br />The default value is `https://api.powerbi.com`. |
| `connection.oauth.client_id` | Specifies the application ID (client) as defined in Azure. |
| `connection.oauth.client_secret` | Specifies the client secret. |
| `connection.tenant_domain` | Specifies the tenant domain. This is used when authenticating with the SQL analytics endpoint. You can enter either the domain name (for example, `mycompany.com`) or the tenant ID. To find the tenant ID, select your user profile and then select the information button next to the Tenant Name field. |
| `report_strategy` | Specifies the strategy to retrieve report metadata. The available strategies are:<br />- `pbir`: Uses the Fabric _Get Report Definition_ API (for PBIR formatted reports).<br />- `pbix`: Uses the Power BI Export API (requires elevated permissions).<br />- `pbir_first`: Uses the Fabric API first. If it fails, it uses the PBIX export. <br />The default value is `pbir_first`.|
| `inventory_on_reports_only` | Specifies whether to inventory only reports. If set to `true`, only reports will be inventoried. However, when a report is imported, all linked datasets will also be imported. This option is useful when working with a large number of items. <br/>The default value is `false`. |
| `dsn.configuration` | Specifies the list of DSNs configured in PowerBI Desktop. Must be provided to extract lineage to external sources from DSNs. See the template to complete the field. |
| `cache.enabled` | Specifies whether to enable cache usage. <br />The default value is `false`. |
| `cache.path` | (Optional) Specifies a custom disk storage path for the cache. <br />The default value is the scanner cache folder. |
| `proxy.scheme` | Specifies the proxy protocol (`http` or `https`). |
| `proxy.hostname` | Specifies the proxy address. |
| `proxy.port` | Specifies the proxy port. |
| `proxy.username` | Specifies the proxy username. |
| `proxy.password` | Specifies the proxy account password. |
| `contact.role_filter` | Specifies a filter to extract only the contacts whose roles match the defined criteria.. To achieve this, use the `role` key to filter the contacts. <br/>For example:  <br/> `contact.role_filter = "role in ('Owner', 'Read')"` |
| `filters` | Specifies universal filters. See [Universal Filters](#universal-filters). |


## User Permissions

To collect metadata, the running user's permissions must allow them to access and read reports that need cataloging.
A Service Principal account is needed to authenticate to MS Azure via a registered application using OAuth 2.0, an application ID, and a secret key.

To create a service principal in Azure, you will first need to register an application in Azure Active Directory (Azure AD). This application registration will automatically create a corresponding service principal, which represents the application's identity in your Microsoft Entra tenant. You'll need to note the Application (client) ID and the Client Secret from the app registration, which will be needed for the Zeenea Scanner configuration. Finally, you'll need to grant the service principal the necessary roles and permissions to access the resources it needs.

Access to the PowerBI Admin API must be enabled for service principals using the Microsoft Fabric Admin Portal or Power BI Admin Portal and linked to a security group created using the Microsoft Entra Admin Center

To configure Admin API settings in Azure, you typically need to enable service principal authentication for admin APIs within the Admin portal, especially when using features like Microsoft Fabric. This involves signing into the Microsoft Fabric Admin Portal, navigating to tenant settings, and enabling the switch for service principal access to read-only admin APIs. You also need to assign a specific security group created during application creation to the Admin API settings.

### Detailed PowerBI/Fabric Setup 

#### Microsoft Azure Portal : [https://portal.azure.com/](https://portal.azure.com/)

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
  > **Important:** Copy the value of the client secret immediately after creation, as you won't be able to retrieve it later. 
4. **Grant Permissions**:
    * Go to the Azure resource you want the service principal to access.
    * Select **Access control (IAM)**.
    * Click **Add role assignment**.
    * Choose the appropriate privileged administrator role (for example, "Contributor").
    * Add members by selecting the service principal created by the registered application.
    * Click **Save**. 

#### Microsoft Entra Admin Center: [https://entra.microsoft.com/](https://entra.microsoft.com/)

**Create Security Group using the Microsoft Entra Admin Center:**

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

#### Microsoft Fabric Admin Portal or PowerBI Admin Portal : [https://app.powerbi.com/admin-portal/tenantSettings?experience=power-bi](https://app.powerbi.com/admin-portal/tenantSettings?experience=power-bi)

**Configure Admin API Settings:**

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

#### PowerBI Online Application : [https://app.powerbi.com](https://app.powerbi.com)

**Give permission to PowerBI Workspaces:**

   * Access PowerBI Online Application.
   * Navigate to **Workspaces** section. 
   * Grant the **Member** permission set to the service principal for every Workspace that you want to catalog.
   > **Note:** Do not grant the **Member** permission set to a security group; otherwise, it will not work correctly.

## Rich Filters

Filter and extract only the contacts that do have a role matching the filter.

| Criteria | Description |
| :--- | :--- |
| `role` | The role name to filter. The values list is available [here](https://learn.microsoft.com/fr-fr/rest/api/power-bi/admin/workspace-info-get-scan-result#reportuseraccessright). |

For example:

`contact.role_filter = "role in ('Owner', 'Read')"`

For more information about filters, see [Filters](../scanners/zeenea-filters.md).


## Universal Filters

Use the universal filter language to filter and root items based on the following criteria:

| Criteria | Description |
| :--- | :--- |
| `workspace_id`        | (UUID) Fabric Workspace |
| `type`                | (String Enum) Object type (dataset/report/warehouse/lakehouse) |
| `id`                  | (UUID) PowerBI Report ID, Lakehouse ID, or Warehouse ID |   
| `dataset_name`        | (String) Name of table in semantic model |
| `semantic_model_name` | (String) Semantic Model Name |
| `workspace_name`      | (String) Workspace Name |
| `name`                | (String) Report Name |
| `lakehouse`           | Lakehouse Name |
| `warehouse`           | Warehouse Name |
| `table_name`          | Lakehouse or Warehouse Table Name |

For example:

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

For more information about universal filters, see [Universal Filters](../scanners/zeenea-universal-filters.md).

## Data Extraction

To extract basic metadata information, the connector runs successively the following API requests:

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
  
To get PowerBI reports, the connector runs these API requests:
  
* **GET** `https://api.powerbi.com/v1.0/myorg/admin/apps`:
  * Response: Object with all the apps in the organization
* **GET** `https://api.powerbi.com/v1.0/myorg/groups/<workspace_id>/reports/<report_id>/pages`:
  * Parameters: Workspace ID and Report ID
  * Response: Object with all the pages within the specified report from the specified workspace
* **GET** `https://api.powerbi.com/v1.0/myorg/groups/<workspace_id>/reports/<report_id>/export`:
  * Parameters: Workspace ID and Report ID
  * Response: PBIX file of the specified report from the specified workspace
  
To get additional Fabric metadata,  the connector runs these API requests:

* **GET** `https://api.fabric.microsoft.com/v1/admin/domains`:
  * Response: Domain metadata
* **GET** `https://api.fabric.microsoft.com/v1/workspaces/<workspace_id>/warehouses/<warehouse_id>`:
  * Parameters: Workspace ID and Warehouse ID
  * Response: Metadata about the warehouse
* **GET** `https://api.fabric.microsoft.com/v1/workspaces/<workspace_id>/lakehouses/<lakehouse_id>`:
  * Parameters: Workspace ID and Lakehouse ID
  * Response: Metadata about the lakehouse
* **GET** `https://api.fabric.microsoft.com/v1/workspaces/<workspace_id>/items/<item_id>`:
  * Parameters: Workspace ID and Item ID
  * Response: Metadata about the specified item
* **GET** `https://api.fabric.microsoft.com/v1/workspaces/<workspace_id>/items/<item_id>/shortcuts`:
  * Parameters: Workspace ID and Item ID
  * Response: Shortcut metadata
* **GET** `https://api.fabric.microsoft.com/v1/workspaces/<workspace_id>/reports/<report_id>/getDefinition`:
  * Parameters: Workspace ID and Report ID
  * Response: Additional metadata about a report in Fabric

## Collected Metadata

### Inventory

The inventory collects the list of reports accessible by the user.

### Lineage

The Microsoft Fabric connector is able to retrieve the lineage for these scenarios:

* Reports → Semantic model (dataset)
* Semantic model → Fabric dataset (for example, warehouse or lakehouse table)
* Shortcut dataset → Fabric dataset (if the shortcut is to a warehouse or lakehouse table)

### Visualization

A visualization object is a Power BI report. 

* **Name**
* **Source Description**
* **Contacts**
* **Technical Data**:
  * Report WebURL: Link to the report.
  * Report Type
  * Workspace Name
  * Application: URL to the PowerBI application which this report is attached.
  * Source Server Name
  * Created By
  * Creation Date
  * Modified By
  * Modified Date
  * Report's page

### Dataset

A dataset is a table inside a Power BI semantic model, a Fabric warehouse table, a Fabric lakehouse table, or a Fabric shortcut.

#### Semantic Model Table

* **Name**
* **Source Description**
* **Technical Data**:
  * PowerBI Dataset: Name of the PowerBI dataset.
  * Workspace: Link to PowerBI workspace.
  * Semantic Model: Link to PowerBI semantic model.
  * Power Query
  
#### Warehouse Table

* **Name**
* **Source Description**
* **Technical Data**:
  * Workspace URL: Link to PowerBI workspace.
  * Workspace: The name of the workspace.
  * Domain: The name of the domain to which the workspace belongs.
  * Domain path: The domain hierarchy if sub-domains are utilized.
  * Warehouse: The name of the warehouse.

#### Lakehouse Table

* **Name**
* **Source Description**
* **Technical Data**:
  * Workspace URL: Link to PowerBI workspace.
  * Workspace: The name of the workspace.
  * Domain: The name of the domain to which the workspace belongs.
  * Domain path: The domain hierarchy if sub-domains are utilized.
  * Lakehouse: The name of the lakehouse.
  * Shortcut type: The type of the target for a shortcut.
  * Shortcut target location: The location of the dataset.
  
### Field

Fields are fields or measures in a semantic model table, or a field in a warehouse or lakehouse table.

#### Semantic Model Table Field

* **Name**
* **Source Description**
* **Type**
* **Can be null**: Not supported. The default value is `false`.
* **Multivalued**: Not supported. The default value is `false`.
* **Primary Key**: Not supported. The default value is `false`.
* **Technical Data**: 
  * Technical Name
  * Native type
  * Type
  * Expression

#### Warehouse Table Field

* **Name**
* **Source Description**
* **Type**
* **Can be null**
* **Multivalued**: Not supported. The default value is `false`.
* **Primary Key**
* **Technical Data**: 
  * Native type
  * Type

#### Lakehouse Table Field

* **Name**
* **Source Description**
* **Type**
* **Can be null**
* **Multivalued**: Not supported. The default value is `false`.
* **Technical Data**: 
  * Native type
  * Type


## Object Identification Keys
 
Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.

For more information about identifier keys, see [Identification Keys](../../features-applications/studio/stewardship/zeenea-identification-keys.md).
  
| Object          | Identification Key                                                                                          | Description |
|-----------------|-------------------------------------------------------------------------------------------------------------|-------------|
| Visualization   | code/workspace\_id/report/report\_id | - **code**: Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **report_id**: Power BI report technical identifier |
| Dataset         | code/workspace\_id/dataset/dataset\_id/dataset\_name | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **dataset_id**: Power BI technical semantic model technical identifier  <br/> - **dataset_name**: Power BI table name from semantic model |
| Dataset Field   | code/workspace\_id/report/report\_id/dataset/field\_name  <br/> code/workspace\_id/dataset/dataset\_id/dataset\_name/field\_name | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **dataset_id**: Power BI semantic model technical identifier  <br/> - **dataset_name**: Power BI technical table name from semantic model  <br/> - **field_name**: PowerBI field technical name |
| Warehouse Table | code/workspace\_id/warehouse/warehouse\_id/table\_name | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **warehouse_id**: Fabric warehouse technical identifier  <br/> - **table_name**: Warehouse table name |
| Warehouse Table Field | code/workspace\_id/warehouse/warehouse\_id/table\_name/field\_name | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **warehouse_id**: Fabric warehouse technical identifier  <br/> - **table_name**: Warehouse table name  <br/> - **field_name**: Warehouse table field technical name |
| Lakehouse Table | code/workspace\_id/lakehouse/lakehouse\_id/table\_name | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **lakehouse_id**: Fabric lakehouse technical identifier  <br/> - **table_name**: Lakehouse table name |
| Lakehouse Table Field | code/workspace\_id/lakehouse/lakehouse\_id/table\_name/field\_name | - **code**:  Unique identifier of the connection noted in the configuration file  <br/> - **workspace_id**: Fabric workspace technical identifier  <br/> - **lakehouse_id**: Fabric lakehouse technical identifier  <br/> - **table_name**: Lakehouse table name  <br/> - **field_name**: Lakehouse table field technical name|

 
# Adding a Salesforce Connection

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Salesforce.
* Actian Data Intelligence traffic flow towards the data source must be open. 

!!! note
    You can find a link to the configuration template in [Connector Downloads](../connectors-list.md).


## Supported Versions

The Salesforce connector is compatible with the software SaaS version. 

## Installing the Plugin

You can download the Salesforce plugin from [Connector Downloads](../connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](../connectors-install-as-plugin.md).

## Declaring the Connection
  
Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../../../features-applications/administration/managing-connections.md).

To establish a connection with a Salesforce instance, fill in the following parameters in the dedicated configuration file:
 
| Parameter | Expected value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Actian Data Intelligence Platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `salesforce` and must not be modified. |
| `connection.auth_type` | Authentication type. Supported values are `password` or `jwt`. |
| `connection.username` | Salesforce account username. |
| `connection.password` | Password authentication **only**.<br>Salesforce account password. |
| `connection.token` | Password authentication **only**.<br>Salesforce account security token created for the user. |
| `connection.endpoint` | Salesforce SOAP API endpoint instance URL.<br>For example:<br>- `https://login.salesforce.com/services/Soap/u/64.0` for a production environment.<br>- `https://test.salesforce.com/services/Soap/u/64.0` for a sandbox environment.<br>- `https://<your-domain>.my.salesforce.com/services/Soap/u/64.0` if your organization enforces My Domain login. |
| `connection.jwt.client_id` | JWT authentication **only**.<br>Consumer key of your external application in Salesforce. |
| `connection.jwt.private_key_path` | JWT authentication **only**.<br>Path to the private key associated with your external application. |
| `connection.jwt.private_key_passphrase` | JWT authentication **only**.<br>**Optional**. Passphrase for the private key, if it is encrypted. |
| `inventory.additional_objects` | List of items to explicitly include in the inventory (for example: `Account,ServiceContract,ContractLineItem`). |
| `inventory.managed_prefixes` | Item prefix to explicitly include items in the inventory (for example: `prefix1_,prefix2_`). |
| `inventory.audit_fields` | Include Salesforce audit fields (CreatedById, CreatedDate, LastModifiedById, LastModifiedDate). The default value is `false`. |
| `inventory.system_fields` | Include Salesforce system fields (ConnectionReceivedId, ConnectionSentId, IsDeleted, LastReferencedDate, LastViewedDate, MasterRecordId, SystemModstamp). The default value is `false`. |
| `inventory.custom_fields` | Include custom fields. The default value is `true`. |
| `inventory.custom_objects` | Include object ending with `__c`. The default value is `true`. |

## User Permissions

To collect metadata, the running user's permissions must allow them to access and read datasets that need cataloging. 

The user must have read access to Salesforce assets that need cataloging.

## Data Extraction

To extract information, the connector runs the following SOAP requests on the following actions:

* `SOAPAction : login`: To get authenticate for the following queries.
* `SOAPAction : describeGlobal`: To inventory all available items.
* `SOAPAction : describeSObjects`: To get metadata from asset.

## Collected Metadata

### Inventory

Will collect the list of datasets accessible by the user.  

### Dataset

* **Name**
* **Source Description**
* **Primary keys**
* **Foreign keys**
* **Technical Data**:

    * Key Prefix

### Field

Dataset field. 

* **Name**
* **Source Description**
* **Type**
* **Native Type**
* **Native Index**
* **Can be null** 
* **Multivalued**
* **Primary Key**
* **Technical Data**:

    * References
    * Formula
 
## Unique Identifier Keys

Each object in the catalog is associated with a unique identifier key. When the object is imported from an external system, the key is generated and provided by the connector.
 
For more information about identifier keys, see [Identification Keys](../../../features-applications/studio/stewardship/identification-keys.md).

| Object | Identifier Key | Description |
| :--- | :--- | :--- |
| Dataset | `code/dataset name` | - **code**: Unique identifier of the connection noted in the configuration file<br />- **dataset name** |
| Field | `code/dataset name/field name` | - **code**: Unique identifier of the connection noted in the configuration file<br />- **dataset name**<br />- **field name** |

# Adding a Salesforce Connection

!!! warning
    Salesforce will deprecate SOAP username/password authentication in summer 2027. After this date, `password` authentication will no longer work. 
    
    **Required action:** Switch to JWT authentication before the deprecation date.

    1. Update the plugin to version 1.1.0 or later.
    2. Set up an External App and a private key. For more information, see [Setting Up JWT Authentication](#setting-up-jwt-authentication).
    3. Set `connection.auth_type` to `jwt` and add the `connection.jwt.*` parameters.
    4. Remove `connection.password` and `connection.token`.

## Prerequisites

* A user with sufficient [permissions](#user-permissions) is required to establish a connection with Salesforce.
* Actian Data Intelligence traffic flow towards the data source must be open. 
* To use the recommended JWT authentication, configure a Salesforce External App for the OAuth 2.0 JWT Bearer Flow. For more information, see [Setting Up JWT Authentication](#setting-up-jwt-authentication).

!!! note
    You can find a link to the configuration template in [Connector Downloads](../connectors-list.md).


## Supported Versions

The Salesforce connector is compatible with the software SaaS version. 

## Installing the Plugin

You can download the Salesforce plugin from [Connector Downloads](../connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](../connectors-install-as-plugin.md).

## Authentication Methods

The connector supports two authentication methods, selected with `connection.auth_type`:

* `password` (default): Uses a username, password, and security token. Salesforce is deprecating this method.
* `jwt` (recommended): Uses the OAuth 2.0 JWT Bearer Flow.

## Setting Up JWT Authentication

1. Generate an RSA private key (PEM, PKCS#8 or PKCS#1, encrypted or unencrypted) and a matching certificate.
2. In Salesforce, create an External App with OAuth enabled and upload the certificate.
3. Pre-authorize the integration user for the External App.
4. Set the Consumer Key in `connection.jwt.client_id`.
5. Store the private key on the scanner host and set `connection.jwt.private_key_path`. If the key is encrypted, set `connection.jwt.private_key_passphrase`.

!!! important
    Restrict access to the private key file. Renew the certificate and private key before the certificate expires.

## Declaring the Connection
  
Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

For more information about managing connections, see [Managing Connections](../../../features-applications/administration/managing-connections.md).

To establish a connection with a Salesforce instance, fill in the following parameters in the dedicated configuration file:
 
| Parameter | Expected value |
| :--- | :--- |
| `name` | The name that will be displayed to catalog users for this connection. |
| `code` | The unique identifier of the connection on the Actian Data Intelligence Platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id` | The type of connector to be used for the connection. The value must be `salesforce` and must not be modified. |
| `connection.endpoint` | Salesforce SOAP API endpoint instance URL (for example, `https://login.salesforce.com/services/Soap/u/63.0`). <br/>With JWT authentication, its host is also used to request the access token. |
| `connection.username` | Salesforce username (for example, `some-username@agentforce.com`). <br/>With JWT authentication, this is the user the connector acts as. |
| `connection.password` | Password for the provided username. <br/>Used only when `connection.auth_type` is `password`. Deprecated. |
| `connection.token` | Security Token created for the user. <br/>Used only when `connection.auth_type` is `password`. Deprecated. |
| `connection.auth_type` | `jwt` or `password`. The default value is `password`. |
| `connection.jwt.client_id` | Consumer Key of the External App. <br/>Required when `connection.auth_type` is `jwt`. |
| `connection.jwt.private_key_path` | Path to the PEM private key matches the certificate uploaded to the External App. <br/>Required when `connection.auth_type` is `jwt`. |
| `connection.jwt.private_key_passphrase` | Passphrase for the private key. <br/>Optional and required only if the key is encrypted. |
| `inventory.additional_objects` | List of items to explicitly include in the inventory (for example, `Account,ServiceContract,ContractLineItem`). |
| `inventory.managed_prefixes` | Item prefix to explicitly include items in the inventory (for example, `prefix1_,prefix2_`). |
| `inventory.audit_fields` | Include Salesforce audit fields (CreatedById, CreatedDate, LastModifiedById, LastModifiedDate). The default value is `false`. |
| `inventory.system_fields` | Include Salesforce system fields (ConnectionReceivedId, ConnectionSentId, IsDeleted, LastReferencedDate, LastViewedDate, MasterRecordId, SystemModstamp). The default value is `false`. |
| `inventory.custom_fields` | Include custom fields. The default value is `true`. |
| `inventory.custom_objects` | Include objects ending with `__c`. The default value is `true`. |

## User Permissions

To collect metadata, the running user's permissions must allow them to access and read datasets that need cataloging. 

The user must have read access to Salesforce assets that need cataloging.

With JWT authentication, the user must also be authorized to use the External App.

## Data Extraction

To extract information, the connector runs the following SOAP requests on the following actions:

* `POST /services/oauth2/token`: To authenticate with JWT. The connector automatically renews the token during a scan.
* `SOAPAction : login`: To authenticate with `password`.
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

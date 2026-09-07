---
search:
  boost: 2.0
---

# Create and Manage Contracts

## Create Contract

### Create a Contract from Scratch

You can create an empty draft contract and fill in all the details manually.

1. Select **Create Contract**.
   
     The contract creation window opens.

2. Click **Create empty contract**.
     
     The new contract creation window opens.

3. Complete the contract information. For more information about the available sections and fields, see [Configure Contract Information](#configure-contract-information).

### Create a Contract from DDL

Use this method when a SQL schema already exists.

1. Select **Create Contract**.
     
     The contract creation window opens.

2. Click **Continue with DDL import**.
     
     The Import from SQL window opens.

3. Paste or upload the SQL DDL.
4. Review validation messages and resolve blocking errors if any.
5. Click **Import schema** to create the draft contract.
6. Resolve any parsing issue or unsupported syntax.
7. Complete the remaining contract information. For more information about the available sections and fields, see [Configure Contract Information](#configure-contract-information).

!!! note
    DDL import generates the data model but does not populate business metadata such as ownership, descriptions, roles, service-level objectives, or quality rules.

### Import an Existing ODCS YAML Contract

You can import an existing ODCS YAML contract to create a new contract in DCB.

1. Select **Create Contract**.
     
     The contract creation window opens.

2. Click **Continue with YAML import**.
     
     The Import from YAML window opens.
     
3. Upload a YAML file or paste YAML content.
4. Review validation messages.
5. Resolve blocking errors if any.
6. Click **Import schema** to create the contract.
   
DCB preserves the lifecycle status and version declared in the YAML when they are valid and supported.

A contract imported as **Draft** remains editable by its **Contract Owner**. A contract imported as **Active**, **Deprecated**, or **Retired** is read-only and follows the lifecycle rules associated with that status.

If an imported identifier is not a valid UUID, DCB imports the contract with a blocking error and proposes a valid UUID. The Contract Owner must accept the proposed UUID or provide another valid UUID.


### Bulk Import YAML Contracts

You can use this method to import multiple existing ODCS YAML contracts in a single operation.

1. Select **Create Contract**.

     The contract creation window opens.

2. Click **Continue with bulk import**.

     The **Bulk import from YAML** window opens.

3. Drag and drop YAML files into the upload area or click the upload area to browse for files.

4. Review the uploaded files.

     DCB validates each uploaded file and displays the upload status.

5. Click **Review files**.

     The **Review this batch** window opens and displays the contracts detected in the uploaded files.

6. Review the detected contracts.

     The review window displays the following information for each file:

     * File name
     * Contract name
     * Version
     * Status

7. Click **Confirm import**.

     DCB imports all valid contracts and displays the import results.

8. Review the import results.

     The Import results window displays the status of each uploaded file.

     * **Imported**: The contract was successfully created.
     * **Skipped**: The contract was not imported. The reason is displayed in the results table.

9. Select one of the following actions:

      * **Open** to open an imported contract.
      * **Import more** to start another bulk import operation.
      * **Back to contracts** to return to the contract list.


!!! warning "Important"

    Before importing contracts, DCB checks for duplicate contracts within the uploaded batch and for contracts that already exist in DCB. Contracts that fail either check are skipped. The review and import results steps display each skipped contract and the reason it was skipped.

## Configure Contract Information

You can use the following contract form sections to define contract information.

### Fundamentals

The Fundamentals section contains the core metadata used to identify and classify the contract.

Provide the following information:

* **Contract name:** A unique name used to identify the contract.
* **Domain:** The business domain or area associated with the contract.
* **ID:** A unique identifier assigned to the contract. The ID is automatically generated when the contract is created and cannot be modified.
* **Tenant:** The property with which the data is primarily associated.
* **Version:** The version of the contract. The version is automatically generated when the contract is created and is updated through contract versioning actions.
* **Business purpose:** A description of the business purpose and scope of the contract.
* **Tags:** Tags used to classify and organize the contract.
* **Additional context:** Use the Additional context section to provide supporting information about how the data should be used and governed. For each contract, you can specify:
     
     * **Usage:** Describe the expected usage patterns or supported use cases.
     * **Limitations:** Describe any known constraints or restrictions associated with the contract, such as data quality, compliance, retention, or latency considerations.
     * **Authoritative definition:** Links to privacy statements, terms and conditions, license agreements, or other sources that provide additional information about the contract.
     * **Custom properties:** Custom properties that are not covered by the standard.

* **Authoritative definition:** Links to privacy statements, terms and conditions, license agreements, or other sources that provide additional information about the contract.
* **Custom properties:** Top-level custom key-value pairs for organization-specific metadata.

### Schema

Use the **Schema** section to define the tables and fields included in the contract.

#### Tables

To add a table:

1. Select **Add table**.
2. Enter a table name.
3. Select **Create table**.
4. Optionally, provide a description of the table.

**Table properties**

You can select the **Properties** button for a table to define additional metadata.

Provide the following information:

* **Business name:** A business-friendly name for the table.
* **Data granularity:** Describe the grain of one row in the table.
* **Tags:** Specify tags that can be used to classify and organize the table.
* **Quality rules:** Define data quality expectations that apply to the table as a whole. You can add up to three quality rules and specify a rule name, rule type, data quality dimension, and description. Supported rule types include:

     * **Text:** Define the quality expectation in natural language.
     * **SQL:** Define the quality expectation using a SQL expression.

    !!! note
        Table-level quality rules apply to the dataset as a whole rather than to individual fields.

* **Authoritative definition:** Add relevant Data Intelligence Platform catalog assets or supporting documentation with the table.

Click **Save** to apply the changes.

**Table relationships:** 

You can define relationships between tables at the table level. Table relationships support composite foreign keys and many-to-many associations. For each relationship, specify:

* **Linked table:** The table associated with the relationship.
* **Relationship type:** The type of relationship to create. Supported values include:

     * **Composite foreign key:** Defines a foreign key relationship using two or more source columns and matching referenced columns.
     
    !!! note
         Composite foreign key relationships require at least two source columns and matching referenced columns with the same count and order.
     
     * **Many-to-many:** Defines a junction or bridge table relationship between tables.
 
          * **Join columns:** The columns used to establish the relationship between the tables.

**Delete Table**

To delete a table, click the **Delete** button next to the table.

#### Fields

Fields represent the columns within a table.

To add a field:

1. Open the table where you want to create the field.
2. Select **Add field**.
3. Enter a field name.
4. Select **Create field**.

When a field is created, it includes the following attributes:

* **Field:** The name of the field.
* **Type:** The logical data type of the field. Supported field types include:
   
     * **Text:** Text values such as names, email addresses, or descriptions.
     * **Date:** Date values.
     * **Date & time:** Timestamp values containing both date and time.
     * **Time:** Time-only values.
     * **Decimal:** Decimal numbers.
     * **Whole number:** Integer values.
     * **Record:** Nested structured data.
     * **List:** Multiple values.
     * **Yes / No:** Boolean values.

* **DB type:** The database-specific type of the field. Supported types include VARCHAR, TEXT, CHAR, NVARCHAR, CLOB, and LONGTEXT.
* **Rules:** Constraints and classifications applied to the field. Supported rules include:
   
     * **PK:** Identifies the field as a primary key.
     * **REQ:** Indicates that the field is required.
     * **PII:** Indicates that the field contains personally identifiable information.
     * **UQ:** Indicates that values in the field must be unique.
     * **CDE:** Identifies the field as a critical data element.

* **Classification:** Indicates the sensitivity level of the field. Supported values include Public, Restricted, and Confidential.

**Field properties**

You can select the **Properties** button for a field to define additional metadata.

* **Description:** A business description that explains the meaning and purpose of the field.
* **Examples:** Provide one example value per line.
* **Tags:** Specify tags that can be used to classify and organize the field.
* **Logical type options:** Additional configuration options associated with the selected logical data type, when applicable.
* **Encrypted name:** The name of the property in the dataset that holds the encrypted value of the field.
* **Custom properties:** Additional ODCS custom properties for this field.
* **Foreign key:** Use the Foreign key section to define relationships between fields. For each foreign key, specify:

     * **Referenced table:** The table referenced by the foreign key.
     * **Referenced field:** The field referenced by the foreign key.

* **Quality rules:** Define data quality expectations that apply to the field. You can add up to three quality rules and specify a rule name, rule type, data quality dimension, and description. Supported rule types include:

     * **Text:** Define the quality expectation in natural language.
     * **SQL:** Define the quality expectation using a SQL expression.

* **Authoritative definition:** Add relevant Data Intelligence Platform catalog assets or supporting documentation with the field.

Click **Save** to save the field properties.

**Delete Field**

To delete a field, click the **Delete** button next to the field.

### Team

Use the Team section to define the people and metadata associated with the contract team.

Provide the following information:

* **Team name:** The name of the team responsible for the contract.
* **Team identifier:** A unique identifier for the team.
* **Description:** An optional description of the team.
* **Team members:** Add the people responsible for the contract. For each team member, you can specify:

     * **Username:** The member's username or email address.
     * **Role:** The member's job role.
     * **Display name:** The member's full name.
     * **Replaced by:** The username of the member who replaced this person.
     * **Date in:** The date when the member joined the team.
     * **Date out:** The date when the member left the team.
     * **Description:** A description of the member's responsibilities.
     * **Tags:** Tags used to classify and organize the team member.
     * **Authoritative definition:** Authoritative definitions for the team member.
     * **Custom properties:** Custom properties for the team member.

* **Tags:** Use tags to classify and organize the team.
* **Authoritative definition:** Authoritative definitions for the team.
* **Custom properties:** Custom properties for the team.

### Pricing

Use the Pricing section to define subscription pricing information for the contract.

Provide the following information:

* **Price amount:** The amount charged for the contract subscription.
* **Currency:** The currency in which the price is charged.
* **Price unit:** The unit that determines how the subscription price is applied based on data consumption, usage, or time.

### Data Access

Use the Data access section to define data consumer roles and the level of access they require for the contract.

**Data access roles**

To add a data access role:

1. Select **Add access role**.
2. Enter a role name.
3. Select an access level.
   
     * **Read:** Allows consumers to view data.
     * **Write:** Allows consumers to create and update data.
     * **Custom:** Allows you to define a custom access level that does not fit the standard read or write categories.

4. Optionally, provide a description.
5. Repeat the process to add additional roles.

**Access request policy**

Use the **Access Request Policy Code** field to associate the contract with an access request policy.

To configure an access request policy, enter the policy code associated with the access request policy.

The policy code is exported in the generated YAML under the contract's `customProperties` section.

For more information about access request policies, see [Access Request Policies](../cross-application-features/zeenea-access-requests.md).

### Service Levels

Use the Service levels section to define service-level commitments and operational expectations for the contract.

Service levels are exported as ODCS `slaProperties`. Complete service level entries are included in the generated YAML.

To add a service level:

1. Select **Add service level**.
2. Provide the following information:
   
     * **Type:** Select one of the supported service level types.
        
          * Latency
          * Retention
          * Frequency
          * Availability
          * Throughput
          * Error rate
          * General availability
          * End of support
          * End of life
          * Time of availability
          * Time to detect
          * Time to notify
          * Time to repair

     * **Value:** The target value or threshold for the service-level commitment.
     * **Unit:** The unit associated with the service-level value. The following units are supported:

          * **ms:** Milliseconds
          * **s:** Seconds
          * **min:** Minutes
          * **h:** Hours
          * **d:** Days
          * **w:** Weeks
          * **mo:** Months
          * **y:** Years

     * **Element:** The table or field associated with the service level.
     * **Driver:** The reason for the service-level commitment. Supported values include:

          * Regulatory
          * Analytics
          * Operational

   * **Description:** Additional information about the service level.

You can add multiple service levels to document different service-level commitments.

### Server Information

Server information describes the technical connection details for the data source associated with a contract, such as the database host, schema, and platform type. This information helps consumers and downstream tools locate and connect to the underlying data.

DCB does not currently provide a form for defining server information. To add server information to a contract, you must edit the downloaded YAML file directly.

To add server information:

1. Download the contract YAML file. For more information, see [Download a Contract](data-intelligence-data-contract-builder-copy-download-yaml.md#download-a-contract).
2. Open the YAML file in a text editor.
3. Add a `servers` section at the top level of the YAML document, following the ODCS v3.1.0 structure. 

    The following example shows a Snowflake server definition:

    ```
    yaml
    servers:
      - server: production
        type: snowflake
        account: <account_identifier>
        database: <database_name>
        schema: <schema_name>
        role: <role_name>
        warehouse: <warehouse_name>
    ```

4. Save the updated YAML file.

!!! note
    If you re-import the updated YAML into Data Contract Builder, the `servers` section is preserved as a read-only entry in the YAML watchlist and is retained in subsequent YAML exports. For more information, see [YAML Watchlist](data-intelligence-data-contract-builder-yaml-watchlist.md).

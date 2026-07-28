# Create and Manage Contracts

## Create a Contract

### Create a Contract from Scratch

You can create an empty draft contract and fill everything manually.

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
6. Click **Import schema** to create the Draft.
7. Resolve any parsing issue or unsupported syntax.
8. Complete the remaining contract information. For more information about the available sections and fields, see [Configure Contract Information](#configure-contract-information).

!!! note
    DDL import generates the data model but does not populate business metadata such as ownership, descriptions, roles, service-level objectives, or quality rules.

### Import an Existing ODCS YAML Contract

You can import an existing ODCS YAML contract to create a new contract in Data Contract Builder.

1. Select **Create Contract**.
   The contract creation window opens.
2. Click **Continue with YAML import**.
   The Import from YAML window opens.
3. Upload a YAML file or paste YAML content.
4. Review validation messages.
5. Resolve blocking errors if any.
6. Click **Import schema** to create the contract.
   
DCB preserves the lifecycle status and version declared in the YAML when they are valid and supported.

A contract imported as Draft remains editable by its Owner. A contract imported as Active, Deprecated or Retired is read-only and follows the lifecycle rules associated with that status.

If an imported identifier is not a valid UUID, Data Contract Builder imports the contract with a blocking error and proposes a valid UUID. The Contract Owner must accept the proposed UUID or provide another valid UUID.

## Configure Contract Information

You can use the following contract form sections to define contract information.

### Fundamentals

The Fundamentals section contains the core metadata used to identify and classify the contract.

Provide the following information:

* **Contract name:** A unique name used to identify the contract.
* **Domain:** The business domain or area associated with the contract. 
* **ID:** A unique identifier assigned to the contract. The ID is automatically generated when the contract is created and cannot be modified.
* **Version:** The version of the contract. The version is automatically generated when the contract is created and is updated through contract versioning actions.
* **Business purpose:** A description of the business purpose and scope of the contract.
* **Tags:** Tags used to classify and organize the contract. 

**Additional context**

Use the Additional context section to provide supporting information about how the data should be used and governed.
For each contract, you can specify:

* **Usage:** Describe the intended usage patterns or supported use cases.
* **Limitations:** Describe any known constraints or restrictions associated with the contract, such as data retention requirements, latency constraints, compliance restrictions, or data quality considerations.

**Reference links**

Use Reference links to provide links to documents associated with the contract.

To add a reference link:

1. Select **Add reference link**.
2. Provide the following information:
   
     * **URL:** The URL of the reference document.
     * **Type:** The type of reference document. Supported values include Privacy statement, Terms and conditions, and License agreement.
     * **Description:** An optional description explaining the purpose of the reference link.

### Schema

Use the Schema section to define the tables and fields included in the contract.

**Tables**

To add a table:

1. Select **Add table**.
2. Enter a table name.
3. Select **Create table**.
4. Optionally, provide a description of the table.

**Table properties**

You can select the Properties button for a table to define additional metadata.

* **Business name:** Provide a business-friendly name for the table.
* **Tags:** Specify tags that can be used to classify and organize the table.
* **Quality rules:** Use the Quality rules section to define expectations that apply to the table as a whole. To add a quality rule:

     1. Select **Add quality rule**.
     2. Enter a rule name.
     3. Provide a description of the quality expectation.

!!! note
    Table-level quality rules apply to the dataset as a whole rather than to individual fields. The current release supports text-based quality rules only.

* **Reference links:** Use Reference links to associate the table with related catalog assets or supporting documentation. To add a reference link:

     1. Select **Add reference link**.
     2. Select a catalog asset.
     3. Review the generated URL and link type.
     4. Optionally, provide a description.

**Delete Table**

To delete a table, click **Delete** button next to the table.

**Fields**

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

* **DB type:** The database-specific type of the field.  Supported types include VARCHAR, BOOLEAN, BIT, and TINYINT(1).
* **Rules:** Constraints and classifications applied to the field. Supported rules include:
   
     * **PK:** Identifies the field as a primary key.
     * **REQ:** Indicates that the field is required.
     * **PII:** Indicates that the field contains personally identifiable information.
     * **UQ:** Indicates that values in the field must be unique.
     * **CDE:** Identifies the field as a critical data element.

* **Classification:** Indicates the sensitivity level of the field. Supported values include: Public, Restricted, and Confidential.

**Field properties**

You can select the Properties button for a field to define additional metadata.

* **Description:** Provide a business description that explains the meaning and purpose of the field.
* **Examples:** Provide one example value per line.
* **Tags:** Specify tags that can be used to classify and organize the field.
* **Foreign key:** Use the Foreign key section to define relationships between fields. For each foreign key, specify:

     * **Referenced table:** The table referenced by the foreign key.
     * **Referenced field:** The field referenced by the foreign key.

* **Quality rules:** Use the Quality rules section to document data quality expectations for the field. You can define Up to 3 rules in text format only. To add a quality rule:

     1. Select **Add quality rule**.
     2. Enter a rule name.
     3. Provide a rule description of the quality expectation.

* **Reference links:** Use Reference links to associate relevant zeenea catalog assets or supporting documentation with the field.To add a reference link:

     1. Select **Add reference link**.
     2. Select a catalog asset.
     3. Review the generated URL and link type.
     4. Optionally, provide a description.

Click **Save** to save the field properties.

**Delete Field**

To delete a field, click **Delete** button next to the field.

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

The policy code is exported in the generated YAML under the contract's `customProperties`.

### Service Levels

Use the Service levels section to define service-level commitments and operational expectations for the contract.

Service levels are exported as ODCS slaProperties. Complete service level entries are included in the generated YAML.

To add a service level:

1. Select **Add service level**.
2. Provide the following information.
   
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

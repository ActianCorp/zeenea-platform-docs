# Validate and Activate a Contract

## Validate a Contract

DCB automatically validates the contract as you make changes. Validation ensures that the contract contains the required information and can be activated successfully.

Validation errors are categorized as follows:

* **Blocking errors:** Issues that must be resolved before the contract can be activated.
* **Warnings:** Issues that do not prevent activation but should be reviewed.
* **Informational messages:** Guidance and recommendations that do not require corrective action.

When a validation error is displayed:

1. Open the section identified by the validation message.
2. Locate the highlighted field, table, or object.
3. Correct the value or complete the missing information.
4. Review the updated validation results.

!!! note
    Validation runs automatically when relevant contract information changes. No manual validation action is required.

## Activate a Contract

Only Contract Owners can activate a Draft contract.

Activation publishes the contract as the approved version and changes its status to **Active**.

To activate a contract:

1. Open the **Draft** contract.
2. Select **Activate** in the page header.
3. In the **Activate new version** dialog, enter a publication summary describing the changes included in the version.
4. Select the type of version change:

     * **Update (minor version)**: Use a minor version for backward-compatible changes that do not affect existing consumers. Examples include adding new fields, updating descriptions, or adding non-breaking metadata.

    !!! note
        Minor versions must not remove or rename existing tables or fields, and must not introduce incompatible data type changes.
   
     * **Breaking (major version)**: Use a major version when the changes affect existing consumers. Examples include removing or renaming tables or fields, or making incompatible schema changes that require consumers to update their integrations.

5. Select **Activate new version**.

The contract version becomes **Active**.

!!! warning "Important"
    Review the contract carefully before activating it. After activation, the version becomes read-only.

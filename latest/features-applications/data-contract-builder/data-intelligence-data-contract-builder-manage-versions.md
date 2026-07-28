# Manage Contract Versions

## Contract Lifecycle

Every contract version progresses through a defined lifecycle that ensures changes are controlled, versioned, and traceable.
A contract version moves through the following lifecycle states:

**Draft → Active → Deprecated → Retired**

### Draft

A draft is a working version used for creating, editing, and reviewing a contract. 

A contract created from scratch or imported from DDL always starts in the Draft state. When an ODCS YAML contract is imported, DCB preserves the contract version and lifecycle status defined in the YAML, when they are valid and supported. 

Draft versions can be modified by Contract Owners. Changes made to a Draft do not affect the current Active version. The user who creates a Draft automatically becomes its initial Owner.

When the draft is complete and valid, the Contract Owner can activate it. If a draft was created by mistake and has not been activated, a Contract Owner can delete it.

### Active

An active contract is the approved and published version that consumers use. Active contracts cannot be edited. To update it, an Owner must create a new draft based on the latest Active version.

When a new version is activated, DCB automatically changes the previously Active version to Deprecated. An owner can also manually deprecate the current active version without activating a replacement.

### Deprecated

A deprecated contract is no longer recommended for new integrations but remains available for existing consumers. Deprecated contracts cannot be edited.

An Owner can manually deprecate the current Active version, even if no replacement version is available. Deprecated versions remain accessible in version history for comparison, auditing, and traceability purposes.

Deprecation provides consumers with advance notice to migrate to a newer active version whenever one is available.

An active contract must be deprecated before it can be retired.

### Retired

Retired is the final end-of-life status for a contract version. Retired contracts are no longer intended for operational use and are retained for traceability and historical reference only. Retired contracts cannot be edited.

Retirement requires an explicit action by an Owner. After a contract is retired, it cannot be returned to Active or Deprecated status. Retired versions remain visible in version history and can still be used for comparison and audit purposes.

!!! warning
    Retirement is a permanent lifecycle action. Before retiring a contract, ensure that downstream consumers have migrated to a newer version or no longer depend on the retired contract.

## Create a New Contract Version

Create a new version when you need to modify an **Active** contract.

To create a new version:

1. Open the **Active** contract.
2. Select **New version** in the page header.
   A new **Draft working copy** is created based on the current Active version.
3. Make the required changes in the **Draft working copy**.
4. When the updates are complete, activate the **Draft** version. For more information, see [Activate a Contract](data-intelligence-data-contract-builder-validate-activate.md#activate-a-contract).

When the new version is activated, the previously Active version is automatically changed to Deprecated.

Deprecated versions remain available for consumers that still depend on them.

After confirming that downstream consumers have migrated to a newer version, you can retire the deprecated version.

!!! warning "Important"
    Retiring a contract version is a permanent lifecycle action. Confirm that no active consumers depend on the version before retiring it.


## Version History

Use the Versions section to review contract history and lifecycle changes.

To view version history, open the contract and select **Versions** in the contract form.

You can view all **Draft**, **Active**, **Deprecated**, and **Retired** versions.

Use version history to:

* Identify the current Active version.
* Review previous Active, Deprecated, and Retired versions.
* Understand when a version was created, activated, deprecated, or retired.
* Compare two contract versions or compare the current Draft version with a previous version, when comparison is available.
* Verify the lifecycle status of each version.
* Maintain an audit trail of contract changes throughout the contract lifecycle.

### Version Actions

Select the **More actions** menu for a version to access available actions.

- **Deprecate** or **Retire** (depending on the version lifecycle status): Change the lifecycle status of the version.
- **View YAML**: Review the YAML representation of the selected version.
- **Compare**: Compare the selected version with another version.

## Deprecate a Contract Version

Deprecation indicates that a contract version should no longer be used for new integrations but remains available for existing consumers. 

To deprecate a version:

1. Open the contract.
2. Select the **Versions** section.
3. Select the **More actions** menu for the Active version.
4. Select **Deprecate**.
5. Confirm the action.

The version status changes to **Deprecated**.

!!! note
    Existing consumers can continue to use a deprecated version. Deprecation only signals that the version should not be adopted for new integrations.

## Retire a Contract Version

Retirement marks the final end-of-life state for a contract version.

Before retiring a contract, ensure that downstream consumers have migrated to another version or no longer depend on the contract.

To retire a version:

1. Open the contract.
2. Select the **Versions** tab.
3. Select the **More actions** menu for a Deprecated version.
4. Select **Retire**.
5. Confirm the action.

The version status changes to **Retired**.

!!! warning "Important"
    A contract must be **Deprecated** before it can be retired. After retirement, the version cannot be reactivated or returned to a previous lifecycle state.


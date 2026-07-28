# Access and Permissions

DCB distinguishes between the following types of roles:

* **Application roles**, which control what users can do within the application.
* **Contract roles**, which describe responsibilities defined inside a contract.

A user can have the **Contract Owner** application role in DCB while also being assigned contract roles such as **data owner**, **producer**, or **contact** within the contract itself.

## Application Roles

### Contract Owner

Contract Owners manage contract content and lifecycle. They can:

* Create contracts
* Edit draft contracts
* Manage datasets, properties, relationships, roles, service levels, and quality rules
* Manage contributors
* Process suggestions
* Review automatically updated validation results and resolve blocking issues
* Activate contracts
* Create versions
* Deprecate and retire contracts

!!! note
    Only Contract Owners can perform lifecycle actions.

### Contributor

Contributors participate in contract reviews. They can:

* Review contract content
* Review generated YAML
* Submit suggestions
* Participate in discussions
* Monitor suggestion status

Contributors cannot modify contract content directly. They can only propose changes through suggestions.

### Viewer

Viewers have read-only access. They can:

* Read contract metadata and data-model information
* Read the YAML representation
* Review active and historical contract versions

All Data Intelligence Platform users have **Viewer** access by default.

## Assign Access

Contract access is granted through explicit assignment. Contract Owners can add or remove **Contributors** for individual contracts, allowing them to review content, participate in discussions, and submit suggestions.

## Permissions by Contract Status

Permissions also depend on the version status:

* A **Draft** can be edited by a **Contract Owner** and reviewed collaboratively.
* An **Active** version is immutable for all roles.
* A **Deprecated** or **Retired** version remains read-only and is retained for historical reference.

To modify an **Active** contract, a **Contract Owner** must create a new **Draft working copy** version. No role can directly edit the Active version.

!!! note
    Authentication and core platform permissions are provided through Data Intelligence Platform. The actions available in DCB depend on both the user's Data Intelligence Platform permissions and their role on the selected contract.

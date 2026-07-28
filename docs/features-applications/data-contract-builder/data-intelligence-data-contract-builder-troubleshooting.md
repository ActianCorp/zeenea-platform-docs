# Troubleshooting

## The contract contains an unsupported logical type

If a contract contains an unsupported logical type, select one of the supported ODCS logical types and preserve the original database-specific value in the database type field.

## A validation message indicates that required information is missing

Open the section identified by the validation message and complete the highlighted field.

## A relationship is invalid or incomplete

Verify that:

* The source dataset and property exist.
* The target dataset and property exist.
* All columns participating in a composite key are represented.

## DDL import fails

Review the DDL and:

* Verify that the SQL syntax is valid.
* Isolate supported CREATE TABLE statements.
* Remove database-specific instructions that are not related to the schema definition.

## The imported contract contains an invalid UUID

Follow the validation message displayed by Data Contract Builder.

## I cannot edit an Active contract

Active contracts are read-only. Create a new major or minor Draft version and make changes in the Draft working copy.

## The Retire action is unavailable

Verify that the contract has already been deprecated. If the contract is Active, deprecate it before attempting to retire it.

## I cannot modify a Retired contract

Retired contracts represent the final lifecycle state and cannot be changed. Review the contract in Version history or create a new contract or version.
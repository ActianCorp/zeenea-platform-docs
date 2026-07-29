# Copy and Download YAML

## Using the YAML View

The YAML view displays the ODCS representation generated from the information entered in the contract form. It is automatically updated as contract information changes.

Use the YAML view to:

* Review the complete contract structure.
* Verify the generated ODCS field names and values.
* Understand how contract information is represented in YAML.
* Copy or download the YAML for use in engineering workflows.

To view the generated YAML, complete the following steps:

1. Open the contract.
2. Select **YAML** in the page header.
3. Review the generated contract definition.

The YAML view displays the contract as a read-only ODCS v3.1.0 document.
To modify a contract, return to Form view and update the appropriate contract section.

## Copy YAML

To copy the generated YAML from DCB:

1. Open the contract in YAML view.
2. Select **Copy YAML**.
3. Paste the copied content into your preferred editor, repository, or workflow.

## Download a Contract

You can download the contract in YAML format. The downloaded YAML can be reviewed, stored in a source control system, or integrated into external engineering workflows.

Before downloading a contract:

* Review the contract information.
* Verify that logical types use supported ODCS values.
* Confirm that imported database types are preserved correctly.
* Review validation results and resolve any blocking errors.
* Verify that the intended contract version is selected.

To download a contract, complete the following steps:

1. Open the contract version that you want to download.
2. Review the contract information.
3. Select **YAML** in the page header.
4. Select **Download YAML**.

!!! warning "Important"
    Only complete and supported contract properties are included in the generated YAML. Unsupported YAML fields that were preserved during import remain available in the **YAML watchlist** and are retained when the contract is exported.


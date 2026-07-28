# YAML Watchlist

Use the YAML watchlist section to review YAML fields that are preserved during import but are not currently editable in DCB.

DCB currently supports a subset of the ODCS v3.1.0 specification. When an imported contract contains unsupported ODCS sections, those sections are preserved during import and displayed as read-only entries in the YAML watchlist. Examples include `customProperties`, `servers`, and other unsupported ODCS attributes.

Use the YAML watchlist to:

- Review fields that are preserved from imported YAML.
- Identify unsupported contract properties.
- Monitor fields that may become editable in future releases.
- Verify that imported YAML information is retained during export.

Unsupported sections displayed in the YAML watchlist cannot be modified in DCB. However, their content is preserved and automatically reattached to the generated YAML when the contract is exported. This ensures that information contained in unsupported ODCS sections is not lost during import and export operations.

If all contract information is supported by DCB, the YAML watchlist is empty.

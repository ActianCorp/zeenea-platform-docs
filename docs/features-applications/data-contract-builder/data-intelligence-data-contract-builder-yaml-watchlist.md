# YAML Watchlist

Use the YAML watchlist section to review YAML fields that are preserved during import but are not currently editable in Data Contract Builder.

The application currently supports a subset of the ODCS v3.1.0. When an imported contract contains ODCS sections that are not currently supported by the application, those sections are preserved during import and displayed as read-only entries in the YAML watchlist. For example, customProperties, servers and so on.

The YAML watchlist helps you:

- Review fields that are preserved from imported YAML.
- Identify unsupported contract properties.
- Monitor fields that may become editable in future releases.
- Verify that imported YAML information is retained during export.

Unsupported sections displayed in the YAML watchlist cannot be modified within Data Contract Builder. However, their content is preserved and automatically reattached to the generated YAML when the contract is exported. This ensures that information contained in unsupported ODCS sections is not lost during import and export operations.

If all contract information is supported by the application, the YAML watchlist is empty.

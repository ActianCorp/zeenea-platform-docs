---
search:
  boost: 0.6
---

# Snowflake Release Notes

The latest version of the **JDBC** connector plugin is available for download from the [Connector Downloads](../connectors-list.md) page.

## September 10, 2026 — Version 1.5.4

**Fixed Issues**

Fixed an issue where Snowflake extraction could fail when reading copy history.

## September 4, 2026 — Version 1.5.3

**Fixed Issues**

Fixed an issue where filters combining `and` and `or` operators could be evaluated incorrectly because of incorrect operator precedence.

## August 17, 2026 — Version 1.5.2

**Enhancements**

Snowflake metadata is now retrieved in bulk mode using a single query per catalog, reducing extraction time and Snowflake costs. This applies to table and field metadata and history-based lineage.

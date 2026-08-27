---
search:
  boost: 0.6
---

# Snowflake Release Notes

The latest version of the **JDBC** connector plugin is available for download from the [Connector Downloads](../zeenea-connectors-list.md) page.

## August 17, 2026 — Version `1.5.2`

**Enhancements**

Snowflake metadata is now retrieved in bulk mode using a single query per catalog, reducing extraction time and Snowflake costs. This applies to table and field metadata and history-based lineage.

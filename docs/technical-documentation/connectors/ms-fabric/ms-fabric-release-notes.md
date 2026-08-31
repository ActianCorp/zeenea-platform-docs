---
search:
  boost: 0.6
---

# Microsoft Fabric Release Notes

The latest version of the **MS Fabric** connector plugin is available for download from the [Connector Downloads](../zeenea-connectors-list.md) page.

## August 25, 2026 — Version 2.3.0

**Enhancements**

* Removed the `report_strategy` connection parameter. The connector now always reads reports in PBIX format first and falls back to PBIR format if the PBIX format fails. If the parameter is still present in a connection configuration file, the connector ignores it and uses this strategy. We recommend removing the parameter from existing configurations
* Upgraded third-party dependencies to address security vulnerabilities.

## August 11, 2026 — Version 2.2.0

**Enhancements**

The report definition is now read from report pages in addition to `report.json` for reports in PBIR format.

**Fixed Issues**

Fixed an issue where Power Query parameter resolution could corrupt expressions, causing lineage to fail for affected queries.

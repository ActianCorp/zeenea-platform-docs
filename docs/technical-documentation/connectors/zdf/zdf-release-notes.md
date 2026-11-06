---
search:
  boost: 0.6
---

# Actian Data Intelligence Descriptor Format (ZDF) Release Notes

The latest version of the **ZDF** connector plugin is available for download from the [Connector Downloads](../connectors-list.md) page.

## October 29, 2026 — Version 2.0.2

**Fixed Issues**

Fixed an issue in the `zdf-visualization` connector where child items of a visualization were created in the default catalog instead of the catalog specified by `catalog_code`. This fix does not move items that were already created in the wrong catalog. Remove those items before running the next scan.

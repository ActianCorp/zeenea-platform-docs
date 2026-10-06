---
search:
  boost: 0.6
---

# Atlas Release Notes

The latest version of the **Hadoop** connector plugin is available for download from the [Connector Downloads](../connectors-list.md) page.

## September 30, 2026 — Version 4.5.4

**Enhancements**

- Referenced entities are now retrieved in bulk, improving extraction performance. The new `connection.item_reference_bulk_chunk_size` parameter sets the bulk size.
- Upgraded third-party dependencies to address security vulnerabilities.

## September 4, 2026 — Version 4.5.3

**Fixed Issues**

Fixed an issue where the configured timeout was not applied to Atlas HTTP requests.

## September 3, 2026 — Version 4.5.2

**Enhancements**

Upgraded third-party dependencies to address security vulnerabilities.

**Fixed Issues**

Fixed an issue where the Atlas connection could fail when connection parameters were provided through a secret manager.

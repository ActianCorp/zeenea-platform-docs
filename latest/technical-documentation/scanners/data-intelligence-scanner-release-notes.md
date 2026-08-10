---
search:
  boost: 0.6
---

# Scanner Release Notes 

The latest scanner version is available for download from the platform administration.

## August 07, 2026 — Version 101

**Enhancements**

* Item references with an implicit default catalog or schema are now resolved, improving lineage for sources such as SSIS.

* The scanner now stops at startup when the provided API key does not have the **SCANNER** permission. Verify API key permissions before upgrading.

* Improved error messages for invalid scanner and connection configuration files. They now identify the file and line containing the error and provide hints for common mistakes.

**Fixed Issues**

Fixed an issue where data sampling could stop after some time, preventing samples from being refreshed until the scanner was restarted.


## July 30, 2026 — Version 100

**Enhancements**

Added support for data profiling on connectors based on the public SDK, where profiling is implemented.

## July 3, 2026 — Version 99

**Enhancements**

* Added an explicit error message when connection configuration validation fails for connectors based on the public SDK.

* Improved the log message displayed when a connector plugin fails to load because of a public SDK version mismatch. The message now indicates the required scanner upgrade.

* Upgraded third-party dependencies to address security vulnerabilities.

## June 4, 2026 — Version 98

**Fixed Issues**

Fixed a dependency loading issue that could prevent connectors containing both V1 and V2 implementations in a single plugin from starting.

## May 28, 2026 — Version 97

**Enhancements**

By default, data sampling now targets only datasets without a sample and datasets whose structure has changed. When a dataset structure changes, the existing sample remains available but is marked as outdated and is replaced during the next sampling run.

## May 7, 2026 — Version 96

**Fixed Issues**

* Very long SQL queries are no longer truncated during inventory, preventing incomplete queries and lineage on large views.

* Fixed an import failure that could occur for items with very large schemas.

* Lineage is now resolved for Power Queries that reference ODBC sources in Power BI and Fabric connectors based on the public SDK. The **Power Query** dataset property has been removed, and its content is now processed internally for lineage resolution.

## April 10, 2026 — Version 95

**Fixed Issues**

* Fixed an issue where some connectors (such as Power BI) could incorrectly apply universal filter pre-filtering on the data source side, resulting in incomplete or unfiltered inventories.

* Outdated data samples are now deleted when an item is no longer sampled, for example after a change to universal filters.
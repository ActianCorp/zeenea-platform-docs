---
search:
  boost: 0.6
---

# Denodo Release Notes

The latest version of the **Denodo** connector plugin is available for download from the [Connector Downloads](../zeenea-connectors-list.md) page.

## June 30, 2026 — Version 1.3.7

**Enhancements**

Added the `vdp_server.default.uri` and `vdp_server.default.server_id` connection properties to specify the default VDP server used by the connector for Denodo Data Catalog API requests. Previously, the connector always used the VDP server with ID `1`, which could cause failures when that server was not authorized.

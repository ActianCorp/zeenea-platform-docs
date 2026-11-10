---
search:
  boost: 0.6
---

# Salesforce Release Notes

The latest version of the **Salesforce** connector plugin is available for download from the [Connector Downloads](../connectors-list.md) page.

## November 04, 2026 — Version 1.1.0

**Enhancements**

* Added support for OAuth 2.0 JWT Bearer Flow authentication. As Salesforce is deprecating SOAP username/password authentication, we recommend switching to this method. For setup instructions and related parameters, see [Authentication Methods](./salesforce2.md#authentication-methods).
* Improved authentication error reporting. Failed authentication now stops the scan with an explicit error instead of returning an empty result.
* Upgraded third-party dependencies to address security vulnerabilities.

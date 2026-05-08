# Remote Authentication Setup

To set up authentication for integrating with your Actian Data Intelligence Platform instance using the Model Context Protocol (MCP), follow these steps: 

## Prerequisites

Node.js needs to be installed on your system. 

If your organization uses identity federation (for example, SSO with providers like Azure AD or LDAP), ensure that the admin account is properly synced for access.

## Step 1: Generate an API Key

To generate an API key in Zeenea Administration, follow these steps:

1. Open Zeenea Administration.
2. Go to the **API keys** section. 
3. Click the **Create API key** button.<br />A **Create API key** window opens. 
4. Fill in the required fields and click **Create API key** button. 
5. Once the API key is generated, copy and store it in a secure location, such as a secrets manager or encrypted file. 
   > **Important:** The secret is displayed only once and cannot be retrieved later.


After acquiring the API key, you can either continue with the configuration steps in this document or refer to the instructions in [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) for testing and debugging MCP servers. 

## Step 2: Configure the MCP Client

Update your MCP server configuration file with an entry that uses the generated API secret for authentication. 

The following is a generic JSON example:

```json
{
  "zeenea-remote": {
    "command": "npx",
    "args": [
      "mcp-remote",
      "https://<your-tenant>.zeenea.app/api/mcp-server/mcp",
      "--header",
      "X-API-SECRET:${API_SECRET}"
    ],
    "env": {
      "API_SECRET": "<Paste your API key here>"
    }
  }
}
```

## Step 3: Test and Verify

1. Restart or reload your MCP client or service to apply the new configuration.  
2. Test the connection by querying the MCP endpoint (for example, using a compatible AI application or tool that supports MCP). 
3. Monitor for authentication errors, such as invalid secret responses.  
4. If errors occur, check the logs or the admin console for access details, and verify that the API key has not expired or been revoked.

## Additional Recommendations

* **Security Best Practices**: Treat your API secret like a password. Avoid hardcoding it in version control, and rotate keys periodically. If supported, enable multi-factor authentication (MFA) on your admin accounts.  
* **Permissions and Roles**: Ensure that the API key is associated with roles that allow read and write access to catalog metadata required for MCP operations.  
* **Troubleshooting**: If your setup involves GraphQL APIs (for example, for broader catalog access), the same API secret can be used in headers for endpoints like `<https://<your-tenant>>.zeenea.app/api/catalog/graphql`.  
* For advanced integrations, refer to the product documentation for API rate limits, error handling, and syncing with external identity systems.

This setup enables secure, authenticated access to the Actian Data Intelligence Platform through MCP without exposing sensitive information. If your instance has custom configurations, see the admin console for details.

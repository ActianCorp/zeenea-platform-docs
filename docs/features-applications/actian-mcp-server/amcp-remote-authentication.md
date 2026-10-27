---
search:
  boost: 2.0
---

# Remote Authentication Setup

The Actian Data Intelligence Platform MCP Server supports multiple authentication methods for remote connections. Choose the method that best fits your use case: **OAuth 2.0** for interactive users who authenticate with their existing credentials, or **API Keys** for service-to-service integrations and automation.

These instructions apply to any MCP client, including Claude (Desktop, Claude.ai, Claude Code), Cursor, Windsurf, Microsoft Copilot Studio, and custom integrations. For Claude-specific setup instructions, see [Set up Claude with the Actian Data Intelligence Platform MCP Server](amcp-claude.md).

## Prerequisites

Before setting up authentication, ensure you have:

- An Actian Data Intelligence tenant. If you don't have access, contact Actian Support or your Actian Customer Success team.
- **For API Key auth**: An API key generated in the Administration section.
- **For OAuth**: A user account with access to your Actian Data Intelligence tenant. If your organization uses identity federation (SSO with providers like Azure AD, Okta, or LDAP), ensure your account is properly synced.
- **Node.js LTS** installed (only required when using `mcp-remote` or the MCP Inspector — not needed for clients with native HTTP support such as Claude Code or Cursor).

## Choosing an Authentication Method

| Scenario | Recommended Method |
|---|---|
| Interactive use (Claude Desktop, Claude.ai, Claude Code, Cursor, etc.) | **OAuth 2.0** — no keys to manage, uses existing SSO |
| Automated scripts, CI/CD pipelines | **API Key** — simple, non-interactive |
| Testing and debugging with MCP Inspector | **API Key** — easiest to configure (see [Actian Data Intelligence Platform MCP Server Overview](amcp-overview.md#testing-with-mcp-inspector)) |
| Custom application integration | **API Key** or **Bearer Token** — depending on your auth infrastructure |
| Multiple users in an organization | **OAuth 2.0** — each user authenticates with their own credentials |

## Authentication Methods Overview

| Method | Best For | How It Works |
|---|---|---|
| **OAuth 2.0** (recommended for users) | Interactive use with Claude, Cursor, and other MCP clients | Browser-based login with your existing corporate credentials |
| **API Key** | Automation, scripts, CI/CD, MCP Inspector | Static secret passed in the `x-api-secret` header |
| **Bearer Token (JWT)** | Advanced integrations | JWT passed in the `Authorization: Bearer` header |

---

## Authentication using OAuth 2.0

OAuth 2.0 authentication lets users sign in with their existing corporate credentials (SSO, Azure AD, Okta, etc.) through a browser-based flow. No API keys need to be shared or stored, and each user authenticates with their own account.

The Actian Data Intelligence Platform MCP Server follows the [Model Context Protocol authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization), implementing the **Authorization Code + PKCE** flow with automatic server discovery. This means compatible MCP clients (such as Claude Desktop, Claude.ai, Claude Code, Cursor, and others) can connect without any manual OAuth configuration — the client discovers the authorization server automatically and guides the user through the login flow.

### Configuring OAuth for MCP Clients

For most MCP clients, OAuth requires no configuration beyond the server URL — the client discovers everything automatically.

#### HTTP Transport (most modern clients)

Clients that support HTTP transport with OAuth need only the server URL:

```json
{
  "mcpServers": {
    "actian": {
      "type": "http",
      "url": "https://<your-tenant>.zeenea.app/api/mcp-server/mcp"
    }
  }
}
```

No headers are needed — the client handles the full OAuth flow automatically, opening a browser for authentication on first use.

#### Other MCP Clients

Any MCP client that supports the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization) can connect using OAuth. Point the client at:

```
https://<your-tenant>.zeenea.app/api/mcp-server/mcp
```

The client will discover the authorization server and guide the user through login automatically.

!!! tip "Claude-specific setup"
    For step-by-step Claude setup (Desktop, Claude.ai, Claude Code, Cowork), see [Set up Claude with the Actian Data Intelligence Platform MCP Server](amcp-claude.md).

### How It Works

When an MCP client connects to the Actian Data Intelligence Platform MCP Server without credentials, the following happens automatically:

1. The MCP Server responds with a `401` challenge pointing to its authorization metadata.
2. The client discovers the authorization server through standard OAuth 2.0 discovery endpoints.
3. The client registers itself automatically (no manual setup required).
4. A browser window opens for the user to sign in with their corporate credentials.
5. After successful login, the client receives an access token and uses it for all subsequent MCP requests.

All of this follows industry-standard OAuth 2.0 specifications, including:

- **RFC 9728** — OAuth 2.0 Protected Resource Metadata (server discovery)
- **RFC 8414** — OAuth 2.0 Authorization Server Metadata (endpoint discovery)
- **RFC 7591** — OAuth 2.0 Dynamic Client Registration (automatic client registration)
- **RFC 7636** — PKCE (protects the authorization code from interception)

### Security Notes

- **PKCE is required**: The authorization flow uses PKCE (Proof Key for Code Exchange) to protect against interception.
- **Tokens are short-lived**: Access tokens expire according to your identity provider's configuration.
- **Tenant isolation**: Users are automatically routed to the correct identity connection for your organization.
- **HTTPS only**: All OAuth endpoints require HTTPS.

### Troubleshooting OAuth

| Symptom | Likely Cause | Solution |
|---|---|---|
| Browser opens but login fails | Your account may not be synced with your identity provider | Contact your Actian administrator to verify your account is properly configured |
| "Invalid client" error | Client registration expired | Reconnect — the client will re-register automatically |
| 401 after successful login | Your session may have expired | Reconnect to get a fresh token |
| "Cannot resolve a valid tenant" | Wrong tenant URL | Verify the URL matches your tenant: `https://<your-tenant>.zeenea.app/api/mcp-server/mcp` |

---

## Authentication through API Key

API Keys are the simplest way to authenticate for automated workflows, scripts, and tools that cannot perform a browser-based OAuth flow.

### Step 1: Generate an API Key

To generate an API key in Actian Data Intelligence **Administration**, follow these steps:

1. Open **Administration**.
2. Go to the **API keys** section.
3. Click the **Create API key** button.<br />A **Create API key** window opens.
4. Fill in the required fields and click **Create API key** button.
5. Once the API key is generated, copy and store it in a secure location, such as a secrets manager or encrypted file.

!!! warning "Important"
    The secret is displayed only once and cannot be retrieved later.

### Step 2: Configure the MCP Client

Add the API key to your MCP client configuration using the `x-api-secret` header. The configuration format depends on your client.

#### HTTP Transport with Headers (most modern clients)

Clients that support HTTP transport can pass the API key as a header:

```json
{
  "mcpServers": {
    "actian": {
      "type": "http",
      "url": "https://<your-tenant>.zeenea.app/api/mcp-server/mcp",
      "headers": {
        "x-api-secret": "<your-api-key>"
      }
    }
  }
}
```

#### Using mcp-remote (clients without native HTTP header support)

Some MCP clients do not support custom headers on HTTP connections. Use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a local proxy:

```json
{
  "mcpServers": {
    "actian": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://<your-tenant>.zeenea.app/api/mcp-server/mcp",
        "--header",
        "x-api-secret:${API_SECRET}"
      ],
      "env": {
        "API_SECRET": "<your-api-key>"
      }
    }
  }
}
```

This requires [Node.js LTS](https://nodejs.org/) to be installed.

!!! tip "Claude-specific setup"
    For step-by-step Claude setup with API Key authentication, see [Set up Claude with the Actian Data Intelligence Platform MCP Server](amcp-claude.md).

!!! tip "Testing with MCP Inspector"
    To test your connection with the MCP Inspector, see [Testing with MCP Inspector](amcp-overview.md#testing-with-mcp-inspector) in the Actian Data Intelligence Platform MCP Server Overview.

### Step 3: Test and Verify

1. Restart or reload your MCP client to apply the new configuration.
2. Test the connection by querying the MCP endpoint.
3. Monitor for authentication errors, such as invalid secret responses.
4. If errors occur, check the logs or the admin console for access details, and verify that the API key has not expired or been revoked.

### Additional Recommendations

- **Security Best Practices**: Treat your API key like a password. Avoid hardcoding it in version control, use environment variables or a secrets manager, and rotate keys periodically.
- **Permissions and Roles**: Ensure that the API key is associated with roles that allow read and write access to catalog metadata required for MCP operations.
- **GraphQL Access**: The same API key can be used for GraphQL API access at `https://<your-tenant>.zeenea.app/api/catalog/graphql`.

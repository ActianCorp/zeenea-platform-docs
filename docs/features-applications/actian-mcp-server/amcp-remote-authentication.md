---
search:
  boost: 2.0
---

# Remote Authentication Setup

The Actian Data Intelligence Platform MCP Server supports multiple authentication methods for remote connections. Choose the method that best fits your use case: 

- **OAuth 2.0**: For interactive users who authenticate with their existing credentials.
- **API keys**: For service-to-service integrations and automation.

These instructions apply to any MCP client, including Claude (Desktop, Claude.ai, and Claude Code), Cursor, Windsurf, Microsoft Copilot Studio, and custom integrations. For Claude-specific setup instructions, see [Set up Claude with the Actian Data Intelligence Platform MCP Server](amcp-claude.md).

## Prerequisites

Before setting up authentication, ensure that you have the following:

- An Actian Data Intelligence tenant. If you do not have access, contact Actian Support or your Actian Customer Success team.
- **For API key authentication**: An API key generated in the **Administration** section.
- **For OAuth authentication**: A user account with access to your Actian Data Intelligence tenant. If your organization uses identity federation (SSO with providers such as Azure AD, Okta, or LDAP), ensure that your account is properly synchronized.
- **Node.js LTS** installed. This is required only when using `mcp-remote` or MCP Inspector. It is not required for clients with native HTTP support, such as Claude Code or Cursor.

## Choosing an Authentication Method

| Scenario | Recommended Method |
|---|---|
| Interactive use (Claude Desktop, Claude.ai, Claude Code, Cursor, and similar clients) | **OAuth 2.0** — No keys to manage; uses existing SSO. |
| Automated scripts, CI/CD pipelines | **API keys** — simple, non-interactive. |
| Testing and debugging with MCP Inspector | **API keys** — easiest to configure (see [Testing with MCP Inspector](amcp-overview.md#testing-with-mcp-inspector)). |
| Custom application integration | **API keys** or **Bearer Token** — depending on your authentication infrastructure. |
| Multiple users in an organization | **OAuth 2.0** — each user authenticates with their own credentials. |

## Authentication Methods Overview

| Method | Best For | How It Works |
|---|---|---|
| **OAuth 2.0** (recommended for users) | Interactive use with Claude, Cursor, and other MCP clients | Browser-based login with your existing corporate credentials. |
| **API keys** | Automation, scripts, CI/CD, and MCP Inspector | Static secret passed in the `x-api-secret` header. |
| **Bearer Token (JWT)** | Advanced integrations | JWT passed in the `Authorization: Bearer` header. |

## Authentication Using OAuth 2.0

OAuth 2.0 authentication allows users to sign in with their existing corporate credentials (such as SSO, Azure AD, Okta, and other identity providers) through a browser-based authentication flow. No API keys need to be shared or stored, and each user authenticates with their own account.

The Actian Data Intelligence Platform MCP Server follows the [Model Context Protocol authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization), implementing the **Authorization Code + PKCE** flow with automatic authorization server discovery. As a result, compatible MCP clients (such as Claude Desktop, Claude.ai, Claude Code, Cursor, and others) can connect without any manual OAuth configuration. The client automatically discovers the authorization server and guides the user through the sign-in flow.

### Configuring OAuth for MCP Clients

For most MCP clients, OAuth requires no configuration beyond the server URL. The client discovers everything automatically.

#### HTTP Transport (Most Modern Clients)

Clients that support HTTP transport with OAuth require only the server URL:

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

Any MCP client that supports the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization) can connect using OAuth. Configure the client to connect to:

```
https://<your-tenant>.zeenea.app/api/mcp-server/mcp
```

The client automatically discovers the authorization server and guides the user through the sign-in flow.

!!! tip "Claude-Specific Setup"
    For step-by-step setup instructions for Claude (Desktop, Claude.ai, Claude Code, and Cowork), see [Set up Claude with the Actian Data Intelligence Platform MCP Server](amcp-claude.md).

### How It Works

When an MCP client connects to the Actian Data Intelligence Platform MCP Server without credentials, the following steps occur automatically:

1. The MCP Server responds with a `401` challenge pointing to its authorization metadata.
2. The client discovers the authorization server through standard OAuth 2.0 discovery endpoints.
3. The client registers itself automatically; no manual setup is required.
4. A browser window opens for the user to sign in with their corporate credentials.
5. After successful authentication, the client receives an access token and uses it for all subsequent MCP requests.

This process follows industry-standard OAuth 2.0 specifications, including:

- **RFC 9728** — OAuth 2.0 Protected Resource Metadata (server discovery)
- **RFC 8414** — OAuth 2.0 Authorization Server Metadata (endpoint discovery)
- **RFC 7591** — OAuth 2.0 Dynamic Client Registration (automatic client registration)
- **RFC 7636** — PKCE (protects the authorization code from interception)

### Security Notes

- **PKCE is required**: The authorization flow uses PKCE (Proof Key for Code Exchange) to protect against authorization code interception.
- **Tokens are short-lived**: Access tokens expire according to your identity provider's configuration.
- **Tenant isolation**: Users are automatically routed to the correct identity connection for their organization.
- **HTTPS only**: All OAuth endpoints require HTTPS.

### Troubleshooting OAuth

| Symptom | Likely Cause | Solution |
|---|---|---|
| Browser opens but login fails | Your account may not be synced with your identity provider | Contact your Actian administrator to verify your account is properly configured |
| "Invalid client" error | Client registration has expired | Reconnect — the client will re-register automatically |
| 401 after successful login | Your session may have expired | Reconnect to get a fresh token |
| "Cannot resolve a valid tenant" | Incorrect tenant URL | Verify that the URL matches your tenant: `https://<your-tenant>.zeenea.app/api/mcp-server/mcp` |

## Authentication Using API Keys

API keys are the simplest way to authenticate automated workflows, scripts, and tools that cannot perform a browser-based OAuth flow.

### Step 1: Generate an API Key

To generate an API key in Actian Data Intelligence **Administration**, follow these steps:

1. Open **Administration**.
2. Go to **API keys** section.
3. Click the **Create API key** button.<br />A **Create API key** window opens.
4. Complete the required fields, then click **Create API key**.
5. Once the API key is generated, copy it and store it in a secure location, such as a secrets manager or encrypted file.

!!! warning "Important"
    The secret is displayed only once and cannot be retrieved later.

### Step 2: Configure the MCP Client

Add the API key to your MCP client configuration using the `x-api-secret` header. The configuration format depends on your client.

#### HTTP Transport with Headers (Most Modern Clients)

Clients that support HTTP transport can pass the API key in the `x-api-secret` header:

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

#### Using mcp-remote (Clients Without Native HTTP Header Support)

Some MCP clients do not support custom headers with HTTP connections. In these cases, use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a local proxy:

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

!!! tip "Claude-Specific Setup"
    For step-by-step setup instructions for Claude with API key authentication, see [Set up Claude with the Actian Data Intelligence Platform MCP Server](amcp-claude.md).

!!! tip "Testing with MCP Inspector"
    To test your connection with the MCP Inspector, see [Testing with MCP Inspector](amcp-overview.md#testing-with-mcp-inspector).

### Step 3: Test and Verify

1. Restart or reload your MCP client to apply the new configuration.
2. Test the connection by sending a request to the MCP endpoint.
3. Monitor for authentication errors, such as invalid secret responses.
4. If errors occur, check the logs or the administration console for access details, and verify that the API key has not expired or been revoked.

### Additional Recommendations

- **Security Best Practices**: Treat your API key like a password. Avoid hardcoding it in version control, use environment variables or a secrets manager, and rotate API keys periodically.
- **Permissions and Roles**: Ensure that the API key is associated with roles that allow read and write access to catalog metadata required for MCP operations.
- **GraphQL Access**: The same API key can be used to access the GraphQL API at `https://<your-tenant>.zeenea.app/api/catalog/graphql`.

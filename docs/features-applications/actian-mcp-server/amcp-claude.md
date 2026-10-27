---
search:
  boost: 2.0
---

# Set up Claude with the Actian Data Intelligence Platform MCP Server

You can connect Claude to the Actian Data Intelligence Platform MCP Server to access metadata from your Actian Data Intelligence Platform account directly in your AI workflow. This allows you to search, explore, and work with your data catalog context without leaving Claude.

This guide covers all Claude products that support MCP:

- **Claude Desktop** — the desktop application
- **Claude.ai** — the web interface at [claude.ai](https://claude.ai)
- **Claude Code** — the command-line AI coding assistant
- **Cowork** — Claude's collaborative workspace agent

## Prerequisites

Before you begin, ensure that you have the following:

- An Actian Data Intelligence tenant. If you don't have access, contact Actian Support or your Actian Customer Success team.
- **For OAuth authentication**: A user account with access to your Actian Data Intelligence tenant. If your organization uses SSO (Azure AD, Okta, etc.), your account must be synced.
- **For API Key authentication**: An API key generated in Actian Data Intelligence **Administration** > **API keys**. See [Remote Authentication Setup](amcp-remote-authentication.md) for details.
- **Node.js LTS** installed (required for some configurations, especially when using `mcp-remote`).

## Authentication Methods

The Actian Data Intelligence Platform MCP Server supports two authentication methods for Claude:

| Method | Best For | Setup |
|---|---|---|
| **OAuth 2.0** (recommended) | Interactive use — Claude Desktop, Claude.ai, Claude Code, Cowork | Browser-based login with your corporate credentials. No API keys needed. |
| **API Key** | Claude Desktop (legacy config), Claude Code (non-interactive), automation | Generate an API key in Administration and add it to the configuration. |

See [Remote Authentication Setup](amcp-remote-authentication.md) for full details on both methods.

---

## Claude Desktop

Claude Desktop supports both OAuth and API Key authentication.

### Option A: OAuth (Recommended)

OAuth lets you sign in with your corporate credentials through a browser — no API keys to manage.

1. Open **Claude Desktop**.
2. Go to **Settings** > **Connectors**.
3. At the top right of the Settings modal, click **Add...** > **Add custom connector**.
4. Enter a name (for example, `Actian Data Intelligence`).
5. In **Remote MCP server URL**, enter:

   ```
   https://<your-tenant>.zeenea.app/api/mcp-server/mcp
   ```

6. Click **Add** at the bottom.
7. You should now see a **Connect** button. Click on it.
8. A tab opens in your browser asking for your credentials. Sign in with your usual Actian Data Intelligence credentials.
9. If your browser asks to use the Claude app to open the callback link, click **Accept**.
10. You should now be connected and see the available Actian Data Intelligence Platform MCP tools and their permissions.

### Option B: API Key

If your organization's policy does not allow OAuth, or you prefer API key authentication:

1. Generate an API key in Actian Data Intelligence **Administration** > **API keys**. Copy it securely.

   !!! warning "Important"
       The secret is displayed only once and cannot be retrieved later.

2. Open **Claude Desktop**.
3. Go to **Settings** > **Developer** > **Edit Config**.
4. Add the following configuration to `claude_desktop_config.json`:

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

5. Save the file and restart **Claude Desktop**.
6. Verify the connection: open a new chat, click the **Tools** menu (hammer icon), and check that the Actian Data Intelligence Platform MCP tools are listed and toggled on.

---

## Claude.ai (Web)

Claude.ai supports OAuth authentication through custom connectors.

1. Go to [claude.ai](https://claude.ai) and sign in.
2. Click on your profile icon (bottom left) and go to **Settings**.
3. Go to **Connectors**.
4. At the top right, click **Add...** > **Add custom connector**.
5. Enter a name (for example, `Actian Data Intelligence`).
6. In **Remote MCP server URL**, enter:

   ```
   https://<your-tenant>.zeenea.app/api/mcp-server/mcp
   ```

7. Click **Add**.
8. Click **Connect** next to the new connector.
9. A browser tab opens for you to sign in with your Actian Data Intelligence credentials.
10. Once connected, the Actian Data Intelligence Platform MCP tools are available in your chats. You can toggle them on/off per conversation using the tools menu.

!!! note
    Claude.ai requires OAuth — API Key authentication is not supported on the web interface.

---

## Claude Code (CLI)

Claude Code supports both OAuth and API Key authentication for remote MCP servers.

### Option A: OAuth (Recommended)

Claude Code handles the full OAuth flow automatically — it opens a browser for authentication on first use and stores the token locally.

#### Add the server

Run this command in your terminal:

```bash
claude mcp add --transport http actian https://<your-tenant>.zeenea.app/api/mcp-server/mcp
```

#### Authenticate

The first time Claude Code uses the server, it will open a browser window for you to sign in with your Actian Data Intelligence credentials. After signing in, the token is stored locally and reused for subsequent sessions.

#### Verify

```bash
claude mcp list
```

You should see `actian` listed with a connected status.

#### Project-level configuration

To share the configuration with your team, add it to your project's `.mcp.json` file:

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

Team members will authenticate with their own credentials on first use.

### Option B: API Key

For non-interactive environments (CI/CD, scripts) or if OAuth is not available:

#### Using the CLI

```bash
claude mcp add --transport http actian https://<your-tenant>.zeenea.app/api/mcp-server/mcp \
  --header "x-api-secret: <your-api-key>"
```

#### Using .mcp.json

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

!!! tip
    For better security, use an environment variable instead of hardcoding the API key:

    ```json
    {
      "mcpServers": {
        "actian": {
          "type": "http",
          "url": "https://<your-tenant>.zeenea.app/api/mcp-server/mcp",
          "headers": {
            "x-api-secret": "${ACTIAN_API_KEY}"
          }
        }
      }
    }
    ```

    Then set the environment variable before running Claude Code:

    ```bash
    export ACTIAN_API_KEY="<your-api-key>"
    ```

#### User-level configuration

To configure the MCP server for all your projects, add it to your user-level Claude settings (`~/.claude.json`):

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

---

## Cowork

Cowork (Claude's collaborative workspace agent) supports MCP connectors through the same custom connector mechanism as Claude Desktop.

1. Open **Cowork**.
2. Go to **Settings** > **Connectors**.
3. Click **Add...** > **Add custom connector**.
4. Enter a name (for example, `Actian Data Intelligence`).
5. In **Remote MCP server URL**, enter:

   ```
   https://<your-tenant>.zeenea.app/api/mcp-server/mcp
   ```

6. Click **Add**, then **Connect**.
7. Sign in with your Actian Data Intelligence credentials in the browser window that opens.

---

## Verifying the Connection

After setup, verify that the Actian Data Intelligence Platform MCP Server is connected and working:

1. Start a new conversation in your Claude product.
2. Look for the **Tools** menu (hammer icon in Claude Desktop/Code, or the tools toggle in Claude.ai).
3. Check that the Actian Data Intelligence Platform MCP tools are listed, such as:
   - `find_glossary_definition`
   - `get_glossary_implementations`
   - `get_dataset_data_model`
   - `semantic_search_glossary`
   - `search_items`
4. Ask Claude a question that requires catalog data, for example:

   > "What is the definition of 'Customer Lifetime Value' in our glossary?"

   or

   > "Find all datasets in the 'sales' schema."

If Claude responds with data from your catalog, the connection is working correctly.

---

## Troubleshooting

| Symptom | Solution |
|---|---|
| "Connect" button does not appear | Make sure you clicked **Add** after entering the name and URL. The connector must be added before it can be connected. |
| Browser opens but login fails | Verify your Actian Data Intelligence credentials. If your organization uses SSO, ensure your account is synced with your identity provider. |
| "Invalid API key" error | The API key may have expired or been revoked. Generate a new key in **Administration** > **API keys** and update your configuration. |
| Tools not appearing in Claude | Toggle the tools on in the Tools menu. In Claude Desktop/Code, click the hammer icon and enable the Actian tools. |
| Connection works but returns no data | Verify that your Actian account has the necessary permissions to view catalog items. Contact your Actian administrator if you need access. |
| `npx: command not found` (Claude Desktop with API Key) | Install [Node.js LTS](https://nodejs.org/). It is required for the `mcp-remote` proxy. |
| OAuth callback fails in Claude Desktop | Your browser may ask to open the callback link in the Claude app. Click **Accept** to complete the flow. |
| Claude Code: "server not found" | Run `claude mcp list` to check the server is registered. If not, add it again with `claude mcp add`. |

---

## Next Steps

- Learn about the available tools in the [Actian Data Intelligence Platform MCP Server Overview](amcp-overview.md).
- Set up authentication details in [Remote Authentication Setup](amcp-remote-authentication.md).

---
search:
  boost: 2.0
---

# Set Up Claude with the Actian Data Intelligence Platform MCP Server

You can connect Claude to the Actian Data Intelligence Platform MCP Server to access metadata from your Actian Data Intelligence Platform account directly within your AI workflow. This allows you to search, explore, and work with your data catalog context without leaving Claude.

This guide covers all Claude products that support MCP:

- **Claude Desktop**: The desktop application.
- **Claude.ai**: The web application available at [claude.ai](https://claude.ai).
- **Claude Code**: The command-line AI coding assistant.
- **Cowork**: Claude's collaborative workspace agent.

## Prerequisites

Before you begin, ensure that you have the following:

- An Actian Data Intelligence tenant. If you do not have access, contact Actian Support or your Actian Customer Success team.
- **For OAuth authentication**: A user account with access to your Actian Data Intelligence tenant. If your organization uses SSO (Azure AD, Okta, and so on), your account must be synchronized.
- **For API key authentication**: An API key generated in Actian Data Intelligence under **Administration** > **API keys**. For more information, see [Remote Authentication Setup](amcp-remote-authentication.md).
- **Node.js LTS** installed. This is required for some configurations, particularly when using `mcp-remote`.

## Authentication Methods

The Actian Data Intelligence Platform MCP Server supports two authentication methods for Claude:

| Method | Best For | Setup |
|---|---|---|
| **OAuth 2.0** (recommended) | Interactive use: Claude Desktop, Claude.ai, Claude Code, and Cowork | Browser-based login with your corporate credentials. No API keys required. |
| **API key** | Claude Desktop (legacy configuration), Claude Code (non-interactive), and automation | Generate an API key in Administration and add it to the configuration. |

For more information about both methods, see [Remote Authentication Setup](amcp-remote-authentication.md).

## Claude Desktop

Claude Desktop supports both OAuth and API key authentication.

### Option A: OAuth (Recommended)

OAuth lets you sign in with your corporate credentials through a browser without managing API keys.

1. Open **Claude Desktop**.
2. Go to **Settings** > **Connectors**.
3. In the upper-right corner of the Settings window, click **Add...** > **Add custom connector**.
4. Enter a name (for example, `Actian Data Intelligence`).
5. In **Remote MCP server URL**, enter:

    ```
    https://<your-tenant>.zeenea.app/api/mcp-server/mcp
    ```

6. Click **Add**.
   
     The connector appears with a **Connect** button. 

7. Click **Connect**.
     
     A browser tab opens and prompts you to sign in.

8. Sign in with your Actian Data Intelligence credentials.
9. If your browser asks whether to open the callback link in Claude Desktop, click **Accept**.
10. After authentication completes, Claude Desktop displays the available Actian Data Intelligence Platform MCP tools and their permissions.

### Option B: API Key

Use this option if your organization's policy does not allow OAuth or if you prefer API key authentication.

1. Generate an API key in Actian Data Intelligence under **Administration** > **API keys**. Copy the key and store it securely.

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
6. Verify the connection: open a new chat, click the **Tools** menu (hammer icon), and confirm that the Actian Data Intelligence Platform MCP tools are listed and enabled.

## Claude.ai (Web)

Claude.ai supports OAuth authentication through custom connectors.

1. Go to [claude.ai](https://claude.ai) and sign in.
2. Click your profile icon (bottom left), then select **Settings**.
3. Go to **Connectors**.
4. In the upper-right corner, click **Add...** > **Add custom connector**.
5. Enter a name (for example, `Actian Data Intelligence`).
6. In **Remote MCP server URL**, enter:

     ```
     https://<your-tenant>.zeenea.app/api/mcp-server/mcp
     ```

7. Click **Add**.
8. Click **Connect** next to the new connector.
9. A browser tab opens and prompts you to sign in with your Actian Data Intelligence credentials.
10. Once connected, the Actian Data Intelligence Platform MCP tools are available in your chats. You can enable or disable them for each conversation through the tools menu.

!!! note
    Claude.ai requires OAuth. API key authentication is not supported on the web application.

## Claude Code (CLI)

Claude Code supports both OAuth and API key authentication for remote MCP Servers.

### Option A: OAuth (Recommended)

Claude Code handles the full OAuth flow automatically. On first use, it opens a browser for authentication and stores the token locally.

#### Add the Server

Run the following command in your terminal:

```bash
claude mcp add --transport http actian https://<your-tenant>.zeenea.app/api/mcp-server/mcp
```

#### Authenticate

The first time Claude Code connects to the server, it opens a browser window for you to sign in with your Actian Data Intelligence credentials. After authentication completes, the token is stored locally and reused for subsequent sessions.

#### Verify

```bash
claude mcp list
```

You should see `actian` listed as connected.

#### Project-Level Configuration

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

Use this option for non-interactive environments (such as CI/CD pipelines and scripts) or if OAuth is not available.

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
    For improved security, store the API key in an environment variable instead of hardcoding it:

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

#### User-Level Configuration

To configure the MCP Server for all your projects, add it to your user-level Claude settings (`~/.claude.json`):

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

6. Click **Add**, then click **Connect**.
7. Sign in with your Actian Data Intelligence credentials in the browser window that opens.

## Verifying the Connection

After setup, verify that the Actian Data Intelligence Platform MCP Server is connected and working:

1. Start a new conversation in your Claude product.
2. Open the **Tools** menu (hammer icon in Claude Desktop and Claude Code, or the tools toggle in Claude.ai).
3. Verify that the Actian Data Intelligence Platform MCP tools are listed, such as:
     - `find_glossary_definition`
     - `get_glossary_implementations`
     - `get_dataset_data_model`
     - `semantic_search_glossary`
     - `search_items`
4. Ask Claude a question that requires catalog data, for example:

      _"What is the definition of 'Customer Lifetime Value' in our glossary?"_<br/>or<br/>_"Find all datasets in the 'sales' schema."_<br/>

      If Claude responds with data from your catalog, the connection is working correctly.

## Troubleshooting

| Symptom | Solution |
|---|---|
| **Connect** button does not appear | Make sure you clicked **Add** after entering the name and URL. The connector must be added before it can be connected. |
| Browser opens but login fails | Verify your Actian Data Intelligence credentials. If your organization uses SSO, ensure that your account is synchronized with your identity provider. |
| "Invalid API key" error | The API key may have expired or been revoked. Generate a new API key in **Administration** > **API keys** and update your configuration. |
| Tools not appearing in Claude | Enable the Actian tools in the **Tools** menu. In Claude Desktop and Claude Code, click the hammer icon and enable the Actian tools. |
| Connection works but returns no data | Verify that your Actian account has the necessary permissions to view catalog items. Contact your Actian administrator if you need access. |
| `npx: command not found` (Claude Desktop with API key) | Install [Node.js LTS](https://nodejs.org/). It is required for the `mcp-remote` proxy. |
| OAuth callback fails in Claude Desktop | Your browser may prompt you to open the callback link in the Claude app. Click **Accept** to complete the authentication flow. |
| Claude Code: "server not found" | Run `claude mcp list` to verify that the server is registered. If it is not, add it again with `claude mcp add`. |

## Next Steps

- Learn about the available tools in the [Actian Data Intelligence Platform MCP Server Overview](amcp-overview.md).
- Set up authentication details in [Remote Authentication Setup](amcp-remote-authentication.md).

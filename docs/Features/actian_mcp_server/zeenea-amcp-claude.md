# Set up Claude Desktop

You can connect Claude Desktop to the Actian MCP Server to access the metadata from your Actian Data Intelligence Platform account directly in your desktop environment. This allows you to work locally while still leveraging metadata context from the Actian Data Intelligence Platform.

## Prerequisites

Before you begin, ensure that you have the following:

* An Actian Data Intelligence tenant with an API key generated following the Authentication Setup instructions. If you don't have access, contact Actian Support or your Actian Customer Success team.  
* [Claude Desktop](https://claude.ai/download) is installed and updated to the latest version.

## Claude Desktop with Actian MCP

1. Follow the Authentication Setup instructions to generate an API key and copy it securely.  
2. Open **Claude Desktop**.
3. Go to **Settings > Developer > Edit Config**.  
4. Add the following configuration:

  ```json
  {
    "mcpServers": {
      "zeenea-dev": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "https://<tenant id>.zeenea.app/api/mcp-server/mcp",
          "--header",
          "X-API-SECRET:${API_SECRET}"
        ],
        "env": {
          "API_SECRET": "<Paste your API key here>"
        }
      }
    }
  }

  ```

4. Restart **Claude Desktop**. <br />The server is available with API Key authentication.  
5. Verify that the connection is established by opening a new chat window, navigating to the Tools menu, and checking that the `Zeenea-mcp` tool is toggled on.  
6. You can now use Actian MCP tools directly in **Claude Desktop**.

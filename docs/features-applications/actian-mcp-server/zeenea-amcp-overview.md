Actian Model Context Protocol (MCP) Server
==========================================

The Actian MCP Server uses the open-source Model Context Protocol (MCP) standard to enable AI agents to access contextual metadata from external systems. This protocol provides a standardized way for large language models (LLMs) and automation frameworks to retrieve the context they need to provide accurate and reliable results.

The Actian MCP Server (Beta) acts as a secure bridge between the Actian Data Intelligence Platform and AI tools, such as Claude, Cursor, Windsurf, and Microsoft Copilot Studio. With the Actian MCP Server, you can search and find assets at both the semantic layer and the data model level, using real-time context from Studio and Explorer applications within the Actian Data Intelligence Platform.

## Actian MCP Server Tools

The Actian MCP Server provides a set of tools that enable AI agents to work directly with metadata in the Actian Data Intelligence Platform. These tools supply real-time context to AI environments, making it easier to search, explore, and update metadata without leaving your workflow.

The tools include the following:

### Find Glossary Definition

The `find_glossary_definition` tool retrieves the stored definitions of a glossary term from the data catalog. If there are multiple glossary items with the same name, the tool returns up to 10 matching definitions.

This tool allows you to easily look up the written definition of any business term in your company's glossary.

For example, if you query `Customer Lifetime Value`, the tool returns the exact definition text that was stored in the glossary, such as: _The predicted net profit attributed to the entire future relationship with a customer, calculated using historical purchase data and retention rates_.

### Get Glossary Implementations

The `get_glossary_implementations` tool retrieves all data assets (such as datasets) that are linked as implementations of a specified glossary term using the **Implements** predicate.

This tool allows you to easily look up all the actual data tables and files that contain information related to a specific business term.

For example, if you search for `Customer`, the tool returns that this concept is implemented in datasets like `customer_profile_table`, `customer_transactions`, and `customer_support_tickets`. This shows you exactly where that business concept exists in your data infrastructure.

### Get Dataset Data Model

The `get_dataset_data_model` tool retrieves the relational data model for a specified dataset, including fields, relations, and connected datasets.

In other words, you can use this tool to understand how your data tables connect to each other and see the **family tree** of your data relationships.

For example, if you query the `orders` table, the tool can show that it connects to the `customers`, `products`, and `shipping` tables. This helps you understand the full data model for e-commerce analytics.

### Semantic Search Glossary

The `semantic_search_glossary` tool performs an AI-powered semantic search to find glossary terms conceptually related to a given query, reference, or question, focusing on the meaning rather than exact keywords.

This tool allows you to easily find business terms that are similar in meaning, even if they use different words.

For example, if you search for `revenue`, the tool returns related terms like `income`, `sales`, `gross profit`, and `billing`. These terms are conceptually connected even if they don't share the same keywords.

### Get Metamodel Item Types (Beta feature - available on request)

The `get_metamodel_item_types` tool retrieves a list of all possible item types defined in the catalog's metamodel.
The metamodel defines the structure and configuration of the data catalog itself, not the actual data.

This tool returns the item types that can exist in the catalog, such as dataset, field, or visualization.

### Get Metamodel Properties (Beta feature - available on request)

The `get_metamodel_properties` tool retrieves a list of all possible properties defined in the catalog's metamodel by Studio users, which can include the common properties of connectors. The metamodel defines the structure and configuration of the data catalog itself, not the actual data.

This tool returns the properties that can be attached to items in the catalog, such as `$z_schema` or `$z_table`.

### Search Items (Beta feature - available on request)

The `search_items` tool retrieves a list of catalog items based on filter criteria.

You can use this tool to find any native item in the catalog, such as datasets, fields, visualizations, or data processes.

The available filters are:
* **`item_type_code`**: The type of item (for example, `dataset`, `field`, `visualization`). You can fetch available item types and their codes using the `get_metamodel_item_types` tool.
* **`name`**: The name of the item (partial match).
* **`description`**: Text in the description (partial match).
* **`properties`**: Filter by property values (for example, `{"$z_schema": "music"}` to find items in the `music` schema). You can fetch available properties and their codes using the `get_metamodel_properties` tool.

For example, if you want to search for datasets named `albums` in the `music` schema, set the filter criteria as:

 * **`item_type_code`**`: dataset`
 * **`name`**`: albums`
 * **`properties`**`: {"$z_schema": "music"}`
 
You should see a list of datasets named `albums` in the `music` schema in all connections.

> **Note:** Results are currently limited to a maximum of five items to avoid overloading the agent context. This limit will be increased or removed when the feature comes out of Beta.

## Deployment Options

We currently provide only remote connections to Actian MCP Servers. 

Our remote deployment is a per-tenant MCP Server managed by Actian. It supports API Key authentication and is currently available in Beta.

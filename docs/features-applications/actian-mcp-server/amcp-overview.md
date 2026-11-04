---
search:
  boost: 2.0
---

# Actian Data Intelligence Platform MCP Server

The Actian Data Intelligence Platform MCP Server uses the open-source Model Context Protocol (MCP) standard to enable AI agents to access contextual metadata from external systems. This protocol provides a standardized way for large language models (LLMs) and automation frameworks to retrieve the context they need to provide accurate and reliable results.

The Actian Data Intelligence Platform MCP Server acts as a secure bridge between the Actian Data Intelligence Platform and AI tools, such as Claude, Cursor, Windsurf, and Microsoft Copilot Studio. With the Actian Data Intelligence Platform MCP Server, you can search and find assets at both the semantic layer and the data model level, using real-time context from Studio and Explorer applications within the Actian Data Intelligence.

## Tools

The Actian Data Intelligence Platform MCP Server provides tools that enable AI agents to work directly with metadata in the Actian Data Intelligence. These tools supply real-time context to AI environments, making it easier to search, explore, and update metadata without leaving your workflow.

### Search and Discovery

#### Search Items

The `search_items` tool is the **primary search tool** for retrieving catalog items based on filter criteria. Use it to find any type of item in the catalog, including datasets, fields, visualizations, data processes, and more.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_type_code` | string | — | Code of the item type (for example, `dataset`, `field`, `visualization`). Use `get_metamodel_item_types` to discover available item type codes. |
| `catalog_code` | string | — | Code of the catalog to scope results to. Use `list_catalogs` to discover available catalog codes. |
| `name` | string | `""` | Name of the item (partial match). |
| `description` | string | `""` | Text in the description (partial match). |
| `properties` | object | `{}` | Filter by property values. The key is the property code and the value is the value to match (for example, `{"$z_schema": "music"}`). |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`. Omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |
| `visible_in_explorer` | boolean | `true` | When `true`, only return items visible in Explorer. Set to `false` to include Studio-only items. |

**Example**: Search for datasets named `albums` in the `music` schema:

```json
{
  "item_type_code": "dataset",
  "name": "albums",
  "properties": {"$z_schema": "music"}
}
```

Each result includes the item's `key`, which can be passed to `get_item` to read full item details.

#### Semantic Search Glossary

The `semantic_search_glossary` tool performs an AI-powered semantic search to find **glossary terms** (business definitions) conceptually related to a given query, based on meaning rather than exact keywords.

!!! note
    This tool is only for finding glossary items (business vocabulary, definitions, and concepts). Do not use it to find datasets, tables, fields, or other technical items.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `query` | string | — | **Required.** Reference or question for semantic search. |
| `item_type_code` | string | — | Keep only results for this item type (for example, `dataset`). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |
| `visible_in_explorer` | boolean | `true` | When `true`, only return items visible in Explorer. |

Results are relevance-ranked (most relevant first). There is no pagination. Increase `limit` to surface more results.

**Example**: If you search for `revenue`, the tool returns related terms such as `income`, `sales`, `gross profit`, and `billing`.

#### Search Contacts

The `search_contacts` tool discovers contacts (people or teams) by name or email.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | string | `""` | Name of the contact (partial match). Matches across first and last names. |
| `email` | string | `""` | Email address of the contact (partial match). |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`. Omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

#### List Catalogs

The `list_catalogs` tool lists all catalogs accessible to the authenticated tenant. Use the returned codes as the `catalog_code` parameter in `search_items` to scope results to a specific catalog.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Item Details

#### Get Item

The `get_item` tool retrieves all available information about a single item, including its names, descriptions, summary, catalog and source property values, and type-specific information (for example, quality level and category for a dataset, data type and key constraints for a field, or version for a visualization).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. Prefer the `key` returned by `search_items`. An item ID can also be used, but resolving an item by name is slower. |

#### Get Dataset Data Model

The `get_dataset_data_model` tool retrieves the relational data model for a specified dataset, including its fields (columns) with their names and types, relationships to other datasets (such as foreign keys and joins), and connected datasets.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `dataset_ref` | string | — | **Required.** Reference to the dataset (name, ID, or URI such as `zee://connection/schema/table`). |

**Example**: If you query the `orders` table, the tool can show its relationships to the `customers`, `products`, and `shipping` tables.

#### Get Item Lineage

The `get_item_lineage` tool retrieves the lineage graph for a catalog item, including its upstream producers and downstream consumers. It returns both nodes and directed edges.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Name, ID, or URI of the item. |
| `direction` | string | `both` | `upstream` for items it is produced from, `downstream` for items produced from it, or `both` for both directions. |
| `depth` | string | `next` | `next` for directly adjacent items only, `all` for the entire reachable graph. |

For a field, the tool returns the entire field-to-field lineage graph. In this case, `direction` and `depth` parameters do not apply.

#### Get Item Audit Events

The `get_item_audit_events` tool retrieves the audit and activity history for a catalog item, including who changed what and when.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Name, ID, or URI of the item. |
| `since` | string | — | Include only events at or after this ISO-8601 date and time. |
| `until` | string | — | Include only events at or before this ISO-8601 date and time. |
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Glossary

#### Find Glossary Definition

The `find_glossary_definition` tool retrieves the stored definitions of a glossary term from the data catalog.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_name` | string | — | **Required.** Name of the glossary item. |
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |
| `visible_in_explorer` | boolean | `true` | When `true`, only return items visible in Explorer. |

**Example**: If you query `Customer Lifetime Value`, the tool returns the exact definition text stored in the glossary.

#### Get Glossary Implementations

The `get_glossary_implementations` tool retrieves all data assets (such as datasets) that are linked as implementations of a specified glossary term using the **Implements** predicate.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `glossary_item_ref` | string | — | **Required.** Name, ID, or URI of the glossary item. |
| `item_type_code` | string | — | Keep only implementations of this item type (for example, `dataset`). |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`. Omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |
| `visible_in_explorer` | boolean | `true` | When `true`, only return items visible in Explorer. |

**Example**: If you search for `Customer`, the tool returns datasets that implement this concept, such as `customer_profile_table`, `customer_transactions`, and `customer_support_tickets`.

### Metamodel

The metamodel defines the structure and configuration of the data catalog itself, not the data it contains.

#### Get Metamodel Item Types

The `get_metamodel_item_types` tool retrieves a list of all possible item types defined in the catalog's metamodel (for example, `dataset`, `field`, and `visualization`).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name_contains` | string | — | Keep only item types whose name contains this text (case-insensitive). |
| `code` | string | — | Keep only the item type with this exact code (for example, `dataset`). |
| `layer` | string | — | Keep only item types in this layer: `physical` (technical/data assets) or `semantic` (business/glossary concepts). |
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

#### Get Metamodel Properties

The `get_metamodel_properties` tool retrieves a list of all possible properties defined in the catalog's metamodel, which can include the common properties of connectors such as `$z_schema` and `$z_table`.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name_contains` | string | — | Keep only properties whose name contains this text (case-insensitive). |
| `code` | string | — | Keep only the property with this exact code (for example, `$z_schema`). |
| `property_type` | string | — | Keep only properties of the specified data type: `Date`, `Enum`, `MultivaluedEnum`, `Number`, `RichText`, `ShortText`, `Tag`, `Uri`, or `Url`. |
| `item_type_code` | string | — | Keep only properties applicable to this item type. |
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

#### List Responsibilities

The `list_responsibilities` tool retrieves the list of all responsibility roles defined in the catalog, such as `Owner` and `Steward`.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Curation

#### List Suggestions

The `list_suggestions` tool lists curation suggestions, including pending, accepted, or rejected recommended changes (such as proposed descriptions and property values) created by automation or users for steward review.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | Name, ID, or URI of a catalog item to scope suggestions to. Omit to list all suggestions. |
| `status` | string | — | Filter by suggestion status: `Pending`, `Accepted`, or `Rejected`. Omit for all statuses. |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`. Omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Write Tools

#### Update Item Description

The `update_item_description` tool sets or clears the catalog description of an item.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. Prefer the `key` returned by `search_items`. |
| `content` | string | — | Description text to set. Omit together with `content_type` to clear the description. |
| `content_type` | string | — | Format of `content`: `RAW` for plain text and `HTML` for rich text (sanitized). Required when `content` is provided. |

#### Update Item Summary

The `update_item_summary` tool sets or regenerates the summary displayed for an item in search results.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. |
| `summary` | string | — | Summary text to set (maximum 1000 characters). Omit to regenerate the summary from the item's current description. |

#### Update Item Property

The `update_item_property` tool sets or clears the value of a custom property on an item. Use `get_metamodel_properties` to look up a property's code and type before setting a value.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. |
| `property_ref` | string | — | **Required.** Reference to the property: its ID or code, as returned by `get_metamodel_properties`. |
| `value` | string, number, or array | — | Value to set, shaped according to the property's type. Omit to clear the property. |

The expected shape of `value` depends on the property's type:

| Property Type | Value Shape |
|---|---|
| `ShortText`, `Enum` | string |
| `Number` | number |
| `MultivaluedEnum`, `Tag` | array of strings (for example, `["hello", "world"]`) |
| `Date` | ISO 8601 date or date-time string |
| `Url` | URL or absolute path string |

Properties of type `Uri` or `RichText` cannot be updated through this tool. Read-only properties (exclusively from a source scanner) cannot be set or cleared.

## Prompts

The Actian Data Intelligence Platform MCP Server provides pre-built prompts that help AI agents accomplish common tasks. These prompts guide the agent through multi-step workflows using the available tools.

| Prompt | Description | Parameters |
|---|---|---|
| `explore_schema` | Explore the structure and contents of a database schema. | `schema_name` — Name of the schema to explore. |
| `understand_dataset` | Understand a dataset's structure, fields, and relationships. | `dataset_reference` — Reference to the dataset (name, ID, or URI). |
| `find_business_term` | Find a business term, concept, or definition in the glossary. | `concept` — Business term, concept, or question to search for. |
| `find_items` | Find items of a specific type that match a concept. | `item_type` — The type of items to filter by. `concept` — Concept included in the items to search for. |

## Pagination

Tools that return lists use one of two pagination styles:

* **Offset-based pagination**: Used by `find_glossary_definition`, `list_catalogs`, `get_item_audit_events`, `get_metamodel_item_types`, `get_metamodel_properties`, and `list_responsibilities`.

     | Parameter or Field | Description |
     |---|---|
     | `offset` | Number of items to skip (zero-based). Default: `0`. |
     | `limit` | Maximum items per page (1–100). Default: `20`. |
     | `next_offset` | Pass this value as `offset` to retrieve the next page. `null` when on the last page. |

* **Cursor-based pagination**: Used by `search_items`, `get_glossary_implementations`, `search_contacts`, `semantic_search_glossary`, and `list_suggestions`.

     | Parameter or Field | Description |
     |---|---|
     | `cursor` | Opaque cursor from a previous response's `next_cursor`. Omit for the first page. |
     | `limit` | Maximum items per page (1–100). Default: `20`. |
     | `next_cursor` | Pass this value as `cursor` to retrieve the next page. `null` when on the last page. |

All paginated responses include `items`, `total_count`, `limit`, and `has_more`. When `has_more` is `true`, request the next page using `next_offset` or `next_cursor`.

## Testing with MCP Inspector

The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) is a tool for testing and debugging MCP servers. Use it to verify your connection to the Actian Data Intelligence Platform MCP Server and explore the available tools.

### Setup

1. Start the MCP Inspector:

     ```bash
     npx @modelcontextprotocol/inspector
     ```

2. Configure the connection:
     - **Transport type**: `Streamable HTTP`
     - **URL**: `https://<your-tenant>.zeenea.app/api/mcp-server/mcp`
     - **Request Timeout**: `30000`
     - See [Remote Authentication Setup](amcp-remote-authentication.md) for authentication details.

3. Click **Connect**.


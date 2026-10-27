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

The `search_items` tool is the **primary search tool** for retrieving catalog items based on filter criteria. Use it to find any type of item in the catalog: datasets, fields, visualizations, data processes, and more.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_type_code` | string | — | Code of the item type (e.g., `dataset`, `field`, `visualization`). Use `get_metamodel_item_types` to discover available codes. |
| `catalog_code` | string | — | Code of the catalog to scope results to. Use `list_catalogs` to discover available codes. |
| `name` | string | `""` | Name of the item (partial match). |
| `description` | string | `""` | Text in the description (partial match). |
| `properties` | object | `{}` | Filter by property values. Key is the property code, value is the value to match (e.g., `{"$z_schema": "music"}`). |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`; omit for the first page. |
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
    This tool is only for finding glossary items (business vocabulary, definitions, concepts). Do not use it to find datasets, tables, fields, or other technical items.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `query` | string | — | **Required.** Reference or question for semantic search. |
| `item_type_code` | string | — | Keep only results for this item type (e.g., `dataset`). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |
| `visible_in_explorer` | boolean | `true` | When `true`, only return items visible in Explorer. |

Results are relevance-ranked (most relevant first). There is no pagination — increase `limit` to surface more results.

**Example**: If you search for `revenue`, the tool returns related terms like `income`, `sales`, `gross profit`, and `billing`.

#### Search Contacts

The `search_contacts` tool discovers contacts (people or teams) by name or email.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | string | `""` | Name of the contact (partial match). Matches across first and last name. |
| `email` | string | `""` | Email of the contact (partial match). |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`; omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

#### List Catalogs

The `list_catalogs` tool lists all catalogs accessible to the authenticated tenant. Use the returned codes as the `catalog_code` parameter in `search_items` to scope results to a specific catalog.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Item Details

#### Get Item

The `get_item` tool retrieves everything the catalog knows about a single item: its names, descriptions, summary, catalog and source property values, plus information specific to its type (quality level and category for a dataset, data type and key constraints for a field, version for a visualization).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. Prefer the `key` returned by `search_items`. An item id also works; resolving by name is slower. |

#### Get Dataset Data Model

The `get_dataset_data_model` tool retrieves the relational data model for a specified dataset, including fields (columns) with their names and types, relations to other datasets (foreign keys, joins), and connected datasets.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `dataset_ref` | string | — | **Required.** Reference to the dataset (name, id, or URI like `zee://connection/schema/table`). |

**Example**: If you query the `orders` table, the tool can show that it connects to the `customers`, `products`, and `shipping` tables.

#### Get Item Lineage

The `get_item_lineage` tool retrieves the lineage graph around a catalog item: upstream producers and downstream consumers. Returns nodes plus directed edges.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Name, id, or URI of the item. |
| `direction` | string | `both` | `upstream` for items it is produced from, `downstream` for items produced from it, `both` for either side. |
| `depth` | string | `next` | `next` for directly adjacent items only, `all` for the whole reachable graph. |

For a field, the whole field-to-field graph is returned and direction/depth do not apply.

#### Get Item Audit Events

The `get_item_audit_events` tool retrieves the audit/activity history for a catalog item — who changed what, and when.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Name, id, or URI of the item. |
| `since` | string | — | Only include events at or after this ISO-8601 date/time. |
| `until` | string | — | Only include events at or before this ISO-8601 date/time. |
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
| `glossary_item_ref` | string | — | **Required.** Name, id, or URI of the glossary item. |
| `item_type_code` | string | — | Keep only implementations of this item type (e.g., `dataset`). |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`; omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |
| `visible_in_explorer` | boolean | `true` | When `true`, only return items visible in Explorer. |

**Example**: If you search for `Customer`, the tool returns that this concept is implemented in datasets like `customer_profile_table`, `customer_transactions`, and `customer_support_tickets`.

### Metamodel

The metamodel defines the structure and configuration of the data catalog itself, not the actual data.

#### Get Metamodel Item Types

The `get_metamodel_item_types` tool retrieves a list of all possible item types defined in the catalog's metamodel (e.g., `dataset`, `field`, `visualization`).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name_contains` | string | — | Keep only item types whose name contains this text (case-insensitive). |
| `code` | string | — | Keep only the item type with this exact code (e.g., `dataset`). |
| `layer` | string | — | Keep only item types in this layer: `physical` (technical/data assets) or `semantic` (business/glossary concepts). |
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

#### Get Metamodel Properties

The `get_metamodel_properties` tool retrieves a list of all possible properties defined in the catalog's metamodel, which can include the common properties of connectors (e.g., `$z_schema`, `$z_table`).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name_contains` | string | — | Keep only properties whose name contains this text (case-insensitive). |
| `code` | string | — | Keep only the property with this exact code (e.g., `$z_schema`). |
| `property_type` | string | — | Keep only properties of this data type: `Date`, `Enum`, `MultivaluedEnum`, `Number`, `RichText`, `ShortText`, `Tag`, `Uri`, or `Url`. |
| `item_type_code` | string | — | Keep only properties applicable to this item type. |
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

#### List Responsibilities

The `list_responsibilities` tool retrieves the list of all responsibility roles (e.g., `Owner`, `Steward`) defined in the catalog.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `offset` | integer | `0` | Number of items to skip (zero-based). |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Curation

#### List Suggestions

The `list_suggestions` tool lists curation suggestions — pending, accepted, or rejected recommended changes (e.g., proposed descriptions, property values) produced by automation or users for a steward to review.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | Name, id, or URI of a catalog item to scope suggestions to. Omit to list all suggestions. |
| `status` | string | — | Filter by suggestion status: `Pending`, `Accepted`, or `Rejected`. Omit for all statuses. |
| `cursor` | string | — | Cursor from a previous response's `next_cursor`; omit for the first page. |
| `limit` | integer | `20` | Maximum number of items to return (1–100). |

### Write Tools

#### Update Item Description

The `update_item_description` tool sets or clears the catalog description of an item.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. Prefer the `key` returned by `search_items`. |
| `content` | string | — | Description text to set. Omit together with `content_type` to clear the description. |
| `content_type` | string | — | Format of `content`: `RAW` for plain text, `HTML` for rich text (sanitized). Required whenever `content` is given. |

#### Update Item Summary

The `update_item_summary` tool sets or regenerates the summary shown for an item in search results.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. |
| `summary` | string | — | Summary text to set (max 1000 characters). Omit to regenerate the summary from the item's current description. |

#### Update Item Property

The `update_item_property` tool sets or clears the value of a custom property on an item. Use `get_metamodel_properties` to look up a property's code and type before setting a value.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `item_ref` | string | — | **Required.** Reference to the item. |
| `property_ref` | string | — | **Required.** Reference to the property: its id or code, as returned by `get_metamodel_properties`. |
| `value` | string, number, or array | — | Value to set, shaped according to the property's type. Omit to clear the property. |

The expected shape of `value` depends on the property's type:

| Property Type | Value Shape |
|---|---|
| `ShortText`, `Enum` | string |
| `Number` | number |
| `MultivaluedEnum`, `Tag` | array of strings (e.g., `["hello", "world"]`) |
| `Date` | ISO 8601 date or date-time string |
| `Url` | URL or absolute path string |

Properties of type `Uri` or `RichText` cannot be updated through this tool. Read-only properties (exclusively from a source scanner) cannot be set or cleared.

## Prompts

The Actian Data Intelligence Platform MCP Server provides pre-built prompts that help AI agents accomplish common tasks. These prompts guide the agent through multi-step workflows using the available tools.

| Prompt | Description | Parameters |
|---|---|---|
| `explore_schema` | Explore the structure and contents of a database schema. | `schema_name` — Name of the schema to explore. |
| `understand_dataset` | Understand a dataset's structure, fields, and relationships. | `dataset_reference` — Reference to the dataset (name, id, or URI). |
| `find_business_term` | Find a business term, concept, or definition in the glossary. | `concept` — Business term, concept, or question to search for. |
| `find_items` | Find items of a specific type matching a concept. | `item_type` — The type of items to filter by. `concept` — Concept included in the items to search for. |

## Pagination

Tools that return lists use one of two pagination styles:

**Offset-based pagination** — used by `find_glossary_definition`, `list_catalogs`, `get_item_audit_events`, `get_metamodel_item_types`, `get_metamodel_properties`, and `list_responsibilities`:

| Parameter / Field | Description |
|---|---|
| `offset` | Number of items to skip (zero-based). Default: `0`. |
| `limit` | Maximum items per page (1–100). Default: `20`. |
| `next_offset` | Pass this as `offset` to get the next page. `null` when on the last page. |

**Cursor-based pagination** — used by `search_items`, `get_glossary_implementations`, `search_contacts`, `semantic_search_glossary`, and `list_suggestions`:

| Parameter / Field | Description |
|---|---|
| `cursor` | Opaque cursor from a previous response's `next_cursor`. Omit for the first page. |
| `limit` | Maximum items per page (1–100). Default: `20`. |
| `next_cursor` | Pass this as `cursor` to get the next page. `null` when on the last page. |

All paginated responses include `items`, `total_count`, `limit`, and `has_more`. When `has_more` is `true`, request the next page using `next_offset` or `next_cursor`.

## Testing with MCP Inspector

The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) is a tool for testing and debugging MCP servers. You can use it to verify your connection to the Actian Data Intelligence Platform MCP Server and explore the available tools.

### Setup

1. Start the MCP Inspector:

   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. Configure the connection:
   - **Transport type**: `Streamable HTTP`
   - **URL**: `https://<your-tenant>.zeenea.app/api/mcp-server/mcp`
   - **Header Name**: `x-api-secret`
   - **Header Value**: `<your-api-key>`
   - **Request Timeout**: `30000`

3. Click **Connect**.

### Generating an API Key

The MCP Inspector requires API Key authentication. To generate an API key:

1. Open Actian Data Intelligence **Administration**.
2. Go to the **API keys** section.
3. Click **Create API key** and copy the generated key.

See [Remote Authentication Setup](amcp-remote-authentication.md) for full authentication details.

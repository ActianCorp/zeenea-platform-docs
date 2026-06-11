# Data Steward Agent

## Overview

The **Data Steward Agent** is a conversational data-catalog assistant embedded directly inside **Zeenea Studio**. It appears as a side panel next to whatever the user is doing in the catalog and helps them **explore, understand, document, and actively maintain** their catalog through natural language.

Unlike a generic chatbot, the Steward:

* Is **scoped to the active catalog** the user has open.
* Knows **what the user is currently looking at** (dataset, glossary term, data product, etc.).
* **Reads and writes** real catalog metadata using a curated set of tools.
* Always asks for **explicit approval** before making any changes.

It is designed for **data stewards, data engineers, analysts, and governance teams**.

## Target Users

| Persona | Primary Value |
| --- | --- |
| Data Steward Agent | Bulk enrichment, completion gaps, ownership audits, glossary linking |
| Data Engineer | Quickly understand schema, lineage, and downstream impact |
| Analyst | Discover datasets, glossary terms, and trusted owners via search |
| Governance Lead | Metamodel queries ("who owns what"), policy enforcement via tenant memory |

## Core Capabilities

The Steward focuses on four pillars:

### Catalog Navigation and Search

* Keyword search and **semantic (concept-based)** search across the catalog.
* Advanced filtered queries (item type, catalog, curator, connection, property values).
* Drill-down into any item, its schema (for datasets), and its linked items.
* Item-level and column-level **lineage** queries ("where does this come from / what depends on it").

### Item Creation

* Creates new catalog items (data processes, categories, glossary terms, custom types, etc.).
* Every new item ships with a **meaningful description**, and—when relevant—properties, contacts, alternative names, and glossary links in the **same approval**.

### Description and Metadata Enrichment

* Generates rich descriptions for undocumented items.
* Improves or rewrites existing descriptions while preserving intent.
* Updates properties, renames items, assigns or removes contacts, manages alternative names.
* Attaches glossary terms to items (Studio "Glossary items" / **Implements** links).
* Manages glossary **parent/child composition** between terms.

### Metamodel and Governance Queries

* "List all items owned by X."
* "Show datasets where property Y equals Z."
* "Which items lack a description / owner / glossary terms?"
* Batch updates across many items (for example, "change owner from X to Y on all datasets in catalog A").

## The Steward Panel (UI)

The Steward is reached through a **purple star button in the Studio header**. Clicking it opens a chat panel that can live in two layouts:

* **Compact card** — a small, draggable, resizable card.
* **Sidebar** — full-height panel docked to the right (only on screens ≥ 1200 px wide).

The panel state is remembered per user (position, size, expanded/compact, whether it was open).

### Panel Components

| Area | Purpose |
| --- | --- |
| **Header** | Title "Data Steward Agent", memory shortcut, expand/collapse, close |
| **New chat / threads toggle** | Open a fresh thread, list past conversations, delete old ones |
| **Message stream** | The conversation, including tool-call indicators and approval cards |
| **"Looking at" strip** | Always shows the item or catalog the Steward considers as current focus |
| **Composer** | Multi-line input with @mention dropdown for people |
| **Plan toggle** | Switches the next message into **Plan mode** (see §5) |
| **Send / Stop button** | Sends, or cancels an in-flight response |

### What The User Sees While The Agent Thinks

The Steward streams responses in real time. While it works, the panel shows:

* A subtle **animated glow** indicating activity.
* **Tool-call chips** with friendly labels ("Searching catalog", "Reading item details", "Checking lineage", "Applying catalog changes"…) that update from "in progress" → "done".
* The final natural-language answer in markdown (lists, tables, code blocks, GFM task lists).
* Optional **Suggested next steps** as one-tap chips at the bottom.

### Conversation Threads

* Conversations are persisted per user. Each gets an auto-generated title.
* Users can switch between threads, rename never (titles are LLM-generated), and **delete** them.
* Only **one active stream per user**: starting a new message aborts the previous one.

## Conversation Modes — Standard Vs Plan

The Steward supports two modes, toggled in the composer.

### Standard Mode (Default)

* Free-flowing chat. The Steward reads and, when needed, **writes** to the catalog.
* Every write is gated by an inline approval card.

### Plan Mode

* The Steward **cannot write** in this turn. It is forced to **think out loud**.
* Instead of executing, it produces a structured **Plan card** with:
    * A short **summary**
    * **Ordered steps** (title + detail per step)
    * Optional **Assumptions** and **Risks**
* The user can **expand** the plan in a modal, **copy** it, **iterate** ("change step 2 to…"), then either:
    * Click **Execute Plan** — the Steward switches to Standard mode and carries out the plan, still going through the normal approval flow on every write.
    * Click **Decline** — the plan is dropped; the conversation continues.

!!! note
    Plan mode is the recommended workflow whenever the user is about to perform **broad, holistic, or multi-step changes** (for example, completing an item to 100%, batch enrichment, restructuring a glossary).

When the user is in Standard mode but the Steward judges the work to be plan-worthy, it can **suggest a "Switch to Plan & …" action** that flips the mode and prompts the request in one tap.

## The Approval Flow (Write Safety)

The Steward never silently mutates the catalog. There are two writes it can perform, both gated:

### Catalog Writes (`applyCatalogWrites`)

A **single tool call** can bundle one or many changes:

* Create items (with description, properties, contacts, alt names, glossary links inline).
* Update items (rename, edit description, update properties, add/remove contacts, manage alternative names, link glossary terms, set glossary parent/child composition).

Up to **25 operations per call**, all approved with **one click**.

When approval is required, the panel shows an **approval card** preview:

* **Catalog name** (where the change lands)
* **Operation kind**: Create / Update / Change
* **Item name + type tag**
* **Name change** (with `old → new` if renaming)
* **Description** (rendered as markdown)
* **Properties** (label → value)
* **Glossary links** (parent/child) and **Glossary items** (Implements)
* **Contacts** to add (with their responsibility role) and **contacts to remove**
* **Alternative names**

For **multi-operation batches**, a "View details" button opens a full modal that lists every operation. Users can:

* **Approve** the full batch
* **Decline** the full batch
* For genuinely multi-row batches: **Approve all** in one tap, or step through item-by-item

Once approved, the Steward executes, reports progress, and offers follow-up actions.

### Tenant Memory Writes (`updateTenantMemory`)

* The Steward proposes the new memory text; the user must approve.
* The approval modal shows **Current** vs **Proposed** content side by side.

!!! warning "Important"
    Even when the user has approved a Plan (§5), each individual write still goes through its own approval card. Approving the plan does not waive write approval.


## Tools Available To The Steward

These are the abilities the agent can use. Users do not call them directly — they manifest as the "Steward is doing X" chips in the panel.

### Read Tools

| **Tool** | **What it does** |
| --- | --- |
| **listCatalogs** | Lists catalogs the user can access (used only when the user names a different catalog). |
| **searchCatalog** | Keyword search; filterable by item type. |
| **semanticSearch** | Concept-based search ("tables about revenue"). |
| **filterItems** | Advanced filtered queries (by item type, catalog, curator, connection, property values). |
| **getItem** | Full details of one item: name, description, type, properties, contacts, completion ratio, lifecycle… |
| **getItemLinks** | Everything linked to an item, in both directions (glossary terms, parent/child, related items…). |
| **getDatasetSchema** | Fields/columns, data types, primary/foreign keys for a dataset. |
| **getLineage** | Item-level upstream/downstream lineage graph. |
| **getLineageFields / getFieldLineage** | Column-level lineage for a specific field. |
| **getCompletionCriteria** | What counts toward completion for an item type (description, required/important properties, contacts, glossary linking). |
| **listItemTypes** | All available item types in the metamodel. |
| **listResponsibilities** | All available responsibility roles (Data Owner, Steward, Reader…). |
| **searchContacts** | Resolves a person's name/email to their contact record. |

### Write Tools (Require Approval)

| **Tool** | **What it does** |
| --- | --- |
| **applyCatalogWrites** | The **single** entry point for all catalog mutations (creates + updates, batched). |
| **updateTenantMemory** | Saves a tenant-wide instruction the Steward will follow for every future conversation. |

### UI Tools (Presentation Only)

| **Tool** | **What it does** |
| --- | --- |
| **presentPlan** | Renders the structured Plan card (Plan mode). |
| **presentChatActions** | Renders the "Suggested next steps" chips below an answer. |

## Knowledge Model — Concepts The Steward Understands

The Steward speaks the Zeenea metamodel natively:

* **Catalog** — the workspace the user has selected. The Steward always works inside the active catalog unless explicitly told otherwise.
* **Item** — any catalog entity. Each item has a **type** (dataset, glossary term, data product, data process, visualization, category, custom item, use case, data product output port…).
* **Properties** — administrator-defined metadata fields attached to items, per type template (Standard, Important, Required).
* **Contacts / Curators** — people responsible for an item, with a **responsibility role** (Owner, Steward, Reader…).
* **Glossary terms** — business vocabulary. They have a **parent/child hierarchy** (the API calls this "Composes"; the Steward always presents it as parent/child).
* **Implements** — the link between an item and a glossary term (what appears in Studio's "Glossary items" section).
* **Lineage** — item-level and field-level data flow.
* **Schema** — the fields of a dataset, with types and keys.
* **Completion ratio** — how fully documented an item is. The Steward reads the number from the platform and uses **getCompletionCriteria** to know **which dimensions** count (description, properties, contacts, glossary implements) for a given item type.

!!! note "Naming discipline"
    when the Steward refers to a catalog item, it always names it **plus its type** ("the dataset Customer Orders"), and presents glossary hierarchy in user-friendly terms ("parent" / "child"), never the raw API predicate.

## Stewardship Workflows

These are the canonical flows the Steward is optimized for.

### Generate a Description From Scratch

1. Steward reads the item (`getItem`), the dataset schema if applicable, lineage, and linked glossary terms.
2. Writes a markdown description: what the data represents, business purpose, key characteristics, caveats.
3. Submits one update through the approval card.

### Improve an Existing Description

* Preserves the original intent; tightens clarity, structure, and completeness.

### Reach 100% Completion on an Item

The Steward follows a **mandatory** checklist when completion is below 100%:

1. Fetch the item and its links.
2. Check the completion criteria for this type.
3. Close gaps:
    * **Description** — generate or improve.
    * **Properties** — fill Required / Important properties.
    * **Contacts** — **before asking the user**, look at similar items in the catalog, see who stewards them, and propose the same pattern (citing which peer item it mirrored).
    * **Glossary items (Implements)** — if the type supports it, link relevant glossary terms to **this** item.
4. Bundle everything into a single approval batch.

### Bulk Metadata Updates

Example: "Change owner from Alice to Bob on every dataset in catalog X."

1. Query the matching items (`filterItems`) and present the full list with a count.
2. Wait for confirmation.
3. Apply one update per item, in batches of up to 25 per approval.
4. Report progress.

### Glossary Structuring

* The Steward will not invent parent/child links. It uses metamodel rules ("Composes" item-type links) and only proposes valid parents.
* For new terms: it first **searches existing glossary terms** that could fit, and offers both **"Link existing"** and **"Create new"** as next steps.

### Item Creation

* Discovers available item types.
* Creates the item with description plus any applicable enrichment (properties, contacts, alt names, glossary links) inline.
* One approval covers the whole "create + enrich" story.

## Context Awareness

The Steward always knows three things from the Studio UI:

1. **The active catalog** — whatever the user picked in the catalog switcher.
2. **The current item** — when the user is on an item page (dataset, glossary term, etc.), the Steward resolves "this dataset", "this item", "the current table" automatically.
3. **The current URL** — used as additional context (for example, for ambiguity resolution).

This appears in the panel as a small **"Looking at: <item name> [type tag]"** strip just above the composer. If the user is on a generic page (no specific item), this falls back to the catalog name.

The user does not have to mention the item or catalog by name in any message.

## Memory and Personalization

### Conversation Memory (Per Thread)

* Each thread keeps its own message history.
* The agent uses the **last 40 messages** as context.
* A **title** is auto-generated for each thread.

### Tenant Memory (Per Tenant)

Accessible via the **light-bulb icon** in the Steward header.

* A free-text area (up to 4000 characters) where users can write **instructions, conventions, or policies** the Steward will follow for **every conversation, for every user in the tenant**.
* Examples:
    * "Always use formal language in descriptions."
    * "Property *PII Sensitivity* is mandatory on every dataset."
    * "When creating glossary terms, use sentence case."
* The Steward can also be asked to update memory in conversation ("Remember that…") — those updates go through the same approval flow.
* The Steward **refuses** memory writes that are unrelated to data catalog stewardship (recipes, identity overrides, jailbreaks).

## Conversation UX Details

A few touches that shape the experience:

* **Suggested next steps** — after most answers, the Steward offers 2–6 one-tap follow-ups, including mixed paths (for example, "Link existing term X" / "Create a new term"). Some suggestions automatically switch to **Plan mode** before sending.
* **Created-item cards** — when the Steward creates one or more items, the panel renders a **"Created: <name>"** card with a **"View item"** button that takes the user straight to the new item in Studio.
* **GFM task lists** — completion status overviews use `[x]` / `[ ]` checklists, so the user can see at a glance what is present and what is missing.
* **Markdown rendering** — answers, descriptions, and plans render fully styled (headings, lists, code, tables, links).
* **@mentions** — the composer supports `@` to mention people, with an autocomplete dropdown that resolves to real contact records.
* **Stop generating** — the send button becomes a "Stop" button during streaming.

## Safety and Guardrails

The Steward enforces several layers of safety:

| **Layer** | **What it does** |
| --- | --- |
| **Authentication** | Every request requires the user's Studio JWT; tenant is verified from token claims. |
| **Tenant isolation** | All catalog calls are scoped to the user's tenant; mismatched tenant headers are rejected. |
| **Approval on writes** | Every catalog write and every memory write goes through an explicit approval card. Plan execution does **not** bypass this. |
| **Prompt-injection detector** | Blocks classic jailbreak / system-override / injection patterns in user input. |
| **Content moderation** | Flags hostile profanity, harassment, or hate; the message is blocked and a polite refusal is shown. |
| **Scope guard on tenant memory** | The Steward refuses to save memory unrelated to its stewardship role. |
| **Single active stream per user** | Newer messages abort previous streams to avoid concurrent writes. |
| **No fabrication** | The system prompt forbids inventing catalog facts; if a lookup returned nothing, the Steward says so plainly. |

## Limitations

* **Catalog scope is required**: the Steward only runs when the user has a catalog selected in Studio. There is no catalog-less mode.
* **Item-type capabilities**: not every operation is available on every item type. Examples:
    * Alternative names: glossary items only.
    * Dataset schema: datasets only.
    * Glossary parent/child composition: only between glossary items, constrained by the metamodel.
    * Contacts: only types that support them.
* The Steward **silently skips** operations not applicable to an item type; it does not surface them as errors.
* The completion **score** itself is computed by the platform; the Steward can only explain it, not recompute it.
* **Per-call limit**: a single approval batch carries up to **25 operations**. Larger jobs are split into multiple approval cards.

## UI Labels

| **Label seen in the panel** | **Meaning** |
| --- | --- |
| **Data Steward Agent** | Panel title |
| **Looking at** | Currently focused item or catalog |
| **New chat** | Start a fresh conversation thread |
| **Tenant Memory** | Persistent instructions shared by everyone in the tenant |
| **Plan** (toggle) | Switch the next turn into Plan mode |
| **Execute Plan** | Approve a presented plan and run it |
| **Approve / Decline** | Approve or reject a single proposed change |
| **Approve all** | Approve every pending change in a multi-row batch |
| **View details** | Open the full approval modal for a change |
| **Suggested next steps** | One-tap follow-up actions |
| **Created <item>** + **View item** | A new item was created; jump to it in Studio |
| **Stop generating** | Cancel the in-flight response |

!!! note "Summary"
    The **Data Steward Agent** is a context-aware chat companion inside Zeenea Studio that turns natural-language requests into safe, approved catalog actions — from searching and explaining items, to writing descriptions, fixing completion gaps, linking glossary terms, and running large governance batches — without ever leaving the page the user is on.
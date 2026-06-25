# Data Steward Agent

The **Data Steward Agent** is a conversational assistant built into Zeenea Studio. It sits in a side panel next to whatever you are working on and helps you **explore, understand, document, and maintain** your catalog using plain language — no query syntax to learn.

You can ask it to find datasets, explain where data comes from, write descriptions, fill in missing documentation, link glossary terms, or update many items at once. The Agent knows which catalog you have open and which item you are viewing, so you rarely need to spell out the details. It always shows you exactly what it intends to change and waits for your approval before touching the catalog.

It is built for **data stewards, data engineers, analysts, and governance teams**.

## Prerequisites

- Access to **Zeenea Studio** with permission to view and edit the catalog.
- The **Steward agent enabled** by an administrator. It is turned off by default — see [Administration](#administration).
- Your group granted **access to the Steward agent** by an administrator.
- For the full sidebar layout: a screen at least **1200 px** wide. On smaller screens, the Agent opens as a compact card.

## Opening the Agent

Click the **purple star button** in the Studio header to open the chat panel.

The panel opens in one of two layouts, and remembers your choice for next time:

- **Compact card** — a small, draggable, resizable card you can position anywhere.
- **Sidebar** — a full-height panel docked to the right (screens ≥ 1200 px wide).

Just above the input box, a **"Looking at"** strip shows the item or catalog the Agent is currently focused on. This is how it understands phrases like *"this dataset"* or *"the current table"* — so you can ask questions without naming the item.

## What You Can Ask

Type your request in plain language. Below are the most common things to ask, with example prompts you can adapt.

### Find and understand items

Search and explore the catalog by keyword or by concept:

- *"Find tables about revenue."*
- *"Show me datasets owned by Alice in this catalog."*
- *"Which items are missing a description or an owner?"*
- *"What does the Customer Orders dataset contain?"*
- *"Where does this dataset come from, and what depends on it?"*
- *"Show the column-level lineage for the `email` field."*

### Write and improve documentation

Let the Agent draft or polish your metadata:

- *"Write a description for this dataset."*
- *"Improve the description on this glossary term, keep the meaning."*
- *"Set the owner of this item to Bob."*
- *"Add an alternative name 'Client' to this glossary term."*

### Link glossary terms

- *"Link the relevant glossary terms to this dataset."*
- *"Make 'Customer' the parent of 'Prospect'."*

When you ask for a new term, the Agent first checks whether a matching one already exists and offers to **link the existing term** or **create a new one**.

### Make changes across many items

- *"Change the owner from Alice to Bob on every dataset in this catalog."*
- *"Add the PII Sensitivity property to all datasets that don't have it."*

For a bulk request, the Agent shows you the full list of matching items and a count, waits for your confirmation, then applies the changes.

### Create new items

- *"Create a glossary term called 'Churn Rate' and write a description for it."*

The Agent creates the item and adds the description, properties, contacts, and glossary links in a single step.

!!! tip
    After most answers, the Agent offers **Suggested next steps** as one-tap chips at the bottom of the panel — for example *"Link existing term"* or *"Create a new term"*. Use them to keep moving without typing.

## Approving Changes

The Agent never changes the catalog on its own. Whenever it wants to write, it shows an **approval card** so you can review first.

The card previews exactly what will happen:

- The **catalog** the change lands in.
- Whether the item is **created** or **updated**, with its name and type.
- Any **renamed** name (shown as `old → new`).
- The **description**, **properties**, **glossary links**, **contacts** added or removed, and **alternative names**.

To act on a change:

1. Review the preview on the approval card.
2. Click **Approve** to apply it, or **Decline** to reject it.
3. For a batch of changes, click **View details** to open the full list, then **Approve all** to apply everything at once — or step through the items one by one.

Once you approve, the Agent applies the change, reports progress, and offers follow-up actions. When it creates an item, a **"Created"** card appears with a **View item** button that takes you straight to it in Studio.

## Plan Mode — for big or multi-step jobs

For broad work — completing an item to 100%, enriching many items, or restructuring a glossary — switch on **Plan** in the input box before sending your request.

In Plan mode, the Agent **does not make any changes**. Instead, it returns a **plan card** describing what it intends to do:

- A short **summary**.
- **Ordered steps**, each with a title and detail.
- Any **assumptions** and **risks** worth knowing.

From the plan card you can:

- **Expand** it in a modal or **copy** it.
- **Iterate** on it — *"change step 2 to…"* — until it looks right.
- Click **Execute Plan** to carry it out, or **Decline** to drop it.

!!! note
    Plan mode is the recommended way to handle anything broad or multi-step. If you start a plan-worthy request in normal chat, the Agent may suggest a **"Switch to Plan"** action that flips the mode for you.

!!! warning "Important"
    Approving a plan does **not** approve the individual changes. Each write inside the plan still shows its own approval card when the Agent reaches it.

## Reaching 100% Completion

To fully document an item, ask:

> *"Complete this item to 100%."*

The Agent checks what counts toward completion for that item type, then closes the gaps in one reviewable batch:

- **Description** — drafts or improves it.
- **Properties** — fills in the required and important fields.
- **Contacts** — looks at how similar items in the catalog are staffed and proposes the same owners, telling you which item it copied the pattern from.
- **Glossary terms** — links the relevant terms, when the item type supports them.

You review everything on a single approval card before anything is saved.

## Managing Conversations

- **Start a new chat** with the **New chat** button to keep topics separate. Each conversation gets an automatic title.
- **Switch between past conversations** or **delete** ones you no longer need from the threads list.
- **Mention people** with `@` in the input box — an autocomplete dropdown resolves names to real contacts.
- **Stop a response** mid-stream with the **Stop** button (the Send button becomes Stop while the Agent is working).

!!! note
    Only one response runs at a time. Sending a new message stops the response in progress.

## Administration

Administrators manage the Steward agent in the **Admin app**, under the **Agents** tab. This section is for administrators; everyday users can skip it. For the full workflow, see [Managing Agents](../../administration/zeenea-managing-agents.md).

### Enabling the Steward agent

The Steward agent is **disabled by default**. An administrator must enable it on the **Agents** tab before anyone can use it.

### Granting the permission to manage agents

The right to administer agents is controlled by the **Manage agents** permission. Grant it to a group on the **Edit group** page. Members of that group can then enable agents, edit their settings, and manage access.

### Granting access to the Steward agent

Decide which groups can use the Steward agent:

- On the **Edit group** page, use the **Agent access** section to grant a Steward-type group permission to use the Steward agent.
- For convenience, an agent administrator can also manage the full list of groups allowed to use the agent directly from the **Edit agent** page.

### Setting shared instructions

The Steward agent follows a set of shared instructions that apply to **every conversation, for everyone** allowed to use it. Edit these instructions in the agent's edition form on the **Edit agent** page.

Use them for conventions and policies, for example:

- *"Always use formal language in descriptions."*
- *"The PII Sensitivity property is mandatory on every dataset."*
- *"When creating glossary terms, use sentence case."*

!!! note
    Shared instructions affect every user allowed to use the Steward agent. Coordinate before changing them.

## How Your Data Stays Safe

- **Every change is reviewed by you.** The Agent never writes to the catalog without an approval card, even when running an approved plan.
- **Your catalog stays private.** The Agent only works within your organization's data and the catalog you have open.
- **It won't make things up.** If a search or lookup returns nothing, the Agent tells you plainly instead of inventing an answer.
- **It stays on task.** The Agent declines requests unrelated to catalog stewardship.

## Architecture and Data Residency

This section explains where the Steward agent runs and where your data is stored, for governance and security reviews.

The Steward agent runs **inside the same Kubernetes cluster as your tenant**. Its components and the data that flows through them are described below.

| Component | Where it runs | What it stores |
| --- | --- | --- |
| **Steward agent** | Same Kubernetes cluster as your tenant | The running agent; no separate data store of its own. |
| **Agent database (PostgreSQL)** | Same Kubernetes cluster as your tenant | Conversation threads and agent state. |
| **LiteLLM gateway** | Same Kubernetes cluster as your tenant | Routes the agent's LLM calls. Records **call statistics only** — not the content of your messages. |
| **AWS Bedrock** | AWS | Runs the language models. Call logs are stored in the **same AWS region** the call came from, with **restricted access**. |
| **LangSmith** | Hosted instance in AWS **eu-west-3** | Agent traces, used to improve the agent. |

A few points worth highlighting:

- **The agent and its database stay in your tenant's cluster.** Your conversations and agent state do not leave that cluster.
- **LLM calls use regional models, not global ones.** Inference runs on region-scoped models in AWS Bedrock rather than global cross-region models, so calls are not routed outside the model's region.
- **Bedrock call logs stay in their source region** and are kept with restricted access.
- **Traces are used to improve the agent.** The Steward sends execution traces to a hosted LangSmith instance in AWS eu-west-3.

## Limitations

- **Some actions depend on the item type.** For example, alternative names apply to glossary terms only, schemas to datasets only, and glossary parent/child links only between glossary terms. The Agent quietly skips actions that don't apply to an item rather than reporting an error.
- **The completion score comes from the platform.** The Agent can explain what the score means and help you raise it, but it doesn't calculate the number itself.
- **Very large jobs are split up.** Bulk changes are grouped into several approval cards, so you may approve more than one batch for a single big request.

## Troubleshooting

**I don't see the purple star button in Studio**
The Steward agent may be disabled, or your group may not have access to it. Ask an administrator to enable it and grant your group access — see [Administration](#administration).

**The Agent opens as a small card instead of a full sidebar**
The sidebar layout needs a screen at least 1200 px wide. On narrower screens the Agent uses the compact card. Widen the window or use the card layout.

**The Agent says "this item" but is looking at the wrong thing**
Check the **"Looking at"** strip above the input box. If it shows the wrong item or just the catalog name, open the item you mean in Studio, or name the item directly in your message.

**My change didn't appear after I approved it**
Approved changes apply in the background. Refresh the item page in Studio if you don't see the update right away.

**A property I asked to fill wasn't set**
The property may not apply to that item type, or the Agent may have skipped it as not applicable. Ask the Agent *"why wasn't the property set?"* for an explanation.

**The Agent refused my request**
The Agent declines requests that fall outside catalog stewardship. Rephrase the request around a catalog task.

## Related Resources

- [Managing Agents](../../administration/zeenea-managing-agents.md) — administration: enabling the agent, access, and shared instructions
- [Managing Groups](../../administration/zeenea-managing-groups.md) — the *Manage agents* permission and *Agent Access*
- [Item Documentation](./zeenea-item-documentation.md)
- [Editing Items in Bulk](./zeenea-editing-items-in-bulk.md)
- [Documentation Completion Level](./zeenea-doc-completion-level.md)
- [Adding & Removing Item Contacts](./zeenea-add-remove-item-contacts.md)
- [Searching the Catalog](./zeenea-studio-search.md)

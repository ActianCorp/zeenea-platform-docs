# Data Steward Agent

The **Data Steward Agent** is a conversational assistant built into Studio. It appears in a side panel next to whatever you are working on and helps you **explore, understand, document, and maintain** your catalog using plain language. No query syntax required.

You can ask the agent to find datasets, explain where data comes from, write descriptions, fill in missing documentation, link glossary terms, or update multiple items at once. The Agent knows which catalog you have open and which item you are viewing, so you rarely need to provide additional details. 

Before making any changes, the agent always shows you exactly what it plans to update and waits for your approval.

The Data Steward agent is designed for **data stewards, data engineers, analysts, and governance teams**.

## Prerequisites

- Access to **Studio** with permission to view and edit the catalog.
- The **Steward agent must be enabled** by an administrator. It is disabled by default — see [Administration](#administration).
- Your group must be granted **access to the Steward agent** by an administrator.
- For the full sidebar layout, use a screen that is at least **1200 px** wide. On smaller screens, the Agent opens as a compact card.

## Opening the Agent

**To open the chat panel:**

1. Open **Studio**.
2. Click the **purple star** button in the Studio header.
   
   The chat panel opens in one of two layouts and remembers your selection for next time:
      
      - **Compact card**: A small, draggable, resizable card that you can position anywhere.
      - **Sidebar**: A full-height panel docked to the right (screens ≥ 1200 px wide).

Just above the input box, a **"Looking at"** strip shows the item or catalog that the Agent is currently focused on. This enables the Agent to understand references such as *"this dataset"* or *"the current table"*, so you can ask questions without naming the item.

## What You Can Ask

Enter your request in plain language. The following examples show common tasks and sample prompts that you can adapt.

### Find and Understand Items

Search and explore the catalog by keyword or by concept:

- *"Find tables about revenue."*
- *"Show me datasets owned by Alice in this catalog."*
- *"Which items are missing a description or an owner?"*
- *"What does the Customer Orders dataset contain?"*
- *"Where does this dataset come from, and what depends on it?"*
- *"Show the column-level lineage for the `email` field."*

### Write and Improve Documentation

Let the Agent draft or refine your metadata:

- *"Write a description for this dataset."*
- *"Improve the description on this glossary term, keep the meaning."*
- *"Set the owner of this item to Bob."*
- *"Add an alternative name 'Client' to this glossary term."*

### Link Glossary Terms

- *"Link the relevant glossary terms to this dataset."*
- *"Make 'Customer' the parent of 'Prospect'."*

When you ask for a new term, the Agent first checks whether a matching term already exists and offers to **link the existing term** or **create a new one**.

### Make Changes Across Many Items

- *"Change the owner from Alice to Bob on every dataset in this catalog."*
- *"Add the PII Sensitivity property to all datasets that don't have it."*

For a bulk request, the Agent shows you the full list of matching items along with a count, waits for your confirmation, and then applies the changes.

### Create New Items

- *"Create a glossary term called 'Churn Rate' and write a description for it."*

The Agent creates the item and adds the description, properties, contacts, and glossary links in a single step.

!!! tip
    After most responses, the Agent displays **Suggested next steps** as one-tap chips at the bottom of the panel — for example *"Link existing term"* or *"Create a new term"*. Use these suggestions to continue without typing.

## Approving Changes

The Agent never changes the catalog on its own. When it needs to make changes, it displays an **approval card** so you can review them first.

The approval card previews exactly what will happen:

- The **catalog** where the changes will be applied.
- Whether the item is **created** or **updated**, with its name and type.
- Any **renamed** name (shown as `old → new`).
- The **description**, **properties**, **glossary links**, **contacts** added or removed, and **alternative names**.

To apply or reject changes:

1. Review the preview on the approval card.
2. Click **Approve** to apply the changes, or **Decline** to reject them.
3. For multiple changes, click **View details** to open the full list. Then click **Approve all** to apply all changes at once, or review and approve items individually.

After you approve, the Agent applies the changes, reports progress, and suggests follow-up actions. When the agent creates an item, a **"Created"** card appears with a **View item** button that opens the item in Studio.

## Plan Mode — for Big or Multi-Step Jobs

For broader tasks — such as completing an item to 100%, enriching multiple items, or restructuring a glossary — turn on **Plan** in the input box before sending your request.

In Plan mode, the Agent **does not apply any changes**. Instead, it displays a **plan card** that describes what it intends to do:

- A short **summary**.
- **Ordered steps**, each with a title and detail.
- Any **assumptions** and **risks** to consider.

From the plan card, you can:

- **Expand** it in a modal or **copy** it.
- **Iterate** on it — for example, *"change step 2 to…"* — until it meets your needs.
- Click **Execute Plan** to carry it out, or **Decline** to discard it.

!!! note
    Plan mode is recommended for broad or multi-step tasks. If you start such a request in normal chat mode, the Agent may suggest a **Switch to Plan** action that enables Plan mode for you.

!!! warning "Important"
    Approving a plan does **not** approve the individual changes. Each write action inside the plan still shows its own approval card when the Agent reaches the corresponding step.

## Reaching 100% Completion

To fully document an item, ask:

> *"Complete this item to 100%."*

The Agent checks what contributes to completion for that item type and then addresses the gaps in a single reviewable batch:

- **Description**: Drafts or improves the description.
- **Properties**: Fills in required and important fields.
- **Contacts**: Identifies how similar items in the catalog are assigned and proposes the same owners, indicating which item the recommendation is based on.
- **Glossary terms**: Links relevant terms when the item type supports them.

You review all proposed changes on a single approval card before they are applied.

## Managing Conversations

- **Start a new chat** by clicking the **New chat** button to keep topics separate. Each conversation gets an automatic title.
- **Switch between past conversations** or **delete** those you no longer need from the threads list.
- **Mention people** by typing `@` in the input box. An autocomplete list helps you select contacts.
- **Stop a response** while it is running by clicking **Stop** button (the **Send** button changes to **Stop** while the Agent responds).

!!! note
    Only one response runs at a time. Sending a new message stops the current response.

## Administration

Administrators manage the Steward agent from the **Agents** tab in **Administration**. This section is intended for administrators; everyday users can skip it. For more information about the full workflow, see [Managing Agents](../../administration/zeenea-managing-agents.md).

### Enabling the Steward agent

The Steward agent is **disabled by default**. An administrator must enable it on the **Agents** tab before users can use it.

### Granting Permission to Manage Agents

The **Manage agents** permission controls who can manage agents. Grant this permission to a group on the **Edit group** page. Members of that group can then enable agents, edit agent settings, and manage access.

### Granting access to the Steward agent

Decide which groups can use the Steward agent:

- On the **Edit group** page, use the **Agent access** section to grant a Data Steward-type group permission to use the Steward agent.
- For convenience, an agent administrator can also manage the list of groups allowed to use the agent directly from the **Edit agent** page.

### Setting Shared Instructions

The Steward agent follows a set of shared instructions that apply to **every conversation for all users** who are allowed to use it. You can edit these instructions on the **Edit agent** page.

Use shared instructions to define conventions and policies, for example:

- *"Always use formal language in descriptions."*
- *"The PII Sensitivity property is mandatory on every dataset."*
- *"When creating glossary terms, use sentence case."*

!!! note
    Shared instructions affect all users who are allowed to use the Steward agent. Coordinate before making changes.

## How Your Data Stays Safe

- **Every change requires your approval.** The Agent never updates the catalog without an approval card, even when executing an approved plan.
- **Your catalog remains private.** The Agent works only within your organization's data and the catalog you have open.
- **It does not fabricate results.** If a search or lookup returns no results, the Agent reports this instead of generating an answer. 
- **It stays focused on catalog stewardship.** The Agent declines requests that are unrelated to catalog stewardship.

## Architecture and Data Residency

This section explains where the Steward agent runs and where your data is stored for governance and security reviews.

The Steward agent runs **within the same Kubernetes cluster as your tenant**. The following table describes its components and the data that flows through them. 
Its components and the data that flows through them are described below.

| Component | Where it runs | What it stores |
| --- | --- | --- |
| **Steward agent** | Same Kubernetes cluster as your tenant | The running agent; no separate data store. |
| **Agent database (PostgreSQL)** | Same Kubernetes cluster as your tenant | Conversation threads and agent state. |
| **LiteLLM gateway** | Same Kubernetes cluster as your tenant | Routes the agent's LLM calls. Records **call statistics only**, not message content. |
| **AWS Bedrock** | AWS | Runs the language models. Call logs are stored in the **same AWS region** as the request, with **restricted access**. |
| **LangSmith** | Hosted instance in AWS **eu-west-3** | Agent traces used to improve the agent. |

Key points:

- **The agent and its database remain in your tenant’s cluster.** Conversations and agent state do not leave the cluster.  
- **LLM calls use regional models, not global models.** Inference runs on region-specific models in AWS Bedrock rather than global cross-region models, so requests are not routed outside the model's region.  
- **Bedrock call logs remain in their source region** and are kept with restricted access.  
- **Execution traces are used to improve the agent.** The Steward agent sends execution traces to a hosted LangSmith instance in AWS **eu-west-3**.

## Limitations

- **Some actions depend on the item type.** For example, alternative names apply only to glossary terms, schemas apply only to datasets, and glossary parent/child links are supported only between glossary terms. The agent skips unsupported actions for a given item type instead of reporting an error. 
- **The completion score comes from the platform.** The Agent can explain what the score means and help you improve it, but it does not calculate the score itself.
- **Very large jobs are processed in batches.** Bulk changes are split into multiple approval cards, so you may need to approve more than one batch for a single request.

## Troubleshooting

**1. I do not see the purple star button in Studio**

The Steward agent may be disabled, or your group may not have access. Ask an administrator to enable the agent and grant your group access. For more information, see [Administration](#administration).

**2. The Agent opens as a small card instead of a full sidebar**

The sidebar layout requires a screen that is at least 1200 px wide. On narrower screens the Agent opens as a compact card. Increase the window size or continue using the card layout.

**3. The Agent says "this item" but refers to the wrong item**

Check the **"Looking at"** strip above the input box. If it shows the wrong item or only the catalog name, open the correct item in Studio or specify the item explicitly in your request.

**4. My change did not appear after approval**

Approved changes are applied in the background. Refresh the item page in Studio if the updates do not appear immediately.

**5. A property I asked to fill was not set**

The property may not apply to that item type, or the Agent may have skipped it because it is not applicable. Ask the Agent *"why wasn't the property set?"* for more details.

**6. The Agent refused my request**

The Agent declines requests that are unrelated to catalog stewardship. Rephrase your request so that it focuses on a catalog task.

## Related Resources

- [Managing Agents](../../administration/zeenea-managing-agents.md) — Administration: enabling the agent, access, and shared instructions
- [Managing Groups](../../administration/zeenea-managing-groups.md) — The *Manage agents* permission and *Agent Access*
- [Item Documentation](./zeenea-item-documentation.md)
- [Editing Items in Bulk](./zeenea-editing-items-in-bulk.md)
- [Documentation Completion Level](./zeenea-doc-completion-level.md)
- [Adding & Removing Item Contacts](./zeenea-add-remove-item-contacts.md)
- [Searching the Catalog](./zeenea-studio-search.md)

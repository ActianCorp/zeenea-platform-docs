# Managing Agents

Zeenea agents are conversational assistants embedded in the platform. The **Data Steward Agent** helps users explore, document, and maintain the catalog from a chat panel in Studio — see [Data Steward Agent](../studio/stewardship/data-steward.md).

Administer agents from the **Administration** section, on the **Agents** tab.

## Permission required

Administering agents requires the **Manage agents** permission. Grant it to a Data Steward-type group on the **Edit group** page — see [Managing Groups](./zeenea-managing-groups.md). Members of a group with this permission can enable agents, edit their settings, and manage which groups may use them.

## Enabling the Steward agent

The Steward agent is **disabled by default**. No one can use it until an administrator turns it on.

To enable it:

1. Open the **Agents** tab in the Administration section.
2. Select the **Steward agent**.
3. Enable it.

Once enabled, the agent becomes available to every group that has been granted access to it.

## Granting access to the Steward agent

Use is controlled per group. A group can only use the Steward agent if it has been granted access. There are two ways to manage this:

* **From the group** — on the **Edit group** page, use the **Agent access** section to grant a Data Steward-type group permission to use the Steward agent. See [Managing Groups](./zeenea-managing-groups.md).
* **From the agent** — for convenience, on the **Edit agent** page you can manage the full list of groups allowed to use the agent in one place.

!!! note
    Only Data Steward-type groups can be granted access to the Steward agent.

## Setting the agent's shared instructions

The **Edit agent** page also holds the agent's shared instructions — guidance the Steward agent follows in **every conversation, for everyone** allowed to use it.

Use them for conventions and policies, for example:

* *"Always use formal language in descriptions."*
* *"The PII Sensitivity property is mandatory on every dataset."*
* *"When creating glossary terms, use sentence case."*

!!! note
    Shared instructions affect every user allowed to use the Steward agent. Coordinate before changing them.

# Managing Agents

Agents are conversational assistants embedded in the platform. The **Data Steward Agent** helps you explore, document, and maintain the catalog from a chat panel in Studio. For more information, see [Data Steward Agent](../studio/stewardship/data-steward.md).

You can manage agents from the **Agents** tab in **Administration**.

## Permission Required

To manage agents, you must have the **Manage agents** permission. Grant this permission to a Data Steward-type group from the **Edit group** page. For more information, see [Managing Groups](./zeenea-managing-groups.md). 

Members of groups with this permission can enable agents, edit agent settings, and manage which groups can use them.

## Enabling Steward Agent

The Steward agent is **disabled by default**. No one can use it until an administrator enables it.

To enable the agent:

1. Open **Administration**.
2. Select the **Agents** tab.
3. Click the pencil icon next to the **Steward agent** in the **Action** column.
   
   The **Edit agent** page opens.

4. Turn on the **Enable** switch. 
5. Click **Save changes**.

After you enable the agent, it becomes available to all groups that have been granted access.

## Granting Access to Steward Agent

Access is managed at the group level. A group can use the Steward agent only if it has been granted access.

You can grant access in one of the following ways:

* **From the group**: On the **Edit group** page, use the **Agent access** section to grant a Data Steward-type group permission to use the Steward agent. For more information, see [Managing Groups](./zeenea-managing-groups.md).
* **From the agent**: On the **Edit agent** page, you can manage the list of groups allowed to use the agent in one place.

!!! note
    Only Data Steward-type groups can be granted access to the Steward agent.

## Setting Shared Instructions

The **Edit agent** page also includes the agent's shared instructions — guidance that the Steward agent follows in **every conversation for all users** who are allowed to use it.

Use shared instructions to define conventions and policies, for example:

* *"Always use formal language in descriptions."*
* *"The PII Sensitivity property is mandatory on every dataset."*
* *"When creating glossary terms, use sentence case."*

!!! note
    Shared instructions affect all users who are allowed to use the Steward agent. Coordinate before making changes.

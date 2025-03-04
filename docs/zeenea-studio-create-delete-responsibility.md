---
title: Creating, Editing, or Deleting Responsibilities
---

# Creating, Editing, or Deleting Responsibilities

A responsibility is the relationship between a contact (individual, team, or entity), whether internal or external to the company, and an item.

## Why define Responsibilities?

Defining responsibilities in the catalog allows you to list the different types of parties involved in the data or its documentation (examples: Data Owner, Data Steward, etc.). Assigning contacts to items will allow you to quickly and simply identify the person best suited to answer their questions.

## Accessing the Catalog Design Page

Creating, editing, and deleting responsibilities in Zeenea is done in the **Catalog Design** section of Zeenea Studio. 

To access the Catalog Design page, click **Catalog Design** in the left pane:

   ![](/img/zeenea-catalog-design-responsibilites.png)

## Creating a New Responsibility

1. Click **Catalog Design** in the left pane.
2. Click the **New Responsibility** button to access the responsibility creation screen:

   ![](/img/zeenea-create-responsibility.png)

* Name: a Responsibility is defined by a unique name.
* Read only: if checked, the responsibility is not available when adding a contact on an item.

:::note
It is also possible to import responsibilities from a connector. They are recognizable in the list of responsibilities by the mention "External source" and cannot be edited.
:::

The following information is required to create a new Responsibility:

* Name: The name will be used in particular in the Studio and Explorer interfaces to identify a Responsibility.
* CodeThe: The code is a technical identifier that can be used particularly in APIs to uniquely identify a Responsibility.
* Read-only: If checked, the responsibility is not proposed when adding a contact to an Object.

:::note
It is also possible to import Responsibilities from a connector. These are identified in the Responsibility list by the words "External source". These Responsibilities are non-editable, with the exception of their name. Source responsibilities also have a code prefixed by $z_.
:::

## Editing Responsibilities

To edit an existing Responsibility, click the pencil icon next to the desired entry:

   ![](/img/zeenea-catalog-design-responsibility-edit.png)


## Deleting a Responsibility

1. Click on the name of the desired responsibility in the **Responsibilities** section to open the editing screen.
2. Click the **Delete** button.

To be deleted, the responsibility must meet two conditions:

* It must not be imported from a connector. 
* If necessary, remove the connector from your agent.
* It must not be implemented on an item. 

If necessary, remove all contacts assigned to this responsibility in the **Catalog** section beforehand. 
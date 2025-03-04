---
title: Creating, Editing, or Deleting a Data Process
---

# Creating, Editing, or Deleting a Data Process

## Creating a New Data Process:

1. Log in to the Zeenea Studio application.
2. In the page menu, click the **New Item** button and then click **"**Data Process**.
3. Complete the required fields: name, description, contacts, and metamodel properties.

  ![](/img/zeenea-data-process-new.png)

  ![](/img/zeenea-data-process-new2.png)

  ![](/img/zeenea-data-process-new3.png)

:::note
Data Processes can also be imported from an external source via a connector, or created using the Catalog API.
:::

## Deleting a Data Process

If you wish to delete a data process, click the **Actions** icon in the top right corner of its detail page. Then select **Delete the Data Process**.

Deleting a Data Process also results in deleting all its links to Datasets or other Items. Once deleted, the Data Process will no longer appear in the lineage of the corresponding Items.

  ![](/img/zeenea-data-process-delete.png)

## Build a data lineage from a Data Process

Add inputs or outputs to a Data Process

1. From the detailed page of a Data Process, click on the "+" icon in the input column.
2. Search for Datasets (already imported in the catalog) or for Custom Items to link them to the Data Process.
3. Confirm.
4. Repeat steps for outputs.

  ![](/img/zeenea-data-process-inputs.png)

## Deleting inputs or outputs from a Data Process

To remove an Item from the list of inputs or outputs or a Data Process, click on the cross in front of each Item name.

## Viewing the data lineage from a Data Process

Defining links between a Dataset and a Data Process allows Zeenea to automatically generate the data lineage representation.

This interactive representation is dynamically updated not only for the Data Process but also for the affected Datasets. Click on an Item in the graph to immediately access the details of this Item or to view its own data lineage.

## Operations list

Using the Catalog API, you can also declare lineage at the Field level. This information is available in read-only mode in the "Operations" tab of a Data Process in the Studio.

An operation is defined by a list of input and output Fields, and a description of the corresponding transformation.

  ![](/img/zeenea-data-process-operations.png)

:::note
If an operation references a Field that is not part of the input or output Datasets of the Data Process, it is displayed in red as an orphan.
:::

When filled in, Field to Field lineage is automatically displayed in the lineage. See [Data Lineage](./zeenea-data-lineage.md).
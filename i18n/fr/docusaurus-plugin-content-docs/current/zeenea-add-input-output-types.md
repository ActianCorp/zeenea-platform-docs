---
title: Adding Input and Output Types to Data Processes
hide_table_of_contents: true
---

# Adding Input and Output Types to Data Processes

By default, Data Processes can be linked to Datasets imported into the catalog to form a lineage of your data.

In the Catalog Design section, you have the possibility to create additional links in your metamodel with Custom Item Types, in order to complete your lineages with non-synchronized Items or to represent lineages at a logical level.

To do this, click the **Edit Item Type** button (pen icon) in front of the Data Process type to open the link editing mode.

  ![](/img/zeenea-edit-item-type.png)

In this mode, select the Custom Item Types with which you wish to allow Data Stewards to create links as inputs to your Processes. Then select those for which you wish to create output links.

:::note
It is impossible to delete the link with the Dataset type. To remove a link with a custom type, first, make sure that there are no more links in your catalog between Treatments and Objects of the selected type.
:::
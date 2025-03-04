---
title: Data Lineage
---
# Data Lineage

The lineage presents the transformations and uses of the data. It can be used, for example, to understand the origin of a Dataset, or for impact studies.

Lineage information can be retrieved automatically by some connectors or by API. It can also be entered manually in the Studio.

Lineage is presented as a graphical component in the Studio and Explorer for Items of type **Dataset**, **Visualization**, or **Data Process**.

It may also be available on the detail pages of certain Custom Items if your metamodel configuration allows. Custom Items can be used to represent objects that cannot be synchronized by a connector (Excel files, legal reports, external sources) or to create a data flow at the logical level (ex: Application).

  ![](/img/zeenea-data-lineage1.png)

## How the diagram works

By default, the lineage diagram is centered on the Item whose details page is open, and only the first level of lineage is visible upstream and downstream.

When the information is available, you can progressively extend the lineage by clicking the "+" button to the left or right of the Items.

It is also possible to directly extend all available lineage levels. To do this, double-click on the "+" button or right-click on it to display a menu allowing you to:

* Collapse lineage
* Open an additional lineage level
* Open all lineage levels
* Click on a diagram element to open its documentation preview (description, properties, etc.)

:::note
The same Item can be represented several times in the lineage if it is involved in several branches of the graph.
:::

## Actions menu

* **Zoom features**: At the top left of the diagram, you'll find functions for adjusting the diagram view (zoom in, zoom out, fit to window, reset view).
* **Export**: You can also export the diagram as an image (.PNG) by clicking on **Save as image**.
* **Hide incomplete Data Processes**: Click the "plug" icon to show or hide Treatments that have no inputs or outputs.

## Field-level lineage

For each Dataset, you can view the number of Fields that make up the Dataset, and display a list by clicking on this number. Fields belonging to business or primary keys are also shown in this extended view.

Thanks to the Catalog API, it is also possible to document lineage at the Field level, by adding operations at the Data Process level. These operations contain a list of input and output Fields, as well as a description (see API documentation for details). You can consult the list of these operations in the Studio, on the Data Process details page.

When the information is available, a dot is added to the left or right of the relevant Field.

Click on the Field to highlight its specific lineage among the open Datasets.

Click on the "+" buttons at the Dataset level to display the Field's lineage at an additional level upstream or downstream.

  ![](/img/zeenea-data-lineage2.png)

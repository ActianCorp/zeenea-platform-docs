---
title: Item Details Page
---

# Item Details Page

All catalog Items (except Fields) have a details page, accessible from the search page or from a overview panel.

Detail pages include common elements (name, description, etc.) and others specific to the type of Item or your platform configuration (lineage, data model, etc.).

## Details Tab

### People

This section is used to quickly identify the right contacts for an item in the catalog. 

Contacts may include natural persons, legal persons, or legal entities.

For each contact, name, email address (if provided) and responsibility for the Item (Data Owner, Data Steward, etc.) are available.

The Curator badge defines who will be in charge of the documentation of the Item in Zeenea.

  ![](/img/zeenea-details-people.png)

### Description

The description provides more business or technical context for the Item, such as its definition, usage, calculation formula, etc.

In general, this description is entered into Zeenea Studio by the Item's Curator.

However, in the case of an Item harvested from a storage system (Datasets, Visualizations, etc.), a description directly provided by the source can be used.

  ![](/img/zeenea-details-description.png)

## Glossary

These terms are filled in from Zeenea Studio by its users and bring a business outlook.

  ![](/img/zeenea-details-glossary.png)

### Properties

This section contains the information/properties managed by Zeenea Studio. 

The featured properties can be of two kinds: 

* Business properties: they are filled in according to the metamodel configured in Zeenea Studio.
* Technical properties: these are linked to the source file. 
* Some properties that are considered important by Data Stewards or Curators are given more prominence and are directly displayed as tags in the search or detailed pages.

  ![](/img/zeenea-details-properties.png)

### View 360

This section allows visualizing all the relations of an Item with other Items in the catalog regardless of their types and to explore the graph of relations incrementally.

For more details, see [View 360 Diagram](./zeenea-view-360-diagram.md).

### Lineage

Lineage can be viewed on items such as Datasets, Visualizations, or Data Processes. It describes the transformations and uses of the data throughout its life cycle. 

For more details, see [Data Lineage](./zeenea-data-lineage.md).

### Data Model

Data models can only be viewed on Datasets.

This section allows visualizing the schema of a data source centered from the current dataset point of view.

For more details, see [Data Model Diagram](./zeenea-data-model-diagram.md).

### Data Quality

Data quality information can only be viewed on Datasets.

This section allows visualizing the list of quality checks that are performed on a Dataset and the last execution result of these checks. 

To be able to browse data quality information, an integration with your data quality tool is required.

For more details, see the [Synchronization with a Data Quality Management Tool](./zeenea-synchronization.md).

### Discussions

On Datasets, it is possible for users to interact within discussion threads.

To report a documentation error or suggest an improvement, use the dedicated "submit a suggestion" feature, by clicking on the button at the top right of the details page.

## Specificities by Item Type

## Datasets

Datasets may include the following elements depending on their actual completion level achieved through the Studio: 

* Logical name. Example: Airport Traffic
* Technical name. Example: airport_traffic
* Status of use. Example: Can be safely used
* Source or connection. Example: bigquery public data
* Summary: a description filled in from Zeenea Studio

## Fields

This section provides the list of Fields of the corresponding Dataset. You can use the contextual search to directly find a field via its name.

  ![](/img/zeenea-details-fields.png)

You will access to main information directly in the table:

* Technical name
* Name
* Summary of the description
* Type
* Linked Glossary Item
* Key
* Featured properties
* Personal Data (PD) classification

Click on a Field name to show its overview panel with more information.

According to the type of data source and the configuration made by your administrators, you will also be able to browse:

* **data profiling**: For Fields in the overview. For more information, see [Data Profiling](./zeenea-data-profiling.md).
* **sample data**: For more information, see [Data Sampling](./zeenea-data-sampling.md).

### Visualizations

Visualizations are reports. The Datasets linked to these Visualizations have been used to build them. The Datasets which allowed to build this item are available in the "Datasets" list.

### Data Processes

Data processes describe changes made to one/more incoming datasets and which result in one or more outgoing datasets. 

They materialize relationships between datasets and describe the data lineage. They can be specific or more general and describe, for example, a duplication, an aggregation, an archiving, a conversion, etc.

Data Processes can also be linked to certain Custom Items to represent a logical lineage.

The Items that are ingested or produced by a Data Process are available in the component's "Inputs/Outputs".

### Glossary Items 

Glossary Items define business concepts used by your company. 

They provide information about the other items in the catalog to which they are linked and give a business outlook. 

  ![](/img/zeenea-details-glossary-items.png)

A glossary object can have one or more parent and/or child objects.

Under the object name, a breadcrumb trail allows you to locate the Item in its hierarchy and to navigate within it.

If alternative names are defined (synonym, acronym, variant), they are displayed between brackets at the right of the Item's name.

A graphical widget also allows you to view the hierarchical links to other Glossary Objects.

For more details, see [Hierarchical Graph of a Glossary Item](./zeenea-glossary-hierarchy.md).

The "technical item/glossary item" associations can be viewed under the "Implementation" tab.

In this section, you can browse all technical implementations of the glossary item and also search and filter to find specific ones.

Click the **Export** button to export all the items of your search and get their full documentation. Export feature is available for one Item Type at a time.

### Custom Items

Custom items are used to classify catalog assets or to give more context by associating standard Items, such as Datasets or Visualizations, with logical or organizational concepts. 

  ![](/img/zeenea-details-custom-items.png)

Objects that have been associated with a Custom Item can be found under the "Linked Items" tab.

  ![](/img/zeenea-details-linked-items.png)

In this section, you can browse all linked items and also search and filter to find specific ones.

Click the **Export** button to export all the items of your search and get their full documentation. Export feature is available for one Item Type at a time.

## Suggestions

From the details page of any Item, you can submit a suggestion to the Curators, in order to improve its documentation or report an error.
 
 
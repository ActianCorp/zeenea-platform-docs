---
title: What is an Item?
---

# What is an Item?

## Definition

We will use this term to refer to the different elements that can be documented in Zeenea. 

It is an abstract representation that does not refer to an item directly manipulated in Zeenea, but rather to the primitive item from which those mentioned above are descended.

## Item types

Zeenea manages items of several types: 

* Datasets
* Fields
* Business terms
* Data processes
* Visualizations
* Categories
* Custom items

## Characteristics

These items share common characteristics regarding the attributes on which the documentation is based:

* A functional, editable name
* A description, allowing to define the item
* For the "datasets" or field items, the description is divided into two notions:
  * Source Description: takes the information, if any, from the data storage system
  * Catalog Description: allows the Data Steward to freely enter a description 
* Properties defined by the template for this Item Type
* Contacts in order to identify the persons linked to the items as well as to understand the nature of this link

 ## Item Key
An Item key allows for each Item in the catalog to be uniquely identified. Keys are especially useful when synchronizing the catalog with an external system, either via the APIs, or when using the Excel import feature.

## Orphan Item
An orphan item is an item (Dataset, Field, etc.) that is still present in the catalog but is no longer listed by the connection during automatic or manual inventories.

This may be due, for example, to:

* moving the dataset to a new storage system, 
* a migration of the data to another table, 
* etc.

Zeenea helps identify orphan datasets to keep catalog content up-to-date and avoid directing Explorers to obsolete data assets.

The documentation of an orphan dataset can no longer be updated through its original connection. If this dataset has been moved, it is treated by Zeenea as a new entry.

## Property
A property is a component of the metamodel used to store metadata specific to a given item. It allows to provide context and/or to categorize the items in the catalog. The properties are also used as search criteria or filters and thus provide more efficient access to items.

Properties options when configuring them: 

* Flexible configuration: Simple Text, Rich Text, Enumeration, etc.
* Indexable from the search engine. 
* Mandatory or important status.
* Display properties in the result list under the item it is associated with.


## Template
 
The template of an Item Type (dataset, visualization, business term, etc.) is a structured representation of all the information (metadata) used to describe it. 

The notion of template in Zeenea represents a coherent set of properties organized in sections. From Zeenea Studio, you can define templates for each item type by adding and ordering sections and properties.

The template will allow you to document each item in a unitary manner by highlighting the properties that make it up.

By choosing the right concepts, organizing them in a coherent way, and framing their input via appropriate typing, you optimize the efficiency of the Data Stewards' work but also the quality of their production. They will enable data consumers to quickly find the data they are interested in with its context.

## Topic
A Topic is a collection of Catalog Items defined by the people in charge of managing the Catalog documentation. This collection will be presented to business users as soon as they arrive in the catalog to help them to: 

* understand the organization of the catalog.
* guide their search to the sub-sections of the catalog that are most likely to be of interest to them.
* discover the catalog through business, organization, etc.

## Visualization
Visualizations are reports from source reporting solutions such as PowerBI or Tableau.

Like Datasets, they are subject to automated discovery, via a connector and can be imported. Objects of type Visualization are documentable in the same way as other objects.

Visualization objects are potentially linked to Datasets (the Datasets having made it possible to generate the reports they represent), they also appear in the Data Lineage asset graph.

These datasets are therefore present in the object's detail in the same way as the following elements: 

* Technical name
* Logical name
* Description
* Related glossary item(s)
* Lineage and its datasets
* Properties
* Contacts
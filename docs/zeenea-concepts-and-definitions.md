---
title: Concepts and Definitions
---

# Concepts and Definitions

This list highlights select Zeenea-specific terms you might encounter in the documentation. It focuses on terms with unique meanings within Zeenea.

Many definitions on the list provide links to articles and core reference materials, offering deeper insights into the concepts and practical applications of the associated keyword.

Use the search feature in your browser to quickly find the term or phrase that you are looking for. Search is usually activated with CTRL+F or ⌘ + F.

## Category

The "Category" item type is a concept that facilitates the organization of datasets in Zeenea.

It will allow you to create groupings of datasets according to your organization and your domains.

This Item Type is deprecated.

Its characteristics:

* A dataset may or may not belong to a Category. 
* A category can be created without associated datasets.
* The search by Category is proposed in the search engine. 

The elements of a Category item are the following:

* Name
* Description
* Associated datasets
* Properties
* Contacts


## Connection
A Connection represents a system to which Zeenea is connected. It allows the scanner to retrieve metadata from your information source with which you are connected and incorporate them into Zeenea. 

Connections are therefore associated with specific solutions (Oracle, Teradata, HDFS, Amazon S3, Table, Power BI...) through [Zeenea connectors](./zeenea-connectors-list.md).

## Custom item
Custom items allow you to document entirely new concepts, without being limited by native or default Item Types in Zeenea. They offer ideal support for modeling abstract concepts, complementary to the metadata structurally proposed by Zeenea.

Each new custom item type can be used on each of the templates, as a single or multi-valued property, to create relationships with all of Zeenea's asset types.


 ## Dataset
 
 A dataset is a physical representation of an existing set of data from a database. 

It can be a table in a database, a collection in a NoSQL storage, a file or a set of files in a file system, etc. 
 
Elements of a "dataset" item:

In the detailed pages of this item, you can find a set of information, such as: 

* a title (a logical name and the technical name) 
* the source of import
* the date of its last update with the source in Zeenea
* a description added from Zeenea Studio
* a description imported from the source
* associated business terms
* the schema of the dataset and its fields
* its lineage (through data process items)
* its data model (graph and list of all links in the datasource)
* associated contacts
* properties filled in by the associated contacts

## Data Process
A Data Process is an item in Zeenea generally used to materialize a program or pipeline taking one or more sets of data as input and producing one or more other sets of data as output.

This item thus makes it possible to materialize these relations between datasets and therefore to build the "horizontal" lineage of the data.

Data Processes can also be used to represent logical data flows between custom items.

In the detailed pages of this item, you can find a set of information, such as: 

* Technical name
* Name 
* Description 
* Properties 
* Contacts
* Input Datasets
* Outputs Datasets

## Field
The structure of a dataset is described in its schema. This structure contains the enumeration, if known, of the Fields, which typically correspond to the columns of a table in a database. 

Fields are the technical items with the finest granularity in Zeenea.

Fields are accompanied by metadata:

* Technical name
* Logical name
* Type
* Characteristics specific to the storage system (nullable, primary key...)
* Description proposed by the Data Steward
* Description from Data source (read-only)
* Link to glossary item(s)
* Properties
* Contacts

## Glossary Item
 
A business glossary is used to document and store a specific company's business concepts and terminology, as well as to detail relationships between these items. 

A glossary sheds some light on: 

* The way a business term is defined
* Who is responsible for a business term definition
* How is a KPI calculated?

Setting up a glossary in Zeenea will help bring value to your data by: 

* Bringing a common understanding of your company’s concepts and terminology
* Reducing the risk of misuse, especially due to a misunderstanding of the data
* Maximizing research capabilities and easing access to documented company data

Other advantages of a glossary are: 

* Clearly communicating on all company assets, hence diminishing back and forth
* Giving IT and Business teams  a common vocabulary
* Helping to identify policies, data governance, and data management initiatives. 

Zeenea allows you to create different kinds of Items to build your business glossary to better reflect your organization's business landscape: business terms, KPIs, reports, domains, etc. Glossary Items represent all these kinds of business Items in the catalog.

The attributes of a Glossary Item are the following:

* Name
* Description
* Properties
* Contacts
* Parents & children (other Glossary Items that have direct links in the glossary hierarchy)
* Implementations (technical assets that can be defined by the Glossary Item)

## Key

A key allows for each object in the catalog to be uniquely identified. Keys are especially useful when using synchronizing the catalog with an External System, either via the APIs, or when using the Excel Import feature. 

## Orphan Dataset

An orphan dataset is a dataset that is still present in the catalog but is no longer listed by the connection during automatic or manual inventories.

### Possible Causes

* moving this dataset to a new storage system,
* a migration of the data to another table,
* etc.

### Objective

Zeenea helps identify orphan datasets to keep catalog content up-to-date and avoid directing Explorers to obsolete data assets.

### Impacts

* The documentation of an orphan dataset can no longer be updated through its original connection.
* If this dataset has been moved, it is treated by Zeenea as a new entry.

## Property

A property is a component of the metamodel used to store metadata specific to a given item. It allows to provide context and/or to categorize the items in the catalog. The properties are also used as search criteria or filters and thus provide more efficient access to items.

Properties options when configuring them: 

* Flexible configuration: Simple Text, Rich Text, Enumeration...
* Indexable from the search engine. 
* Mandatory or important status.
* Display properties in the result list under the item it is associated with.

Read more about it: [Creating, Editing, or deleting a property ](./zeenea-studio-create-edit-delete-property.md)

## Template

The template of a type of Item (datasets, visualizations, business terms, etc.) is a structured representation of all the information (metadata) used to describe it. 

### Characteristics

The notion of template in Zeenea represents a coherent set of properties. From Zeenea Studio, you can define templates for each item type by adding and ordering sections and properties.

The template will allow you to document each item in a unitary manner by highlighting the properties that make it up.

By choosing the right concepts, organizing them in a coherent way, and framing their input via appropriate typing, you optimize the efficiency of the Data Stewards' work but also the quality of their production. They will enable data consumers to quickly find the data they are interested in with its context.  

<font color="red">Link broken in Community docs:</font>

 Read more: <font color="red">Configuring metamodels</font>

## Topic

A Topic is a collection of Catalog Items defined by the people in charge of managing the Catalog metamodel.

This collection will be presented to business users as soon as they arrive in the catalog to help them to : 

* Understand the organization of the catalog
* Guide their search to the sub-sections of the catalog that are most likely to be of interest to them
* Discover the catalog through business, organization,...

## Visualization

Visualizations are reports from source reporting solutions such as PowerBI or Tableau. 

The datasets linked to these visualizations were used to build them. 

Characteristics of a Visualization:

* Like Datasets, they are subject to automated discovery, via a connector and can be imported.
* Objects of type Visualization are documentable in the same way as other objects.
* Visualization objects are potentially linked to Datasets (the Datasets having made it possible to generate the reports they represent), they also appear in the Data Lineage asset graph.

Elements of a Visualization:

They are therefore present in the object's detail in the same way as the following elements: 

* a title (a logical name and the technical name)
* a description 
* related business terms
* the lineage and its data sets
* contacts
* properties

Read more: [Importing Datasets or Visualizations](./zeenea-impoting-datasets-or-visualizations.md)

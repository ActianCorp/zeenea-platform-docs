---
title: Exporting Search Results
---

# Exporting search results in Zeenea Studio

The Export feature allows you to export a selection of Items from the Catalog section. Once exported, the same selection can be imported back into the Catalog.  

## Overview
To export the documentation of a set of Items, select all relevant items (either by manually selecting them or by clicking on the “Select All” option) from the Catalog section, and then click on “Export”.

To be exported, your selection must comply with the following: 

* All items must be of the same type
* The number of selected items must not exceed 100,000

When the selected Items are of the "Dataset" type, you can export the metadata for these Datasets or their Fields. In this case, the Fields are sorted by Dataset and then according to their native index.

:::note
Microsoft Excel's technical constraints bind the Export feature. In particular, exported properties containing more than 32,000 characters will result in an error message, as they would exceed the maximum number of characters per cell allowed by Excel. 
:::

Once the export is over, click **Download** to retrieve the .xlsx file on your computer. 

## Exported information 
The following information is exported: 

* key: contains the unique identifier for that object
* name: the name of the Item
* source name: the name as defined in the source (if the Item is imported from a connector)
* description: description of the Item
* description type: the type of the description (RICH or SIMPLE) - refers to the edition mode defined for the Item
* catalog name: In the case of the Federated Catalog, the name of the catalog the Item belongs to
* catalog code: In the case of the Federated Catalog, the code of the catalog the Item belongs to
* shared: In the case of the Federated Catalog, whether the Item is shared with other catalogs
* source description: the description as defined in the source
* Contacts (one column for each responsibility). Note that curators are exported in the "curator" column. Contacts without an email address are not exported.
* Properties (one column for each property)
* Links with Custom Items or Glossary Items: Two columns will be created. The first one is named the linked item type and will contain the unique keys to the linked items. The second, suffixed with "-name" and with a grey background, will contain the names of the related Items. This second column will be ignored if the file is re-imported related
* Inputs & Outputs (Data Process only): These two columns will contain the keys of the Datasets or Custom Items linked to the Data Process
* data-quality: The data quality status of a Dataset (Ok, Warning, DoNotUse)
* fingerprinting: Whether the calculation of the data Profiling is activated (only for Fields)
* data profiling:  Whether the data profiling is shown in the Explorer (only for Fields)
* type: Type of the Item for Datasets (ex: Table) and Fields (ex: Integer)
* primary key: Is the Field defined as a primary key? (true/false)
* foreign key: Is the Field defined as a foreign key? (true/false)
* business key: Is the Field defined as a foreign key? (true/false)
* can be null (true/false)
* multivalued (true/false)
* native type: Type of the Field as defined in the source
* native index: Index of the Field in the Dataset

Please note the following behavior:

* Information from a connector can not be modified with a file import (ex: source name, source properties, etc.). The corresponding columns are grayed in the export file to identify them easily.
* When an attribute (property, responsibility, etc.) is multivalued, the values are separated by semi-colons.
* For URL-type properties, if a label has been defined, the format of the value will be the following: `https://www.mycustomurl.com[label]`
* For Glossary Items, the file contains columns for the "parent" Item Types as defined in your metamodel. For instance, if the Glossary Item "Turnover" is linked to the parent Item "Finance" and a child Item "Overall retention rate", when exporting the Item "Turnover", only the link with "Finance" will be exported and not the one with "Overall retention rate".
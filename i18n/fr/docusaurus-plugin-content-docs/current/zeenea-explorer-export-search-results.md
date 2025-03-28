---
title: Exporting Search Results
---

# Exporting Search Results to Zeenea Explorer

From the Zeenea Explorer search page, you can export documentation for all search results.

To export documentation for a batch of Objects:

1. Run a search (from the search bar or by selecting a filter).
2. Select the desired type of Object (Data Sets, Data Processes, etc.).
3. Click the **Export** button to start preparing your file.

Your selection must comply with the following constraints: 

* The selected objects must all be of the same type (Data Sets, Data Processes, etc.).
* The number of Items selected must be less than 100,000.

:::note
The export functionality depends on technical constraints set by Excel; as such, properties containing more than 32,000 characters may generate an error message, as they would then exceed the maximum number of characters per cell allowed by Microsoft Excel.
:::

Once you've finished exporting, click the **Download file** button to download the file (.xlsx format) to your computer.

## Exported information 

The following information is exported: 

* **key**: contains the unique identifier for that object
* **name**: the name of the Item
* **source name**: the name as defined in the source (if the Item is imported from a connector)
* **description**: description of the Item
* **description type**: the type of the description (RICH or SIMPLE) - refers to the edition mode defined for the Item
* **catalog name**: In the case of the Federated Catalog, the name of the catalog the Item belongs to
* **catalog code**: In the case of the Federated Catalog, the code of the catalog the Item belongs to
* **shared**: In the case of the Federated Catalog, whether the Item is shared with other catalogs
* **source description**: the description as defined in the source
* **Contacts** (one column for each responsibility). Note that curators are exported in the "curator" column. Contacts without an email address are not exported.
* **Properties** (one column for each property)
* **Links with Custom Items or Glossary Items**: Two columns will be created. The first one is named the linked item type and will contain the unique keys to the linked items. The second, suffixed with "-name" and with a grey background, will contain the names of the related Items. This second column will be ignored if the file is re-imported related
* **Inputs & Outputs** (Data Process only): These two columns will contain the keys of the Datasets or Custom Items linked to the Data Process
* **data-quality**: The data quality status of a Dataset (Ok, Warning, DoNotUse)
* **fingerprinting**: Whether the calculation of the data Profiling is activated (only for Fields)
* **data profiling**:  Whether the data profiling is shown in the Explorer (only for Fields)
* **type**: Type of the Item for Datasets (ex: Table) and Fields (ex: Integer)
* **primary key**: Is the Field defined as a primary key? (true/false)
* **foreign key**: Is the Field defined as a foreign key? (true/false)
* **business key**: Is the Field defined as a foreign key? (true/false)
* **can be null** (true/false)
* **multivalued** (true/false)
* **native type**: Type of the Field as defined in the source
* **native index**: Index of the Field in the Dataset

Please note the following behaviors:

* Information from a connector can not be modified with a file import (ex: source name, source properties, etc.). The corresponding columns are grayed in the export file to identify them easily.
* When an attribute (property, responsibility, etc.) is multivalued, the values will be separated by semi-colons.
* For URL-type properties, if a label has been defined, the format of the value will be the following: `https://www.mycustomurl.com[label]`
* For Glossary Items, the file will contain columns for the "parent" Item Types as defined in the Glossary metamodel. For instance, if the Glossary Item "Turnover" is linked to the parent Item "Finance" and a child Item "Overall retention rate" when exporting the Item "Turnover", only the link with "Finance" will be exported and not the one with "Overall retention rate".
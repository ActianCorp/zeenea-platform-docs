---
title: Data Catalog Item Updates
---

# Impacts of Data Catalog Item Updates

As soon as an Item is modified, Zeenea adds an entry in the Item's activity tab for the audit trail and updates the Item's last update date.

All this information can also be retrieved via APIs in:

* Audit Trail APIs
* The exploration and mutation APIs which allow you to manipulate the dates of the last updated Items thanks  to the findItems API as well as the LoadItemByKey API which allows to retrieve the updated date in the updatedAt field

Please note that the date of the last update is not visible in Zeenea Explorer.

In the case where we modify a property of the Item which is a reference to another Item (a property which points to a Custom Item, an input/output Item of a Data process ...), then the behavior will depend on the type of Item involved as well as the type of link that exists between them.

The following terminology will be used to simplify understanding:

* Link source
* Link target
* Link Description

Updating the audit trail and the last update date will therefore respect the following rules:

* A Data Process (Link Source) that ingests (Link Description) or produces (Link Description) a Dataset (Target) will update only the audit trail and the date of the last update of the Data process. For example, if the "Product" data set is added to the Process "Extract_All_Data", then the audit trail and the date of the last update will be modified only on the Process.
* A Visualization Object (Link source) that uses (Link description) a Dataset (Link Target) or a Custom Object (Link Target) will only update the Visualization. For example, if the the "Product" dataset is added to the "Product_Pe_Region" Visualization, then the audit trail and the last update date will be modified only on the Visualization.
* A Dataset (Link source) that contains (Link description) a new Field (Link target) will only update the audit trail of the Dataset during the first import. There will be no update of the Audit trail when adding a field when the dataset has already been imported. The date of the last update will in any case never be modified. For example, if a "Type" field is added to the "Product" Dataset when it has already been imported, there will be no impact on the audit trail and the date of the last update of the Dataset or field.
* Assigning (Link description) a dataset (Link source) to a new Category (Link target) will only update the audit trail of the dataset. There will be no impact on the last update date. If, for example, I assign the "Product_Glass" dataset to the "Product" category, then only the audit trail of the "Product" dataset will be updated.
* Implementing (Link description) a Glossary Item (Link source) on any Item (Link target) will only update the target. For example if I associate the Glossary Item "Product" on the Dataset "Product_Glass" then the audit trail and the date of last update will be modified only on the Dataset
* Creating a composition link (Link Description) between a Glossary Object (Source) and another Glossary Object (Target) will update the source and the target. For example, if I create a composition link between a "Finance" Glossary Object and another "ARR" Glossary Object, then the audit trail and the last update date will be modified on both Glossary Objects.
* Linking (Link description) a Custom Item (Link Source) to any other type of item (Link Target) will only update the target. If, for example, an "Application A" Custom Item is linked to a "Product" dataset, the audit trail and last update date will only be updated on the the dataset level.

The following table summarizes these elements:

| <div style={{width: 120}}>Source</div> | <div style={{width: 120}}>Link Description</div> | <div style={{width: 120}}>Destination</div> | Last Update Date Modified On | Audit Trail Modified On |
| :--- | :--- | :--- | :--- | :--- |
| Dataset | Belongs to | Category | No impact | Dataset |
| Data Process | relates to | Custom Item | Data Process | Data Process |
| Dataset | relates to | Custom Item | Dataset | Dataset |
| Field | relates to | Custom Item | Field | Field |
| Glossary Item | relates to | Glossary Item | Glossary Item | Glossary Item |
| Visualization | relates to | Custom Item | Visualization | Visualization |
| Custom Item A | relates to | Custom Item | Custom Item A | Custom Item A |
| Custom Item A | relates to | Custom Item B | Custom Item A | Custom Item A |
| Data Process | Ingests | Dataset | Data Process | Data Process |
| Data Process | Generates | Dataset | Data Process | Data Process |
| Visualization | Uses | Dataset | Visualization | Visualization |
| Dataset | Contains | Field | No impact | Dataset audit trail on import. No impact when a field is added |
| Custom Item | Implements | Glossary Item | Custom Item | Custom Item  |
| Dataset | Implements | Glossary Item | Dataset | Dataset |
| Field | Implements | Glossary Item | Field | Field |
| Visualization | Implements | Glossary Item | Visualization | Visualization |
| Glossary Item A | Composes | Glossary Item B | Glossary Item A<br />Glossary Item B | Glossary Item A<br />Glossary Item B | 




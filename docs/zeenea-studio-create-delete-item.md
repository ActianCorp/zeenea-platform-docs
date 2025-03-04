---
title: Creating or Deleting an Item
---

# Creating or Deleting an Item

## Creating Items Manually

With Zeenea Studio, you can:

* Create items manually from the interface, without having an associated "Connection"
* Import items of the "Datasets or Visualizations" type

Creating Items manually in Zeenea allows you to add context to your data assets.  

Only certain profiles can create or delete an Item in Zeenea.

Item types that can be created manually:

* Category
* Data process
* Glossary Item
* Custom Item

To create a new Item from Zeenea Studio:

1. Click **New Item** button on the sidebar menu:

  ![](/img/zeenea-new-item.png)

2. Select the type of Item you want to create. You can use the search bar or the filtered tabulations.
3. Enter its name and click **Confirm**.

  ![](/img/zeenea-create-item-confirm.png)

QQQQ --> N.B.: A unique key will be automatically generated based on the Item Type code and its name. You can find this key in the detailed view of the newly created Item via the "Actions" menu. In case of a duplicate, an incremental number is automatically added to the key to ensure its unicity.

Once the item has been created, you'll be able to edit its documentation.

## Deleting an item
You can delete an Item: 

* From the item's detailed page, click on the "Trashcan" icon.
* Using the mass edition feature.
* Consequences of deleting:
  * Deleting a Dataset automatically deletes all its Fields.
  * Deleting a Visualization results in the deletion of all associated Datasets from the same connection, as well as the fields of these Datasets.
  * The deletion of an Item from the catalog entails the irreversible destruction of its documentation. This Item can nevertheless be reimported afterward from the import wizard if necessary.
  * The deletion of an Item from the catalog also entails the removal of all links between it and other Items in the catalog, in particular for Glossary Items and Custom Items.
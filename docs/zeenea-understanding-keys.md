---
title: Primary, Foreign, and Business Keys
---

# Primary Keys, Foreign keys, and Business Keys

## Primary Key

The Primary Key is the dataset technical identification key. It is defined by the system and cannot be manually edited.

For example, the "Customer Number" could be a Primary Key in the “CUSTOMERS” table.

## Foreign Key

The Foreign Key is a reference to a Primary key of another. It is defined by the system and cannot be manually edited. 

For example, the "Customer id" could be a Foreign Key in the "ORDER" table, referencing the Primary Key "Customer Number" in the “CUSTOMERS” table.

## Business Key

A Business Key (aka Natural Key) is any combination of Fields that would allow people to instinctively identify a piece of data in the dataset. 

In our “CUSTOMER” table example, the combination of last_name/first_name/birthdate could be a Business Key. 

The Business Key is defined by Data Stewards in the catalog. 

## Visualizing Keys and their Underlying Fields

### From a Dataset

Keys can be retrieved from the “Fields” tab of a dataset. 

In that list, a specific icon will identify the type of key each field is a part of (BK, PK, FK).

### From the Lineage 

Fields composing Primary, Foreign, and Business Keys can be seen from the lineage tab. You will need to expand the view and list all fields in the lineage to do so; an icon is used to identify the type of key each field is a part of.  

### In the Search Results

Keys have been added to Search Results as well as the Overview panel, in order to give more context at a glance. 

This information is displayed as an icon in the Search Suggestions, the Search Results, and Items overview panel. 

## Defining the Business Key

To define a Dataset Business Key, head to the “Fields” tab. You’ll then be able to select all fields composing a Natural Key by adding them to the dedicated list

You can also remove a field from a Business Key by clicking on the “Delete” icon. 

:::note
* Primary Keys and Foreign keys are defined in the source system and cannot be manually edited.
* Business Keys cannot be updated via an Excel import or a bulk edit.
:::
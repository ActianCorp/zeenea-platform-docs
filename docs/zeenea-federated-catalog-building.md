---
title: Building a Federated Catalog
---

# Building a Federated Catalog

This section covers the main concepts of the federated catalog and the general steps to set up your own.

## Introduction

Building a federated catalog is mostly about declining Zeenea generic concepts to subsections of your platform (user groups, connections, etc.). By default, the Zeenea platform works as a single-catalog federation, meaning all items and user permissions are assigned or applied by default to this single catalog.

Once the federated catalog option is activated for your platform, you can create additional catalogs and define more fine-grained configurations (read and write permissions in particular).

Please note that once the Federated Catalog option is activated, the default catalog becomes a common space where all Items are shared with all users. It is a container for common items of all types across domains. This common catalog can then be used to define a common classification across domains or even to catalog physical items that are not owned by a specific domain.

Within this framework, the default or common catalog contains the business glossary to share a common language at the organization level.

## Step 1: Creating catalogs

By default, Zeenea provides a single catalog, which is the "default catalog" or "common catalog".

The federated catalog lets you create from the Administration interface, additional catalogs, identified by a code and a name. The default catalog has the following values as its code and name: default, Common.

A catalog is like a container for your items that can be compared to a folder in a file system: even if each item is part of the global platform's graph, an item belongs to only one catalog and you can define read or write permissions to users for each catalog. That means items are not copied nor synchronized between catalogs.

Defining the scope of each catalog should be addressed with the same approach as defining Domains in a Data Mesh as it serves the same purpose. But, even if the Data Mesh defines an ideal goal, the organization’s context and constraints can make this goal difficult to reach. For this reason, the Zeenea Federated Catalog offers lots of flexibility to support any organization's topologies.

By the way, all catalogs don't have to be defined from the start. You can work with increments by adding catalogs along the way. Zeenea also enables you to test and learn, as you can move Items from one catalog to another or delete an obsolete catalog. Especially, Item identification keys are independent of their catalogs. 

When you have defined the scope of your first catalogs, you can define permissions and access for users with groups.

## Step 2: Defining groups

Groups in a federated catalog work mainly as in a single-catalog platform. The difference relies on the fact that you can define different permission levels per catalog inside the same group. For instance, you can define a first group that will have read and write permissions on catalogs A and B, a second group that will only have read and write permissions on catalog A and no access to catalog B at all, or even a third group that will only have read access to the default catalog.

As in a single-catalog platform, a user can belong to several groups. So you can also for instance create a "Catalog A managers" group and a "Catalog B managers" group and assign these two groups to the same user. His permissions will be the union of all of his groups' permissions.

Please note that Global Permissions (Manage Connections, Manage Users, etc.) apply to all catalogs and that users in the Super Admin group have full permission to manage all catalogs.

As in the single catalog case, assigning a group to a user is not mandatory. Therefore, you can create a user with no associated group. In this case, the user has access to all the Items from the common catalog plus all Items in the Marketplace (that have been shared by domains).

As soon as you have appropriate groups and users to curate your catalogs, you can start feeding each of them.

## Step 3: Feeding the catalogs

### Configuring a connection

In the federated catalog, each connection must belong to one single catalog. By default, connections are attached to the common catalog. But you can configure a connection to feed a specific catalog. This configuration is made in the configuration file of the connection, in the scanner, by specifying the "catalog_code" parameter for the targeted catalog.

In the Admin section, you can identify the catalog where each connection belongs, directly from the list.

Please note that as the configuration is only made at the connection level. You can share a single scanner and its plugins between several catalogs. In this case, scanner job scheduling will be shared by all catalogs.

### Importing Items

Once you have set up a connection for a new catalog, go to Zeenea Studio to select Items to import.

Zeenea Studio allows you to feed or document one catalog at a time. If your group can access several catalogs, use the catalog selector in the application header to load items in a specific catalog. Then all your work will be scoped in the current catalog (search, export, import, bulk).

To select items to import, click the "Import" icon and then "Select a connection" as usual. Only connections for the current catalog will be available. Once again, item identification keys are not related to their catalog.

### Moving Items to another catalog

You may want to move some items from one catalog to another. One particular case is activating the Federated Catalog option on an existing and already populated catalog.

As mentioned above, you can configure a target catalog code on a connection. But, it only applies to newly imported items. Already imported items will continue to be synchronized or updated by the connector but still belong to their original catalog.

To assign all connection items to a specific catalog, use the "Move the Item to another catalog" action. This feature is available in the Actions menu on the details page. But, you can also use the file import feature.

Please note that you can not move an item that references other items if those are not shared (see "Step 5: Documenting in the Studio").

Finally, Ensure you have defined appropriate groups and assigned these groups to the right users. Pay attention to the assigned curators before moving items because those curators may not have the right permissions to manage those items in the target catalog.

## Step 4: Defining the metamodel

Catalog design and metamodeling remain global features in the Federated Catalog to ensure consistency across domains. Therefore, item types, properties, responsibilities, and templates are defined for the whole federation (even if we plan to offer more flexibility in the future to suit domain specificities better).

The catalog design section is available in the Studio.

## Step 5: Documenting in the Studio

As mentioned above, the Studio is the back-office tool for one specific catalog at a time. Users who have access to several catalogs can switch from one to another by using the catalog selector in the Studio header.

Let's see how it is declined in each section of the Studio.

### Dashboard

In the Dashboard, user perimeter and completion level calculations depend on the current catalog.

Moreover, watchlists belong to one catalog. Therefore, the same user can have different watchlists in different catalogs.

### Catalog

In the catalog section, users will find only items that belong to the current catalog. Then, the curator's job remains unchanged: editing names, descriptions, properties, etc.

However, you can create relations with items belonging to other catalogs. It requires the referenced items to be shared by their catalogs or to belong to the common catalog (in particular for Glossary Items).

### New Item

You can create custom items or Data Processes from any catalog. By default these items remain private to the current catalog. Nevertheless, you can also share these items with other catalogs to allow them to create links or to make them searchable in the Marketplace (see "Step 8: Sharing in the Marketplace").

You can create glossary items only from the common catalog (see "Step 6: Managing the glossary").

### Import

Import features are also scoped to one catalog. You can import items from connections that belong to the same catalog only.

Similarly, you can only create or modify items in the current catalog when importing files.

### Topics

You can create Topics in the federated catalog like for a single catalog platform. But here, each catalog masters its own Topics, meaning a Topic always contains items belonging to a single catalog. That allows you to control the content of each Topic.

An exception is made for the built-in "Marketplace" Topic that contains items shared by all catalogs (see "Step 8: Sharing in the Marketplace"). 

## Step 6: Managing the glossary

The business glossary allows you to share a common language at the organization level. Therefore, the common catalog contains all the glossary items, meaning two things:

* All glossary items are public to all users in the Explorer
* You need the "Manage glossary" permission on the common catalog to create or edit glossary items in the Studio

Like in a single-catalog platform, you can design the metamodel of your glossary (parent/child relations, implementations, templates).

As the glossary belongs to the common catalog, curators can associate the items from any catalog with business definitions without additional permission.

## Step 7: Monitoring completion and usage

In the Analytics section, Zeenea allows you to monitor the completion level of your items and the adoption rate of end-users. This section presents a global view of the whole federation.

Even so, you can create custom analyses to monitor the average completion level per item type and by catalog.

## Step 8: Sharing in the Marketplace

The Federated Catalog enables domains to gain autonomy and independence in the curation and consumption of their metadata. By configuring appropriate groups and permissions you can also set up advanced and flexible access strategies that avoid creating data silos in the organization.

But Zeenea also offers the capability to set up a marketplace at the organization level.

Indeed, curators can use the "Share the Item" action in the details page in the Studio, or the file import feature, to give access to a specific item to all users in the federation even if they do not have read access to the catalog the item belongs to. Therefore, shared items will be searchable by any user in the Explorer. 

By sharing an item, you also enable curators from other catalogs to create links between this item and other items in their catalog (for instance to build the lineage). 

Please note that you can retrieve and manage shared items using the "Shared" filter in the Studio. Shared items are also identifiable by a badge close to their name.

## Related Topics

* [Searching in the Federated Catalog](./zeenea-searching-federated-catalog)
 
## Step 9: Working with APIs

You can use Zeenea SCIM API to synchronize users with your identity management tool. The SCIM API allows you to create users and add them to one or several groups to give users access to the different catalogs.
 
In this first version of the Federated Catalog, the Catalog API does not yet support the catalog concept. As a matter of fact, you can read or update items issued from any catalog but the catalog information will not be returned by the API. You can also create new items but they will be assigned to the default catalog.
 
### Related Topics

* [SCIM API](./zeenea-scim-api.md)
* [Catalog API](https://docs.zeenea.com/)
 
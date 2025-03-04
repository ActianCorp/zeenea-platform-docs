---
title: As a Super Admin
---

# As a Super Admin

The role of Super Admin is frequently shared or supported by several collaborators to cover the technical and functional skills required.

Should you require more technical information or advice on the installation phase, please refer to the technical file.

You have specific rights and permissions as a Super Admin of the Zeenea suite. 

## Step 1: Log in to Zeenea
You enter the login/password combination which will have been sent to you by email.

:::note
If you are logging in for the first time on a version without specific configuration, the default user IDs for this profile are: zeenea/zeenea
:::

  ![](/img/zeenea-login.png)

## Step 2: Configure the Zeenea platform
Platform configuration is the main action reserved for Super Admin. 

It can be accessed by clicking **Administration** in the top menu.

  ![](/img/zeenea-administration.png)

From this interface, you will be able to supervise the platform regarding the following elements: 

  ![](/img/zeenea-permission-sets.png)

* Users
* Groups
* Catalogs
* Connections
* Scanners
* API keys

## Define the data catalog metamodel
As Super Admin you can also configure the documentation in Zeenea. 

This section is accessible from Zeenea Studio via the "Catalog Design" button in the left menu.

  ![](/img/zeenea-catalog-design.png)

Defining a metamodel is an important step to enable authorized persons to fill in the documentation in the catalog in a targeted and therefore efficient manner.

The design of the metamodel is divided into two parts: the physical and logical layer and the semantic layer (or glossary).

### Define the metamodel of the physical and logical layer
The physical and logical layer of the catalog corresponds to all the technical assets of your IS (datasets, visualizations, etc.), the technical processes for transforming the data. Its purpose is also to represent your organization around the data (consumers, producers, business processes, etc.).

Refer to the following links for more details:

* Read more: Configuring templates <font color="red">NOTE: This link is broken in Salesforce docs.</font>
* Read more: [Creating or Deleting a Custom Item Type](./zeenea-studio-create-delete-custom-item.md)
* Read more: [Adding Input and Output Types to Data Processes](./zeenea-add-input-output-types.md)

### Define the metamodel of your Glossary
The glossary is used to represent all the business concepts of your company (business terms, indicators, etc.) and allows you to build a common language for better collaboration around the data.

Here you can create the item types you want, define their templates and create relationships between glossary item types or with physical layer item types.

Read more: [Configuring the Glossary Metamodel](./zeenea-studio-configure-glossary-model.md)

## Define responsibilities
In Zeenea, a responsibility describes the nature of the relationship between an individual or an entity and an item of the catalog. This attribute thus allows any user to identify the relevant contact person for their needs from the detailed page of the item once it has been completed (Data Steward, Data Owner, etc.).

Read more: [Creating, Editing, or Deleting Responsibilities](./zeenea-studio-create-delete-responsibility.md)

## Step 4: Start importing and documenting your items
Congrats! You have laid the foundations of the catalog. Carry on the journey As a Data Steward.
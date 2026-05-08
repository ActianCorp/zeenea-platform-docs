# Configuring Templates

To configure and edit a template, follow the steps below.

## Step 1: Access the Catalog Design section

Configuring and editing templates in Zeenea is done in the Catalog Design section, accessible from the left menu ("Catalog Design" icon).

## Step 2: Select the "Physical & Logical Metamodel" or "Glossary Metamodel" section

The Catalog Design section has several entries. The "Physical & Logical Metamodel" section presents the object types natively offered by Zeenea to represent your data assets (datasets, reports, etc.) as well as your own object types.

The "Glossary Metamodel" section allows you to structure and manage the metamodel of your glossary.

Click on the icon in the "Actions" column next to each object type to access its template editing screen (below).
In order to harmonize the use of connector properties in applications, and to apply specific treatments according to their semantics, Zeenea maintains a property library.

![](./images/zeenea-dataset-template2.png)

## Step 3: Edit the template of an object

The left side of this screen allows to see what properties have already been added to the selected object template. The list of available and unused properties for this type of object is shown in the right side of the screen. 

All elements can be moved through simple drag and drop functions.

### Create a section

1. From this screen, create sections by clicking on "Add new section".
2. A new block will appear.
3. You can name this new section by clicking on the title "New Section".

### Delete a section

To delete a section, simply click on the cross button in the top right corner of the section. 

The properties belonging to the section will be toggled directly to the right column "Properties". 

### Add properties to a section

To add a property to a metamodel, simply drag and drop the properties into the sections you have previously defined.

Note that these must belong to a section. They can also only be present once in the metamodel of the selected object. 

### Delete properties from a metamodel

In case of error or when the metamodel evolves, the cross icon allows you to remove a property from the metamodel. This property is then repositioned in the right column.

Note that when a property is removed from a metamodel, its indexed values are kept. If you wish to remove them permanently, use the bulk edit function in the "Catalog" section or delete the property in the corresponding section.

### Create a new property that is not yet referenced

If you want to add a property and it is not present in the right column, you will have to create it first. 

For more information, see [Creating, Editing, or Deleting a Property](./zeenea-studio-create-edit-delete-property.md).
# Updating the Zeenea Property Library

In order to harmonize the use of connector properties in applications, and to apply specific treatments according to their semantics, Zeenea maintains a property library.

In particular, this library makes it possible to: 

* Unify into a single property a notion shared by several connectors (e.g., a table schema), thereby facilitating property maintenance and reducing the number of filters in search interfaces
* Propagate relevant information from a Dataset to its Fields
* Use these properties as discriminating elements in lists of Items
* Etc.

The properties contained in this library are : 

* Schema (Dataset)
* Type (Dataset)
* Catalog (Dataset)
* Database (Dataset)

This library will be updated regularly.

Adding a new property to the library follows the standard process for activating new Zeenea features.

For a new property to be taken into account by your tenant, it is necessary to follow the procedure below, once the feature has been activated:

1. Restart scanners
2. Launch an "Update imported objects" job
3. Configure search options for new properties
4. Delete old properties
 
These steps are detailed below:

### Step 1: Restart all scanners

This operation enables connectors to redeclare their properties.

During this declaration, connectors will declare a new property for each new library property, only if the connector was already reporting this information.

**To simplify the process, this step is carried out by restarting the platform, which automatically restarts the scanners. The date of this operation, carried out by Zeenea, is planned and communicated in advance.**

After this operation, new properties can be recognized in the Catalog Design section, as they have a specific description. Moreover, once all scanners have been restarted, previously declared properties should no longer have an associated connector.

### Step 2: Run an "Update imported objects" job in the Administration

Perform this operation for each connection concerned. This operation updates the imported Items by valuing the new properties instead of the old ones.

For Schema, Type, Catalog, and Database properties, the values will also be automatically copied to the relevant Dataset Fields and indexed in the search engine.

### Step 3: Configure search options for new properties

If the old properties were configured as filters or highlights, you'll need to transfer this configuration manually to the new properties.

> **Note:** Filters will also be applied to Fields where appropriate.

### Step 4: Delete old properties

As old properties are no longer attached to a connector, they can be deleted in Catalog Design.

 
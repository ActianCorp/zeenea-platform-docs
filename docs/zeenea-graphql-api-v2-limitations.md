---
title: GraphQL API v2 - Limitations
---

# GraphQL API v2 - Limitations

Here is a list of all the services and which are implemented in the preview

## OPERATIONS

| Operation name | Availability | Description | Comment |
| :--- | :--- | :--- | :--- |
| item | Ok | Query one item from the catalog, using a unique reference |  |
| itemByname | Ok | Query one item from the catalog, using its name and type |  |
| items | Ok | Query a list of items of a given type from the catalog | Limitations:<br /> Filters using "connections" or date type properties are not available yet. |
| node | Ok | Direct query to a Node (to follow Relay conventions) |  |
| createContact | Ok | Create a contact |  |
| createItem | Ok | Create an item (all types EXCEPT contacts) |  |
| deleteContact | Ok | Delete a contact |  |
| deleteItem | Ok | Delete an item (all types EXCEPT contacts) | Deleting Fields is limited to orphans. |
| updateContact | Ok | Update a single contact |  |
| updateItem | Ok | Update a single item (all types EXCEPT contacts) |  |

## ITEM TYPES

| Item type | Value | Read | Write |
| :--- | :--- | :--- | :--- |
| Dataset | dataset | Ok | Ok |
| Field | field | Ok | Ok |
| Visualization | visualization | Ok | Ok |
| Data process | data-process | Ok | Ok |
| Contact | contact | Ok | Ok |
| Datasource | datasource | Ok | N/A |
| Category | category | Ok | Ok |
| Custom Item Type | Code of the custom item as defined in Zeenea metamodel | Ok | Ok |
| Glossary Item Type | Code of the glossary item as defined in Zeenea metamodel | Ok |Ok |

## BASIC ATTRIBUTES

| Attribute | Available on | Item type(s) | Read | Write | Description | Comment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| id | String | Any type | Ok | N/A | Zeenea internal identifier of the Item |  |
| key | String | Any type | Ok | Ok | Forgeable unique identifier of the Item | key = email for contacts |
| name | String | Any type | Ok | Ok | Name of the Item in Zeenea | Concatenation of firstName and lastName for contacts |
| description | String | Any type | Ok | Ok | Description of the Item in Zeenea |  |
| lastCatalogMetadataUpdate | Date | Any type | Ok | N/A | Date of the last modification in Zeenea |   |
| type | String | Any type | Ok | N/A | Item type value as defined above |  |
| completion | Number | Any type | Ok | N/A | Completion rate of the documentation of the Item | Not implemented for contacts and data sources |


## BUILT-IN PROPERTIES

| Property | Available on | Item type(s) | Read | Write | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| sourceName | String | Dataset, Field, Visualization, Data Process | Ok | N/A | Name of the item in the source system |  
| sourceDescription | String | Dataset, Field, Visualization, Data Process | Ok | N/A | Description of the item in the source system |  
| lastSourceMetadataUpdate | Date | Dataset, Field, Visualization, Data Process | Ok | N/A | Lest time there was a change in the item metadata in the source system |  
| orphan | Boolean | Dataset, Field, Visualization | Ok | N/A | Item is missing from the last inventory |  
| deletionDate | Date | Dataset, Field, Visualization, Data Process | Ok | N/A | The date at which the item has been deleted in the source system |  
| importDate | Date | Dataset, Field, Visualization, Data Process | Ok | N/A | The date at which the item has been imported into the catalog |  
| fieldType | String | Field | Ok | N/A | The normalized type of the field |  
| fieldNativeType | String | Field | Ok | N/A | The native type of the field as defined in the source system |  
| canBeNull | Boolean | Field | Ok | N/A | Whether the field is nullable |  
| multivalued | Boolean | Field | Ok | N/A | Whether the field is supports multiple values |  
| primaryKey | Boolean | Field | Ok | N/A | Whether the field is a primary key |  
| foreignKey | Boolean | Field | Ok | N/A | Whether the field is a foreign key |  
| businessKey | Boolean | Field | Ok | Ok | Whether the field is a business key |  
| dataProfileEnabled | Boolean | Field | Ok | Ok | Whether the data profile on the field is enabled |  
| dataProfilePublished | Boolean | Field | Ok | Ok | Whether the data profile on the field is published |  
| alternativeNames | [String] | All glossary types | Ok | Ok | List of alternatives names |  
| email | String | Contact | Ok | Ok | Email of the contact |  
| firstName | String | Contact | Ok | Ok | First name of the contact |  
| lastName | String | Contact | Ok | Ok | Last name of the contact |  
| phone | String | Contact | Ok | Ok | Phone number of the contact |  

## CONNECTIONS

| Source type | Target type(s) | Connection name | Read | Write | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| dataset | field | fields | Ok | N/A | Fields of a dataset |  
| dataset | dataset | relations | Ok | Ok | Datasets linked through a foreign key |  
| dataset | data-process | ingesters | Ok | Ok | All the data processes that have the dataset as input |  
| dataset | data-process | producers | Ok | Ok | All the data processes that have the dataset as output |  
| dataset | visualization | visualization | Ok | Ok | For the datasets that are embedded in a visualization, the visualization |  
| dataset | Custom item type | Code of the custom item type | Ok | Ok | Custom items of a given type linked to the dataset |  
| dataset | category | category | Ok | Ok | (DEPRECATED) Category of the dataset |  
| dataset | contact | curators | Ok | Ok | Curators of the dataset |  
| dataset | contact | Responsibility name | Ok | Ok | Contacts that have the given responsibility on the dataset |  
| dataset | datasource | datasource | Ok | N/A | The datasource of the dataset |  
| dataset | All glossary item types | definitions | Ok | Ok | All the glossary items linked to the dataset (can contain various types) |  
| field | dataset | dataset | Ok | N/A | The dataset the field belongs to |  
| field | Custom item type | Code of the custom item type | Ok | Ok | Custom items of a given type linked to the field |  
| field | All glossary item types | definitions | Ok | Ok | All the glossary items linked to the field (can contain various types) |  
| field | contact | curators | Ok | Ok | Curators of the field |  
| field | contact | Responsibility name | Ok | Ok | Contacts that have the given responsibility on the field |  
| data-process | dataset or Custom item type | inputs | Ok | Ok | Inputs of the data process |  
| data-process | dataset or Custom item type | outputs | Ok | Ok | Outputs of the data process |  
| data-process | Custom item type | Code of the custom item type | Ok | Ok | Custom items of a given type linked to the data process |  
| data-process | contact | curators | Ok | Ok | Curators of the data process |  
| data-process | contact | Responsibility name | Ok | Ok | Contacts that have the given responsibility on the data process |  
| data-process | datasource | datasource | Ok | N/A | The datasource of the data process (if teh data process has been harvested) |  
| data-process | All glossary item types | definitions | Ok | Ok | All the glossary items linked to the data process (can contain various types) |  
| visualization | Custom item type | Code of the custom item type | Ok | Ok | Custom items of a given type linked to the data process |  
| visualization | dataset | datasets | Ok | Ok | Datasets embedded in the visualization |  
| visualization | contact | curators | Ok | Ok | Curators of the data process |  
| visualization | contact | Responsibility name | Ok | Ok | Contacts that have the given responsibility on the visualization |  
| visualization | datasource | datasource | Ok | N/A | The datasource of the visualization |  
| visualization | All glossary item types | definitions | Ok | Ok | All the glossary items linked to the visualization (can contain various types) |  
| Custom item type | Any type | members | Ok | Ok | All the other items that are linked to this custom item |  
| Custom item type | data-process | ingesters | Ok | Ok | All the data processes that have the custom item as input |  
| Custom item type | data-process | producers | Ok | Ok | All the data processes that have the custom item as output |  
| Custom item type | contact | curators | Ok | Ok | Curators of the custom item |  
| Custom item type | contact | Responsibility name | Ok | Ok | Contacts that have the given responsibility on the custom item |  
| Custom item type | All glossary item type | definitions | Ok | Ok | All the glossary items linked to the custom item (can contain various types) |  
| Glossary item type | Any type | implementations | Ok | Ok | All the other items that are linked to the glossary item |  
| Glossary item type | All glossary item type | parents | Ok | Ok | Parents of the glossary item in the glossary |  
| Glossary item type | All glossary item type | children | Ok | Ok | Children of the glossary item in the glossary |  
| Glossary item type | Any type | implementations | Ok | Ok | All the other items that are linked to the glossary item |  
| Glossary item type | contact | curators | Ok | Ok | Curators of the glossary item |  
| Glossary item type | contact | Responsibility name | Ok | Ok | Contacts that have the given responsibility on the glossary item |  
| contact | Any type | curator | Ok | Ok | All the items the contact is curator of (various types) |  
| contact | Any type | Responsibility name | Ok | Ok | All the items on which the contact has the given responsibility(various types) |  
| datasource | dataset, field, visualization, data-process | imports | Ok | N/A | All the items that have been imported from the source |  
| category | dataset | members | Ok | Ok | [DEPRECATED] Datasets of the category |  
| category | contact | curators | Ok | Ok | [DEPRECATED] Curators of the custom item |  
| category | contact | Responsibility name | Ok | Ok | [DEPRECATED] Contacts that have the given responsibility on the custom item |  
| category | All glossary item type | definitions | Ok | Ok | [DEPRECATED] All the glossary items linked to the category (can contain various types) |  
 
## CUSTOM PROPERTIES

| Property type |  Read | Write | Description |  
| :--- | :--- | :--- | :--- |
| Template property | Ok | Ok | All properties associated to the template of an Item type in the Studio |  
| Source property |  Ok | N/A | All properties harvested from a connector

# Catalog API v1 (Deprecated)

> **Note:** This API is deprecated. Please see [Catalog API v2](./zeenea-catalog-api-v2.md).
 

Thanks to this Catalog API, dedicated to the exploration and mutation of Items, you can synchronize metadata from an external system into Zeenea, or pull information from your data catalog to another system.

Here are some use cases (all associated requests are available at the end of this article):

* I wish to retrieve a dataset name, along with all its fields
* From a dataset, I want to retrieve all other datasets implementing the same business terms
* I want to update the properties of a given dataset

## List of available operations

Here are the currently available operations, grouped by usage: 

* Retrieve Items' `id` or `key` using filters
  * `findItems`
* Replaced by the `items` operation in the Catalog API v2
  * Load Item details:
    * `loadItem` (deprecated, replaced by loadItemById)
    * `loadItemById`
    * `loadItemByKey`
* Replaced by the `item` operation in the Catalog API v2
  * Create an Item:
    * `createItem`
* Replaced by the `createItem` operation in the Catalog API v2
  * Update or delete an Item details (name, description or property value) using a single call
    * `updateItem`
    * `updateItemByKey`
* Replaced by the `updateItem` operation in the Catalog API v2
  * Update or delete an Item's name only:
    * `updateItemName`
    * `updateItemNameByKey`
    * `deleteItemName`
    * `deleteItemNameByKey`
* Replaced by the `updateItem` operation in the Catalog API v2
  * Update or delete an Item's description only:
    * `updateItemDescription`
    * `deleteItemDescription`
* Replaced by the `updateItem` operation in the Catalog API v2
  * Update or delete a simple property value using the Item's id or key and the property id (can't be used with properties referencing other objects)
    * `updateItemPropertyValue`
    * `updateItemPropertyValueByKey`
    * `deleteItemPropertyValue`
    * `deleteItemPropertyValueByKey`
* Replaced by the `updateItem` operation in the Catalog API v2
  * Add or remove a link between two Items in the catalog
    * `linkItems`
    * `linkItemsByKey`
    * `unlinkItems`
    * `unlinkItemsByKey`
* Replaced by the `updateItem` operation in the Catalog API v2
  * Add or remove a contact or a curator on an Item
    * `linkItemContact`
    * `unlinkItemContact`
* Replaced by the `createItem` operation in the Catalog API v2

For more information, see [API Lifecycle](./zeenea-api-lifecycle.md) can be found here.

> **Note:** The complete API documentation is available in the [Voyager](https://github.com/APIs-guru/graphql-voyager) tool which you can access from any of your environments by following this address:
><pre>https://<font className="codeHighlight">[instance-name]</font>.zeenea.app/public-api/catalog/voyager</pre>

## Representation of the properties

Properties are displayed without their sections in the APIs. Only non-empty properties are returned. 

Source and custom properties are returned in the same section, but are however distinguishable thanks to the "provenance" attribute.

## Representation of the links between Items

Links between items, be it native links (e.g., dataset-fields) or custom (e.g., a "custom item"-type property in a template) are grouped in a dedicated section called "itemLinks", that provides details on all linked items. In particular, multi-valued properties are represented as an object for each non-null value in the catalog. 

Links are directional and represented by 3 information:

* Subject: the origin of the link
* Object: the target of the link
* Predicate: the description of the link

## Limits

Performance while exploring links.

The Exploration API can retrieve Items from multiple levels using a single request. However, we recommend not exceeding 3 levels, as it will impact the response time. 

## Sample requests

> **Note:** All returns shown below were obtained in the Playground testing tool.
 
### Example 1: Retrieve a Dataset name, along with all Fields contained within

```
query {
  #retrieving the details of an Item with its id
  loadItemById(
    input: {
      id: "2386c62a-e33f-413d-8d83-386c4f310099"
    }
  ) {
     id #technical id of the Item
    name # Item name in Zeenea
    sourceName # Item name as provided by the connection
    # links of this Items with Fields only
    itemLinks (filter: { itemTypeNames: ["field"] }){
      target {
        name
        sourceName
        description
      }
    }
  }
}
```

The above request will return the following:

```
{
  "data": {
    "loadItemById": {
      "id": "96a8554c-25ea-4791-be69-a418c67ca031",
      "name": null,
      "sourceName": "dataset1",
      "itemLinks": [
        {
          "target": {
            "name": null,
            "sourceName": "field-name1",
            "description": null
          }
        },
        {
          "target": {
            "name": null,
            "sourceName": "field-name2",
            "description": null
          }
        },
        {
          "target": {
            "name": null,
            "sourceName": "field-name3",
            "description": null
          }
        }
      ]
    }
  }
}
```

> **Note:** If the "name" property has not been changed (i.e. if the functional name is the same as the source name in the interface), then queries will return a null value on this attribute.

### Example 2: From a Dataset, retrieve all other Datasets implementing the same Business terms

```
query {
#retrieve the Dataset from its key
  loadItemByKey(
    input: {
      key: "snowflake/schema1/projectA/dataset1"
    }
  ) 
#desired information about the Dataset
  {
    id # its technical id
    sourceName # its name as provided by the connection
    # its links with Business Terms only
    itemLinks(filter: { itemTypeNames: ["Business Terms"] }) {
      target {
        # name of the linked Business Term
        name
        # list of Items (limited to Datasets) that implement this Business Term
        itemLinks(filter: { itemTypeNames: ["dataset"] }) {
          target {
            sourceName
            outline{key}
          }
        }
      }
    }
  }
}
```
The above request will return the following:

```
{
  "data": {
    "loadItemByKey": {
      "id": "96a8554c-25ea-4791-be69-a418c67ca031",
      "name": null,
      "sourceName": "dataset1",
      "itemLinks": [
        {
          "target": {
            "name": "Customer Lifetime value",
            "itemLinks": [
              {
                "target": {
                  "sourceName": "dataset2",
                  "outline": {
                    "key": "bigquery/project3/dataset2"
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```

### Example 3: Retrieve all the Datasets from the data catalog that are linked to the "Snowflake" connection whose connection code is "SnowflakeCode"

The connection code can be retrieved in the scanner configuration or in the "Connections" section of Zeenea Admin.

```
query {
    findItems(input: {
        cursor: null,
        termFilters: [
            {
                field: CONNECTION_CODE,
                values: ["SnowflakeCode"]
            }
           {
                field: ITEM_TYPE_CODE,
                values: ["dataset"]
            }
        ]
    }) {
        cursor
        resultCount
        results {
            id
            key
            name
            sourceName
            type {name}
        }
    }
}
```

The above request will return the following:

```
{
  "data": {
    "findItems": {
      "cursor": "AoInY29tcGFueT8FMzVlMjM4NzMtOGRkMS00MjM5LTg0ZTgtNjNhZjVjMTI4ODhh",
      "resultCount": 3,
      "results": [
        {
          "id": "44c3ffbe-dbb5-4ddf-8662-4ed3ab48ed40",
          "key": "SnowFlakeCode/MUSIC/EMPLOYEES/ADDRESS",
          "name": "ADDRESS",
          "sourceName": "ADDRESS"
          "type": {
            "name": "dataset"
          }
        },
        {
          "id": "b8905239-e19f-4ab3-86a4-eb1862003b40",
          "key": "SnowFlakeCode/MUSIC/CUSTOMERS/ADDRESS",
          "name": "COMPANY",
          "sourceName": "COMPANY"
          "type": {
            "name": "dataset"
          }
        },
        {
          "id": "3ca3ce83-6c59-45ed-9ccb-80df5b63a907",
          "key": "SnowFlakeCode/MUSIC/TRACKS/ALBUM_ID",
          "name": "ALBUM_ID",
          "sourceName": "ALBUM_ID"
          "type": {
            "name": "dataset"
          }
        }
      ]
    }
  }
}
```

### Example 4: Create a Custom Item with a key named "MyCustomKey"

First, retrieve all the IDs of the Item Types:

```
query{
    listItemTypes {
        id
        name
    }
}
I get the Id of the Type of Item I am interested in to create an Item named "Finance" : 

mutation {
    createItem(
       input: {
         itemTypeId: "fbe043bb-9a41-3057-b85f-be531c77d873",
         name: "Finance",
         itemKey: "KeyFinance"
       }
     )
     {
        item {
          id
          outline {
              id
              key
           }
        }
     }
}
```

The above request will return the following:

```
{
  "data": {
    "createItem": {
      "item": {
        "id": "5346f274-cfcd-4552-a935-5cf89b2d2aa1",
        "outline": {
          "id": "5346f274-cfcd-4552-a935-5cf89b2d2aa1",
          "key": "KeyFinance"
        }
      }
    }
  }
}
```

### Example 5: Update the key of a Data catalog Visualization Item whose key is "Table/Samples/Regional" with the key "Finance/Report/Regional"

```
mutation {
    updateItemByKey(
        input: 
        {
            itemKey: "Tableau/Samples/Regional", 
            updatedItemKey: "Finance/Report/Regional" 
        }){
        item {
            outline {
                id
                key
            }
        }
    }
}
```

The above request will return the following:

```
{
  "data": {
    "updateItemByKey": {
      "item": {
        "outline": {
          "id": "5346f274-cfcd-4552-a935-5cf89b2d2aa1",
          "key": "Finance/Report/Regional"
        }
      }
    }
  }
}
```

### Example 6: Create an "Implements" type link between a Glossary Item of type "Business Data" and a Dataset

#### Step 1: Get the Id of the link type with the "listItemTypes" method:

```
query {
    listItemTypes {
      name
      itemTypeLinks {
        predicate
        id
        subject {
          name
        }
        object {
        name
        }
     }
  }
}
```

The above request will return the following:

```
{
  "data": {
    "listItemTypes": [
      {
        "name": "Application",
        "itemTypeLinks": [
          {
            "predicate": "Relates to",
            "id": "225f8ae1-95b0-4ec4-abc1-082b98c1b647",
            "subject": {
              "name": "dataset"
            },
            "object": {
              "name": "Application"
            }
          }
        ]
      },
      {
        "name": "field",
        "itemTypeLinks": [
          {
            "predicate": "Implements",
            "id": "a9bb3725-2e79-4b75-8106-281bb96ae998",
            "subject": {
              "name": "field"
            },
            "object": {
              "name": "Business Data"
            }
          },
          }
        ]
      },
     ...
    ]
  }
}
```

#### Step 2: Create the link between the two Items with "linkItemsByKey:

```
mutation {
  linkItemsByKey(
    input: {
      itemTypeLinkId: "a9bb3725-2e79-4b75-8106-281bb96ae998",
      subjectItemKey: "oracle2/schema1/datasetX/field1",
      objectItemKey: "business-data/Account Name"
    }
  ) {
    subjectItem {
      id
      name
      outline{key}
    }
    objectItem {
      id
      name
      outline{key}
    }
  }
}
```

The above request will return the following:

```
{
  "data": {
    "linkItemsByKey": {
      "subjectItem": {
        "id": "ea779403-11f5-4cc8-8464-82de76e1f44e",
        "name": null,
        "outline": {
          "key": "oracle2/schema1/datasetX/field1"
        }
      },
      "objectItem": {
        "id": "7ed78ba8-be44-484d-8731-92c1facdc908",
        "name": "Account Name",
        "outline": {
          "key": "business-data/Account Name"
        }
      }
    }
  }
}
```

### Example 7 : Update a property called "trust score" on a Dataset 

#### Step 1: Retrieving the id of the property "trust score"

```
query {
  findEditablePropertyDefinitionsByName(
    input: {
      name: "trust score"
    }
  ) {
     id #son id technique
    }
  }
```

The above request returns the following:

```
{
  "data": {
    "findEditablePropertyDefinitionsByName": [
      {
        "id": "a608420b-52af-4bc8-9f4e-458a94310b2c"
      }
    ]
  }
}
```

####  Step 2: Updating the property "trust score" (whose id is "a608420b-52af-4bc8-9f4e-458a94310b2c") on the Dataset whose key is "MySQL/laboratory/Final_product_quality"

```
mutation{
    updateItemPropertyValueByKey(
        input: {
            itemKey: "MySQL/laboratory/Final_product_quality"
            propertyDefinitionId: "a608420b-52af-4bc8-9f4e-458a94310b2c"
            value: "82%"
        }
    ) {

        item {
           id
           name
           sourceName
            properties {
                definition{
                    id
                    name
                    options
                    type
                    provenance
                    valueFeedMode
                }
                values
            }
        }
    }
}  
```
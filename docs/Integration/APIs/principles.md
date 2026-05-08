# Zeenea GraphQL Catalog API

Welcome to the Zeenea GraphQL Catalog API reference!

>> **API Endpoints:** https://<your_tenant>.zeenea.app/api/catalog/graphql     
>> **Headers:** X-API-SECRET: <YOUR_API_SECRET_HERE>

## Introduction

This reference includes the complete set of GraphQL types, queries, mutations, and their parameters for retrieving catalog
items and mutating them (updates, deletes and creates).

### Authentication

To use the API, you must provide a valid API key in the HTTP headers of your requests.

Here are the steps to authenticate your calls:

- Create a new API Key in the dedicated section of the Admin page (https://_your_tenant_.zeenea.app/admin/settings/api-keys)
- Make sure to store the API SECRET in a secure location, as it will no longer be displayed after you close the window
- In your HTTP requests, add the following headers:
  - X-API-SECRET: {api-secret-value}

### GraphQL schema

There are several ways to retrieve the GraphQL schema definition (that can be necessary to generate client
code).
First, you can leverage GraphQL introspection APIs:

_With Gradle/Apollo plugin_

```bash
./gradlew downloadApolloSchema --endpoint="https://_your_tenant_.zeenea.app/api/catalog/graphql" \
      --schema=schema.graphql --header="X-API-SECRET: TOKEN_API_SECRET_HERE"
```

_With Python/sgqlc_

```bash
py -m sgqlc.introspection -H "X-API-SECRET: TOKEN_API_SECRET" -H "Accept: application/json" \
    https://_your_tenant_.zeenea.app/api/catalog/graphql schema.graphql
```



## Principles

Zeenea Catalog API leverages GraphQL to allow querying the catalog graph while defining precisely the properties
and edges that you need in the result.

Zeenea Catalog API is based on GraphQL. To learn more about GraphQL, and how it differs from
traditional REST APIs, please visit the <a href="https://graphql.org" target="_blank">official GraphQL website</a>.

Zeenea Catalog API also follows Relay convention. While Relay has initially been designed to support
React web development at scale on top of GraphQL, it is also a very opiniated framework
on how to design a GraphQL API, and especially how to manage connections between entities
in a GraphQL schema. Following those conventions allows developers to use one of the Relay client libraries
to simplify script development, especially handling paginated lists of connected items.

You can learn more on Relay on the <a href="https://relay.dev" target="_blank">official Relay website</a>.

As an example is often more explanatory than long sentences, here is a query that will retrieve
a dataset with a couple of properties, and two connections: fields and curator.

```bash
$ref = 'DATABASE/starwars/rockets';
```

```graphql
query datasetsAndFields($ref: ItemReference!) {
  item(ref: $ref) {
    type
    key
    name
    schema: property(ref: "schema")
    table_name: property(ref: "source_name")
    classification: property(ref: "classification")
    domain: property(ref: "business_domain")
    fields: connection(ref: "fields") {
      nodes {
        name
        type
        pii: property(ref: "PII")
      }
    }
    curators: connection(ref: "curators", first: 1) {
      nodes {
        name
        email: property(ref: "email")
      }
    }
  }
}
```

This illustrates the main principles of the API:

- items are located using a reference, that can carry different ways to identify an object
- properties defined in the metamodel can be retrieved by using a reference (eg. `classification`), and the `property` pseudo-field defined in the graphql schema
- lists of connected items can be retrieved by using a named alias (eg. `fields`), and the `connection` pseudo-field defined in the graphql schema

The former query would produce the following payload:

```json
{
  "data": {
    "type": "dataset",
    "key": "DATABASE/starwars/rockets",
    "name": "Star wars rockets",
    "schema": "starwars",
    "table_name": "rockets",
    "classification": "Internal",
    "domain": "Space exploration",
    "fields": {
      "nodes": [
        {
          "name": "id",
          "type": "Number",
          "pii": "false"
        },
        {
          "name": "model",
          "type": "Text",
          "pii": "false"
        },
        {
          "name": "pilot",
          "type": "Text",
          "pii": "true"
        }
      ]
    },
    "curators": {
      "nodes": [
        {
          "name": "Paul Smith",
          "email": "psmith@nowhere.far"
        }
      ]
    }
  }
}
```

Using the API requires former knowledge of the metamodel defined in the target catalog (item types, properties, links).

### Generic item model

Unlike most GraphQL APIs, Zeenea relies on a very generic GraphQL schema that reflects the very dynamic nature
of the Zeenea Metamodel.

The GraphQL schema exposed by the API is the following:

![](./images/item_model.png)

The schema mostly relies on a single type, [Item]({{Types.Item}}), that contains a few attributes that are common
to all item types, and two pseudo-fields :

- [`property`]({{Types.Item.property}}), used to retrieve the value or values of a property defined in the metamodel
- [`connection`]({{Types.Item.connection}}), used to retrieve a collection of items linked to their parent through a named link.

In Zeenea's data model, all links between items are bi-directional and may have different cardinalities.
In the GraphQL API, links are fetched in a given direction (from a parent item), using the name of
the relation in that direction, and are always considered having a many cardinality.

For instance, `datasets` and `fields` are linked in the Zeenea model by a one-to-many relationship.
In the GraphQL API, it will map to 2 differents named connections:

- from the dataset, you can fetch the `fields` connection to get the list of all the items of type _field_
  of the dataset
- from the field, you can fetch the `dataset` connection to fetch the item of type _dataset_. It will be mapped to a
  connection of size 1.

Properties and connections are identified by codes.
Those codes are defined in the metamodel.

[Item]({{Types.Item}}) is an interface, that is specialized for some of the item types to provide information
that is specific to that type. So far, only the [Dataset]({{Types.Dataset}}) and [Data Process]({{Types.DataProcess}}) type is specialized.

You can retrieve type-specific information by using the `...on` GraphQL operator. A sample query illustrates its use in the Examples section below.

### Reference system

To retrieve information, the API relies on a set of reference types to identify items or elements of the metamodel.

The [ItemReference]({{Types.ItemRefernce}}) is used to reference an item. It can map to the item unique ID (retrieved from the API)
or one of the unique keys available for an item.

The [PropertyReference]({{Types.PropertyReference}}) is the way to retrieve a property of an item.
It maps to the code or the name of the property (case sensitive) as defined in the metamodel.
Properties can be user-defined (then the name is available in the user-defined metamodel), or built-in.

Built-in property are referenced [here](#built-in-properties).

The [ConnectionReference]({{Types.ConnectionReference}}) identifies links between items.
Links are bi-directional by design, but may have different names depending
on the direction used to fetch them.

Connection names are referenced [here](#connections).

### Using connections

Similarly to properties, connections are identified by code using the
[ConnectionReference]({{Types.ConnectionReference}}) type.

As connections can be of any size, they are always paginated, using the standard Relay mechanism.
The default (and max) page size is 20.

To iterate through a connection pages, you must use the [PageInfo]({{Types.Pageinfo}}) object. See sample
[here](#iterate-connection).

### Dealing with errors

Except when there is a server or access failure (that will raise a 40X or 5XX HTTP response code), GraphQL always returns
a HTTP Status Code 200, and potential errors are included in the response payload.

The generic structure of a GraphQL query is the following (see [GraphQL spec](https://graphql.org) for a comprehensive documentation).

```json
{
  "errors": [ { ... }],
  "data": { ... },
  "extensions" : { ... }
}
```

An error object has the following form (we use the `extensions`mechanism to provide more context
to the error, especially when the error comes from reference resolution):

```json
{
  "message": "Property domain has not been found",
  "path": ["contact", "domain"],
  "locations": [
    {
      "line": 6,
      "column": 3
    }
  ],
  "extensions": {
    "code": "PROPERTY_NOT_FOUND",
    "value": "domain",
    "availableValues": ["firstName", "lastName", "email", "phone"]
  }
}
```

The list of error codes can be found [here](#error-codes)

### Complexity check

GraphQL provides a very powerful semantic to query a graph-based system. This power comes with a drawback: it is
theoretically possible to forge a query that would retrieve the entire graph, or recursively load connections with
an infinite depth - leading to potentially disastrous performance issues.

To protect the system from over complex queries, Zeenea performs a complexity check on every query. Complexity
check is performed on the structure of the query, not on the size of the results - this means that a
query that passes the check will always pass it, even if the size of the results increases.

The complexity score of a query is provided in the `extensions` attribute of the GraphQL response payload:

```json
{
  "errors": [],
  "data": {},
  "extensions": {
    "complexityScore": 20
  }
}
```

If one of your query is too complex, you will have to decompose it to simpler sub-queries.

For instance, let's consider the following query:

```graphql
query datasetsAndFields($datasetRef: ItemReference!) {
  item(ref: $datasetRef) {
    fields: connection(ref: "fields") {
      nodes {
        definitions: connection(ref: "definitions") {
          nodes {
            implementations: connection(ref: "implementations") {
              nodes {
                type
                name
                description
              }
            }
          }
        }
      }
    }
  }
}
```

Submitting this query might raise a complexity check error (`QUERY_TOO_COMPLEX`).
In this case, you can reduce the depth of the initial query by removing one of the connection traversals:

```graphql
query datasetsAndFields($datasetRef: ItemReference!) {
  item(ref: $datasetRef) {
    fields: connection(ref: "fields") {
      nodes {
        definitions: connection(ref: "definitions") {
          nodes {
            key
          }
        }
      }
    }
  }
}
```

While iterating the `definitions` connection, you can submit a sub-query to retrieve the `implementations`
connection, using the key of the parent item.
For each item in the `definitions` connection, you can run the sub-query:

```graphql
query businessTermImplementations($key: ItemReference!) {
  connection(sourceRef: $key, connectionRef: "implementations") {
    nodes {
      type
      name
      description
    }
  }
}
```


## Naming reference


### Item types

<a name="item-types"></a>

| Item type          | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| Dataset            | `dataset`                                                     |
| Field              | `field`                                                       |
| Visualization      | `visualization`                                               |
| Data process       | `data-process`                                                |
| Contact            | `contact`                                                     |
| Datasource         | `datasource`                                                  |
| Category           | `category`                                                    |
| Custom Item Type   | Code of the custom item type as defined in Zeenea metamodel   |
| Glossary Item Type | Code of the glossary item type as defined in Zeenea metamodel |

### Built-in properties

<a name="built-in-properties"></a>

The following table is the reference for all built-in properties:

| Property                 | Type     | Available on                               | Read/write | Description                                                            |
| ------------------------ | -------- | ------------------------------------------ | ---------- | ---------------------------------------------------------------------- |
| sourceName               | String   | Dataset, Field, Visualization, DataProcess | Read-only  | Name of the item in the source system                                  |
| sourceDescription        | String   | Dataset, Field, Visualization, DataProcess | Read-only  | Description of the item in the source system                           |
| lastSourceMetadataUpdate | Date     | Dataset, Field, Visualization, DataProcess | Read-only  | Last time there was a change in the item metadata in the source system |
| orphan                   | Boolean  | Dataset, Field                             | Read-only  | Item is missing from the last inventory                                |
| deletionDate             | Date     | Dataset, Field, Visualization, DataProcess | Read-only  | The date at which the item has been deleted in the source system       |
| importDate               | Date     | Dataset, Field, Visualization, DataProcess | Read-only  | The date at which the item has been imported into the catalog          |
| fieldType                | String   | Field                                      | Read-only  | The normalized type of the field                                       |
| fieldNativeType          | String   | Field                                      | Read-only  | The native type of the field as defined in the source system           |
| canBeNull                | Boolean  | Field                                      | Read-only  | Whether the field is nullable                                          |
| multivalued              | Boolean  | Field                                      | Read-only  | Whether the field supports multiple values                             |
| primaryKey               | Boolean  | Field                                      | Read-only  | Whether the field is a primary key                                     |
| foreignKey               | Boolean  | Field                                      | Read-only  | Whether the field is a foreign key                                     |
| businessKey              | Boolean  | Field                                      | Read-write | Whether the field is a business key                                    |
| dataProfileEnabled       | Boolean  | Field                                      | Read-write | Whether the data profile on the field is enabled                       |
| dataProfilePublished     | Boolean  | Field                                      | Read-write | Whether the data profile on the field is published                     |
| alternativeNames         | [String] | All glossary types                         | Read-write | List of alternatives names                                             |
| email                    | String   | Contact                                    | Read-write | Email of the contact                                                   |
| firstName                | String   | Contact                                    | Read-write | First name of the contact                                              |
| lastName                 | String   | Contact                                    | Read-write | Last name of the contact                                               |
| phone                    | String   | Contact                                    | Read-write | Phone number of the contact                                            |

### Connections

<a name="connections"></a>

The following table is the reference for all available connections between items:

| Source type        | Connection name       | Target type(s)                                      | Read/write | Cardinal | Description                                                                            |
| ------------------ | --------------------- | --------------------------------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------- |
| `dataset`          | `fields`              | `field`                                             | Read-only  | 1-n      | Fields of a dataset                                                                    |
| `dataset`          | `relations`           | `dataset`                                           | Read-only  | 0-n      | Datasets linked through a foreign key                                                  |
| `dataset`          | `ingesters`           | `data-process`                                      | Read-write | 0-n      | All the data processes that have the dataset as input                                  |
| `dataset`          | `producers`           | `data-process`                                      | 0-n        | 0-n      | All the data processes that have the dataset as output                                 |
| `dataset`          | `visualization`       | `visualization`                                     | 0-1        | 0-n      | For the datasets that are embedded in a visualisation, the visualization               |
| `dataset`          | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the dataset                                     |
| `dataset`          | `category`            | `category`                                          | 0-1        | 0-n      | [DEPRECATED] Category of the dataset                                                   |
| `dataset`          | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the dataset                                                                |
| `dataset`          | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the dataset                             |
| `dataset`          | `datasource`          | `datasource`                                        | 1-1        | 0-n      | The datasource of the dataset                                                          |
| `dataset`          | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the dataset (can contain various types)               |
| `field`            | `dataset`             | `dataset`                                           | 1-1        | 0-n      | The dataset the field belongs to                                                       |
| `field`            | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the field                                       |
| `field`            | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the field (can contain various types)                 |
| `field`            | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the field                                                                  |
| `field`            | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the field                               |
| `data-process`     | `inputs`              | `dataset` or Custom item type                       | 0-n        | 0-n      | Inputs of the data process                                                             |
| `data-process`     | `outputs`             | `dataset`, `visualization` or Custom item type      | 0-n        | 0-n      | Outputs of the data process                                                            |
| `data-process`     | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the data process                                |
| `data-process`     | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the data process                                                           |
| `data-process`     | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the data process                        |
| `data-process`     | `datasource`          | `datasource`                                        | 0-1        | 0-n      | The datasource of the data process (if teh data process has been harvested)            |
| `data-process`     | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the data process (can contain various types)          |
| `visualization`    | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the data process                                |
| `visualization`    | `datasets`            | `dataset`                                           | 0-n        | 0-n      | Datasets embedded in the visualization                                                 |
| `visualization`    | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the data process                                                           |
| `visualization`    | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the visualization                       |
| `visualization`    | `datasource`          | `datasource`                                        | 1-1        | 0-n      | The datasource of the visualization                                                    |
| `visualization`    | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the visualization (can contain various types)         |
| Custom item type   | `members`             | Any type                                            | 0-n        | 0-n      | All the other items that are linked to this custom item                                |
| Custom item type   | `ingesters`           | `data-process`                                      | 0-n        | 0-n      | All the data processes that have the custom item as input                              |
| Custom item type   | `producers`           | `data-process`                                      | 0-n        | 0-n      | All the data processes that have the custom item as output                             |
| Custom item type   | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the custom item                                                            |
| Custom item type   | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the custom item                         |
| Custom item type   | `definitions`         | All glossary item type                              | 0-n        | 0-n      | All the glossary items linked to the custom item (can contain various types)           |
| Glossary item type | `implementations`     | Any type                                            | 0-n        | 0-n      | All the other items that are linked to the glossary item                               |
| Glossary item type | `parents`             | All glossary item type                              | 0-n        | 0-n      | Parents of the glossary item in the glossary                                           |
| Glossary item type | `children`            | All glossary item type                              | 0-n        | 0-n      | Children of the glossary item in the glossary                                          |
| Glossary item type | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the glossary item                                                          |
| Glossary item type | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the glossary item                       |
| `contact`          | `curator`             | Any type                                            | 0-n        | 0-n      | All the items the contact is curator of (various types)                                |
| `contact`          | Responsibility name   | Any type                                            | 0-n        | 0-n      | All the items on which the contact has the given responsibility(various types)         |
| `datasource`       | `imports`             | `dataset`, `field`, `visualization`, `data-process` | 0-n        | 0-n      | All the items that have been imported from the source                                  |
| `category`         | `members`             | `dataset`                                           | 0-n        | 0-n      | [DEPRECATED] Datasets of the category                                                  |
| `category`         | `curators`            | `contact`                                           | 0-n        | 0-n      | [DEPRECATED] Curators of the custom item                                               |
| `category`         | Responsibility name   | `contact`                                           | 0-n        | 0-n      | [DEPRECATED] Contacts that have the given responsibility on the custom item            |
| `category`         | `definitions`         | All glossary item type                              | 0-n        | 0-n      | [DEPRECATED] All the glossary items linked to the category (can contain various types) |


## Error codes

<a name="error-codes"></a>

| Error Code                           | Description                                                                                                                                                                                          | Extensions                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `ITEM_NOT_FOUND`                     | When an item does not match any id, key, name, source name with the reference.                                                                                                                       | code, value                                             |
| `TOO_MANY_ITEMS_FOUND`               | When multiple items have the same name or sourceName                                                                                                                                                 | code, value                                             |
| `TOO_MANY_ITEMS_FOUND_WITH_TYPE`     | When multiple items have the same name with the item type given in parameters                                                                                                                        | code, value                                             |
| `MISSING_ARGUMENT`                   | When an argument from a field or a direct query is not provided                                                                                                                                      | code, field, arguments                                  |
| `QUERY_TOO_COMPLEX`                  | When the submitted query has a complexity score above the max allowed score                                                                                                                          | code, complexityScore, maxAllowedScore                  |
| `ITEM_TYPE_NOT_FOUND`                | When the argument type of type ItemType does not correspond to an existing value. All available values are provided in the corresponding extension field                                             | code, value, availableValues                            |
| `CONNECTION_REFERENCE_NOT_FOUND`     | When the argument ref of type ConnectionReference does not correspond to an existing value. All available values are provided in the corresponding extension field                                   | code, value, availableValues                            |
| `PROPERTY_NOT_FOUND`                 | When a property reference does not correspond to an existing value. All available values are provided in the corresponding extension field                                                           | code, value, availableValues                            |
| `TOO_MANY_PROPERTIES_FOUND`          | When multiple properties have been found with the same name                                                                                                                                          | code, value,                                            |
| `PROPERTY_VALUE_INVALID`             | When the user has submitted a value for a property mutation command that does not fit the format of the property                                                                                     | code, propertyRef, value, propertyType, availableValues |
| `COMMAND_NOT_FOUND`                  | When a mutation command refers to a non existing command.                                                                                                                                            | code, value, availableValues                            |
| `COMMAND_INVALID`                    | When a mutation command cannot be applied to the current value.                                                                                                                                      | code, value, currentValue                               |
| `COMMAND_UNAVAILABLE`                | When a mutation command cannot be applied to the type of property                                                                                                                                    | code, value, propertyType, availableValues              |
| `ITEM_TYPE_INVALID`                  | When the pair connection reference / item type provided in a mutation does not correspond to any connection                                                                                          | code, value, availableValues                            |
| `ITEM_TYPE_INVALID`                  | When a create item request is used for a non autorized type (Dataset, Field, Visualization)                                                                                                          | code, value, availableValues                            |
| `ITEM_TYPE_INVALID`                  | When a delete item request attempt to delete a datasource                                                                                                                                            | code, value, availableValues                            |
| `COMMAND_UNAVAILABLE`                | When a mutation command is not available for the edge mutation                                                                                                                                       | code, value, availableValues                            |
| `CONNECTION_VALUE_INVALID`           | When an edge mutation command tries to edge a contact as a curator, without having a user associated to the contact                                                                                  | code, value                                             |
| `READ_ONLY_PROPERTY`                 | When a create or update item request attempt to set a built-in property or attempt to set a read-only property                                                                                       | code, propertyRef                                       |
| `MISSING_MANDATORY_FIELD`            | When a create item request lacks a mandatory field (item type or name)                                                                                                                               | code, arguments                                         |
| `TOO_MANY_ITEMS_FOUND_WITH_KEY`      | When a createItem or updateItem request uses a key already used by another item in the catalog                                                                                                       | code, value                                             |
| `ITEM_INVALID`                       | When a deleteContact request attempt to delete a contact associated to a user                                                                                                                        | code, value                                             |
| `TOO_MANY_ITEMS_FOUND_WITH_EMAIL`    | When a createContact request attempt to create a contact with an already used email                                                                                                                  | code, value                                             |
| `*ATTRIBUTE*_VALUE_INVALID`          | When a createContact, updateContact, createItem, updateItem request attempt to create or update a contact or item with an invalid value for a basic attribute (too long name, email without @, etc.) | code, value                                             |
| `READ_ONLY_CONTACT_EMAIL`            | When an updateContact request attempt to modify the email of a user                                                                                                                                  | code, value                                             |
| `CONNECTION_REFERENCE_UNAVAILABLE`   | When a createContact request attempt to create a curator connection while there is no associated user                                                                                                | code, value, availableValues                            |
| `PREDICATE_UNAVAILABLE`              | When an items request uses a predicate that can not be applied to the type of property                                                                                                               | code, propertyRef, value, propertyType, availableValues |
| `FILTER_VALUE_INVALID_FOR_PREDICATE` | When an items request uses a property value that is invalid for the used predicate                                                                                                                   | code, value                                             |
| `FILTER_VALUE_INVALID`               | When the user has submitted a value for a filter that does not fit the format of the property                                                                                                        | code, propertyRef, value, propertyType, availableValues |
| `ITEM_TYPE_NOT_IMPLEMENTED`          | When an items request attempts to retrieve items for an item type that is not implemented for this query yet                                                                                         | code, value                                             |
| `PROPERTY_NOT_IMPLEMENTED`           | When a query or mutation attempts to use a property reference that is not implemented yet                                                                                                            | code, value                                             |
| `FILTER_TYPE_NOT_IMPLEMENTED`        | When an items request attempts to use a filter type that is not implemented yet                                                                                                                      | code, value                                             |


## Examples


The following section provides various samples for common queries.

### Retrieve all fields of a dataset and its datasource

```javascript
$ref = 'DATABASE/schema/table_name';
```

```graphql
query datasetsAndFields($ref: ItemReference!) {
  item(ref: $ref) {
    type
    key
    name
    schema: property(ref: "schema")
    table_name: property(ref: "source_name")
    datasource: connection(ref: "datasource") {
      nodes {
        name
      }
    }
    fields: connection(ref: "fields") {
      nodes {
        name
        type
        pii: property(ref: "PII")
      }
    }
  }
}
```

### Retrieve data quality statement for a dataset

To cast an Item to one of its specialization, you must use the `...on` GraphQL operator:

```javascript
$ref = 'DATABASE/schema/table_name';
```

```graphql
query datasetQuality($ref: ItemReference!) {
  item(ref: $ref) {
    ... on Dataset {
      name
      schema: property(ref: "schema")
      table_name: property(ref: "source_name")
      quality {
        syntheticResult
        checks {
          name
          family
          result
        }
      }
    }
  }
}
```

### Retrieve all datasets owned by a given user

```javascript
$ref = 'john.doe@nowhere.far';
```

```graphql
query ownership($ref: ItemReference!) {
  item(ref: $ref) {
    type
    key
    email: property(ref: "email")
    curators: connection(ref: "curator", filter: { nodeTypes: ["dataset"] }) {
      nodes {
        schema: property(ref: "schema")
        table_name: property(ref: "source_name")
        datasource: connection(ref: "datasource") {
          nodes {
            name
          }
        }
      }
    }
  }
}
```

### Iterate a connection

<a name="iterate-connection"></a>
Initial query:

```javascript
$ref = 'DATABASE/schema/table_name';
```

```graphql
query datasetsAndFields($ref: ItemReference!) {
  item(ref: $ref) {
    type
    key
    name
    schema: property(ref: "schema")
    table_name: property(ref: "source_name")
    fields: connection(ref: "fields") {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        type
        pii: property(ref: "PII")
      }
    }
  }
}
```

Sub-sequent queries (if `item.fields.pageInfo.hasNextPage`):

```javascript
$ref = item.key;
$endCursor = item.fields.pageInfo.endCursor;
```

```graphql
query fieldsNextPage($ref: ItemReference!, $endCursor: String) {
  connection(sourceRef: $ref, connectionRef: "fields", after: $endCursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      name
      type
      pii: property(ref: "PII")
    }
  }
}
```

### Create a new custom item

```graphql
mutation createApplication {
  createItem(
    input: {
      type: "application"
      name: "The Application"
      properties: [
        { ref: "business_domains", value: ["Finance", "Controlling"] }
        { ref: "criticality", value: ["Business critical"] }
      ]
      connections: [
        { connectionRef: "curators", itemRefs: ["john.doe@nowhere.far"] }
        {
          connectionRef: "members"
          itemRefs: ["741ae65e-9db2-4b5e-b0c4-265abf51f009", "05050ac8-fad1-4412-862e-020515b33c40"]
        }
      ]
    }
  ) {
    item {
      id
    }
  }
}
```

### Change a dataset curator

```javascript
$ref = 'DATABASE/schema/table_name';
$curator = 'john.doe@nowhere.far';
```

```graphql
mutation updateDatasetCurator($ref: ItemReference!, $curator: ItemReference) {
  updateItem(
    input: {
      ref: $ref
      updates: { connections: [{ command: REPLACE, connectionRef: "curators", itemRefs: [$curator] }] }
    }
  ) {
    item {
      id
    }
  }
}
```

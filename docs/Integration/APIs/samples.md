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

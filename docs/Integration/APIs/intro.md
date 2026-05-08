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

```shell
./gradlew downloadApolloSchema --endpoint="https://_your_tenant_.zeenea.app/api/catalog/graphql" \
      --schema=schema.graphql --header="X-API-SECRET: TOKEN_API_SECRET_HERE"
```

_With Python/sgqlc_

```shell
py -m sgqlc.introspection -H "X-API-SECRET: TOKEN_API_SECRET" -H "Accept: application/json" \
    https://_your_tenant_.zeenea.app/api/catalog/graphql schema.graphql
```

Or you can just download the latest schema [here](./schema.graphql)

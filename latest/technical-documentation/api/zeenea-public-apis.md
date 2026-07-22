# Introduction to Zeenea Public APIs

Zeenea provides a set of public APIs that allow you to manage your catalog and its contents. The following section gives an overview of the available APIs and the technologies they use.

## List of APIs

Zeenea provides the following APIs:

* **Exploration and mutation (GraphQL)**: Allows you to retrieve and edit any Item's documentation.
* **Catalog Design (GraphQL)**: Allows you to manage your catalog metamodel, Item types, and available properties. 
* **User Management (SCIM)**: Allows you to manage Users, Contacts, and Permission sets. 
* **Audit Trail API (REST)**: Allows you to track all Add, Update, and Delete events on all Items' metadata in your catalog. Items include Assets, Custom Items, Users, Contacts, and Permission sets. 
* **Data Product API (REST)**: Allows you to ingest and update data products and data contracts.
* **Access Request API (REST)**: Allows you to manage access requests.

For each API, dedicated documentation is available to help you understand its use cases, current limits, and some example requests.

For more information about the lifecycle of APIs, see [Zeenea API Lifecycle](./zeenea-api-lifecycle.md).

## API Key Authentication

To use the APIs, you must authenticate using an API key. Follow these steps to authenticate:

1. Create a new API key in Zeenea Administration. For detailed steps, see [Create an API key](../../features-applications/administration/zeenea-managing-api-keys.md#create-an-api-key).
2. In your HTTP requests, add the following header: 

    `"X-API-SECRET": "$APISECRET"`
    
    Replace `$APISECRET` with the API secret that you retrieved when creating the key.

 
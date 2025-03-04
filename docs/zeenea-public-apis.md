---
title: Introduction to Zeenea Public APIs
---

# Introduction to Zeenea Public APIs

Zeenea offers a set of public APIs that will allow you to manage your catalog and its contents. Below is a general overview of the existing APIs and used technologies. 

## List of APIs
Zeenea offers 4 APIs: 

* Exploration and mutation (GraphQL): This API allows you to retrieve and edit any Item's documentation.
* Catalog Design (GraphQL): Manage your catalog metamodel, Item types, and available properties. 
* User Management (SCIM): Manage Users, contacts, and permission sets. 
* Audit Trail (REST): Track all Add/Update/Delete events on all Items' metadata in your catalog. Items include assets, custom items, users, contacts, and permission sets. 

For each API, you will find dedicated documentation, allowing you to better understand the use cases, their current limits, and some examples of requests.

The lifecycle of APIs is detailed here: [Zeenea API Lifecycle](./zeenea-api-lifecycle.md).

## API authentication system
To use the APIs, you will need to be authenticated by API Key. Follow these steps to authenticate yourself: 

* Create a new API Key in the dedicated section of the Admin page
* Make sure to store the API Key, as it will no longer be displayed after you close the window
* In your HTTP requests, add the following element to your headers: 

    `"X-API-SECRET": "$APISECRET"`
    
    replacing `$APISECRET` with the API secret that you retrieved when creating the key.

 
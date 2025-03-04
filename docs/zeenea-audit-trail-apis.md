---
title: Audit Trail APIs
---

# Audit Trail APIs

The Audit Trail API allows you to list all added, updated, and deleted metadata in the catalog; this includes users, contacts, groups/permission sets, and data access requests. 

Below are some examples, detailing how these APIs could be used (the requests used are detailed in the "Using the API" section):

* Data catalog items audit trail:
  * Example 1: I want to list all changes made on all objects contained in the Catalog, over the last two days.
  * Example 2: I want to list all changes made by a specific user on all Items in the Catalog, over a given time range
  * Example 3: I want to list all changes made on the “Customers” dataset in 2021.
* Users and Contacts audit trail:
  * Example 4: I want to list all changes made to users and contacts over the last month.
  * Example 5: I want to list all changes made to groups/permission sets in 2021.
* Data access requests audit trail: (BETA)
  * Example 6: I want to list all access requests and their reviews over the last month.
  * Example 7: I want to list all changes made to the data access request configuration in 2024.

The API technical documentation is provided in this section.

## Technical Documentation

### Documentation and tools

The full technical documentation for the Zeenea Audit Trail API can be retrieved by using a GET method (on any API Platform such as Postman) on the following URL: 

<pre>
https://<font className="codeHighlight">[myapp]</font>.zeenea.app/public-api/management/audit/docs 
</pre>

### Authentication

To use the API, you must be authenticated via an API Key on the following URL: 

https://[myapp].zeenea.app/public-api/management/audit

Most of the APIs use the POST method.

Do the following: 

1. In the Admin menu, under the **API Keys** section, click **New API Key**.
2. Make sure to store this key somewhere safe, as it will no longer be accessible once the pop-up window has been closed.
3. In your HTTP Request headers, add the following value: 

    `X-API-SECRET": "$APISECRET`

    Where `$APISECRET` is the value of the API secret that you retrieved when creating the key.

### Examples

#### Example 1: I want to list all changes made on all objects contained in the Catalog, over the last two days.

```json
{
   "from": "2021-07-25T00:00:00.000Z",
   "to": "2021-07-27T00:00:00.000Z",
   "eventType": "Item"
}
```

#### Example 2: I want to list all changes made by a specific user on all Items in the Catalog, over a given time range

```json
{
  "from": "2021-04-01T00:00:00.000Z",
  "to": "2021-04-30T00:00:00.000Z",
  "eventType": "Item",
  "originId": "9b27a985-6fa3-4358-898c-462f7c491202"
}
```

#### Example 3: I want to list all changes made to the “Customer” dataset in 2021: 

```json
{
   "from": "2021-01-01T00:00:00.000Z",
   "to": "2021-12-31T00:00:00.000Z",
   "eventType": "Item",
   "resourceId": "c89862e8-1002-4dff-92d6-fd7d5bb57b6c"
}
```

:::note[IMPORTANT]
The item ID can be retrievable with the help of the Exploration APIs or it can be found in the URL of a specific item. As an example, after having accessed an item, its ID was retrieved from its URL:

`https://[myapp].zeenea.app/studio/dataset/c89862e8-1002-4dff-92d6-fd7d5bb57b6c/general`

The ID is string like `c89862e8-1002-4dff-92d6-fd7d5bb57b6c`.
:::

#### Example 4: I want to list all changes made to users and contacts over the last month. 

```json
{
   "from": "2021-11-01T00:00:00.000Z",
   "to": "2021-11-30T00:00:00.000Z",
   "eventType": "User"
}
```

#### Example 5: I want to list all changes made to permission sets in 2021. 

```json
{
   "from": "2021-01-01T00:00:00.000Z",
   "to": "2021-12-31T00:00:00.000Z",
   "eventType": "PermissionSet"
}
```

#### Example 6: I want to list all access requests and their reviews over the last month.

```json
{
  "from": "2024-11-01T00:00:00.000Z",
  "to": "2024-11-30T00:00:00.000Z",
  "eventType": "DataAccessRequest"
}
```

#### Example 7: I want to list all changes made to the data access request configuration in 2024.

```json
{
 "from": "2024-01-01T00:00:00.000Z",
 "to": "2024-12-31T00:00:00.000Z",
 "eventType": "DataAccessRequestConfiguration"
}
```

### API Responses

Requested data will be returned by the API in the following format:

```json
"data": [
  {
      "id": "e955bfb3-c316-421a-aa03-04471cc9bcí4", 
      "timestamp": "2023-12-27T15:14:46.360131498Z", 
      "eventType" : "Item", 
      "origin": {
          "id" : "55bleO42-680f-4164-8e86-cl211c46a7f4',
          "originType": "User"
      },
      "value": {
          "Personal data": "No"
      }, 
      "itemld": "7813408d-í3cí-49c5-91fe-ba0ílb0aa312",
      "itemName": "First instance",
      "itemEventType": "Updateitem"
  }
    ...
  ]
  
```
:::note
In case you wish to access more details on a specific item, we recommend using the Exploration APIs.
:::

Please also note that, when multiple updates are done at the same time, the API will behave differently depending on the type of items: 

* For objects, the API will return one event per edited value.
* For users, contacts, and permission sets: the API will only return one event, listing all updates ran concurrently. 

### Performance

For each call, the Audit Trail API can return a maximum of 100 events. If the API is to return additional items, the “cursorMark” attribute at the end of the pagination element will not be null. To retrieve those additional items, you will need to use that cursor.

```
{
    (...)
   "pagination": {
    "cursorMark": "#126:38"
     }
}
```

For example, if I wish to retrieve all changes (on all items in the catalog) made after the cursorMark “#126:38”, the request will look like this: 

```json
{
   "from": "2021-04-01T00:00:00.000Z",
   "to": "2021-04-30T00:00:00.000Z",
    "cursorMark": "#126:38"
}
```

If the API response contains no more events, the cursorMark value will become null.

### Limitations

For all "Link" type properties (curators, categories, business terms, data processes, visualizations, and natural keys), the API can only retrieve the updated values. 

For example, if a user adds two new curators (C and D) on a Dataset already assigned to curators A and B, the Audit Trail API will only retrieve the last two events, with the following values: 

```
{
    (...)
   "value": ,
   (...)
}
and 

{
    (...)
   "value": ,
   (...)
}
```

The "previousValue" event is currently not returned by the API for these types.  

* For "description"-type properties, the Audit Trail API will only show the edited parts. 

For example, if a user only updates Lines 1 and 4 of a description property, the Audit Trail API will return the following values:

```
{
    (...)
   "Line 1": ,
   (...)
}
and:

{
    (...)
   "Line 4": ,
   (...)
}
```

* For Custom Items, the Audit Trail API won’t retrieve their IDs, but only their names (which can be edited).
* Scanner and API Keys-related events can’t be retrieved for the following reasons:
  * The only scanner event that can be tracked by the API is when a new item is created.
  * The API key ID is not retrieved by the API. 
* The API cannot retrieve events that occurred before its roll-out date (December 20th, 2021). 
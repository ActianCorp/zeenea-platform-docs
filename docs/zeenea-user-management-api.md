---
title: User Management API
---

# User Management API

Public User Management APIs allow you to automatically synchronize your users from your authentication system (LDAP, Azure AD, etc.) to your list of users in Zeenea. This provides enhanced enterprise security and ensures compliance with your internal policies. 

## List of Available Operations

These are the currently available operations:

* **List permission sets**
  * listPermissionSets [Deprecated - see SCIM API]
* **Create or update a user**
  * createUser [Deprecated - see SCIM API]
  * upsertUser [Deprecated - see SCIM API]
* **Retrieve the information about a user**
  * loadUserById [Deprecated - see SCIM API]
  * loadUserByEmail [Deprecated - see SCIM API]
  * createAllUsersExport
  * loadUsersExportStatus
* **Delete a user**
  * deleteUserById [Deprecated - see SCIM API]
  * deleteUserByEmail [Deprecated - see SCIM API]

**Note**: The full API documentation is available in the [Voyager](https://github.com/APIs-guru/graphql-voyager) tool.  

## Use of the API

The User Management API uses the GraphQL language. GraphQL is an easy-to-implement language, that also allows you to specify, for each request, the information that you will get in return and that is relevant to your use case. 

For more information, refer to the official [GraphQL documentation](https://graphql.org/).

Zeenea provides two tools for understanding and testing this GraphQL API: Voyager and Playground.

### Voyager documentation

You can access the full documentation for Zeenea GraphQL APIs by accessing Voyager, at the following URL: https://[myenvironment].zeenea.app/public-api/catalog/voyager

This tool allows you to access the entire documentation of the User Management API and in particular the available requests. 

Note: Voyager also provides access to documentation for the Catalog Design API, as well as for the Exploration and Mutation API v1 (deprecated).

Documentation in Voyager is split into two sections: 

* Query APIs, that will allow you to read Zeenea data
* Mutation APIs, that you can use to edit data
 
 Navigate between both groups by using the selection menu in the lower part of the diagram.

## Playground

If you wish to test your queries before running them, you can use the Playground tool, accessible here:

<pre>
  https://<font className="codeHighlight">[myenvironment]</font>.zeenea.app/public-api/catalog/playground/search
</pre>

:::note
In order to use the APIs with Playground, you will need a valid API Key in the "HTTP Headers" tab. 
:::
 
## Limits

### Users already existing as contacts in Zeenea

When creating a new user, if the email address is already registered to a contact in Zeenea, the API will return an error message. 

## Use case examples

### Example 1: Create a new user in the Catalog, and assign them a Permission Set

First, we'll need to list all existing permission sets in Zeenea: 

```
query{
    listPermissionSets {
        id
        name
        description
        builtIn
        permissions {
            permission
            scope
        }
        licenseType
    }
}
```

Next, we'll retrieve the id of the relevant permission set. In this example, we will be using the "Data Steward" permission set, with the following id: ef18f11b-feda-461b-b51d-29dd761a9e5e. The API will return the newly created user's id. 

```
mutation {
    createUser(input: {
        email: "mynewuser@zeenea.com",
        firstName: "John",
        lastName: "Ubut",
        permissionSetId: "ef18f11b-feda-461b-b51d-29dd761a9e5e",
        contactInformation: [
            {
                key: "phone",
                value: "+33639982021"
            }
        ]
    }){
        user {
            id
            email
            contact {
                id
                firstName
                lastName
                contactInformation {
                    key
                    value
                }
            }
            permissionSet {
                id
                name
            }
        }
        action
    }
}
```

Note that the "Action" property will inform you of whether the user has been created or updated in Zeenea. 

User "Nicolas Boisnic" with a "Data Steward" permission set has been created. 

### Example 2: Extract a user's information

In this example, we extract a user's information using their technical id "4b89b2de-1b0c-4239-87be-2355880557ab":

```
query {
  loadUserById(input: {
        id: "4b89b2de-1b0c-4239-87be-2355880557ab"
    }) {
        id
        email
        contact {
            id
            firstName
            lastName
            contactInformation {
                key
                value
            }
        }
        permissionSet {
            id
            name
        }
    }
}
``` 

### Example 3: Delete a user using only their email

```
mutation {
    deleteUserByEmail(input: {
          email: "mynewuser@zeenea.com"
    })
    {
     id
    }
}
``` 

Note that a deleted user will remain in Zeenea as a Contact. 

### Example 4: List all users in Zeenea

First, run a job that will extract all users from the platform: 

```
mutation {
  createAllUsersExport
  {
    exportId
  }
}
```

The above query returns a technical ID used for the export batch. 

Next, use this ID in an Export query, that will generate a URL pointing to the export itself. 

```
query {
  loadUsersExportStatus(input: {
    exportId: "764f09dd-92c7-4cbe-9fbe-4c639387c929"
   })
   {
     exportId,
     status,
     url
  }
}
``` 

This generates a CSV file containing all users' details (the file is only available for an hour). 

Note that the file contains the following information:

* Id: Unique identifier of the user
* Email: Email address of the user
* First name
* Last name
* Phone
* Permission set id (Group id)
* Permission set name (Group name)
* Permission set description (Group description)
* Permission set built-in: Boolean (true/false) - Indicates if it is a Zeenea built-in permission set
* Custom item documentation permission: Whether the user can edit Custom Items (true/false)
* Custom item documentation scope: 
  * All: User can edit all Custom Items
  * UserOwned: The user can only edit Custom Items that are assigned to him
  * UserOwnedAndUnassigned: The user can edit Custom Items that are assigned to him and unassigned Custom Items
* Item documentation permission: Whether the user can edit Datasets, Fields, Visualizations, Data Processes, and Categories (true/false)
* Item documentation scope
* Glossary documentation permission: Whether the user can edit Glossary Items
* Glossary documentation scope
* Catalog design permission: Whether the user has access to the Catalog design section (true/false)
* Ops administration permission: Whether the user has read/write permissions on the Scanners, API keys, or Connections sections (true/false)
* Users and permissions administration: Whether the user has read/write permissions on User & Contacts and Permission sets sections
* License type: Steward or Explorer
* Creation date: Date of creation of the user (UTC)
* Last login: Last login date of the user (UTC)
* Logins count: Total count of logins of the user since its creation

:::note[NOTES]
* If the user belongs to several groups, the file will return only the first one.
* For the Federated Catalog, only information concerning the default catalog is displayed in the user's permission details.
:::



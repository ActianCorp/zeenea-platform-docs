---
title: SCIM API
---

# SCIM (System for Cross-domain Identity Management) protocol support

## Introduction

The SCIM (System for Cross-domain Identity Management) protocol is a standard designed to facilitate the synchronization and provisioning of users between different domains, in particular between an identity provider and external solutions that need this information to create their user profiles.

Zeenea implements certain services of the SCIM v2.0 protocol to enable user provisioning.

This documentation presents the specificities and limitations of the implementation of the SCIM protocol by the Zeenea platform. As this implementation is still incomplete, if you require other services or would like to share your feedback, please let us know and contact your Customer Success Manager.

In order to implement SCIM in your company, contact an administrator of your identity management platform in order to carry out the necessary configuration operations. Zeenea does not offer support for this configuration, as each platform has its own specific features, but the information provided below should make it easy to configure SCIM.

### Related Resources

* [SCIM specifications](https://scim.cloud/)

## Authentification and headers

To connect with Zeenea SCIM API, you need to generate an API key from the Zeenea Administration interface. See the following article which describes how to do this: [Managing API Keys](./zeenea-managing-api-keys.md).

Each SCIM request must provide authentication information to access the service.

The authentication mode currently implemented is Bearer authentication (aka token authentication) and uses the HTTP Header "Authorization".

The token corresponds to the API key secret generated from your Zeenea instance.

Here is how to proceed:

* Generate a new API key. 
* Use the generated secret to configure your Identity Management Platform and select the correct authentication mode: Bearer authentication (also called Token authentication).

In addition, the Content-Type parameter must be specified in request headers as follows: `‘Content-Type: application/scim+json’`.

## Model

SCIM 2.0 is built on an object model where a resource is the common denominator and all SCIM objects are derived from this resource.

SCIM defines two main types of objects: "Users" and "Groups".

### Users

Users can be defined in SCIM using a list of attributes. The table below shows the attributes supported by Zeenea for objects of type "User":


| SCIM attribute | Mapping in Zeenea | 
| :--- | :--- | 
| `id` | User identifier in Zeenea (UUID) |
| `userName` | User email |
| `emails` | User email |
| `phones` | User phone number |
| `familyName` | Last name of the user |
| `givenName` | First name of the user |

### Groups

In addition to users, SCIM includes the definition of groups. Groups are used to model the organizational structure of the resources made available. Groups can contain users or groups.

In Zeenea, SCIM groups correspond to user groups as defined in the Zeenea administration interface. Furthermore, in the current implementation, groups cannot contain other groups.

The table below shows the attributes supported by Zeenea for objects of type "Group":

| SCIM attribute | Mapping in Zeenea | 
| :--- | :--- | 
| `id` | Identifier of the group in Zeenea (UUID) |
| `displayName` | Name of the group |
| `externalId` | Code of the group<br /><br />Note: You need to perform a mapping upstream of Zeenea between the group identifiers defined in your identity management tool and the codes of the Zeenea groups to fill in the `externalId` attribute. |

## Supported Operations

SCIM provides a REST API with a set of operations that allow resource manipulation.

The SCIM API URL for your tenant is `https://<my_instance_name>.zeenea.app/api/scim/v2`, where `<my_instance_name>` is to be replaced by the name of your instance.

Zeenea only supports the operations described below.

## Users

Operations relating to users are carried out from the `/Users` endpoint: `https://<my_instance_name>.zeenea.app/api/scim/v2/Users`
where `<my_instance_name>`is to be replaced by the name of your instance.

### Create User

You can create new users from a POST request using the `/Users` endpoint.

#### Constraints

In the Zeenea implementation of SCIM, the `userName` attribute is mandatory and must correspond to a valid email address.

When a user is created, no group is assigned to him, which means that he is given read access to the Explorer. Users can then be assigned to a group (as a member) via a modification request to the group (see [Groups](#groups) below).

#### Example request:

```
curl --request POST \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Users'; \
--header 'Authorization: Bearer ' \
--header 'Content-Type: application/scim+json' \
--data-raw '{
"schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "userName": "testGivenName@domain.com",
    "name": {
        "givenName": "testGivenName",
        "familyName": "testFamilyName"
    }
}'
```

<font color="red">
where `<my_instance_name>` is to be replaced by the name of your instance.
</font>

<font color="red">
Added the line above and changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`  Is this correct?
</font>

### Patch User

You can modify a user's attributes from a PATCH request using the `/Users` endpoint with a user ID.

Example request:

```
curl --request PATCH \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Users/'; \
--header 'Authorization: Bearer ' \
--header 'Content-Type: application/scim+json' \
--data-raw '{
"schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
    ],
    "Operations": [{
       "op": "replace",
       "value": {
          "name": {
             "familyName": "Doe",
             "givenName": "John"
          }
       }
    }]
}'
```

where <font color="red">`<my_instance_name>` is to be replaced by the name of your instance and `<???>` </font> is to be replaced by the user's internal Zeenea ID.


<font color="red">
* Added `<my_instance_name>` and changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`  Is this correct?
* Where does the user's internal ID go (`<???>` above)?
</font>

### Delete User

You can delete a user from a DELETE request using the /Users endpoint with a user ID.

#### Example request:

```
curl --request DELETE \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Users/'; \
--header 'Authorization: Bearer ' \
--header 'Content-Type: application/scim+json'
```

where <font color="red">`<my_instance_name>` is to be replaced by the name of your instance and `<???>` </font> is to be replaced by the user's internal Zeenea ID.

<font color="red">
* Added `<my_instance_name>` and changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`  Is this correct?
* Where does the user's internal ID go (`<???>` above)?
</font>

### Get User

Existing users can be retrieved by making a GET request to the /Users endpoint with a user ID.

Example request:

```
curl —-request GET \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Users/’ \
--header 'Authorization: Bearer ’ \
--header 'Content-Type: application/scim+json'
```

where <font color="red">`<my_instance_name>` is to be replaced by the name of your instance and `<???>` </font> is to be replaced by the user's internal Zeenea ID.

<font color="red">
* Added `<my_instance_name>` and changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`  Is this correct?
* Where does the user's internal ID go (`<???>` above)?
</font>

### List Users

This access point can also be used to carry out filtering requests on an existing list of users via a GET request to /Users by inserting additional filters.

#### Constraints

* This request does not support pagination. In particular, the `startIndex` parameter is not supported. By default, 100 results are returned. A maximum of 1000 results can be returned.
* The list of users can be filtered by `userName`, `email`, `externalId` (resolved as email in Zeenea), or `displayName` (resolved as `firstname lastname` in Zeenea).
* The following comparison operators are supported: eq, co, sw, ew, and pr, as well as the expression and.
* The `filter` query parameter must be URL encoded. Its syntax is as follows (it is expressed here before encoding)
  
    `userName co "domain.com"`

Example request:

```
curl —-request GET \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Users/?filter=userName%20co%20%22domain.com%22&sortBy=userName&sortOrder=ascending’ \
--header 'Authorization: Bearer ’ \
--header 'Content-Type: application/scim+json'
```

## Groups

Operations relating to groups are carried out from the `/Groups` endpoint:

`https://<my_instance_name>.zeenea.app/api/scim/v2/Groups` 

where <font color="red">`<my_instance_name>`</font> is to be replaced by the name of your instance.

<font color="red">
Changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`. Is this correct?
</font>

Creating and deleting groups is not supported by the API. Use the Zeenea Administration interface to configure your groups.

### Patch Group

Existing groups can be updated using the PATCH operation to replace specific attribute values at the `/Groups` endpoint.

You can use this service in particular to add or remove users from a group.

#### Constraints

The "Super Admin" group can not be modified by API.

Example request:

```
curl --request PATCH \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Groups/'; \
--header 'Authorization: Bearer ' \
--header 'Content-Type: application/scim+json' \
--data-raw '{
"schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
    ],
    "Operations": [{
       "op": "add",
       "path": "members",
       "value": [{
          "value": ""
       }]
    }]
}'
```

where <font color="red">`<my_instance_name>` is to be replaced by the name of your instance and `<???>` </font> is to be replaced by the group identifier and by a user identifier.

<font color="red">
* Added `<my_instance_name>` and changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`  Is this correct?
* Where does the group/user identifier go (`<???>` above)?
</font>

### List Groups

This access point can also be used to carry out filtering requests on an existing list of groups by means of a GET request to /Groups, inserting additional filters.

#### Constraints

* Groups can only be filtered by displayName.
* Group filtering supports all comparison operators (`eq`, `ne`, `co`, `sw`, `ew`, `ge`, `le`, `gt`, `lt`, `pr`), as well as `and`, `or`, `not` expressions.

Example request:

```
curl —-request GET \
--location 'https://<my_instance_name>.zeenea.app/api/scim/v2/Groups/?filter=displayName%20co%20%22%22&sortBy=displayName&sortOrder=ascending’ \
--header 'Authorization: Bearer ’ \
--header 'Content-Type: application/scim+json'
```

where <font color="red">`<my_instance_name>` is to be replaced by the name of your instance and `<???>` </font> is to be replaced by the name of the group.

<font color="red">
* Added `<my_instance_name>` and changed `https://.zeenea.app/...` to `https://<my_instance_name>.zeenea.app/...`  Is this correct?
* Where does the group name go (`<???>` above)?
</font>

---
title: Synchronizing Users
---

# Introduction

Zeenea provides different services through its API to manage users and permissions. If you have an Access Management Platform (Identity and Access Management or IAM platform) you'd like to use to populate your Zeenea instance with the users having the appropriate privileges, you may need a synchronization script between the two.

We describe here the steps such a script should implement.

## Procedure

Several services must be used in order to synchronize users. They are all provided by our GraphQL v1 API. The entry point for this API is:

<pre>https://<font className="codeHighlight">YOUR_TENANT</font>.zeenea.app/public-api/catalog/graphql</pre>

Here is the list of all the services needed:

* `listPermissionSets`
* `loadUserByEmail` (potentially `loadUserById`)
* `upsertUser`
* `deleteUserByEmail` (potentially `deleteUserById`)
* `createAllUsersExport`
* `loadUsersExportStatus`

Two main responsibilities must be implemented in your script:

1. Browse all the users having the right to access Zeenea as defined in your platform and create/update them in your Zeenea instance.
2. Identify users already defined in Zeenea but not allowed to access Zeenea anymore (for instance, someone who left your company but still defined in Zeenea).
 

### 1. Browse all your users

1. Get permission sets list from Zeenea (`listPermissionSets`)
2. Create a mapping between Zeenea's Permission Sets and your own Groups.
3. For each user defined in your IAM Platform, create or update a user in Zeenea with the appropriate Permission Set (based on your mapping).

### 2. Identify non-legitimate users

1. Call Zeenea's API to request an export of all the users (this is a batch, API's service is: `createAllUsersExport`).
2. Then, regularly call the service to track when the output file is ready to download (`loadUsersExportStatus`).
3. Once retrieved, read the lines (one line per user) and identify users you need to remove from Zeenea (`deleteUserByEmail`).

:::note
You may benefit from Step 1 as you can easily build the list of the legitimate users from there, and then compare it to the downloaded export from Zeenea. Thus, you'll save some requests to your IAM platform.
:::
 
---
title: Access Requests
---

# Access Requests

Zeenea Data Discovery Platform provides an Access Request feature, designed to simplify and streamline processing the access requests to data assets and products across your organization.

With just a few clicks, users can submit a request for access to data assets or data products they need, directly through the Explorer. Data owners can then review these requests in the Studio and trigger the creation of a ticket in an external workflow management tool to apply the appropriate permissions. 

## Key Benefits

* Frictionless access: End-users can easily request access to any dataset within the catalog without navigating complex processes between several tools.
* Approval workflow: Requests are automatically routed to the appropriate data owner or administrator for review and approval in the Studio, ensuring security and compliance are upheld.
* Audit trail: Every request and access change is tracked, providing full visibility and traceability of data access across the organization.
* Empowered teams: Enabling self-service access requests allows your teams to unlock data faster and keep momentum moving without unnecessary delays.

This feature is key to fostering a more collaborative and data-driven culture while maintaining strong governance and security controls.

## Principles

The scheme below describes how access requests are handled in Zeenea:

1. A Data consumer writes a request in Zeenea Explorer from the details page of an item.
2. An email notification is automatically sent to the owner of the item for review.
3. The owner reviews the request in Zeenea Studio and approves or declines it.
4. Once reviewed, an email notification is automatically sent to the sender with the status of their request.
5. If approved, a machine-readable email is sent to the external workflow system to create a ticket and configure the permissions.

  ![](/img/zeenea-access-requests.png)

##  Enabling Access Requests

Access requests are disabled by default on your tenant. Go to the "Access requests" section in the Administration interface to enable the feature.

In this section, you select the item types for which you want to enable the feature: Datasets, Visualizations, and soon Output ports of Data products.

For each type, select or fill in the following parameters:

* Allow access requests: Allow Curators to activate data access requests on their items
* External authorization workflow: Trigger a call to an external workflow system once the request is approved in Zeenea Studio
* Channel: Protocol used to call the external workflow system (only email is available for now)
* Recipient: Email address of the external workflow system to process data access requests

In the case of the Federated Catalog, access requests are handled at the tenant and catalog levels. By default, all catalogs use the tenant configuration. But you can define a local configuration by toggling off the **Use global configuration** button.

  ![](/img/zeenea-access-requests-enable.png)

So far, access requests are enabled but not activated on any item yet.  

## Activating Access Requests on an Item

When access requests are enabled for an item type, you can activate the feature from an item details page by toggling the "Activate data access requests" button. You must have write permissions on the item to activate data access requests.

You can also deactivate the feature instantly by toggling the button again.

Note that at least one contact must have access to the Studio to make the feature available in the Explorer. This ensures at least one person can review the access requests.

  ![](/img/zeenea-access-requests-activate.png)

## Submitting an Access Requests on an Item

When the feature is activated for an item, you can request access from its details page by clicking the "Request access" button on the top right.

  ![](/img/zeenea-access-requests-submit.png)

## Access Request Form

You must provide the following information to submit your request:

* Purpose: The reason or project why you need to access the data
* Audience: For whom you are requesting access (Individual or Service account)
* Approver: Select the person to which sending your request

Once submitted, the approver receives an email notification to invite them to review it. As soon as your request is reviewed, you also receive an email notification with the status of your request (approved or declined) and an optional comment from the approver.

## Managing Your Pending Access Requests

### Listing your pending data access requests

You can retrieve the list of your pending data access requests by clicking the "Access requests" link on the right of the Zeenea Explorer header.

  ![](/img/zeenea-access-requests-data.png)

### Canceling a Data Access Request

From the access request list, click the **Cancel** button to delete your request. When canceled, the request also disappears from the list of pending requests for the approver.

## Reviewing Access Requests

You can manage the access requests assigned to you from the "Access requests" section in the Studio.

  ![](/img/zeenea-access-requests-review.png)

From this screen, you can directly approve or decline a request. In both cases, you can add a comment to the request.

You can also reassign the request to another person among other possible approvers for this item. When reassigning a request, the new approver receives an email notification.

## Authorizing Access Requests

If you have activated the "External authorization workflow" option in the Administration, an email is automatically sent to the specified address once a request is approved in Zeenea Studio.

This email is formatted in XML so that it can be automatically parsed by a ticketing or workflow management tool like Jira or ServiceNow. Below is an example of an authorization request email:

**Object**: [Zeenea] Data Access Request on Item ABCD

**Content**:

```
<?xml version="1.0" encoding="UTF-8"?>
<dataAccessRequest>
<requester>johndoe@acme.com</requester>
<approver>janesmith@acme.com</approver>
<subject>
  <subjectId>8ddb77f2-8deb-4e92-84e1-fc1d76e6ee92</subjectId>
  <subjectName>ARTISTS</subjectName>
  <subjectUrl>https://acme.zeenea.app/studio/permalink?uuid=8ddb77f2-8deb-4e92-84e1-fc1d76e6ee92&amp;nature=dataset</subjectUrl>;
</subject>
<audience>Individual</audience>
<purpose><![CDATA[Monthly report]]></purpose>
</dataAccessRequest>
```

By configuring your workflow management tool to parse this email, you can automatically extract the relevant information and create a ticket to apply the right permissions to the user.

This email contains the following information:

* **requester**: The email address of the person requesting access
* **authorizer**: The email address of the person who approved the request
* **subjected**: The Item's unique identifier in Zeenea (UUID)
* **subjectName**: The Item name
* **subjectUrl**: The URL of the Item to show in Zeenea
* **audience**: Whereas the access is requested for an individual or a service account
* **purpose**: The purpose of the request (free text)

## Auditing Access Requests

### Auditing Access Request Configuration Changes

The configuration changes regarding data access requests are traced in the audit log. You can list audit events using the Audit API.

### Auditing Access Request Changes

The data access requests and their processing are recorded in the audit log. You can list audit events using the Audit API.
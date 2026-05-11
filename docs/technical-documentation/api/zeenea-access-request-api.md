# Access Request API

The Actian Data Intelligence Platform provides a dedicated public REST API for managing access requests.

You can use the Access Request API to:
* Update the status of an access request after approval.
* Retrieve the current status of an access request.

## Creating an Access Request API Key

You can create a new Access Request API key in Zeenea Administration.

To create the API Key, follow the instructions in [Create an API key](../../features-applications/administration/zeenea-managing-api-keys.md#create-an-api-key).

> **Important:** When creating the API key, you must select the **Access request** permission scope. This permission scope is required to manage access requests through the API.


## Request Headers

* Include the API secret in the request header using the `X-API-SECRET` parameter.
* You must also specify the `Content-Type` header with the value `application/json`.

## Updating Access Request Status

After updating permissions in the source system, you can update the status of an access request to provide feedback to the requester and the data owner in Explorer and Studio.

> **Note:** You cannot update the status of an access request that is Pending, Rejected, or Closed.

### Update Status to Granted

If the access has been granted, send a `POST` request to the following endpoint to update the access request status to **Granted**:

`https://[your_tenant].zeenea.app/api/rest/access-requests/[accessRequestKey]/grant`

Where:
* `[your_tenant]`: Your tenant name.
* `[accessRequestKey]`: The accessRequestKey sent by the platform to the webhook. 

You can optionally include a comment in the request body. This comment, if provided, is displayed to both the data owner and the requester in the applications.
For example:
```
{
   "comment":"Access has been granted for 2 weeks."
}
```

If the request is successful, the endpoint returns an HTTP 204 status code.

### Update Status to Error

If an issue occurs during the granting process, send a `POST` request to the following endpoint to update the access request status to **Error**:

`https://[your_tenant].zeenea.app/api/rest/access-requests/[accessRequestKey]/error`

Where:
* `[your_tenant]`: Your tenant name.
* `[accessRequestKey]`: The accessRequestKey sent by the platform to the webhook. 

You must include a comment in the request body describing the error. This comment is displayed to both the data owner and the requester in the applications.
For example:

```
{
   "comment":"Technical issue when granting access."
}

```

If the request is successful, the endpoint returns an HTTP 204 status code.


## Getting the Status of an Access Request

You can retrieve the status of a specific access request with a `GET` request to the following endpoint:

`https://[your_tenant].zeenea.app/api/rest/access-requests/[accessRequestKey]/status`

Where:
* `[your_tenant]`: Your tenant name.
* `[accessRequestKey]`: The accessRequestKey sent by the platform to the webhook. 

If the request is successful, the endpoint returns an HTTP 200 status code with the access request details in the body.

Example Response:

```
{ 
  “accessRequestKey”: “1234”, 
  “statusCode”: “Granted”, 
  “comment”: “Access has been granted for 2 weeks.”
}
```

Possible values for `statusCode` are:

* Pending  
* Accepted  
* Rejected  
* Granted  
* Error  
* Closed

## Access Request Errors

The following table lists common error responses for the Access Request API.

| HTTP code | Error Type | Description | Example |
| :---- | :---- | :---- | :---- |
| 500 | Authentication | The API key's permission scope is not set to **Access request**. | See [Error Example 1](#error-example-1-authentication-500) |
| 404 | Request not found | The provided accessRequestKey is invalid. | See [Error Example 2](#error-example-2-request-not-found-404) |
| 400 | Invalid input | An attempt to perform a forbidden status transition. | See [Error Example 3](#error-example-3-invalid-input-400) |


### Error Example 1: Authentication (500)

```
{
   "type": "https://zeenea.com/api-errors/platform/unknown",
   "title": "An unexpected error happened on the server.",
   "status": 500,
   "detail": "Permission denied",
   "instance": "6660ae66-2340-437c-adc6-2cf61713993a"
}
```
### Error Example 2: Request Not Found (404)

```
{
   "type": "https://zeenea.com/api-errors/platform/entity-not-found",
   "title": "Access Request does not exist",
   "status": 404,
   "detail": null,
   "instance": "ba24d62a-7837-4c94-b79d-5b200726d1b4"
}
```

### Error Example 3: Invalid Input (400)

```
{
   "type": "https://zeenea.com/api-errors/platform/dataAccessRequest/invalid-input",
   "title": "Invalid Input",
   "status": 400,
   "detail": "Invalid status, access request should be 'Accepted'",
   "instance": "8f9c3d38-e1c0-4bbd-a21e-9c2c826b3bdb"
}
```


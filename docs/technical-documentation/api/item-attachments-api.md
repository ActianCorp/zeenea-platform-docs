# Item Attachments API

The Item Attachments API allows you to upload, list, download, and delete files attached to catalog items.

For more information about item attachments, see [Item Attachments](../../features-applications/cross-application-features/item-attachments.md).

## Supported Capabilities

| Capability | Description |
| --- | --- |
| Upload attachment | Attach a file to a catalog item |
| List attachments | Retrieve all attachments associated with an item |
| Download attachment | Download an attachment |
| Delete attachment | Remove an attachment |
| Upload consumption locations descriptor (Beta) | Associate a consumption locations descriptor with a Use Case |

## Prerequisites

- You need a public API key and must send it in the `X-API-SECRET` header of every request.
- To upload or delete attachments, the caller must have the **Edit Documentation** permission on the item.
- To list or download attachments, any authenticated caller (user token or API key) is sufficient.
- You must know the item key of the catalog item you want to manage.

## Supported Files and Limits

| Rule | Value |
| --- | --- |
| Supported file types | PDF, PNG, JPEG, JSON, YAML, TXT, MD |
| Maximum file size | 10 MB (10,000,000 bytes) |
| Maximum attachments per item | 20 uploaded attachments, including a Consumption Locations Descriptor |
| Text file encoding | UTF-8 |
| Supported item types | All catalog item types |

!!! note
    The `maximumFileSizeInBytes` value returned when requesting an upload slot (step 1 below) is the limit of the file transfer. The 10,000,000-byte limit above is the one that applies to attachments.

Additional considerations:

- All files are scanned before they are attached to an item. Files that fail the security scan are rejected.
- Platform-generated files on Data Products, Output Ports, and Data Contracts are not managed through this API.

## Upload an Attachment

Uploading an attachment requires three steps:

1. Request an upload slot.
2. Upload the file to storage.
3. Attach the uploaded file to the catalog item.

### Step 1. Request an Upload Slot

Request a temporary upload location.

```shell
curl -X POST "https://<TENANT>.zeenea.app/api/rest/file-uploads" \
  -H "X-API-SECRET: <API_KEY>"
```

**Response `200`:**

```json
{
  "id": "<FILE_UPLOAD_ID>",
  "uploadParameters": {
    "url": "<UPLOAD_URL>",
    "headers": {
      "<HEADER_NAME>": "<HEADER_VALUE>"
    }
  },
  "maximumFileSizeInBytes": 0
}
```

| Field | Description |
| --- | --- |
| `id` | Upload slot identifier used in Step 3 |
| `uploadParameters.url` | Storage upload URL |
| `uploadParameters.headers` | Required headers for the upload request |
| `maximumFileSizeInBytes` | Transfer size limit returned by the upload service |

!!! note
    Upload slots are temporary. Therefore, complete steps 2 and 3 soon after requesting the upload slot.

### Step 2. Upload the File

Upload the file's raw bytes using an HTTP `PUT` request to `uploadParameters.url`.

Include every header returned in `uploadParameters.headers`.

Do not send your `X-API-SECRET` header to the storage endpoint.

```shell
curl -X PUT "<UPLOAD_URL>" \
  -H "<HEADER_NAME>: <HEADER_VALUE>" \
  --data-binary @report.pdf
```

A successful upload returns HTTP `200`.

### Step 3. Attach the File to an Item

Associate the uploaded file with an item.

!!! note
    After uploading the file, wait briefly before completing this step. The security scan may still be in progress.

```shell
curl -X POST "https://<TENANT>.zeenea.app/api/rest/item-attachments" \
  -H "X-API-SECRET: <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "itemKey": "<ITEM_KEY>",
        "fileUploadId": "<FILE_UPLOAD_ID>",
        "fileName": "report.pdf"
      }'
```
**Request body:**

| Field | Required | Description |
| --- | --- | --- |
| `itemKey` | Yes | Item key of the catalog item |
| `fileUploadId` | Yes | Upload slot `id` returned in step 1. The file must already be uploaded. |
| `fileName` | Yes | Display name of the attachment. |
| `attachmentType` | No | Use `consumption_locations_descriptor` when uploading a Consumption Locations Descriptor. Omit this field for ordinary files. |

**Response `201 Created`:**

```json
{
  "id": "<ATTACHMENT_ID>",
  "name": "report.pdf",
  "attachmentType": null,
  "uploadedAt": "<TIMESTAMP>"
}
```

The platform validates the file during this step. If the request succeeds, the file is attached to the item. If the request fails, no attachment is created and existing attachments remain unchanged.

### Retry Behavior

If step 3 returns 409 (security scan in progress) or 429 (too many requests):

- Wait for the duration specified in the `Retry-After` header.
- Repeat **step 3 only** using the same `fileUploadId`.
- Do not upload the file again.
- Use an increasing delay between subsequent retry attempts.
- Limit the number of concurrent uploads.

### Timeout Handling

If step 3 times out and you are unsure whether it succeeded:

1. List the item's attachments.
2. Verify whether the attachment was created.
3. Retry only if the attachment is not present.
4. Repeating step 3 for an ordinary attachment can create a duplicate attachment.


## List Item Attachments

Returns the attachments associated with a catalog item.

```shell
curl "https://<TENANT>.zeenea.app/api/rest/item-attachments?itemKey=<ITEM_KEY>" \
  -H "X-API-SECRET: <API_KEY>"
```

**Response `200`:**

```json
[
  {
    "id": "<ATTACHMENT_ID>",
    "name": "report.pdf",
    "attachmentType": null,
    "contentType": "application/pdf",
    "sizeBytes": 123456,
    "uploadedAt": "<TIMESTAMP>"
  }
]
```

**Response fields:**

| Field | Description |
| --- | --- |
| `id` | Attachment identifier |
| `name` | Attachment name |
| `attachmentType` | `consumption_locations_descriptor` for Consumption Locations Descriptor and `null` for standard attachments |
| `contentType` | MIME type |
| `sizeBytes` | File size in bytes |
| `uploadedAt` | Upload timestamp |

**Notes:**

- Attachments are returned newest first.
- Pagination is not supported.
- `contentType` and `sizeBytes` may be `null` for older attachments.

## Download an Attachment

Download an attachment using its attachment identifier.

```shell
curl "https://<TENANT>.zeenea.app/api/rest/item-attachments/<ATTACHMENT_ID>/content" \
  -H "X-API-SECRET: <API_KEY>" \
  -OJ
```

The response body contains the original uploaded file. 

The response includes:
- The `Content-Disposition` header with the original filename.
- The `Content-Type` header with the file type.

**Response codes:**

| Status | Meaning |
| --- | --- |
| `200` | The file downloaded successfully. |
| `403` | The file did not pass the security scan and cannot be downloaded. |
| `404` | The attachment does not exist, has been deleted, or is not available through this API. |

## Delete an Attachment

Deletes an attachment from a catalog item.

```shell
curl -X DELETE "https://<TENANT>.zeenea.app/api/rest/item-attachments/<ATTACHMENT_ID>" \
  -H "X-API-SECRET: <API_KEY>"
```

**Response codes:**

| Status | Meaning |
| --- | --- |
| `204` | The attachment deleted successfully. |
| `403` | The caller does not have the edit documentation permission on the item. The attachment cannot be deleted. |
| `404` | The attachment does not exist or is not available through this API. No deletion occurs. |

!!! warning "Important"
    Deletion is permanent and cannot be undone.

## Replace an Attachment

### Replace a Ordinary files

Ordinary files are not replaced automatically.

To replace a file:

1. Upload the new attachment.
2. Confirm it is available.
3. Delete the old attachment.

### Replace a Consumption Locations Descriptor

A Use Case can have only one consumption locations descriptor.

Uploading a new descriptor automatically replaces the existing one.

The replacement is atomic, so users never see both versions simultaneously.

## Consumption Locations Descriptor (Beta)

A Consumption Locations Descriptor is a special attachment that defines the destinations available for a Use Case during access request workflows.

Consumption locations allow an access request to specify the exact destination where data will be used, so that requests arrive ready to provision. 

A destination follows the structure of the target platform. For example:
- **Snowflake**: account, region, and environment
- **Foundry**: project and access group
- **AWS**: account and region

Define destinations in a YAML file and attach the file to a Use Case using the attachment upload process described above, using `"attachmentType": "consumption_locations_descriptor"`. 

The platform validates the descriptor when you attach it and reports any validation errors immediately. 

## Error Responses

All API errors use the following format:

```json
{ 
  "title": "<TITLE>",
  "status": 400,
  "detail": "<DETAIL>"
}
```

!!! note
    When a call fails, no attachment is created and existing attachments are left unchanged.

Common errors include:

| Call | Status | Likely Cause | What to do |
| --- | --- | --- | --- |
| Step 3: Attach file | 400 | Consumption locations are not enabled for the tenant (descriptor uploads). | Contact Actian to enable consumption locations. |
| Step 3: Attach file | 400 | `fileUploadId` is unknown, or the file upload is not complete. | Complete step 2, then retry step 3. |
| Step 3: Attach file | 400 | The file exceeds the size limit, uses an unsupported type, or is not valid UTF-8 (text files). | Correct the file and repeat the three upload steps. |
| Step 3: Attach file | 400 | The item already contains 20 uploaded attachments. | Delete an attachment, then upload again. |
| Step 3: Attach file | 400 | `attachmentType` is not `consumption_locations_descriptor`. | Omit the field, or use the accepted value. |
| Step 3: Attach file | 400 | The file did not pass the security scan (`attachment-rejected-by-scan`). | Do not retry the same file. |
| Step 3: Attach file | 400 | Invalid descriptor. The response lists each error. | Correct the validation errors and repeat the three steps. |
| Step 3: Attach file | 403 | The caller does not have the edit documentation permission on the item. | Use a caller with the required permissions. |
| Step 3: Attach file | 404 | Wrong `itemKey`, or attachments are not enabled for the tenant. | Verify the item key or contact Actian. |
| Step 3: Attach file | 409 | The security scan is not complete (`attachment-scan-pending`). The response includes `Retry-After`. | Wait for the duration specified in `Retry-After`, then retry step 3 only. Do not upload the file again. |
| Any call | 429 | Too many requests (`attachment-rate-limited`). The response may include `Retry-After`. | Retry with an increasing delay. |
| Download or delete | 404 | The attachment does not exist or has already been deleted (`attachment-not-found`). | List the item's attachments and verify the attachment ID. |
| Download | 403 | The file is blocked by the security scan (`attachment-unavailable`). | Contact your administrator. |

## Audit Behavior

The following attachment activities are recorded in the audit trail:

* Attachment uploads
* Attachment replacements
* Attachment deletions

Audit entries include:

* Attachment file name
* API key name

API secrets are never recorded.

Attachment downloads are not recorded in the audit trail.
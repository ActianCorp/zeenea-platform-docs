# Data Product API

The Actian Data Intelligence Platform leverages these standards managed by [Bitol](https://bitol.io/) (a Linux Foundation project):

- [Open Data Contract Standard (ODCS)](https://github.com/bitol-io/open-data-contract-standard)
- [Open Data Product Standard (ODPS)](https://github.com/bitol-io/open-data-product-standard)

These YAML files can be uploaded to the platform through a dedicated REST API. 

!!! note
    Before supporting ODCS, the Actian Data Intelligence Platform used the specifications from DataContract.com. If you have existing data contracts using this specification, we recommend using an external tool, such as [Data Contract CLI](https://cli.datacontract.com/), to migrate these data contracts. You can also reference Bitol services described on our [Actian Data Intelligence Platform Substack](https://dataintelligenceplatform.substack.com/p/so-you-want-to-work-with-data-contracts).



To use this API, you must generate an API key from the Administration page with a permission scope of **Admin** or **Scanner**, and include the API key secret in the request header using the `X-API-SECRET` parameter.

## Create or Update Data Product

To create or update a data product, you must follow this sequence of API calls:

1. Send a `POST` request to the following endpoint to get a URL for uploading the YAML files:
    ```
    https://[your-tenant].zeenea.app/api/synchronization/data-product-uploads
    ```
    The endpoint returns the following parameters:
    ```
    {
        "id": "ad8ac27f-692d-4174-8f84-2ebf00f0e099",
        "uploadParameters": {
            "url": "https://landing-preprod-euw3-file-imports.s3.eu-west-3.amazonaws.com/product-demo/import/3a6c2585-84ca-4047-9e8a-5cc18853c2ec?X-Amz-Security-Token=IQoJb3JpZ2…Q%2FzdQfmTPg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250416T160349Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption%3Bx-amz-server-side-encryption-aws-kms-key-id&X-Amz-Credential=ASIAUOSJLS2TGSYIVUF2%2F20250416%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=85a2164f7e2a8292406364fe5bc89ff12637666a05fd70929ef9878155c3e0b9",
            "headers": {
                "x-amz-server-side-encryption": "aws:kms",
                "x-amz-server-side-encryption-aws-kms-key-id": "arn:aws:kms:eu-west-3:306170271398:key/6bb87c4d-6e20-4e42-b3a9-7ad983d94e06",
                "x-amz-tagging": "Expirable=true"
            }
        },
        "maximumFileSizeInBytes": 52428800
    }
    ```

2. Upload the YAML files with a `PUT` request to the URL obtained from the previous response. Include all headers returned in the previous response when performing the upload request.  

    !!! warning "Important"
        Ensure that the data products and data contracts YAML descriptors are compressed in a ZIP file. 
    
    If the request is successful, the endpoint returns an HTTP 200 status code.

3. Trigger file processing with a `POST` request to the following endpoint:
    ```
    https://[your-tenant].zeenea.app/api/synchronization/data-product-uploads/{id}/process
    ```
    Where `{id}` comes from the first API call response.  
    For this request, you need to add the header `Content-Type` with the value `application/json`.

    You must also specify the targeted catalog in the body of the request:

    ```
    {
        "catalogCode": "default"
    }
    ```
    
    !!! note
        You cannot move a data product to another catalog by using the API. Instead, use the Studio UI. 
        
        If you try to update the catalog through the API, a non-blocking error occurs.

    If the `catalogCode` is not specified in the request body, the endpoint returns an HTTP 500 status code.<br />
    If the API key does not have the appropriate permission scope, the endpoint returns an HTTP 500 status code with a _Permission denied_ message.<br />
    If the request is successful, the endpoint returns an HTTP 204 status code.

4. Get the status of the processing with a `GET` request to the following endpoint to check how many data products have been upserted:
    ```
    https://[your-tenant].zeenea.app/api/synchronization/data-product-uploads/{id}
    ```

    Where `{id}` comes from the first API call response.  
    The endpoint returns the following information:

    ```
    {
        "result": {
            "processed": 1,
            "upserted": 1,
            "errors": []
        },
        "id": "17abafee-8dd4-4884-bd08-67260e59e13f",
        "status": "Processed"
    }
    ```

    Where:

    * **processed**: The number of data product YAML descriptors parsed by the platform.
    * **upserted**: The number of data products upserted.
    * **status**: The status of the job. The following are the possible values:
        * **Created**: The URL has been created and is awaiting upload.
        * **Processing**: The files are being processed. 
        * **Processed**: The files have been processed.

## Errors and Warnings

The API returns blocking errors, non-blocking errors, and warnings.

* **Blocking errors**: When a blocking error occurs, the YAML file is not processed (for example, incorrect YAML or ODCS syntax).  
* **Non-blocking errors**: When a non-blocking error occurs, the YAML files are processed, but some content might not be created or updated (for example, contacts, properties, or links to glossary items).  
* **Warnings**: Warnings indicate that the provided information is correct but requires the user's attention.

The following table provides examples of possible errors and warnings:

| Type | Message |
| :---- | :---- |
| Blocking error | Permission denied |
| Blocking error | No data contract or data product specification found in file `<file-name>.yaml` |
| Blocking error | Output port `xyz` has no matching data contract with ID `<data-contract-id>` and version `<version>` in file `<file-name>.yaml` |
| Blocking error | File `<file-name>.yaml` has invalid schema: property `<property>` is not defined in the schema, and the schema does not allow additional properties |
| Non-blocking error | Data product `<data-product>` belongs to catalog `<catalog-1>` but was uploaded targeting catalog `<catalog-2>`. The data product was updated in its current catalog |
| Non-blocking error | Glossary item reference not found: `\"<item-key>\"` in source: `[id:<id>]` |
| Non-blocking error | Glossary item `<item-key>` cannot be linked: item type `<item-type>` is not allowed by the metamodel |
| Non-blocking error | Role matching failed for role `<role>`: responsibility `<responsibility>` is not synchronized and cannot be used from a data contract |
| Warning | Output port `<file-name>.yaml` has changed, but data contract `Some(<id>)` version has not been updated. |
| Warning | Dataset not found: `<dataset>` (from data contract file `<file-name>.yaml`) |
| Warning | Dataset `<dataset>` is referenced multiple times across data contracts: `<file-name-1>.yaml`, `<file-name-1>.yaml` |
| Warning | Policy `<policy-code>` does not exist for data product output port `<output-port>` |
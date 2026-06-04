# Data Product API

The Actian Data Intelligence Platform leverages these standards managed by [Bitol](https://bitol.io/) (a Linux Foundation project):

- [Open Data Contract Standard (ODCS)](https://github.com/bitol-io/open-data-contract-standard)
- [Open Data Product Standard (ODPS)](https://github.com/bitol-io/open-data-product-standard)

These YAML files can be uploaded to the platform through a dedicated REST API. 

!!! note
    Before supporting ODCS, the Actian Data Intelligence Platform used the specifications from DataContract.com. If you have existing data contracts using this specification, we recommend using an external tool, such as [Data Contract CLI](https://cli.datacontract.com/), to migrate these data contracts. You can also reference Bitol services described on our [Actian Data Intelligence Platform Substack](https://dataintelligenceplatform.substack.com/p/so-you-want-to-work-with-data-contracts).



To use this API, you must generate an API key from the Administration page with a permission scope of **Admin** or **Scanner**, and include the API key secret in the request header using the `X-API-SECRET` parameter.

To create data products, you must follow this sequence of API calls:

1. Send a `POST` request to the following endpoint to get a URL for uploading the YAML files:
    ```
    https://[your-tenant].zeenea.app/api/synchronization/data-product-uploads
    ```
    The endpoint returns the following parameters:
    ```
    {
        "id": "ad8ac27f-692d-4174-8f84-2ebf00f0e099",
        "uploadParameters": {
            "url": "https://landing-preprod-euw3-file-imports.s3.eu-west-3.amazonaws.com/product-demo/import/3a6c2585-84ca-4047-9e8a-5cc18853c2ec?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJHMEUCIGS0W3KzMVQJ0IdXLtrbl%2FviNXMXYY5R8pgPui6t7%2B0XAiEArXga6WLKVWYDm%2Fjoje8cSSLmkcduHrIzQ4duGaAxNJgq4gQISRADGgwzMDYxNzAyNzEzOTgiDOtMcNQVkghyRW3mESq%2FBHVhaokXEAOnszNH%2BKYNjxHJCsce%2BS6kpuKhTA%2BHK3Qv62XFZ%2FrMEEQ%2BHK%2BEqweiI5v%2BMHnL2RB5IaBJy8xFhw1CQHRl0kPlimWm9zxpLFUAN1eSQ8UYeriGQy4BaURztWiKJ%2FFnw%2FPRBT80jVGwXCSDNuzZ%2FAWrqRkbFMyUOboN3oSKL%2BM8U2AgL4%2B%2FBhZg5xKATfmrPTgwg78mxlDiiL49Uqk2pveh9fI9kOLZqY08y6WLy9xvNYJXhwZrGx5UboamM1ZFThpQm%2BOHxb1rgJnuosVky1stpGpqDVD4Yxpmh4dIKvka22vPz59noQouvIwKYuNXunC4QiQYfApbzKqALzpfxNfyJMlkp2C1TBGxO0Dy2WgiPwdSeOZPNqSirWu39wnonFa8rDX53Y6bvlExhC%2BQUCyiuG0hBY99DmsEkk6BIWuVBlsvnwkqCAfLAlLFo2xWwcKSU72re2V9wwtemZKd%2Fut7kHePH%2F7AIXlUanz6SRxtsOrAOU%2FcHAdnb9pt5ZdkFdTZI2cW%2BF6HGr3FRYCU0qOmsV9b5vthY%2BVyfTYRZ5C%2F1Jpy0P%2Fl5iGf8R54IbNid2DHnkfDrSC%2Fma7k771GSA22u1kE%2FM%2FJDO6KckfjT6e8BLFTwRwXTFa6B4YksJSA%2Bqnv9NJ%2Bgi5RUSHh0vY%2Fw2pJ73Ywn38tcyaDrpEcpu8NA7MOOfgSd7Fdoe3m38QbB8%2FuDN%2B3OJsIfGh5ygfY7RFCxUVDdafSjEqXPRZGNbafIAt2BKz0gp5PMOWp%2F78GOpoBWVt253ZtnxspfyTpIAaccRUdbXtIKOZ1r9KRaJUZTFSG3sH%2F20xjyEDPm%2BdOYWNZ1aHfpTccF6NofI9JNcUEmsuKlxL2giFBUwJTwc39bBZ8jewvlyadz9IOjtxqNV0xoSy83q8NXUOjcwyWPINQyfhfEhMNFT6HSlLn6abTkbXxZ9v1IK7pZVLL%2FGxV0oeodjmoQ%2FzdQfmTPg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250416T160349Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption%3Bx-amz-server-side-encryption-aws-kms-key-id&X-Amz-Credential=ASIAUOSJLS2TGSYIVUF2%2F20250416%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=85a2164f7e2a8292406364fe5bc89ff12637666a05fd70929ef9878155c3e0b9",
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
        Ensure that the data products and data contracts YAML descriptors are compressed in a ZIP file. The ZIP file can contain multiple data products and data contracts.

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


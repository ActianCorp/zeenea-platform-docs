# Supported ODCS Attributes

DCB supports a subset of the Open Data Contract Standard (ODCS) version 3.1.0.

The following sections describe the ODCS attributes supported by DCB and indicate which sections are required.

## Fundamentals

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `apiVersion` | Yes | Yes | Version of the ODCS standard used to build the data contract. The default value is `v3.1.0`. |
| `kind` | Yes | Yes | The kind of file this is. Valid value is `DataContract`. |
| `id` | Yes | Yes | Unique identifier used to reduce the risk of contract name collisions. Generated from the contract name. |
| `version` | Yes | Yes | Current version of the data contract. |
| `status` | Yes | Yes | Current lifecycle status of the data contract. Valid values are `proposed`, `draft`, `active`, `deprecated`, and `retired`. |
| `name` | Yes | No | Name of the data contract. |
| `dataProduct` | No | No | Name of the data product. |
| `domain` | Yes | No | Name of the logical data domain. |
| `tenant` | No | No | Property the data is primarily associated with (case insensitive). |
| `description` | Yes | No | Object containing the description. |
| `description.purpose` | Yes | No | Intended purpose of the provided data. |
| `description.limitations` | Yes | No | Technical, compliance, and legal limitations for data use. |
| `description.usage` | Yes | No | Recommended usage of the data. |
| `description.authoritativeDefinitions` | Yes | No | Links to privacy statements, terms and conditions, or license agreements. |
| `description.customProperties` | No | No | Custom properties not covered by the standard. |
| `authoritativeDefinitions` | No | No | Links to sources with more details on the data contract. |
| `tags` | Yes | No | A list of tags for categorizing the contract. |
| `customProperties` | No | No | Top-level custom key/value pairs with organization-specific metadata. |

## Schema

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `schema` | Yes | Yes | Array of schema elements (objects and their properties) to be cataloged. |
| `schema[].name` | Yes | Yes | Name of the schema object. |
| `schema[].id` | Yes | No | Stable unique identifier for the schema object, enabling safe references. |
| `schema[].physicalName` | Yes | No | Physical name of the object in the data source. |
| `schema[].physicalType` | Yes | No | Physical type of the object. Valid values are `table`, `view`, `topic`, and `file`. |
| `schema[].description` | Yes | No | Human-readable description of the schema object. |
| `schema[].quality` | Yes | No | Data quality rules associated with the object (for example, rowCount, compound duplicateValues). |
| `schema[].businessName` | Yes | No | Business-facing name of the schema object. |
| `schema[].dataGranularityDescription` | No | No | Granular level of data in this object. |
| `schema[].relationships` | No | No | List of relationships to other properties. Supports composite keys and dot-notation references. |
| `schema[].tags` | Yes | No | Tags used to categorize the object. |
| `schema[].authoritativeDefinitions` | Yes | No | Links to authoritative sources for the object. |
| `schema[].customProperties` | No | No | Custom properties for the schema object. |
| `schema[].properties` | Yes | No | Array of properties (columns and fields) within the schema object. |
| `schema[].properties[].name` | Yes | Yes | Name of the property. |
| `schema[].properties[].logicalType` | Yes | No | Logical data type of the property. Valid values are `string`, `date`, `timestamp`, `time`, `number`, `integer`, `object`, `array`, and `boolean`. |
| `schema[].properties[].id` | Yes | No | Stable unique identifier for the property, enabling safe references. |
| `schema[].properties[].description` | Yes | No | Human-readable description of the property. |
| `schema[].properties[].physicalType` | Yes | No | Physical data type in the source system. |
| `schema[].properties[].required` | Yes | No | Indicates whether the property can contain null values. The default value is false. |
| `schema[].properties[].primaryKey` | Yes | No | Indicates whether the property is a primary key. The default value is false. |
| `schema[].properties[].primaryKeyPosition` | Yes | No | Position within a composite primary key (starts at 1, -1 = not a PK). |
| `schema[].properties[].classification` | Yes | No | Data sensitivity classification. Valid values are `public`, `restricted`, `confidential`.|
| `schema[].properties[].quality` | Yes | No | Data quality rules defined for the property. |
| `schema[].properties[].physicalName` | Yes | No | Physical name of the property in the data source. |
| `schema[].properties[].businessName` | Yes | No | Business-facing name of the property. |
| `schema[].properties[].unique` | Yes | No | Indicates whether the property contains only unique values. The default value is false. |
| `schema[].properties[].partitioned` | No | No | Whether the property is used as a partition key. |
| `schema[].properties[].partitionKeyPosition` | No | No | Position in a composite partition key (starts at 1, -1 = not a partition key). |
| `schema[].properties[].criticalDataElement` | Yes | No | Indicates whether the property is a Critical Data Element (CDE). |
| `schema[].properties[].examples` | Yes | No | Sample values for the property. |
| `schema[].properties[].items` | Yes | No | Describes items contained within an array property (only when logicalType is array). |
| `schema[].properties[].relationships` | Yes | No | Foreign key relationships to other properties. The from field is implicit at property level. |
| `schema[].properties[].logicalTypeOptions` | No | No | Additional metadata to further describe the logical type. See sub-properties below. |
| `schema[].properties[].logicalTypeOptions.format` | No | No | Format for dates (JDK DateTimeFormatter) or string format hint. |
| `schema[].properties[].logicalTypeOptions.minimum` | No | No | Minimum value (inclusive) for number/integer, or minimum date string. |
| `schema[].properties[].logicalTypeOptions.maximum` | No | No | Maximum value (inclusive) for number/integer, or maximum date string. |
| `schema[].properties[].logicalTypeOptions.exclusiveMinimum` | No | No | All values must be strictly greater than this (number/integer and date types). |
| `schema[].properties[].logicalTypeOptions.exclusiveMaximum` | No | No | All values must be strictly less than this (number/integer and date types). |
| `schema[].properties[].logicalTypeOptions.multipleOf` | No | No | Values must be a multiple of this number (integer/number only). |
| `schema[].properties[].logicalTypeOptions.minLength` | No | No | Minimum string length. |
| `schema[].properties[].logicalTypeOptions.maxLength` | No | No | Maximum string length. |
| `schema[].properties[].logicalTypeOptions.pattern` | No | No | Regex pattern for valid string values (ECMA-262 syntax). |
| `schema[].properties[].logicalTypeOptions.timezone` | No | No | Whether the timestamp/time value encodes timezone info. |
| `schema[].properties[].logicalTypeOptions.defaultTimezone` | No | No | Default timezone when not embedded in the value. |
| `schema[].properties[].logicalTypeOptions.minItems` | No | No | Minimum number of items in an array. |
| `schema[].properties[].logicalTypeOptions.maxItems` | No | No | Maximum number of items in an array. |
| `schema[].properties[].logicalTypeOptions.uniqueItems` | No | No | If true, all items in the array must be unique. |
| `schema[].properties[].logicalTypeOptions.minProperties` | No | No | Minimum number of properties in an object. |
| `schema[].properties[].logicalTypeOptions.maxProperties` | No | No | Maximum number of properties in an object. |
| `schema[].properties[].logicalTypeOptions.required` | No | No | Property names that must be present in the object. |
| `schema[].properties[].encryptedName` | No | No | Name of the property in the dataset that holds the encrypted value of this property. |
| `schema[].properties[].transformSourceObjects` | No | No | List of source objects used in the property's transformation. |
| `schema[].properties[].transformLogic` | No | No | SQL or code logic used in the property's transformation. |
| `schema[].properties[].transformDescription` | No | No | Plain-language description of the transform logic. |
| `schema[].properties[].tags` | Yes | No | Tags used to categorize the property. |
| `schema[].properties[].authoritativeDefinitions` | Yes | No | Links to authoritative sources for the property. |
| `schema[].properties[].customProperties` | No | No | Custom properties for the property. |


## Service-level Agreement (SLA)

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `slaProperties` | Yes | No | Array of service-level agreement property entries. |
| `slaProperties[].property` | Yes | Yes | SLA property name from the Data QoS periodic table. Valid values are `latency`, `retention`, `frequency`, `availability`, `throughput`, `errorRate`, `generalAvailability`, `endOfSupport`, `endOfLife`, `timeOfAvailability`, `timeToDetect`, `timeToNotify`, and `timeToRepair`. |
| `slaProperties[].value` | Yes | Yes | Service-level target value. |
| `slaProperties[].unit` | Yes | No | Unit for the SLA value (ISO standard). Valid values are `d / day / days`, `y / yr / years`, `h / hr / hours` |
| `slaProperties[].element` | Yes | No | Object or property path to which the SLA applies. |
| `slaProperties[].id` | No | No | Stable unique identifier for the SLA entry. |
| `slaProperties[].valueExt` | No | No | Extended SLA value when the property requires two values (for example, a time window). |
| `slaProperties[].driver` | Yes | No | Importance driver for the SLA. Valid values are `regulatory`, `analytics`, and `operational`. |
| `slaProperties[].description` | Yes | No | Human-readable description of the SLA entry. |
| `slaProperties[].scheduler` | No | No | Scheduler name for automated SLA checks. |
| `slaProperties[].schedule` | No | No | Scheduler configuration for the SLA check. |


## Roles

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `roles` | Yes | No | Array of IAM roles that a consumer may need to access the dataset. |
| `roles[].role` | Yes | Yes | Name of the IAM role providing access. |
| `roles[].access` | Yes | No | Type of access provided by the IAM role. |
| `roles[].firstLevelApprovers` | No | No | Name(s) of first-level approver(s) for granting this role. |
| `roles[].secondLevelApprovers` | No | No | Name(s) of second-level approver(s) for granting this role. |
| `roles[].id` | No | No | Stable unique identifier for the role entry. |
| `roles[].description` | Yes | No | Description of the IAM role and its permissions. |
| `roles[].customProperties` | No | No | Custom properties for the role. |

## Servers

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `servers` | No | No | Array of server/infrastructure entries describing where the data physically resides. |
| `servers[].type` | No | Yes | Technology type of the server. |
| `servers[].server` | No | Yes | Logical identifier/name of the server. |
| `servers[].environment` | No | No | Deployment environment of the server. |
| `servers[].host` | No | No | Hostname or IP address (most relational and streaming server types). |
| `servers[].port` | No | No | Connection port. |
| `servers[].database` | No | No | Database name. |
| `servers[].schema` | No | No | Schema name within the database. |
| `servers[].catalog` | No | No | Catalog name (Athena, Databricks, Presto, Trino, Glue). |
| `servers[].location` | No | No | URL or file path to the data (Azure Blob, S3, SFTP, API, Glue). |
| `servers[].format` | No | No | File or message format. |
| `servers[].project` | No | No | GCP project name (BigQuery, Pub/Sub). |
| `servers[].dataset` | No | No | BigQuery dataset name. |
| `servers[].account` | No | No | Cloud account (Snowflake, Redshift, Glue). |
| `servers[].warehouse` | No | No | Snowflake virtual warehouse name. |
| `servers[].stream` | No | No | Kinesis data stream name. |
| `servers[].path` | No | No | Relative or absolute path to local data file(s). |
| `servers[].serviceName` | No | No | Oracle service name. |
| `servers[].id` | No | No | Unique identifier for the server entry. |
| `servers[].description` | No | No | Description of the server. |
| `servers[].region` | No | No | Cloud region. |
| `servers[].delimiter` | No | No | Delimiter for JSON format — how multiple JSON documents are separated within one file. |
| `servers[].endpointUrl` | No | No | Endpoint URL for S3-compatible servers. |
| `servers[].roles` | No | No | Roles with access to this server. Follows the same roles structure. |
| `servers[].stagingDir` | No | No | S3 staging directory for Athena query results. |
| `servers[].customProperties` | No | No | Custom properties for the server. |

## Pricing

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `price` | No | No | Object containing pricing information for data product subscribers. |
| `price.priceAmount` | No | No | Subscription price per unit of measure in priceUnit. |
| `price.priceCurrency` | No | No | Currency of the subscription price. |
| `price.priceUnit` | No | No | Unit of measure for pricing calculation. |

## Team

| Property | Mapped | Required | Description |
| :---- | :---- | :---- | :---- |
| `team` | No | No | Object describing the team responsible for this data contract. |
| `team.members` | No | No | List of team members. |
| `team.members[].username` | No | Yes | The member's username or email address. |
| `team.members[].role` | No | No | The member's job role (no limit on values). |
| `team.id` | No | No | Unique identifier for the team. |
| `team.name` | No | No | Team name. |
| `team.description` | No | No | Team description. |
| `team.members[].id` | No | No | Unique identifier for the team member entry. |
| `team.members[].name` | No | No | The member's full name. |
| `team.members[].description` | No | No | Description of the member's responsibilities. |
| `team.members[].dateIn` | No | No | Date when the user joined the team. |
| `team.members[].dateOut` | No | No | Date when the user ceased to be part of the team. |
| `team.members[].replacedByUsername` | No | No | Username of the member who replaced this person. |
| `team.members[].tags` | No | No | Tags for the team member. |
| `team.members[].authoritativeDefinitions` | No | No | Authoritative definitions for the team member. |
| `team.members[].customProperties` | No | No | Custom properties for the team member. |
| `team.tags` | No | No | Tags for the team. |
| `team.authoritativeDefinitions` | No | No | Authoritative definitions for the team. |
| `team.customProperties` | No | No | Custom properties for the team. |

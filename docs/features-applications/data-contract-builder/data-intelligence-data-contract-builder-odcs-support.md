# Supported ODCS Attributes

Data Contract Builder supports a subset of the Open Data Contract Standard (ODCS) version 3.1.0.

The following sections describe the ODCS attributes supported by Data Contract Builder and indicate which attributes are required.

## Fundamentals

| Property | Required | Description |
| :---- | :---- | :---- |
| apiVersion | Yes | Version of the ODCS standard used to build the data contract. The default value is v3.1.0. |
| kind | Yes | 	The kind of file this is. Valid value is DataContract. |
| id | Yes | Unique identifier used to reduce the risk of contract name collisions. Generated from the contract name. |
| version | Yes | Current version of the data contract. |
| status | Yes | Current lifecycle status of the data contract. Valid values are proposed, draft, active, deprecated, and retired. |
| name | No | Name of the data contract. |
| domain | No | Name of the logical data domain. |
| description | No | Object containing the description. |
| description.purpose | No | Intended purpose of the provided data. |
| description.limitations | No | Technical, compliance, and legal limitations for data use. |
| description.usage | No | Recommended usage of the data. |
| description.authoritativeDefinitions | No | Links to privacy statements, terms and conditions, or license agreements. |
| tags | No | A list of tags for categorizing the contract. |

## Schema

| Property | Required | Description |
| :---- | :---- | :---- |
| schema | Yes | Array of schema elements (objects and their properties) to be cataloged. |
| schema[].name | Yes | Name of the schema object. |
| schema[].id | No | Stable unique identifier for the schema object, enabling safe references. |
| schema[].physicalName | No | Physical name of the object in the data source. |
| schema[].physicalType | No | Physical type of the object. Valid values are table, view, topic, and file. |
| schema[].description | No | Human-readable description of the schema object. |
| schema[].quality | No | Data quality rules associated with the object (for example, rowCount, compound duplicateValues). |
| schema[].businessName | No | Business-facing name of the schema object. |
| schema[].tags | No | Tags used to categorize the object. |
| schema[].authoritativeDefinitions | No | Links to authoritative sources for the object. |
| schema[].properties | No | Array of properties (columns and fields) within the schema object. |
| schema[].properties[].name | Yes | Name of the property. |
| schema[].properties[].logicalType | No | Logical data type of the property. Valid values are string, date, timestamp, time, number, integer, object, array, and boolean. |
| schema[].properties[].id | No | Stable unique identifier for the property, enabling safe references. |
| schema[].properties[].description | No | Human-readable description of the property. |
| schema[].properties[].physicalType | No | Physical data type in the source system. |
| schema[].properties[].required | No | Indicates whether the property can contain null values. The default value is false. |
| schema[].properties[].primaryKey | No | Indicates whether the property is a primary key. The default value is false. |
| schema[].properties[].primaryKeyPosition | No | Position within a composite primary key (starts at 1, -1 = not a PK). |
| schema[].properties[].classification | No | Data sensitivity classification. Valid values are public, restricted, confidential.|
| schema[].properties[].quality | No | Data quality rules defined for the property. |
| schema[].properties[].physicalName | No | Physical name of the property in the data source. |
| schema[].properties[].businessName | No | Business-facing name of the property. |
| schema[].properties[].unique | No | Indicates whether the property contains only unique values. The default value is false. |
| schema[].properties[].criticalDataElement | No | Indicates whether the property is a Critical Data Element (CDE). |
| schema[].properties[].examples | No | Sample values for the property. |
| schema[].properties[].items | No | Describes items contained within an array property (only when logicalType is array). |
| schema[].properties[].relationships | No | Foreign key relationships to other properties. The from field is implicit at property level. |
| schema[].properties[].tags | No | Tags used to categorize the property. |
| schema[].properties[].authoritativeDefinitions | No | Links to authoritative sources for the property. |

## Service-level agreement (SLA)

| Property | Required | Description |
| :---- | :---- | :---- |
| slaProperties | No | Array of service-level agreement property entries. |
| slaProperties[].property | Yes | SLA property name from the Data QoS periodic table.  |
| slaProperties[].value | Yes | Service-level target value. Valid values are latency, retention, frequency, availability, throughput, errorRate, generalAvailability, endOfSupport, endOfLife, timeOfAvailability, timeToDetect, timeToNotify, and timeToRepair. |
| slaProperties[].unit | No | Unit for the SLA value (ISO standard). Valid values are d / day / days, y / yr / years, h / hr / hours |
| slaProperties[].element | No | Object or property path to which the SLA applies. |
| slaProperties[].driver | No | Importance driver for the SLA. Valid values are regulatory, analytics, and operational. |
| slaProperties[].description | No | Human-readable description of the SLA entry. |

## Roles

| Property | Required | Description |
| :---- | :---- | :---- |
| roles | No | Array of IAM roles that a consumer may need to access the dataset. |
| roles[].role | Yes |	Name of the IAM role providing access. |
| roles[].access | No | Type of access provided by the IAM role. |
| roles[].description | No | Description of the IAM role and its permissions. |

### Item types

<a name="item-types"></a>

| Item type          | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| Dataset            | `dataset`                                                     |
| Field              | `field`                                                       |
| Visualization      | `visualization`                                               |
| Data process       | `data-process`                                                |
| Contact            | `contact`                                                     |
| Datasource         | `datasource`                                                  |
| Category           | `category`                                                    |
| Custom Item Type   | Code of the custom item type as defined in Zeenea metamodel   |
| Glossary Item Type | Code of the glossary item type as defined in Zeenea metamodel |

### Built-in properties

<a name="built-in-properties"></a>

The following table is the reference for all built-in properties:

| Property                 | Type     | Available on                               | Read/write | Description                                                            |
| ------------------------ | -------- | ------------------------------------------ | ---------- | ---------------------------------------------------------------------- |
| sourceName               | String   | Dataset, Field, Visualization, DataProcess | Read-only  | Name of the item in the source system                                  |
| sourceDescription        | String   | Dataset, Field, Visualization, DataProcess | Read-only  | Description of the item in the source system                           |
| lastSourceMetadataUpdate | Date     | Dataset, Field, Visualization, DataProcess | Read-only  | Last time there was a change in the item metadata in the source system |
| orphan                   | Boolean  | Dataset, Field                             | Read-only  | Item is missing from the last inventory                                |
| deletionDate             | Date     | Dataset, Field, Visualization, DataProcess | Read-only  | The date at which the item has been deleted in the source system       |
| importDate               | Date     | Dataset, Field, Visualization, DataProcess | Read-only  | The date at which the item has been imported into the catalog          |
| fieldType                | String   | Field                                      | Read-only  | The normalized type of the field                                       |
| fieldNativeType          | String   | Field                                      | Read-only  | The native type of the field as defined in the source system           |
| canBeNull                | Boolean  | Field                                      | Read-only  | Whether the field is nullable                                          |
| multivalued              | Boolean  | Field                                      | Read-only  | Whether the field supports multiple values                             |
| primaryKey               | Boolean  | Field                                      | Read-only  | Whether the field is a primary key                                     |
| foreignKey               | Boolean  | Field                                      | Read-only  | Whether the field is a foreign key                                     |
| businessKey              | Boolean  | Field                                      | Read-write | Whether the field is a business key                                    |
| dataProfileEnabled       | Boolean  | Field                                      | Read-write | Whether the data profile on the field is enabled                       |
| dataProfilePublished     | Boolean  | Field                                      | Read-write | Whether the data profile on the field is published                     |
| alternativeNames         | [String] | All glossary types                         | Read-write | List of alternatives names                                             |
| email                    | String   | Contact                                    | Read-write | Email of the contact                                                   |
| firstName                | String   | Contact                                    | Read-write | First name of the contact                                              |
| lastName                 | String   | Contact                                    | Read-write | Last name of the contact                                               |
| phone                    | String   | Contact                                    | Read-write | Phone number of the contact                                            |

### Connections

<a name="connections"></a>

The following table is the reference for all available connections between items:

| Source type        | Connection name       | Target type(s)                                      | Read/write | Cardinal | Description                                                                            |
| ------------------ | --------------------- | --------------------------------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------- |
| `dataset`          | `fields`              | `field`                                             | Read-only  | 1-n      | Fields of a dataset                                                                    |
| `dataset`          | `relations`           | `dataset`                                           | Read-only  | 0-n      | Datasets linked through a foreign key                                                  |
| `dataset`          | `ingesters`           | `data-process`                                      | Read-write | 0-n      | All the data processes that have the dataset as input                                  |
| `dataset`          | `producers`           | `data-process`                                      | 0-n        | 0-n      | All the data processes that have the dataset as output                                 |
| `dataset`          | `visualization`       | `visualization`                                     | 0-1        | 0-n      | For the datasets that are embedded in a visualisation, the visualization               |
| `dataset`          | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the dataset                                     |
| `dataset`          | `category`            | `category`                                          | 0-1        | 0-n      | [DEPRECATED] Category of the dataset                                                   |
| `dataset`          | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the dataset                                                                |
| `dataset`          | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the dataset                             |
| `dataset`          | `datasource`          | `datasource`                                        | 1-1        | 0-n      | The datasource of the dataset                                                          |
| `dataset`          | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the dataset (can contain various types)               |
| `field`            | `dataset`             | `dataset`                                           | 1-1        | 0-n      | The dataset the field belongs to                                                       |
| `field`            | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the field                                       |
| `field`            | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the field (can contain various types)                 |
| `field`            | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the field                                                                  |
| `field`            | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the field                               |
| `data-process`     | `inputs`              | `dataset` or Custom item type                       | 0-n        | 0-n      | Inputs of the data process                                                             |
| `data-process`     | `outputs`             | `dataset`, `visualization` or Custom item type      | 0-n        | 0-n      | Outputs of the data process                                                            |
| `data-process`     | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the data process                                |
| `data-process`     | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the data process                                                           |
| `data-process`     | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the data process                        |
| `data-process`     | `datasource`          | `datasource`                                        | 0-1        | 0-n      | The datasource of the data process (if teh data process has been harvested)            |
| `data-process`     | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the data process (can contain various types)          |
| `visualization`    | Custom item type name | Custom item type                                    | 0-n        | 0-n      | Custom items of a given type linked to the data process                                |
| `visualization`    | `datasets`            | `dataset`                                           | 0-n        | 0-n      | Datasets embedded in the visualization                                                 |
| `visualization`    | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the data process                                                           |
| `visualization`    | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the visualization                       |
| `visualization`    | `datasource`          | `datasource`                                        | 1-1        | 0-n      | The datasource of the visualization                                                    |
| `visualization`    | `definitions`         | All glossary item types                             | 0-n        | 0-n      | All the glossary items linked to the visualization (can contain various types)         |
| Custom item type   | `members`             | Any type                                            | 0-n        | 0-n      | All the other items that are linked to this custom item                                |
| Custom item type   | `ingesters`           | `data-process`                                      | 0-n        | 0-n      | All the data processes that have the custom item as input                              |
| Custom item type   | `producers`           | `data-process`                                      | 0-n        | 0-n      | All the data processes that have the custom item as output                             |
| Custom item type   | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the custom item                                                            |
| Custom item type   | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the custom item                         |
| Custom item type   | `definitions`         | All glossary item type                              | 0-n        | 0-n      | All the glossary items linked to the custom item (can contain various types)           |
| Glossary item type | `implementations`     | Any type                                            | 0-n        | 0-n      | All the other items that are linked to the glossary item                               |
| Glossary item type | `parents`             | All glossary item type                              | 0-n        | 0-n      | Parents of the glossary item in the glossary                                           |
| Glossary item type | `children`            | All glossary item type                              | 0-n        | 0-n      | Children of the glossary item in the glossary                                          |
| Glossary item type | `curators`            | `contact`                                           | 0-n        | 0-n      | Curators of the glossary item                                                          |
| Glossary item type | Responsibility name   | `contact`                                           | 0-n        | 0-n      | Contacts that have the given responsibility on the glossary item                       |
| `contact`          | `curator`             | Any type                                            | 0-n        | 0-n      | All the items the contact is curator of (various types)                                |
| `contact`          | Responsibility name   | Any type                                            | 0-n        | 0-n      | All the items on which the contact has the given responsibility(various types)         |
| `datasource`       | `imports`             | `dataset`, `field`, `visualization`, `data-process` | 0-n        | 0-n      | All the items that have been imported from the source                                  |
| `category`         | `members`             | `dataset`                                           | 0-n        | 0-n      | [DEPRECATED] Datasets of the category                                                  |
| `category`         | `curators`            | `contact`                                           | 0-n        | 0-n      | [DEPRECATED] Curators of the custom item                                               |
| `category`         | Responsibility name   | `contact`                                           | 0-n        | 0-n      | [DEPRECATED] Contacts that have the given responsibility on the custom item            |
| `category`         | `definitions`         | All glossary item type                              | 0-n        | 0-n      | [DEPRECATED] All the glossary items linked to the category (can contain various types) |

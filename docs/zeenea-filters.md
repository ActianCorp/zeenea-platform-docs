---
title: Filters
---

#  Filters

Starting from Scanner v47, Zeenea has introduced advanced and uniform filtering capabilities.

This filter will let you keep only a subset of the elements Zeenea can retrieve, mainly from the inventory, but it can also be used elsewhere, including for metadata that could (or not) be synchronized (Snowflake & BigQuery).

Filters syntax is based on a simple language with expressions and operators to describe rather easily your filtering rules.

#### Simple filter example:

```
catalog in ('PRODUCTION', 'QA') and schema starts with 'COGIP_'
```

#### Advanced filter example:

```
    catalog in ('PRODUCTION', 'QA')
and (  schema starts with 'COGIP_' and not table ends with '_BAK'
    or schema ~ 'INTERN_*' and table ~ /(?:HR|IT|MARKET)_FIGURES/
    or schema = 'MUSIC' and table contains 'ALBUMS' and table != 'OLD_ALBUMS')
```

## Compatible Connectors

The following connectors are compatible with the filtering system presented here:

* Redshift
* Teradata
* SQL Server
* BigQuery
* DB2
* Oracle
* Snowflake
* Talend
* Informatica Data Integration
* Hive
* AWS Athena
* AWS Glue Data Catalog
* AWS Glue ETL
* Databricks Hive Metastore
* Databricks Unity Catalog
* Denodo
* Matillion
* Palantir
* PowerBI
* Qlik Cloud
* SAP BO
* SAS Database
* SAS Lineage
* SSIS

## Criteria

A filter is applied to a certain number of criteria depending on the context in which the filter is used. You will find the list in the documentation of the connector you are using. For example, connectors for relational databases also called "JDBC connectors" are characterized by three criteria: "catalog", "schema" and "table"; For the BigQuery connector the criteria will be "project", "dataset", "table". Usually, the names of the criteria represent specific notions of the system targeted by the connector. However, some abstractions can be made to ensure consistency between close systems. Thereby, for JDBC connectors, the criteria use the notions of JDBC, themselves was taken from the ISO standard. In particular, we have removed the term "database", because it is synonymous with catalog for PostgreSQL and SQL Server, as it is synonymous with a schema for MySQL. A criteria is written by simply writing its name without further decoration.

#### Example

`table`

## Literal Values

Literal values allow you to specify fixed values to compare with the criteria.

### String

A string contains a sequence of any characters surrounded by a single quotation mark "'". Quotation marks must be escaped with a backslash. The latter escaped by itself.

#### Examples

`'compatibility'`

`'foo\\'bar'`

`'Document\\\\101'`

### Set of strings

A set of strings is a sequence of strings surrounded by parentheses and separated by commas.

#### Example

`('HR', 'IT', 'MARKET')`

### Regular expression

A regular expression is the expression of a pattern that describes a set of possible character strings. It is a character string delimited by a slash "/".

The expression format is defined in detail in the Java documentation.

#### Example

`/(?:HR|IT|MARKET)(?:_.+)?_FIGURES/`

### Unit expressions

Unit expressions are the fundaments of a filter. They relate criteria to a literal value through an operator which indicates the comparison to do. The value of the expression is boolean, i.e., it can only contain the values "true" or "false".

<font color="red">Need to fix missing text below:</font>

Unit expressions have the form <font color="red">???</font> or <font color="red">???</font>.

### is null

The operation "is null" checks if the criteria have no value. It doesn’t have a second element.

#### Example

`catalog is null`

### is not null
The operation "is not null" checks if the criteria have a value. It doesn’t have a second element.

#### Example

`catalog is not null`

### = (is equal to)
The operation " = " checks if the criteria is equal to a string of characters. It doesn’t have a second element.

#### Example

`table = 'voucher'`

### != (is not equal to)
The operation " != " checks if the criteria is not equal to a string of characters. It doesn’t have a second element.

#### Example

`table != 'secret_infos'`

### starts with
The operation " starts with " checks if the criteria starts with a certain value. The second element must be a string of characters.

#### Example

`schema starts with 'SYS'`

### ends with
The operation " ends with " checks if the criteria ends with a certain value. The second element must be a string of characters.

#### Example

`table ends with '_BAK'`

### contains
The operation " contains " checks if the criteria contain a certain value. The second element must be a string of characters.

#### Example

`catalog contains 'COGIP'`

### in
The operation " in " checks if the criteria is part of a certain value. The second element must be a string of characters.

#### Example

`catalog in ('PRODUCTION', 'QA')`

### not in
The operation " not in " checks if the criteria are not part of a certain value. The second element must be a string of characters.

#### Example

`catalog not in ('DEV', 'QA')`

### ~ (comparison to a pattern)
The operator "~" checks if the criteria match with a pattern passed as the second operand. If the second operand is a string, the pattern is interpreted as a simple pattern.

* the star "*" represents any sequence of characters, possibly an empty sequence.
* question mark " ? represents one and only one character.
* "\*" represents a star.
* "\? represents a question mark.
* "\\" represents a backslash. If the second operand is a regular expression, then the pattern is interpreted with all the richness of regular expressions.

#### Example with a simple pattern

`schema ~ 'SYS_*'`

#### Examples with a regular expression

```
schema ~ /SYS_.*/
schema ~ /(?:HR|IT)_DEV_.+/
Generic
```

### Complex expressions
Unitary operations can be modified or assembled with Boolean operators to form more complex expressions.

### not, !
It is possible to reverse the meaning of an operation by prefixing it with the keyword "not"

#### Example

```
not schema starts with 'SYS'
! schema starts with 'SYS'
```

### and, &&
The "and" operator allows you to combine two expressions into an expression that is true when both operands are true.

#### Example

```
schema = 'MUSIC' and table = 'ARTIST'
schema = 'MUSIC' && table = 'ARTIST'
```

### or, ||
The "or" operator allows you to combine two expressions into an expression that is true when one of the operands is true.

#### Example

```
catalog= 'PRODUCTION' or catalog = 'QA'
catalog= 'PRODUCTION' || catalog = 'QA'
```

### Parentheses
Parentheses are used to delimit a sub-expression in order to change the natural regrouping order.

#### Example

`not catalog = 'DEV' or schema starts with 'PROD_' and table contains 'COGIP'`

This is equivalent to:

`(catalog != 'DEV') or ((schema starts with 'PROD_') and (table contains 'COGIP'))`

The parentheses allow changing the order of the expression:

`not ((catalog = 'DEV' or schema starts with 'PROD_') and table contains 'COGIP')`

that will have a different order.
---
title: Custom Items - CSV (Deprecated)
toc_max_heading_level: 4
---

# Adding a Custom Item - CSV Connector

## Introduction

Before you can use this connector, you must set up the custom items that will be fed by the connector.

The connector will manage objects of a type that you will have to specify. This type must therefore be created beforehand. See the article [Creating or Deleting a Custom Item Type](./zeenea-studio-create-delete-custom-item.md).

To be used with the connector, the type must be "Synchronize Items with a connector" (and not "Manual").

The code that will be entered when defining the new type will be used in the connector configuration.

The CSV file consumed by the connector can be as simple as:

```
name;description
My application A;the description of my application A
My application B";the description of my application B
```
### Technical Documentation

This plug-in provides two connectors that allow to load data from a CSV file into Zeenea.

The available connectors are:

* CsvCustomItem: to feed Custom Items
* CsvBusinessTerm: to feed the glossary: this connector is deprecated for the moment

#### Operating Principle

The principle of operation is the same for both connectors: the loading of the documents is done during the synchronization batch.

The connector searches for the CSV file in a specified folder. It identifies it using a naming rule that has been indicated in the configuration as well as a selection rule.

The column separators are discovered automatically among the characters `,;\t:|` or specifically indicated with a parameter.

The configuration allows to define the mapping between the properties of the custom type and the columns of the file.

Unmapped file columns will be ignored.

## Installing the Plugin

The CSV plugin can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).


## Parameters

### name

The name of the connection as visible to users in Zeenea

### code

Zeenea Connection code

### connector_id

Connector Id

Possible values: `csv-custom-item` or `csv-business-term`

### file.directory_path

Folder where CSV files are stored

### file.name_pattern

Naming pattern to identify the file(s) to consider.

Default value: `glob:*.csv`

Pattern type:

* **glob**: Intuitive mechanism using "*" and "?" wildcards to describe a naming pattern.
* **regex**: regular expression syntax.

Pattern type is defined as a prefix before the pattern (`glob:` or `regex:`). If there is no prefix defined, `glob` is used.

Examples:

* `*.csv`
* `glob:business-term-*.csv`
* `glob:applications-*.csv`
* `regex:business-term-\d{4}-\d{2}-\d{2}.csv`
* `regex:applications-\d+.csv`

### file.selection_mode

If multiple files match the pattern, one file will be selected using the specified selection mode.

Possible values:

* `NAME_ORDER`: Select the first file from an alphabetically sorted list of matching elements. This is the default mode.
* `LAST_MODIFIED_TIME`: Select the most recent file based on its last modified timestamp.

Pattern type is defined as a prefix before the pattern (`glob:` or `regex:`). If there is no prefix defined, `glob` is used.

Examples:

* `*.csv`
* `glob:business-term-*.csv`
* `glob:applications-*.csv`
* `regex:business-term-\d{4}-\d{2}-\d{2}.csv`
* `regex:applications-\d+.csv`

### file.csv.separator

Specify the separator to consider for the selected file if auto detection fails or if it's not part of the following list: ` ,;\t:| `.

### file.csv.has_headers

Specifies whether the file have a header line.

Possible values: `true`, `yes`, `false`, `no`

### file.csv.columns

Columns mapping definition.

Can be defined directly in the configuration file or can be externalized in a file. In the latter case, the parameter value will be the URL of the file starting with `file://`.

Example:

`file:///opt/zeenea-scanner/connections/csv-cols.txt`

Syntax:

`[type] [id or label Zeenea attribute] from [columns(s) identifier]`

Note: The type will be added for metamodel properties mapped to columns. It is not necessary for the following specific attributes: `id`, `name`, `code`, `description`.

* `id`: represents the identifier of the imported object. Optional. By default, id = name.
* `name`: name of the imported object. Mandatory.
* `code`: In the case of the `csv-custom-item` connector, define the custom type to use for the imported object.<br />Mandatory for `csv-custom-item`. Not allowed for csv-business-term. Refers to a column in the file or directly defined in the mapping (with default only). Example:
  * `code from 'nature' default 'application'`
  * `code default 'regulation'`
* `description`: identify the column intended to feed the description of the object. Optional.

#### Properties of the metamodel

They will be prefixed with a type whose value can be `string`, `number`, `timestamp`, or `url`.

Their identification will be done with an identifier or a character string delimited by an apostrophe (`'`).

The column (or columns) will then be identified by an identifier.

Note: The type `url` admits an additional parameter (label) to be able to specify the URL and the label if desired.

Example:

`url 'wikipedia-link' from 'wikipedia_url' label 'wikipedia_title'`

#### Notes

* **Column identifiers**: A column is identified either by the header label (in the form of a string), or by its index preceded by the `#` sign. The indices start at 0 for the first column.

    Examples: 
    * `#0`
    * `col_property_1`

* **Mapping syntax**: The mapping syntax being expressed on several lines, if it is defined in the configuration file directly, it will be expressed between triple quotes.

* **Example of possible mapping for objects of a single custom type `country`**:

      ```
          columns = """
              id from 'country_name
              name from 'country_name
              code default 'country
              description from 'abstract'
              string capital from 'official_capital'
              number population from 'population'
              number area from 'area
              number density from #12
              url 'wikipedia-link' from 'wikipedia_url' label 'wikipedia_title
          """
      ```
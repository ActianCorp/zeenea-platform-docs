---
title: Zeenea Query Language  
---

# Zeenea Query Language

The Zeenea query language is a simple text-based query language for filtering data from the search bar. It can be used in the Studio and Explorer.

## Language

### Filter lItems where a field exists

`Geography: *`

Returns all Items for which the "Geography" property is set.

### Filter lItems that match a value

`Geography: US`

Returns all Items for which the "Geography" property has the value "US".

For this type of query, the value must match exactly, including punctuation and case.

The name, description and other native fields may have another parser that allows a search regardless of case or partial match, etc.

`name: plant`

Returns all Items whose name contains "plant".

`name: plant chicago`

Returns all Items whose name contains "plant" and "chicago", regardless of the order and number of terms between "plant" and "chicago".

`name: "chicago plant"`

Returns all Items whose name contains "chicago" and "plant" in this order and one after the other.

### Escaping the name of a field

`"Data techno": SAP`

### Escaping the value of a field

`"Trust score": "★ ★ ☆"`

### Filter Items with wildcards

`Geography: Fr*`

Returns all Items for which the "Geography" property contains a value starting with "Fr".

### Combining several queries

`"Data techno": SAP AND name: customer`

Returns all Items whose "Data techno" property value is "SAP" and whose name contains "customer".

`"Trust score": "★ ★ ☆" OR "Approval Status": Approved`

Returns all Items whose "Trust score" property value is "★ ★ ☆" or whose "Approval status" property value is "Approved".

You can also use brackets as abbreviated syntax when querying multiple values for the same field. For example, to find Objects whose "Data techno" is "SAP", "Talend" or "Matillion", use the following syntax:

`"Data techno": (SAP OR Talend OR Matillion)`

## Supported Fields

### Native Zeenea fields

| Field | Description |
| :--- | :--- |
| name | Search in the name or source name. Search on the beginning of each term. Case insensitive search. |
| field-name | Search for Datasets with a Field (column) containing the given name. |
| infield | Searches for Datasets where a Field (column) contains the name or description provided. |

### Properties configured in templates

| Property typ | Description |
| :--- | :--- |
| Short text | Exact search by property name.<br /><br />`property_name: value` |
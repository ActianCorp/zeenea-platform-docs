---
title: Advanced Search
---

# Search Engine Syntax

Searches can be enhanced by using a specific syntax, that is very similar to the one used by the most Search Engines on the Internet. 

## Operators

You can use logical operators AND and OR. They will have a direct impact on search results. 

The following query will return all assets for a selected item type, when they contain one of the requested keywords in their documentation:

`agriculture OR biological`

The following query will return all assets for a selected item type, when they contain both requested keywords in their documentation:

`agriculture AND biological`

## Quotes

Quotes enable you to search for a specific string.

The following query will return all assets for a selected item type, when they contain this exact string, in their documentation:

`biological agriculture`

## Priority 

When using multiple operators, you may want to specify the order in which they should be taken into account. You may do so using parenthesis. 

The following query will return all assets for a selected item type, when they contain "agriculture" and one of the keywords inside the parenthesis (in this case, "zones" or "communes")in their documentation:

`agriculture AND (zones OR communes)`

## Special Characters

Some characters have an impact on search results. For example, the wildcard can be used in the following query in order to return all objects that contain "agricult" in their documentation, regardless of the rest of the characters:

`agricult*`

By default, the underscore (`_`), which can be found in names of assets, will be considered as a separator: it will split the word in as many bits as requested before executing the search query. 
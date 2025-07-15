---
title: Universal Filters
---

# Universal Filters

This document describes Zeenea's scanner universal filtering system, a powerful tool designed to give you precise control over which assets are imported from your data sources.

With filters, you can create a set of rules to include or exclude specific items based on their names, ids, or other attributes. This is the perfect way to keep your data catalog clean and relevant, for example by:
* Including only production assets.
*  Excluding temporary tables or test reports.
* Focusing on assets from specific teams or projects.
* Rooting items to specific catalogs

This feature is available for **Scanner version 79 and above**.

It is available for the following plugins : 
* PowerBI V2
* Tableau V2
* DBT Cloud

## Core Concepts

Understanding two core concepts is key to mastering filters:

1.  **Rules are Processed in Order:** The filter is a list of rules that you define. When scanning a source, Zeenea checks an item (like a table or a report) against your rules from top to bottom.
2.  **The First Match Wins:** As soon as an item matches a rule's conditions, Zeenea applies the corresponding `ACCEPT` or `REJECT` action and immediately stops processing. No further rules are checked for that item.

If an item goes through the entire list without matching any rule, it will be accepted by default. For this reason, we strongly recommend that your **last rule is a "catch-all" reject rule** to prevent unwanted assets from being imported.

A rule is defined by several key properties that work together. You must specify its `id` (a unique name), its `action` (`ACCEPT` or `REJECT`), and an optional `catalog` to which it is being rooted. If `catalog` is not defined, thr default catalog will be used. The conditions themselves are defined within a `rules` block, where you list all the criteria an item must meet for the rule to apply.

### Example: Include Only a Specific Workspace

The logic is:
1.  **Rule 1:** If an item is in the "Zeenea" workspace, `ACCEPT` it and root it to "Zeenea Catalog".
2.  **Rule 2:** If it is not in the "Zeenea" workspace, `REJECT` it.

This filter will accept items from the "Zeenea" workspace and reject all others.

```
filters = [
  {
    id = "accept_zeenea_workspace"
    action = ACCEPT
    catalog = "Zeenea Catalog"
    rules {
      workspace_name = "Zeenea"
    }
  },
  {
    id = "default_reject"
    action = REJECT
  }
]
```
## Building Your Rules

Each rule you create is an object with four parts:
*   `id`: A unique name you give the rule for easy identification.
*   `action`: The action to perform: `ACCEPT` (to keep the item) or `REJECT` (to discard it).
*   `catalog`: The catalog identifier where items are rooted (optional)
*   `rules`: A block where you define the conditions for the match. If this block is empty or missing, it matches everything.

The attributes you can use as keys inside the `rules` block (e.g., `schema`, `table`, `workspace_name`) depend entirely on the technology being scanned. A database connector will offer keys like `schema` and `table`, while a business intelligence tool connector will have keys like `report_name` or `dashboard_id`. Therefore, it is essential to consult the documentation for the specific connector you are configuring to see the complete list of available filter keys.

### Defining Conditions: Matching Values

The `rules` block is where you set the conditions based on an item's attributes (like `schema`, `table`, `workspace_name`, etc.). You can match values in three powerful ways.

1. **Exact Matching**

    This is the default. If you provide a value without any special characters, Zeenea will look for an exact match.

     **Example:**
      This condition only matches if the schema is exactly `production`.

      ```
      rules {
        schema = "production"
      }
      ```

2. **Pattern Matching with Wildcards (`*` and `?`)**

    You can use wildcards for more flexible matching. This is the most common way to match patterns.

    *  `*` matches any number of characters.
    *  `?` matches any single character.

    **Example:**
    This condition matches any table starting with `FACT_` in the `analytics` schema.

    ```
    rules {
      schema = "analytics"
      table = "FACT_*"
    }
    ```

3. **Advanced Pattern Matching (Regular Expressions)**

    For maximum power and precision, you can use regular expressions by adding the `regex:` prefix. This is an advanced feature for complex matching needs.

    * **Example 1: Match one of several prefixes**

        The pattern `(HR|IT|MARKET)_` matches anything that starts with `HR_`, `IT_`, or `MARKET_`.

        **Example:**
        This condition accepts tables from the HR, IT, or Market departments.

        ```
        rules {
          table = "regex:(HR|IT|MARKET)_.*"
        }
        ```

     * **Example 2: Exclude a prefix**

       The pattern `^(?!TMP_).*` is a very useful one that means "does not start with `TMP_`".

       **Example:**
       This condition matches tables that DO NOT start with `TMP_`.

        ```
        rules {
          table = "regex:^(?!TMP_).*"
        }
        ```
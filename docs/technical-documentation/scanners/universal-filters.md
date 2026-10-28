# Universal Filters

Universal filters control which assets the scanner imports from a data source, which datasets get a data sample, and which datasets get profiled. 

Typical uses include:

* Importing only production assets.
* Excluding temporary tables or test reports.
* Focusing on assets from specific teams or projects.
* Routing assets to a specific catalog.

Universal filters are available starting with **Scanner version 79**. Separate filters for inventory, sampling, and profiling are available starting with **Scanner version 103**.

## Filter Lists

Filters are declared in the connection configuration file, with one list for each process:

| Key | Controls |
|---|---|
| `inventory_filters` | Which items are inventoried, imported, and synchronized, and which catalog they are rooted in. |
| `sampling_filters` | Which datasets get a data sample. |
| `profiling_filters` | Which datasets get profiled. |

!!! note "Legacy `filters` key"

    Before version 103, a single `filters` list was used for all processes. It is still supported for backward compatibility, but **we recommend migrating to the new keys**.

    * If `inventory_filters` or `sampling_filters` is missing, the scanner falls back to `filters` for that process.
    * `profiling_filters` never falls back to `filters`.
    * If both a new key and `filters` are present, the new key takes precedence for that process, and a warning is logged.

    The connection-level `catalog_code` key is no longer supported. Instead, use `catalog_code` in an `inventory_filters` rule. For more information, see [Filter Properties](#filter-properties).

## How Filters Are Evaluated

1. Filters are checked **in order**, from top to bottom.
2. The **first filter that matches** determines the outcome. All subsequent filters are ignored.
3. If **no filter matches**, the item is **rejected**.
4. If the list is **missing or empty**, every item is accepted.

Because unmatched items are rejected, a list of `ACCEPT` filters acts as an allow list. To exclude only a few items and keep everything else, end the list with a catch-all `ACCEPT` filter.

### Examples

**Allow list: Keep only the "Zeenea" workspace, rooted in a specific catalog**

```
inventory_filters = [
  {
    id = "accept_zeenea_workspace"
    action = ACCEPT
    catalog_code = "<CATALOG_CODE>"
    rules {
      workspace_name = "Zeenea"
    }
  }
]
```

**Deny list: Drop temporary tables and keep everything else**

```
inventory_filters = [
  {
    id = "reject_tmp_tables"
    action = REJECT
    rules {
      table = "TMP_*"
    }
  },
  {
    id = "accept_everything_else"
    action = ACCEPT
  }
]
```

## Filter Properties

| Property | Required | Description |
|---|---|---|
| `id` | Yes | Unique name of the filter, displayed in the logs. A filter without an `id` is ignored, and an error is logged. |
| `action` | No | `ACCEPT` or `REJECT` (case-insensitive). Defaults to `ACCEPT`. Any value other than `REJECT` is treated as `ACCEPT`. |
| `rules` | No | Conditions that an item must meet. If missing or empty, the filter matches every item. |
| `catalog_code` | No | *Inventory, `ACCEPT` only.* Code of the catalog where matching items are rooted. Defaults to the default catalog. |
| `sampling` | No | *Sampling only.* Set to `false` to delete the existing data sample of matching datasets. Defaults to `true`. |
| `profiling` | No | *Profiling only.* Set to `false` to disable profiling of matching datasets. Defaults to `true`. |
| `profilingOverride` | No | *Profiling only.* Overrides the connection's profiling sample size for matching datasets using any of `targetedPercentOfSample`, `minSampleCount`, and `maxSampleCount`. Unset fields retain the connection-level values. |

### Sampling and Profiling Outcomes

| Matching filter | Sampling | Profiling |
|---|---|---|
| `ACCEPT` | Sample is collected. | Dataset is profiled. |
| `ACCEPT` with `sampling = false` / `profiling = false` | Existing sample is deleted. | Existing profile is deleted. |
| `REJECT` | Skipped: existing sample is retained. | Existing profile is deleted. |
| No filter matches | Skipped: existing sample is retained. | Existing profile is deleted. |

**Example: Profile only the `analytics` schema, with a smaller sample on fact tables**

```
profiling_filters = [
  {
    id = "profile_fact_tables"
    action = ACCEPT
    rules {
      schema = "analytics"
      table = "FACT_*"
    }
    profilingOverride {
      maxSampleCount = 10000
    }
  },
  {
    id = "profile_analytics"
    action = ACCEPT
    rules {
      schema = "analytics"
    }
  }
]
```

## Writing Rules

Each entry in the `rules` block defines a condition on an item attribute using the `<key> = "<pattern>"` syntax. **All conditions must match** for the filter to match.

The available keys (for example, `schema`, `table`, `workspace_name`, and `report_name`) depend on the connector. For the list of supported filter keys, see the documentation for each connector.

!!! note "Missing Attribute"

    If an item does not have the attribute used in a condition, the condition evaluates to **true in an `ACCEPT` filter** and **false in a `REJECT` filter**.

    For example, `workspace_name = "Zeenea"` in an `ACCEPT` filter also accepts items that do not have a `workspace_name` attribute.

### Patterns

Matching is **case-sensitive** and applies to the **whole value**.

| Type | Syntax | Example | Matches |
|---|---|---|---|
| Exact | Plain value | `"production"` | `production` only |
| Wildcard (default) | `*` any characters, `?` one character, `{a,b}` alternatives, `[abc]` one of the characters | `"FACT_*"` | `FACT_SALES`, `FACT_` |
| Regular expression | `regex:` prefix | `"regex:(HR\|IT\|MARKET)_.*"` | Any value starting with `HR_`, `IT_`, or `MARKET_` |

**Wildcard Notes**

* `*` does **not** match `/`. Use `**` to match across `/` (for example, in file or folder paths).
* `{ } [ ] \ * ?` are special characters. To match them literally, use a regular expression.

**Useful Regular Expressions**

| Match condition | Pattern |
|---|---|
| Does not start with `TMP_` | `regex:(?!TMP_).*` |
| Case-insensitive match | `regex:(?i)production` |
| One of several exact values | `regex:(sales\|finance\|hr)` |
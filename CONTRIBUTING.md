# Contributing

## Search ranking convention

Documentation search is Material for MkDocs' built-in client-side search. Ranking
is tuned through page metadata, so new pages inherit correct behavior when authors
follow this convention. Boost gently. Over-boosting one page distorts every other
query.

### Boost by archetype

Set `search.boost` in page front matter, or set it once per folder in a `.meta.yml`
file. Folder values cascade, and per-page front matter overrides the folder value.
Values above 1 rank a page up, values below 1 rank it down.

| Archetype | Examples | `search.boost` |
| --- | --- | --- |
| High value | setup, install, getting started, quickstart, configuration, connection, overview, introduction | 2.0 |
| Low priority | troubleshooting, FAQ, migration, release notes, changelog | 0.6 |
| Deprecated | any page or section marked deprecated | 0.3 |
| Neutral | everything else | leave unset (defaults to 1.0) |

Per-page front matter:

```yaml
---
search:
  boost: 2.0
---
```

Per-folder default in a `.meta.yml` file:

```yaml
search:
  boost: 2.0
```

### Deprecated content

Give any page whose title or front matter marks it deprecated a boost of 0.3. Keep
the page indexed so users who search its exact terms still find it, but let current
pages outrank it. Do not exclude a deprecated page from search unless it is fully
retired.

### Exclude noisy sections from the index

Long example, sample-request, and code-dump sections inflate term frequency and pull
example pages above canonical task pages. They also produce long result previews.
Exclude such a section by adding the `data-search-exclude` pragma after its heading.
This needs the `attr_list` markdown extension, which is already enabled.

```markdown
## Sample requests {data-search-exclude}
```

Exclude a section when it is mostly code or repeated payloads and adds little
searchable prose. Do not exclude conceptual or task sections.

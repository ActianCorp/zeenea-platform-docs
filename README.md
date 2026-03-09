# Actian Data Intelligence Platform — Documentation

This repository contains the source for the **Actian Data Intelligence Platform** documentation site, published at:

**[https://testdocs.actian.com/intelligence_platform/index.html](https://testdocs.actian.com/intelligence_platform/index.html)**

The site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and covers the full Zeenea-powered data intelligence platform — catalog design, stewardship, connectors, APIs, scanners, and more.

---

## Repository Structure

```
intelligence_platform/
├── docs/                        # All documentation source files (Markdown)
│   ├── index.md                 # Landing page
│   ├── getting-started/         # First steps and definitions
│   ├── Features/
│   │   ├── actian-mcp-server/   # Actian MCP Server
│   │   ├── cross-application-features/   # Lineage, data products, glossary, etc.
│   │   ├── federated-catalog/   # Federated catalog docs
│   │   ├── zeenea-administration/        # Admin: users, connections, scanners
│   │   ├── zeenea-explorer/     # Explorer: search, AI, favorites
│   │   └── zeenea-studio/       # Studio: catalog design and stewardship
│   ├── Integration/
│   │   ├── api/                 # REST & GraphQL API references
│   │   ├── authentication/      # Auth0 and API key setup
│   │   ├── Connectors/          # Per-connector configuration guides
│   │   └── Scanners/            # Scanner setup, filters, plugins
│   └── zeenea/                  # Zeenea platform introduction
├── hooks/                       # MkDocs build hooks
│   ├── bitbucket_edit_url.py    # Generates per-page GitHub edit links
│   └── custom_lexers.py         # Custom syntax highlighter definitions
├── theme_overrides/             # MkDocs Material theme customizations
│   ├── main.html                # Base template override
│   ├── home.html                # Custom landing page template
│   └── assets/stylesheets/      # Custom CSS (landing page, dark mode, etc.)
├── utils/                       # Helper scripts for content maintenance
├── mkdocs.yml                   # MkDocs configuration
└── requirements.txt             # Python dependencies
```

---

## Local Setup

### Prerequisites

- Python 3.9+
- pip

### Install dependencies

```bash
pip install -r requirements.txt
```

### Serve locally

```bash
mkdocs serve
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser. The server watches for changes and auto-reloads.

### Build the static site

```bash
mkdocs build
```

The output is written to the `site/` directory.

---

## Contributing

### Option 1 — Edit directly from the documentation site (recommended)

Every page on the published site has a **pencil icon (✏)** in the top-right corner of the page content. Clicking it opens the source Markdown file in GitHub, pre-set to the `main` branch in edit mode.

1. Navigate to the page you want to update at [https://testdocs.actian.com/intelligence_platform/](https://testdocs.actian.com/intelligence_platform/index.html)
2. Click the **✏ Edit** icon on the top right of the page.
3. Log in to GitHub if prompted.
4. Make your changes in the GitHub editor.
5. Commit your changes and open a **Pull Request** targeting the `main` branch.

### Option 2 — Clone and edit locally

```bash
git clone https://github.com/ActianCorp/zeenea-platform-docs
cd zeenea-platform-docs
pip install -r requirements.txt
mkdocs serve
```

Edit files under `docs/`, preview at [http://127.0.0.1:8000](http://127.0.0.1:8000), then push your changes and open a Pull Request.

---

## Authoring Guidelines

- All pages go under `docs/` and use `.md` (Markdown) format.
- Every page should begin with a YAML front matter block:
  ```yaml
  ---
  title: Page Title
  description: A brief one-sentence summary of this page.
  tags: [relevant, tags]
  ---
  ```
- Use `#` for a single top-level heading per page.
- Use `!!! note`, `!!! tip`, `!!! important` for callout boxes (admonitions).
- Fenced code blocks must specify a language tag (e.g., ` ```json `, ` ```bash `, ` ```yaml `).
- Image references should always include alt text: `![Description of image](./images/example.png)`.
- Cross-references between pages use relative `.md` paths: `[Link text](../other-page.md)`.
- Navigation order is controlled by `.pages` files in each folder (via the `awesome-pages` plugin).

---

## Technology Stack

| Component | Technology |
| --- | --- |
| Static site generator | [MkDocs](https://www.mkdocs.org/) |
| Theme | [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) |
| Versioning | [mike](https://github.com/jimporter/mike) |
| Diagramming | [Mermaid.js](https://mermaid.js.org/), [PlantUML](https://plantuml.com/) |
| API docs | [swagger-ui-tag](https://github.com/blueswen/mkdocs-swagger-ui-tag) |
| Navigation | [awesome-pages](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin) |
| Search | MkDocs Material built-in |

---

## License

Copyright &copy; 2026, Actian. See [LICENSE](LICENSE) for details.

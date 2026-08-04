"""
MkDocs hook: normalize the RSS/JSON feed URLs after build.

Background
----------
mike (used for both the staging GitHub Pages deploy and the production HCL
Jenkins deploy) rewrites ``site_url`` at deploy time so it points at the
version being built, e.g.

    https://docs.actian.com/data-intelligence-platform/  ->  .../<version>/

mkdocs-rss-plugin builds each feed item's <link>/<guid> from that rewritten
``site_url``, so every feed entry ends up under ``/<version>/``. Both our
staging and production sites serve the docs at the version-less root, so those
links 404. There is no plugin option (nor mike flag) to avoid this, so we
correct the generated feed files here.

The canonical, version-less base URL is read from ``extra.rss_canonical_base_url``
in mkdocs.yml (so the same rewrite happens on every deploy path — staging and
prod — without any pipeline-specific configuration). The ``RSS_CANONICAL_BASE_URL``
environment variable, if set, overrides it. When neither is available, or when
the site_url already matches the canonical (e.g. a plain local build with no
mike), this hook is a no-op.
"""
import os

# Feed files emitted by mkdocs-rss-plugin (created + updated, RSS + JSON).
_FEED_FILES = (
    "feed_rss_created.xml",
    "feed_rss_updated.xml",
    "feed_json_created.json",
    "feed_json_updated.json",
)


def on_post_build(config):
    # Canonical base from mkdocs.yml (extra.rss_canonical_base_url); an env var
    # of the same purpose overrides it if present.
    target = os.environ.get("RSS_CANONICAL_BASE_URL")
    if not target:
        target = (config.get("extra") or {}).get("rss_canonical_base_url")
    if not target:
        return

    # ``site_url`` here is whatever mike handed mkdocs (e.g. ".../<version>",
    # with or without a trailing slash). Strip trailing slashes on both sides
    # before matching so the rewrite never leaves a double slash behind.
    current = config.get("site_url")
    if not current:
        return
    current = current.rstrip("/")
    target = target.rstrip("/")
    if current == target:
        return  # no version segment to strip (e.g. plain local build)

    site_dir = config["site_dir"]
    for filename in _FEED_FILES:
        path = os.path.join(site_dir, filename)
        if not os.path.exists(path):
            continue
        with open(path, encoding="utf-8") as handle:
            content = handle.read()
        updated = content.replace(current, target)
        if updated != content:
            with open(path, "w", encoding="utf-8") as handle:
                handle.write(updated)

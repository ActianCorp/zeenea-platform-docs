"""
MkDocs hook: normalize the RSS/JSON feed URLs after build.

Background
----------
mike (used for the versioned GitHub Pages deploy) rewrites ``site_url`` at
deploy time so it points at the version being built, e.g.

    https://docs.actian.com/data-intelligence-platform/  ->  .../latest/

mkdocs-rss-plugin builds each feed item's <link>/<guid> from that rewritten
``site_url``, so every feed entry ends up under ``/latest/``. Our production
site serves the docs at the version-less root, so those ``/latest/`` links
404. There is no plugin option (nor mike flag) to avoid this, so we correct
the generated feed files here.

The canonical, version-less base URL is supplied via the
``RSS_CANONICAL_BASE_URL`` environment variable, which the deploy workflow
sets. When it is unset (local builds and the CI build check), this hook is a
no-op, so nothing changes outside the deploy pipeline.
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
    target = os.environ.get("RSS_CANONICAL_BASE_URL")
    if not target:
        return  # no-op unless the deploy pipeline explicitly asks for a rewrite

    # ``site_url`` here is whatever mike handed mkdocs (e.g. ".../latest",
    # with or without a trailing slash). Strip trailing slashes on both sides
    # before matching so the rewrite never leaves a double slash behind.
    current = config.get("site_url")
    if not current:
        return
    current = current.rstrip("/")
    target = target.rstrip("/")
    if current == target:
        return

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

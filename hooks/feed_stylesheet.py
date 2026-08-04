"""
MkDocs hook: reference an XSL stylesheet from the RSS feeds so a browser shows a
styled preview instead of the raw XML tree. (Feed readers ignore the stylesheet
and render the item HTML as usual — this is purely cosmetic for the in-browser
view.)

The pinned mkdocs-rss-plugin (1.17.4, required for the Python 3.9 production
build) does not emit a stylesheet reference. So we ship the stylesheet as
docs/rss.xsl — mkdocs copies it to the site root next to the feeds — and inject
the processing instruction into the generated feed files here, using the same
form the newer plugin uses:

    <?xml-stylesheet type="text/xsl" href="rss.xsl"?>

The relative href resolves next to each feed on every host/version (staging
mike `/latest/` and the version-less prod root).
"""
import os

_STYLESHEET_PI = '<?xml-stylesheet type="text/xsl" href="rss.xsl"?>'
_FEED_FILES = ("feed_rss_created.xml", "feed_rss_updated.xml")


def on_post_build(config):
    site_dir = config["site_dir"]
    # The stylesheet must actually be served (docs/rss.xsl -> site/rss.xsl).
    if not os.path.exists(os.path.join(site_dir, "rss.xsl")):
        return

    for filename in _FEED_FILES:
        path = os.path.join(site_dir, filename)
        if not os.path.exists(path):
            continue
        with open(path, encoding="utf-8") as handle:
            content = handle.read()
        if "xml-stylesheet" in content:
            continue  # already referenced

        # Insert the PI immediately after the XML declaration.
        if content.startswith("<?xml"):
            decl_end = content.find("?>") + 2
            content = content[:decl_end] + "\n" + _STYLESHEET_PI + content[decl_end:]
        else:
            content = _STYLESHEET_PI + "\n" + content

        with open(path, "w", encoding="utf-8") as handle:
            handle.write(content)

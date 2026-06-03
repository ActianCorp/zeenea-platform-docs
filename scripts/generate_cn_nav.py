#!/usr/bin/env python3
"""
Generate docs/javascripts/cn-nav.js SECTIONS from MkDocs awesome-pages .pages files.

Run manually:  python scripts/generate_cn_nav.py
Also invoked automatically via hooks/generate_cn_nav.py on mkdocs build/serve.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "docs"
CN_NAV_PATH = DOCS_DIR / "javascripts" / "cn-nav.js"
SECTIONS_START = "  var SECTIONS = "
SECTIONS_END_MARKER = "  // ── Helpers"


def load_pages_file(directory: Path) -> list[Any]:
    pages_file = directory / ".pages"
    if not pages_file.is_file():
        return []
    data = yaml.safe_load(pages_file.read_text(encoding="utf-8"))
    if not data:
        return []
    nav = data.get("nav")
    return nav if isinstance(nav, list) else []


def parse_nav_item(item: Any) -> tuple[str | None, str]:
    """Return (optional label, target path or filename)."""
    if isinstance(item, str):
        return None, item.strip()
    if isinstance(item, dict) and len(item) == 1:
        label, target = next(iter(item.items()))
        return str(label).strip(), str(target).strip()
    raise ValueError(f"Unsupported .pages nav entry: {item!r}")


def is_markdown(target: str) -> bool:
    return target.lower().endswith(".md")


def md_to_href(rel_parts: list[str], filename: str) -> str:
    stem = Path(filename).stem
    if stem == "index":
        parts = rel_parts
        return "/".join(parts) + ".html" if parts else "index.html"
    return "/".join([*rel_parts, stem]) + ".html"


def humanize_filename(stem: str) -> str:
    name = stem
    if name.startswith("zeenea-"):
        name = name[len("zeenea-") :]
    name = name.replace("-", " ").replace("_", " ")
    return name.title()


def get_page_title(md_path: Path) -> str:
    if not md_path.is_file():
        return humanize_filename(md_path.stem)

    text = md_path.read_text(encoding="utf-8")
    body = text

    if text.startswith("---"):
        match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
        if match:
            meta = yaml.safe_load(match.group(1))
            if isinstance(meta, dict):
                title = meta.get("title")
                if title:
                    return str(title).strip()
            body = text[match.end() :]

    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            return stripped[2:].strip()

    return humanize_filename(md_path.stem)


def first_href(node: dict[str, Any]) -> str:
    if "href" in node:
        return node["href"]
    for child in node.get("pages", []):
        href = first_href(child)
        if href:
            return href
    return ""


def build_page_node(
    label: str | None,
    filename: str,
    directory: Path,
    rel_parts: list[str],
) -> dict[str, Any]:
    md_path = directory / filename
    name = label or get_page_title(md_path)
    href = md_to_href(rel_parts, filename)
    return {"name": name, "href": href}


def build_dir_node(
    label: str | None,
    dirname: str,
    parent_dir: Path,
    rel_parts: list[str],
) -> dict[str, Any]:
    subdir = parent_dir / dirname
    sub_rel = [*rel_parts, dirname]
    children = build_pages(load_pages_file(subdir), subdir, sub_rel)
    name = label or dirname.replace("-", " ").title()
    node: dict[str, Any] = {"name": name, "href": first_href(children[0]) if children else ""}
    if children:
        node["pages"] = children
    return node


def build_pages(nav_items: list[Any], directory: Path, rel_parts: list[str]) -> list[dict[str, Any]]:
    pages: list[dict[str, Any]] = []

    for item in nav_items:
        label, target = parse_nav_item(item)

        if is_markdown(target):
            pages.append(build_page_node(label, target, directory, rel_parts))
            continue

        subdir = directory / target
        if not subdir.is_dir():
            raise FileNotFoundError(
                f"Nav target {target!r} not found under {directory} "
                f"(from .pages entry {item!r})"
            )
        pages.append(build_dir_node(label, target, directory, rel_parts))

    return pages


def build_sections() -> list[dict[str, Any]]:
    root_nav = load_pages_file(DOCS_DIR)
    sections: list[dict[str, Any]] = []

    for item in root_nav:
        label, target = parse_nav_item(item)

        if is_markdown(target):
            stem = Path(target).stem
            if stem == "index":
                sections.append(
                    {
                        "key": "",
                        "label": label or "Home",
                        "href": "index.html",
                        "pages": [],
                    }
                )
            else:
                href = md_to_href([], target)
                sections.append(
                    {
                        "key": stem,
                        "label": label or get_page_title(DOCS_DIR / target),
                        "href": href,
                        "pages": [],
                    }
                )
            continue

        section_dir = DOCS_DIR / target
        if not section_dir.is_dir():
            raise FileNotFoundError(f"Top-level section directory not found: {section_dir}")

        pages = build_pages(load_pages_file(section_dir), section_dir, [target])
        sections.append(
            {
                "key": target,
                "label": label or target.replace("-", " ").title(),
                "href": first_href(pages[0]) if pages else f"{target}/index.html",
                "pages": pages,
            }
        )

    return sections


def js_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'") + "'"


def format_sections(sections: list[dict[str, Any]], indent: int = 1) -> str:
    sp = "  " * indent
    lines = [f"{sp}var SECTIONS = ["]

    for i, section in enumerate(sections):
        lines.append(f"{sp}  {{")
        lines.append(f"{sp}    key: {js_string(section['key'])},")
        lines.append(f"{sp}    label: {js_string(section['label'])},")
        lines.append(f"{sp}    href: {js_string(section['href'])},")
        pages = section.get("pages", [])
        if pages:
            lines.append(f"{sp}    pages: {format_pages(pages, indent + 2)}")
        else:
            lines.append(f"{sp}    pages: []")
        closing = "  }" if i < len(sections) - 1 else "  }"
        lines.append(f"{sp}{closing},")

    lines.append(f"{sp}];")
    return "\n".join(lines)


def format_pages(pages: list[dict[str, Any]], indent: int) -> str:
    sp = "  " * indent
    if not pages:
        return "[]"

    parts = ["["]
    for i, page in enumerate(pages):
        parts.append(f"{sp}  {{")
        parts.append(f"{sp}    name: {js_string(page['name'])},")
        parts.append(f"{sp}    href: {js_string(page['href'])}")
        children = page.get("pages")
        if children:
            parts[-1] += ","
            parts.append(f"{sp}    pages: {format_pages(children, indent + 2)}")
        parts.append(f"{sp}  }}" + ("," if i < len(pages) - 1 else ""))
    parts.append(f"{sp}]")
    return "\n".join(parts)


def patch_cn_nav(sections: list[dict[str, Any]]) -> None:
    content = CN_NAV_PATH.read_text(encoding="utf-8")
    start = content.find(SECTIONS_START)
    end = content.find(SECTIONS_END_MARKER)
    if start == -1 or end == -1:
        raise RuntimeError(
            f"Could not find SECTIONS block markers in {CN_NAV_PATH}. "
            "Expected '  var SECTIONS = ' and '  // ── Helpers'."
        )

    new_block = format_sections(sections) + "\n\n"
    updated = content[:start] + new_block + content[end:]
    CN_NAV_PATH.write_text(updated, encoding="utf-8")


def main() -> int:
    try:
        sections = build_sections()
        patch_cn_nav(sections)
    except Exception as exc:
        print(f"generate_cn_nav: error: {exc}", file=sys.stderr)
        return 1

    print(f"Updated {CN_NAV_PATH.relative_to(ROOT)} ({len(sections)} top-level sections)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

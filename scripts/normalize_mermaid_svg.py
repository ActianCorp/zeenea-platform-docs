#!/usr/bin/env python3
"""Normalize a Mermaid SVG export so it renders when embedded with ![]().

A mermaid.live export carries the editor's pan/zoom state and no intrinsic
size, so an <img> falls back to a 300x150 box and renders blank. This rewrites
the export into a self-contained SVG sized by a viewBox.

Usage:
    python3 scripts/normalize_mermaid_svg.py exported.svg -o docs/path/images/name.svg
"""

import argparse
import math
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

DEFAULT_FONT_SIZE = 14.0
IDENTITY = (1.0, 0.0, 0.0, 1.0, 0.0, 0.0)


def multiply(m1, m2):
    a1, b1, c1, d1, e1, f1 = m1
    a2, b2, c2, d2, e2, f2 = m2
    return (
        a1 * a2 + c1 * b2,
        b1 * a2 + d1 * b2,
        a1 * c2 + c1 * d2,
        b1 * c2 + d1 * d2,
        a1 * e2 + c1 * f2 + e1,
        b1 * e2 + d1 * f2 + f1,
    )


def apply(m, x, y):
    a, b, c, d, e, f = m
    return (a * x + c * y + e, b * x + d * y + f)


def parse_transform(value):
    """Parse an SVG transform list into a single matrix."""
    matrix = IDENTITY
    for name, args in re.findall(r"(\w+)\s*\(([^)]*)\)", value or ""):
        nums = [float(n) for n in re.findall(r"-?\d*\.?\d+(?:[eE][-+]?\d+)?", args)]
        if name == "matrix" and len(nums) == 6:
            step = tuple(nums)
        elif name == "translate" and nums:
            step = (1.0, 0.0, 0.0, 1.0, nums[0], nums[1] if len(nums) > 1 else 0.0)
        elif name == "scale" and nums:
            sx = nums[0]
            sy = nums[1] if len(nums) > 1 else sx
            step = (sx, 0.0, 0.0, sy, 0.0, 0.0)
        elif name == "rotate" and nums:
            angle = math.radians(nums[0])
            cos, sin = math.cos(angle), math.sin(angle)
            step = (cos, sin, -sin, cos, 0.0, 0.0)
            if len(nums) == 3:
                cx, cy = nums[1], nums[2]
                step = multiply(
                    multiply((1.0, 0.0, 0.0, 1.0, cx, cy), step),
                    (1.0, 0.0, 0.0, 1.0, -cx, -cy),
                )
        else:
            continue
        matrix = multiply(matrix, step)
    return matrix


def style_number(element, prop, default):
    for source in (element.get("style", ""), element.get("font-size", "")):
        match = re.search(prop + r"\s*:\s*(-?\d*\.?\d+)", source)
        if match:
            return float(match.group(1))
    return default


def attribute(element, name, default=0.0):
    try:
        return float(element.get(name))
    except (TypeError, ValueError):
        return default


def numbers(text):
    return [float(n) for n in re.findall(r"-?\d*\.?\d+(?:[eE][-+]?\d+)?", text or "")]


def box_points(element):
    """Axis-aligned corner points contributed by one element, in local units."""
    tag = element.tag.split("}")[-1]
    if tag in ("rect", "foreignObject", "image"):
        x, y = attribute(element, "x"), attribute(element, "y")
        w, h = attribute(element, "width"), attribute(element, "height")
        return [(x, y), (x + w, y + h)]
    if tag == "circle":
        cx, cy, r = attribute(element, "cx"), attribute(element, "cy"), attribute(element, "r")
        return [(cx - r, cy - r), (cx + r, cy + r)]
    if tag == "ellipse":
        cx, cy = attribute(element, "cx"), attribute(element, "cy")
        rx, ry = attribute(element, "rx"), attribute(element, "ry")
        return [(cx - rx, cy - ry), (cx + rx, cy + ry)]
    if tag == "line":
        return [
            (attribute(element, "x1"), attribute(element, "y1")),
            (attribute(element, "x2"), attribute(element, "y2")),
        ]
    if tag in ("polygon", "polyline"):
        nums = numbers(element.get("points"))
        return list(zip(nums[::2], nums[1::2]))
    if tag == "text":
        x, y = attribute(element, "x"), attribute(element, "y")
        size = style_number(element, "font-size", DEFAULT_FONT_SIZE)
        width = 0.6 * size * len((element.text or "").strip())
        if element.get("text-anchor") == "middle":
            x -= width / 2
        elif element.get("text-anchor") == "end":
            x -= width
        return [(x, y - 0.8 * size), (x + width, y + 0.25 * size)]
    if tag == "path":
        # Mermaid emits absolute coordinates for edges; treat every pair as a point.
        nums = numbers(element.get("d"))
        return list(zip(nums[::2], nums[1::2]))
    return []


NON_RENDERED = {"defs", "marker", "symbol", "clipPath", "mask", "pattern", "filter", "style", "title", "desc"}


def element_transform(element):
    style = element.get("style", "")
    match = re.search(r"transform\s*:\s*([^;]+)", style)
    return multiply(
        parse_transform(element.get("transform")),
        parse_transform(match.group(1) if match else ""),
    )


def content_bounds(root):
    bounds = None

    def walk(element, matrix):
        nonlocal bounds
        matrix = multiply(matrix, element_transform(element))
        for x, y in box_points(element):
            px, py = apply(matrix, x, y)
            if bounds is None:
                bounds = [px, py, px, py]
            else:
                bounds[0] = min(bounds[0], px)
                bounds[1] = min(bounds[1], py)
                bounds[2] = max(bounds[2], px)
                bounds[3] = max(bounds[3], py)
        for child in element:
            if child.tag.split("}")[-1] not in NON_RENDERED:
                walk(child, matrix)

    for child in root:
        if child.tag.split("}")[-1] not in NON_RENDERED:
            walk(child, IDENTITY)
    return bounds


def normalize(source, pad):
    text = source
    text = re.sub(r"<\?xml-stylesheet.*?\?>\s*", "", text, flags=re.S)
    text = re.sub(r'(<g[^>]*class="svg-pan-zoom_viewport")[^>]*>', r"\1>", text)

    try:
        root = ET.fromstring(text)
    except ET.ParseError as error:
        raise SystemExit(f"error: not a valid SVG: {error}")
    has_viewbox = root.get("viewBox") is not None
    warnings = []

    if has_viewbox:
        viewbox = root.get("viewBox").strip()
    else:
        bounds = content_bounds(root)
        if bounds is None:
            raise SystemExit("error: could not derive a bounding box; pass --viewbox WxH")
        x0, y0, x1, y1 = bounds
        viewbox = f"{x0 - pad:.0f} {y0 - pad:.0f} {x1 - x0 + 2 * pad:.0f} {y1 - y0 + 2 * pad:.0f}"

    def patch_root(match):
        attrs = " " + match.group(1).strip()
        attrs = re.sub(r'\s*(width|height)="100%"', "", attrs)
        attrs = re.sub(r"\s*touch-action:\s*none;", "", attrs)
        attrs = re.sub(r'\s*role="graphics-document document"', "", attrs)
        attrs = re.sub(r'\s*viewBox="[^"]*"', "", attrs)
        return f'<svg viewBox="{viewbox}"{attrs}>'

    text, count = re.subn(r"<svg ([^>]*)>", patch_root, text, count=1)
    if count != 1:
        raise SystemExit("error: no root <svg> element found")

    ET.fromstring(text)

    if text.count("<foreignObject"):
        warnings.append(
            f"{text.count('<foreignObject')} labels are HTML (foreignObject): they render in browsers "
            "but are dropped by non-browser converters. Export with flowchart.htmlLabels=false to avoid."
        )
    if has_viewbox:
        warnings.append("source already had a viewBox; kept it as-is")

    return text, viewbox, warnings


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input", type=Path, help="SVG exported from mermaid.live or mmdc")
    parser.add_argument("-o", "--output", type=Path, help="output path (default: <input>.normalized.svg)")
    parser.add_argument("--pad", type=float, default=12.0, help="padding around the content, in user units")
    parser.add_argument("--viewbox", help="override the derived viewBox, e.g. '0 0 796 972'")
    args = parser.parse_args()

    output = args.output or args.input.with_suffix(".normalized.svg")
    text, viewbox, warnings = normalize(args.input.read_text(encoding="utf-8"), args.pad)
    if args.viewbox:
        text = re.sub(r'viewBox="[^"]*"', f'viewBox="{args.viewbox}"', text, count=1)
        viewbox = args.viewbox

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(text, encoding="utf-8")

    print(f"wrote {output} ({len(text.encode('utf-8'))} bytes)")
    print(f"viewBox={viewbox}")
    for warning in warnings:
        print(f"warning: {warning}", file=sys.stderr)


if __name__ == "__main__":
    main()

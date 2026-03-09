#!/usr/bin/env python3
"""
Script to audit and fix:
1. Cross-reference links in all markdown files
2. Table syntax to comply with MkDocs Material authoring guidelines

MkDocs Material table guidelines:
- Header row required
- Separator row with at least 3 dashes per cell, surrounded by spaces: | --- | --- |
- Alignment: | :--- | ---: | :---: |
- No compact separators like |---|---| (no spaces)
"""

import os
import re
import sys
from pathlib import Path

DOCS_DIR = Path(__file__).parent.parent / "docs"
MKDOCS_YML = Path(__file__).parent.parent / "mkdocs.yml"

# ── Helpers ──────────────────────────────────────────────────────────────────

def load_all_md_files():
    return list(DOCS_DIR.rglob("*.md"))


def fix_table_separator(line: str) -> str:
    """
    Reformat a table separator row to MkDocs Material standard.
    E.g.  |---|---|---| → | --- | --- | --- |
          |:---|---:|:---:| → | :--- | ---: | :---: |
    """
    # Only process lines that look like separator rows
    stripped = line.strip()
    if not re.match(r'^\|[-: |]+\|$', stripped):
        return line

    cells = stripped.split('|')
    # cells[0] and cells[-1] are empty (outside leading/trailing |)
    new_cells = []
    for cell in cells:
        c = cell.strip()
        if not c:
            new_cells.append(cell)
            continue
        # Must be dashes/colons only
        if re.match(r'^:?-+:?$', c):
            # Normalise: keep alignment markers, use exactly 3 dashes
            if c.startswith(':') and c.endswith(':'):
                new_cells.append(' :---: ')
            elif c.startswith(':'):
                new_cells.append(' :--- ')
            elif c.endswith(':'):
                new_cells.append(' ---: ')
            else:
                new_cells.append(' --- ')
        else:
            new_cells.append(cell)

    return '|'.join(new_cells)


def fix_table_data_row(line: str) -> str:
    """Ensure table data rows have a space after and before each pipe."""
    stripped = line.strip()
    if not stripped.startswith('|'):
        return line

    cells = stripped.split('|')
    new_cells = []
    for cell in cells:
        if cell == '':
            new_cells.append(cell)
        else:
            new_cells.append(f' {cell.strip()} ')
    result = '|'.join(new_cells)
    # Preserve original indentation
    indent = len(line) - len(line.lstrip())
    return ' ' * indent + result


def is_separator_row(line: str) -> bool:
    stripped = line.strip()
    if not stripped.startswith('|') or not stripped.endswith('|'):
        return False
    inner = stripped[1:-1]
    cells = inner.split('|')
    return all(re.match(r'^\s*:?-+:?\s*$', c) for c in cells if c.strip() != '')


def needs_separator_fix(line: str) -> bool:
    """Return True if this is a separator row that needs fixing (compact, no spaces)."""
    if not is_separator_row(line):
        return False
    stripped = line.strip()
    # Check for compact cells: |---| or |:---| etc (dash/colon touching pipe)
    return bool(re.search(r'\|[-:]{2,}\|', stripped))


# ── Link checking ─────────────────────────────────────────────────────────────

def extract_links(content: str):
    """Return list of (link_text, link_target) from markdown."""
    return re.findall(r'\[([^\]]*)\]\(([^)]+)\)', content)


def check_links(md_file: Path, all_files: set) -> list:
    """Check internal links in a markdown file. Returns list of broken link dicts."""
    content = md_file.read_text(encoding='utf-8')
    broken = []
    links = extract_links(content)
    for text, target in links:
        # Skip external links and anchors-only
        if target.startswith(('http://', 'https://', 'mailto:', 'ftp://', '#')):
            continue
        # Strip fragment and query
        path_part = target.split('#')[0].split('?')[0]
        if not path_part:
            continue
        # Resolve relative to the containing file's directory
        resolved = (md_file.parent / path_part).resolve()
        if resolved not in all_files and not resolved.exists():
            broken.append({
                'file': str(md_file.relative_to(DOCS_DIR)),
                'text': text,
                'target': target,
                'resolved': str(resolved),
            })
    return broken


# ── Main processing ───────────────────────────────────────────────────────────

def process_file(md_file: Path, dry_run: bool = False) -> dict:
    """
    Fix table syntax in a single markdown file.
    Returns summary of changes made.
    """
    original = md_file.read_text(encoding='utf-8')
    lines = original.splitlines(keepends=True)

    new_lines = []
    changes = []

    for i, line in enumerate(lines, 1):
        stripped = line.rstrip('\n').rstrip('\r')

        if is_separator_row(stripped):
            fixed = fix_table_separator(stripped)
            # Restore original line ending
            ending = line[len(line.rstrip('\r\n')):]
            new_line = fixed + ending
            if new_line != line:
                changes.append({
                    'line': i,
                    'type': 'separator',
                    'before': stripped,
                    'after': fixed,
                })
                new_lines.append(new_line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)

    new_content = ''.join(new_lines)

    if not dry_run and new_content != original:
        md_file.write_text(new_content, encoding='utf-8')

    return {
        'file': str(md_file.relative_to(DOCS_DIR)),
        'changes': changes,
        'modified': new_content != original,
    }


def main():
    dry_run = '--dry-run' in sys.argv
    check_only = '--check-links' in sys.argv

    all_md_files = load_all_md_files()
    all_files_resolved = {f.resolve() for f in all_md_files}
    # Also include non-md assets for link checks
    all_assets = {f.resolve() for f in DOCS_DIR.rglob('*') if f.is_file()}

    print(f"Found {len(all_md_files)} markdown files in {DOCS_DIR}")
    print()

    # ── Link check ────────────────────────────────────────────────────────────
    all_broken = []
    for md_file in sorted(all_md_files):
        broken = check_links(md_file, all_assets)
        all_broken.extend(broken)

    if all_broken:
        print(f"=== BROKEN LINKS ({len(all_broken)}) ===")
        for b in all_broken:
            print(f"  [{b['file']}] [{b['text']}]({b['target']})")
            print(f"       → resolved: {b['resolved']}")
        print()
    else:
        print("=== LINKS: No broken internal links found ✓ ===")
        print()

    if check_only:
        return

    # ── Table fixes ───────────────────────────────────────────────────────────
    total_modified = 0
    total_changes = 0

    for md_file in sorted(all_md_files):
        result = process_file(md_file, dry_run=dry_run)
        if result['modified']:
            total_modified += 1
            total_changes += len(result['changes'])
            for c in result['changes']:
                verb = "Would fix" if dry_run else "Fixed"
                print(f"  {verb} {result['file']}:{c['line']}  ({c['type']})")
                print(f"    Before: {c['before'][:100]}")
                print(f"    After:  {c['after'][:100]}")

    print()
    verb = "Would modify" if dry_run else "Modified"
    print(f"=== TABLE FIXES: {verb} {total_modified} files with {total_changes} separator rows fixed ===")
    if dry_run:
        print("(dry-run mode — no files were written)")


if __name__ == '__main__':
    main()

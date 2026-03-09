#!/usr/bin/env python3
"""
Fix broken cross-reference links in all markdown files.
Maps old/wrong relative paths to correct relative paths based on actual file locations.

Run:  python3 utils/fix_all_links.py [--dry-run]
"""

import os
import re
import sys
from pathlib import Path

DOCS_DIR = Path(__file__).parent.parent / "docs"


def fix_links_in_content(content: str, source_rel: str, dry_run: bool = False) -> tuple[str, list]:
    """
    Apply link fixes to the content of a markdown file.
    source_rel: the file's path relative to docs/, e.g. 'Integration/Connectors/foo.md'
    Returns: (new_content, list_of_fixes)
    """
    fixes = []

    def replace(pattern: str, replacement: str, flags: int = 0) -> None:
        nonlocal content
        new = re.sub(pattern, replacement, content, flags=flags)
        if new != content:
            # Count replacements
            count = len(re.findall(pattern, content, flags=flags))
            fixes.append(f"  [{source_rel}] replaced '{pattern}' → '{replacement}' ({count}×)")
            content = new

    # ── Integration/Connectors/ ───────────────────────────────────────────────
    if source_rel.startswith("Integration/Connectors/"):
        # Managing Connections
        replace(r'\.\./Zeenea_Administration/zeenea-managing-connections\.md',
                '../../Features/zeenea-administration/zeenea-managing-connections.md')
        # Identification Keys (old Stewardship folder)
        replace(r'\.\./Stewardship/zeenea-identification-keys\.md',
                '../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md')
        # Identification Keys (same-dir wrong reference)
        replace(r'\./zeenea-identification-keys\.md',
                '../../Features/zeenea-studio/stewardship/zeenea-identification-keys.md')
        # Dataset Detection (old New_files folder)
        replace(r'\.\./New_files/zeenea-dataset-detection\.md',
                'zeenea-dataset-detection.md')
        # Data Profiling
        replace(r'\.\./Zeenea_Explorer/zeenea-data-profiling\.md',
                '../../Features/cross-application-features/zeenea-data-profiling.md')
        # Data Sampling
        replace(r'\.\./Zeenea_Explorer/zeenea-data-sampling\.md',
                '../../Features/cross-application-features/zeenea-data-sampling.md')
        # Zeenea Studio (catalog-design)
        replace(r'\.\./Zeenea_Studio/(zeenea-studio-create-delete-custom-item\.md)',
                r'../../Features/zeenea-studio/catalog-design/\1')
        replace(r'\.\./Zeenea_Studio/(zeenea-studio-configure-glossary-model\.md)',
                r'../../Features/zeenea-studio/catalog-design/\1')
        replace(r'\.\./Zeenea_Studio/(zeenea-studio-create-edit-delete-property\.md)',
                r'../../Features/zeenea-studio/catalog-design/\1')
        # Administration
        replace(r'\.\./Zeenea_Administration/(zeenea-managing-scanners\.md)',
                r'../../Features/zeenea-administration/\1')
        replace(r'\.\./Zeenea_Administration/(zeenea-managing-api-keys\.md)',
                r'../../Features/zeenea-administration/\1')

    # ── Integration/Scanners/ ────────────────────────────────────────────────
    if source_rel.startswith("Integration/Scanners/"):
        replace(r'\.\./Zeenea_Administration/zeenea-managing-connections\.md',
                '../../Features/zeenea-administration/zeenea-managing-connections.md')
        replace(r'\.\./Zeenea_Administration/(zeenea-managing-scanners\.md)',
                r'../../Features/zeenea-administration/\1')
        replace(r'\.\./Zeenea_Administration/(zeenea-managing-api-keys\.md)',
                r'../../Features/zeenea-administration/\1')
        # Fix bare email links (missing mailto:)
        replace(r'\]\((license@silwoodtechnology\.com)\)',
                r'](mailto:\1)')
        replace(r'\]\((support@silwoodtechnology\.com)\)',
                r'](mailto:\1)')

    # ── Integration/api/ ────────────────────────────────────────────────────
    if source_rel.startswith("Integration/api/"):
        replace(r'\.\./Zeenea_Administration/(zeenea-managing-api-keys\.md[^)]*)',
                r'../../Features/zeenea-administration/\1')
        replace(r'\.\./Zeenea_Administration/zeenea-managing-connections\.md',
                '../../Features/zeenea-administration/zeenea-managing-connections.md')

    # ── Features/cross-application-features/ ────────────────────────────────
    if source_rel.startswith("Features/cross-application-features/"):
        # Old ../APIs/ → ../../Integration/api/
        replace(r'\.\./APIs/(zeenea-[^)]+)',
                r'../../Integration/api/\1')

    # ── Features/federated-catalog/ ─────────────────────────────────────────
    if source_rel.startswith("Features/federated-catalog/"):
        replace(r'\.\./New_files/zeenea-federated-catalog-building\.md',
                'zeenea-federated-catalog-building.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-searching-federated-catalog\.md',
                'zeenea-searching-federated-catalog.md')
        replace(r'\.\./Scanners/zeenea-universal-filters\.md',
                '../../Integration/Scanners/zeenea-universal-filters.md')
        replace(r'\.\./APIs/(zeenea-[^)]+)',
                r'../../Integration/api/\1')

    # ── Features/zeenea-administration/ ─────────────────────────────────────
    if source_rel.startswith("Features/zeenea-administration/"):
        replace(r'\.\./Scanners/zeenea-scanner-setup\.md',
                '../../Integration/Scanners/zeenea-scanner-setup.md')
        replace(r'\.\./Connectors/zeenea-connectors-list\.md',
                '../../Integration/Connectors/zeenea-connectors-list.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-data-profiling\.md',
                '../cross-application-features/zeenea-data-profiling.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-data-sampling\.md',
                '../cross-application-features/zeenea-data-sampling.md')
        replace(r'\.\./Your%20First%20Step/zeenea-superadmin\.md',
                '../../getting-started/your-first-steps/zeenea-superadmin.md')
        replace(r'\.\./Your%20First%20Step/zeenea-data-steward\.md',
                '../../getting-started/your-first-steps/zeenea-data-steward.md')
        replace(r'\.\./Your%20First%20Step/zeenea-data-explorer\.md',
                '../../getting-started/your-first-steps/zeenea-data-explorer.md')

    # ── Features/zeenea-explorer/ ────────────────────────────────────────────
    if source_rel.startswith("Features/zeenea-explorer/"):
        replace(r'\.\./Zeenea_Explorer/zeenea-query-language\.md',
                '../cross-application-features/zeenea-query-language.md')
        # Items that have moved to cross-application-features
        for fname in [
            "zeenea-view-360-diagram",
            "zeenea-data-lineage",
            "zeenea-synchronization",
            "zeenea-data-profiling",
            "zeenea-data-sampling",
            "zeenea-glossary-hierarchy",
        ]:
            replace(rf'\./({fname}\.md)',
                    r'../cross-application-features/\1')
        # zeenea-data-model-diagram.md doesn't exist in the repo; leave as-is

    # ── Features/zeenea-studio/stewardship/ ─────────────────────────────────
    if source_rel.startswith("Features/zeenea-studio/stewardship/"):
        replace(r'\.\./APIs/zeenea-audit-trail-apis\.md',
                '../../../Integration/api/zeenea-audit-trail-apis.md')
        replace(r'\.\./APIs/zeenea-catalog-api-v1\.md',
                '../../../Integration/api/zeenea-catalog-api-v1.md')
        replace(r'\.\./Getting_Started/zeenea-definitions\.md',
                '../../../getting-started/zeenea-definitions.md')
        replace(r'\.\./Scanners/zeenea-scanner-setup\.md',
                '../../../Integration/Scanners/zeenea-scanner-setup.md')
        replace(r'\.\./Zeenea_Administration/zeenea-managing-connections\.md',
                '../../zeenea-administration/zeenea-managing-connections.md')
        replace(r'\.\./Zeenea_Studio/zeenea-studio-configure-glossary-model\.md',
                '../catalog-design/zeenea-studio-configure-glossary-model.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-submit-suggestion\.md',
                '../../zeenea-explorer/zeenea-submit-suggestion.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-data-lineage\.md',
                '../../cross-application-features/zeenea-data-lineage.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-query-language\.md',
                '../../cross-application-features/zeenea-query-language.md')

    # ── getting-started/your-first-steps/ ────────────────────────────────────
    if source_rel.startswith("getting-started/your-first-steps/"):
        replace(r'\.\./Zeenea_Explorer/zeenea-explorer-overview\.md',
                '../../Features/zeenea-explorer/zeenea-explorer-overview.md')
        replace(r'\.\./Zeenea_Explorer/zeenea-explorer-search\.md',
                '../../Features/zeenea-explorer/zeenea-explorer-search.md')
        replace(r'\.\./Getting_Started/zeenea-definitions\.md',
                '../zeenea-definitions.md')
        replace(r'\.\./Stewardship/zeenea-editing-items-in-bulk\.md',
                '../../Features/zeenea-studio/stewardship/zeenea-editing-items-in-bulk.md')
        replace(r'\.\./Stewardship/zeenea-studio-search\.md',
                '../../Features/zeenea-studio/stewardship/zeenea-studio-search.md')
        replace(r'\.\./Stewardship/zeenea-item-documentation\.md',
                '../../Features/zeenea-studio/stewardship/zeenea-item-documentation.md')
        replace(r'\.\./Zeenea_Studio/zeenea-configuring-templates\.md',
                '../../Features/zeenea-studio/catalog-design/zeenea-configuring-templates.md')
        replace(r'\.\./Zeenea_Studio/zeenea-studio-create-delete-custom-item\.md',
                '../../Features/zeenea-studio/catalog-design/zeenea-studio-create-delete-custom-item.md')
        replace(r'\.\./Zeenea_Studio/zeenea-add-input-output-types\.md',
                '../../Features/zeenea-studio/catalog-design/zeenea-add-input-output-types.md')
        replace(r'\.\./Zeenea_Studio/zeenea-studio-configure-glossary-model\.md',
                '../../Features/zeenea-studio/catalog-design/zeenea-studio-configure-glossary-model.md')
        replace(r'\.\./Zeenea_Studio/zeenea-studio-create-delete-responsibility\.md',
                '../../Features/zeenea-studio/catalog-design/zeenea-studio-create-delete-responsibility.md')

    # ── getting-started/zeenea-definitions.md ───────────────────────────────
    if source_rel == "getting-started/zeenea-definitions.md":
        replace(r'\.\./Connectors/zeenea-connectors-list\.md',
                '../Integration/Connectors/zeenea-connectors-list.md')
        replace(r'\.\./Zeenea_Studio/zeenea-studio-create-edit-delete-property\.md',
                '../Features/zeenea-studio/catalog-design/zeenea-studio-create-edit-delete-property.md')
        replace(r'\.\./Zeenea_Studio/zeenea-importing-datasets-or-visualizations\.md',
                '../Features/zeenea-studio/stewardship/zeenea-importing-datasets-or-visualizations.md')

    return content, fixes


def main():
    dry_run = '--dry-run' in sys.argv
    all_md_files = list(DOCS_DIR.rglob("*.md"))
    total_files_changed = 0
    all_fixes = []

    for md_file in sorted(all_md_files):
        source_rel = str(md_file.relative_to(DOCS_DIR))
        original = md_file.read_text(encoding='utf-8')
        new_content, fixes = fix_links_in_content(original, source_rel, dry_run)

        if fixes:
            all_fixes.extend(fixes)
            total_files_changed += 1
            if not dry_run:
                md_file.write_text(new_content, encoding='utf-8')

    if all_fixes:
        verb = "Would change" if dry_run else "Changed"
        print(f"{verb} {total_files_changed} files:")
        for fix in all_fixes:
            print(fix)
    else:
        print("No link fixes needed.")

    if dry_run and all_fixes:
        print("\n(dry-run — no files written)")


if __name__ == '__main__':
    main()

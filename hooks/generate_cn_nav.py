"""MkDocs hook: regenerate cn-nav.js from .pages before each build."""

from __future__ import annotations

import sys
from pathlib import Path


def on_pre_build(config, **kwargs):
    root = Path(config.config_file_path).parent
    script = root / "scripts" / "generate_cn_nav.py"
    if not script.is_file():
        print(f"generate_cn_nav hook: script not found at {script}", file=sys.stderr)
        raise SystemExit(1)

    # Import and run in-process so we do not depend on subprocess PATH.
    import importlib.util

    spec = importlib.util.spec_from_file_location("generate_cn_nav", script)
    if spec is None or spec.loader is None:
        raise SystemExit(1)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    code = module.main()
    if code != 0:
        raise SystemExit(code)

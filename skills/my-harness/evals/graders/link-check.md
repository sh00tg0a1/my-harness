# Link Check Grader

**Type:** Deterministic (code-based)

Verifies that all Markdown cross-links (`[text](path)`) in generated files resolve to existing files within the target repo.

## Scope

Scan all `.md` files under `$TARGET`. For each relative link:

1. Resolve the path relative to the file containing the link.
2. Strip any `#fragment` suffix before checking existence.
3. Assert the resolved path exists as a file or directory.

## Exclusions

- External URLs (`http://`, `https://`) — skip (or optionally verify with a HEAD request).
- Anchor-only links (`#section`) within the same file — skip (optionally verify heading exists).

## Scoring

Binary: **pass** if all internal links resolve; **fail** with a list of broken links (source file, link text, target path).

## Implementation hint

```python
import re, os, sys
from pathlib import Path

target = Path(sys.argv[1])
link_re = re.compile(r'\[([^\]]*)\]\(([^)]+)\)')
broken = []

for md in target.rglob("*.md"):
    for match in link_re.finditer(md.read_text()):
        text, href = match.groups()
        if href.startswith(("http://", "https://", "#")):
            continue
        resolved = (md.parent / href.split("#")[0]).resolve()
        if not resolved.exists():
            broken.append((str(md.relative_to(target)), text, href))

if broken:
    print("FAIL — broken links:")
    for src, text, href in broken:
        print(f"  {src}: [{text}]({href})")
    sys.exit(1)
print("PASS")
```

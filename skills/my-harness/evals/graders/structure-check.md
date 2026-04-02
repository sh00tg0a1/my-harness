# Structure Check Grader

**Type:** Deterministic (code-based)

Verifies that the harness output contains the expected directories and files.

## Logic

Given `expect_dirs` and `expect_files` from the task definition:

1. For each path in `expect_dirs`: assert the directory exists at `$TARGET/path`.
2. For each path in `expect_files`: assert the file exists and is non-empty at `$TARGET/path`.
3. Fail with a list of missing paths.

## Additional checks

- `exec-plans/active/` and `exec-plans/completed/` must contain at least `.gitkeep` if otherwise empty.
- When `evals: true` in task inputs, also check `docs/evals/results/.gitkeep` or `docs/evals/results/baselines/`.

## Scoring

Binary: **pass** if all expected paths exist; **fail** otherwise. Report missing paths for debugging.

## Implementation hint

```bash
#!/bin/bash
TARGET="$1"
MISSING=()
for d in "${EXPECT_DIRS[@]}"; do
  [ -d "$TARGET/$d" ] || MISSING+=("dir: $d")
done
for f in "${EXPECT_FILES[@]}"; do
  [ -s "$TARGET/$f" ] || MISSING+=("file: $f")
done
if [ ${#MISSING[@]} -gt 0 ]; then
  printf "FAIL — missing:\n"
  printf "  %s\n" "${MISSING[@]}"
  exit 1
fi
echo "PASS"
```

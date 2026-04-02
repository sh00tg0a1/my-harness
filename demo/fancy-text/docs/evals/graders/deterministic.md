# Deterministic Graders — fancy-text

## Available checks

| Check | What it verifies |
|-------|------------------|
| `build_passes` | `npm run build` exits 0 |
| `types_check` | `npx tsc --noEmit` exits 0 |
| `file_exists` | Expected files are present |
| `exports_present` | Component is exported from its module |
| `no_console_log` | No `console.log` left in production code |

## Usage in task definitions

```yaml
graders:
  - type: deterministic
    checks: [build_passes, types_check, file_exists]
```

## Adding a new check

1. Define the check name and shell command
2. Add to the runner script or CI pipeline
3. Document here

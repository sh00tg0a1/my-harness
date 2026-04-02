# My Harness — Eval Suite

Self-evaluation for the my-harness skill: verify that generated harness output meets quality standards across scenarios.

## Strategy

- **Capability suite:** Tasks where the skill currently struggles or where quality varies by model — hill-climb here.
- **Regression suite:** Tasks that must always pass — graduate capability tasks here once stable at ~100%.

## Grader policy

1. **Deterministic first:** Structure checks (dirs/files exist), link validation, line-count limits — fast, cheap, objective.
2. **LLM rubric where needed:** Content quality, adherence to file-specs templates, tone — calibrate with human spot-checks.
3. **Human calibration:** Quarterly review of 10–20 transcripts to verify LLM rubric alignment.

## How to run

**Prerequisite:** `pip install pyyaml` (only dependency beyond the standard library).

### Interactive mode (recommended)

```bash
cd skills/my-harness/evals
python run.py eval tasks/scaffold-greenfield.yaml
```

This will:
1. Create a clean temp directory (with seed files if the task requires them).
2. Print the target path and task inputs — invoke the skill against this directory in Cursor.
3. Wait for you to press Enter after the skill finishes.
4. Run all deterministic graders and print results.
5. Save an LLM rubric prompt to the target dir (pipe to Claude or paste manually).

### Two-step mode

```bash
# Step 1: prepare the environment
DIR=$(python run.py prepare tasks/speckit-coexistence.yaml)

# Step 2: invoke the skill in Cursor against $DIR, then verify
python run.py verify tasks/speckit-coexistence.yaml "$DIR"
```

### Verify-only mode

If you already have a harness output directory:

```bash
python run.py verify tasks/scaffold-greenfield.yaml /path/to/output
```

### Isolation

Each trial starts from a **clean temp dir** — no shared state between runs.

## Suites

| Suite | Tasks | Purpose |
|-------|-------|---------|
| Regression | `scaffold-greenfield`, `evals-addon-enabled` | Must always pass |
| Capability | `merge-existing`, `speckit-coexistence` | Hill-climb targets |

## Related docs

- [references/evals-addon.md](../references/evals-addon.md) — terminology, grader types, tooling
- [references/file-specs.md](../references/file-specs.md) — per-file content templates (graders check against these)
- [references/harness-principles.md](../references/harness-principles.md) — principles that content rubrics enforce

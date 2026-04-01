# Optional Superpowers add-on

Use when the user requests **Superpowers integration** (design → plan → execute → verify workflow).

## Directories to add

```text
docs/superpowers/
  workflow.md    # Phases, skills, artifact paths
  specs/         # Dated design specs: YYYY-MM-DD-<topic>-design.md
  plans/         # Dated implementation plans: YYYY-MM-DD-<feature>.md
```

## `docs/superpowers/workflow.md` (template outline)

- **Priority:** User instructions (`AGENTS.md`, chat) > Superpowers workflow > model defaults.
- **Phases (typical):** Gate → Design → Plan → Execute → Debug → Verify → Ship.
- **Artifacts:**
  - Designs → `docs/superpowers/specs/`
  - Plans → `docs/superpowers/plans/`
  - Exec plans / debt → `docs/exec-plans/` (see `tech-debt-tracker.md`, `active/`, `completed/`)
- **Anti-patterns:** Starting code before accepted design for non-trivial work; skipping verification before “done”.

## `AGENTS.md` cross-links

Add a short subsection pointing to `docs/superpowers/workflow.md` and the default spec/plan naming convention.

## `docs/PLANS.md`

Mention that **task-level** plans live under `docs/superpowers/plans/` (and/or `exec-plans/`) while `PLANS.md` remains the **product roadmap**.

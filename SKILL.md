---
name: my-harness
description: Scaffold an OpenAI-spec agent harness (AGENTS.md, ARCHITECTURE.md, structured docs/ as record system) for any software project. Creates progressive-disclosure documentation so coding agents navigate from a short map to deep specs. Use when starting a new repo, adding agent-first docs to an existing codebase, or when the user asks for a harness, AGENTS.md scaffold, docs layout, or harness engineering setup. Optional Superpowers (docs/superpowers/) when requested.
---

# My Harness

## When to load references

- **Principles and constraints:** Read [references/harness-principles.md](references/harness-principles.md) before generating content.
- **Per-file content:** Follow [references/file-specs.md](references/file-specs.md) while filling each path.
- **Superpowers only:** If the user enables Superpowers, read [references/superpowers-addon.md](references/superpowers-addon.md) and add that tree.

## Phase 1 — Gather context (parametric)

Ask the user in **one batch** (or use already provided answers):

| Topic | What to capture |
|-------|------------------|
| Identity | Project name, one-sentence purpose |
| Stack | Language(s), framework, runtime, package manager, build, test runner |
| Shape | Project type: frontend / backend / fullstack / CLI / library / monorepo |
| Domains | Key product domains (e.g. auth, billing, admin) — drives `docs/product-specs/*.md` |
| Architecture | Style: layered / hexagonal / microservices / monolith / other |
| Baseline | Greenfield vs adding harness to existing repo (brief: what already exists) |
| Superpowers | Yes / no (default **no**) — adds `docs/superpowers/` per superpowers-addon |
| Target path | Repo root (default: cwd) or explicit path |

If the user passes **“superpowers”** or **“--superpowers”** in the request, treat Superpowers as **yes**.

## Spec Kit coexistence

Before creating files, check whether `.specify/` exists at the repo root.

If **Spec Kit is detected**:

- **Never overwrite** `.specify/`, `specs/`, or any agent command dirs (`.claude/commands/`, `.cursor/commands/`, etc.).
- **`AGENTS.md`** — if it already exists, **append** a `## Documentation harness` section with the `docs/` index links instead of replacing the file. Preserve all existing content.
- **`docs/PLANS.md`** — add a note: `Feature-level specs are managed by Spec Kit in specs/; this file tracks the product roadmap and documentation harness phases.`
- **`docs/product-specs/`** — keep for **domain-level** specs (architecture boundaries, APIs); Spec Kit's `specs/` handles **feature-level** specs. Note this distinction in `docs/product-specs/index.md`.

If Spec Kit is **not** detected, proceed normally.

## Phase 2 — Create directory structure

At the chosen repo root, ensure directories exist (create missing only; do not delete existing files):

```text
AGENTS.md
ARCHITECTURE.md
docs/
  design-docs/
  exec-plans/
    active/
    completed/
  generated/
  product-specs/
  references/
```

- Add `docs/superpowers/workflow.md`, `docs/superpowers/specs/`, `docs/superpowers/plans/` **only** when Superpowers is enabled.
- Under `exec-plans/active/` and `exec-plans/completed/`, add `.gitkeep` if empty.
- **Generated placeholder:** Use `docs/generated/db-schema.md` for data-heavy backends; use `docs/generated/api-schema.md` for API-first or CLI-over-HTTP; pick one primary file and mention the other in the placeholder if both matter later.
- **References:** Create at least one `docs/references/<stack>-llms.txt` — name from the user’s stack (e.g. `vite-llms.txt`, `fastapi-llms.txt`). Multiple files are fine for multiple stacks.

## Phase 3 — Populate files

1. Write **root** `AGENTS.md` and `ARCHITECTURE.md` first — short, link-heavy.
2. Write **docs** top-level: `DESIGN.md`, `PLANS.md`, `PRODUCT_SENSE.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, `SECURITY.md`.
3. Add **`docs/FRONTEND.md`** when project type is frontend or fullstack; omit otherwise (or replace with a one-line pointer in `docs/DESIGN.md` if “no frontend”).
4. Write **`docs/design-docs/index.md`** and **`docs/design-docs/core-beliefs.md`**; add optional extra design docs as needed and link from index.
5. Write **`docs/exec-plans/tech-debt-tracker.md`** with an empty table template.
6. Write **`docs/generated/<schema>.md`** placeholder with regeneration instructions.
7. Write **`docs/product-specs/index.md`** and one **`docs/product-specs/<domain>.md`** per domain from Phase 1.
8. Write **`docs/references/*.txt`** stubs for LLM-context dumps (see file-specs).
9. If Superpowers: add **`docs/superpowers/workflow.md`** per superpowers-addon; leave `specs/` and `plans/` empty or with `.gitkeep`.

**Content rules:** Obey [references/file-specs.md](references/file-specs.md). Align tone and tech with **Principles** in [references/harness-principles.md](references/harness-principles.md). Do **not** duplicate long specs inside `AGENTS.md` — link to `docs/`.

## Phase 4 — Verify

- List created or updated paths.
- Confirm cross-links (`AGENTS.md` → `ARCHITECTURE.md` → `docs/` indexes) resolve.
- Remind the user to add CI/lint for docs later if they want mechanical enforcement.

## Notes

- Do **not** add README or other auxiliary docs inside the **skill** folder beyond SKILL.md and references.
- If the repo already has `AGENTS.md` or `docs/`, **merge** carefully: preserve user content, only add missing harness pieces and update indexes.
- Spec Kit compatibility is **lightweight**: detect, don't overwrite, append to `AGENTS.md`, note the `specs/` vs `docs/product-specs/` split.

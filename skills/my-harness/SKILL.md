---
name: my-harness
description: Scaffold an OpenAI-spec agent harness (AGENTS.md, ARCHITECTURE.md, structured docs/ as record system) for any software project. Creates progressive-disclosure documentation so coding agents navigate from a short map to deep specs. Use when starting a new repo, adding agent-first docs to an existing codebase, or when the user asks for a harness, AGENTS.md scaffold, docs layout, or harness engineering setup. Optional Superpowers (docs/superpowers/) and optional Evals (docs/evals/) when requested.
---

# My Harness

## When to load references

- **Principles and constraints:** Read [references/harness-principles.md](references/harness-principles.md) before generating content.
- **Per-file content:** Follow [references/file-specs.md](references/file-specs.md) while filling each path.
- **Superpowers only:** If the user enables Superpowers, read [references/superpowers-addon.md](references/superpowers-addon.md) and add that tree.
- **Evals only:** If the user enables Evals, read [references/evals-addon.md](references/evals-addon.md) and add that tree.

## Phase 1 — Gather context (step-by-step)

Guide the user through the following questions **one at a time**. If the user has already provided some answers in the initial request, skip those and acknowledge them. Use information already available in the repo (package.json, go.mod, pyproject.toml, etc.) to **infer and propose** answers where possible — let the user confirm or correct.

**Step 1 → Identity**
Ask: project name and one-sentence purpose.

**Step 2 → Target path**
Ask: where should the harness be created? Default: current working directory.
Auto-detect: check if cwd looks like a repo root (has `.git/`, `package.json`, etc.). If so, propose it.

**Step 3 → Baseline**
Ask: greenfield project, or adding harness to an existing repo?
Auto-detect: if `AGENTS.md`, `docs/`, or `.specify/` already exist, propose "existing" and note what was found.

**Step 4 → Stack**
Ask: tech stack — language(s), framework, runtime, package manager, build tool, test runner.
Auto-detect: scan for `package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`, `pom.xml`, etc. Propose what you find.

**Step 5 → Shape**
Ask: project type — frontend / backend / fullstack / CLI / library / monorepo.
Infer from stack and directory structure if possible.

**Step 6 → Domains**
Ask: key product domains (e.g. auth, billing, admin). Each becomes a `docs/product-specs/<domain>.md`.

**Step 7 → Architecture**
Ask: architecture style — layered / hexagonal / microservices / monolith / other.

**Step 8 → Add-ons**
Ask: enable optional add-ons?
- **Superpowers** (design → plan → execute → verify workflow) — default: no
- **Evals** (agent evaluation tasks, graders, baselines) — default: no

**When all answers are gathered**, summarize in a compact table and ask for final confirmation before proceeding to Phase 2.

| Topic | What to capture |
|-------|------------------|
| Identity | Project name, one-sentence purpose |
| Target path | Repo root (default: cwd) or explicit path |
| Baseline | Greenfield vs existing (brief: what already exists) |
| Stack | Language(s), framework, runtime, package manager, build, test runner |
| Shape | Project type: frontend / backend / fullstack / CLI / library / monorepo |
| Domains | Key product domains — drives `docs/product-specs/*.md` |
| Architecture | Style: layered / hexagonal / microservices / monolith / other |
| Superpowers | Yes / no (default **no**) |
| Evals | Yes / no (default **no**) |

If the user passes **“superpowers”** or **“--superpowers”** in the request, treat Superpowers as **yes**.

If the user passes **“evals”** or **“--evals”** in the request, treat Evals as **yes**.

## Spec Kit coexistence

Before creating files, check whether `.specify/` exists at the repo root.

If **Spec Kit is detected**:

- **Never overwrite** `.specify/`, `specs/`, or any agent command dirs (`.claude/commands/`, `.cursor/commands/`, etc.).
- **`AGENTS.md`** — if it already exists, **append** a `## Documentation harness` section with the `docs/` index links instead of replacing the file. Preserve all existing content.
- **`docs/PLANS.md`** — add a note: `Feature-level specs are managed by Spec Kit in specs/; this file tracks the product roadmap and documentation harness phases.`
- **`docs/product-specs/`** — keep for **domain-level** specs (architecture boundaries, APIs); Spec Kit's `specs/` handles **feature-level** specs. Note this distinction in `docs/product-specs/index.md`.
- **`docs/evals/`** (if Evals enabled) — eval tasks test **agent behavior**; do not replace Spec Kit `specs/`. Note the split in `docs/evals/index.md` per [references/evals-addon.md](references/evals-addon.md).

If Spec Kit is **not** detected, proceed normally.

## Phase 2 — Create directory structure

Proceed directly after Phase 1 confirmation — no additional prompt needed.

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

When **Evals** is enabled, also ensure under `docs/`:

```text
  evals/
    index.md
    tasks/
    graders/
    results/
      baselines/
```

- Add `docs/evals/index.md`, `docs/evals/tasks/`, `docs/evals/graders/`, `docs/evals/results/baselines/` **only** when Evals is enabled. Add `docs/evals/results/.gitkeep` if `results/` is otherwise empty.
- Add `docs/superpowers/workflow.md`, `docs/superpowers/specs/`, `docs/superpowers/plans/` **only** when Superpowers is enabled.
- Under `exec-plans/active/` and `exec-plans/completed/`, add `.gitkeep` if empty.
- **Generated placeholder:** Use `docs/generated/db-schema.md` for data-heavy backends; use `docs/generated/api-schema.md` for API-first or CLI-over-HTTP; pick one primary file and mention the other in the placeholder if both matter later.
- **References:** Create at least one `docs/references/<stack>-llms.txt` — name from the user’s stack (e.g. `vite-llms.txt`, `fastapi-llms.txt`). Multiple files are fine for multiple stacks.

## Phase 3 — Populate files

Proceed directly after Phase 2 — no additional prompt needed.

1. Write **root** `AGENTS.md` and `ARCHITECTURE.md` first — short, link-heavy. If Evals is enabled, add a short subsection in `AGENTS.md` linking to `docs/evals/index.md` (per file-specs).
2. Write **docs** top-level: `DESIGN.md`, `PLANS.md`, `PRODUCT_SENSE.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, `SECURITY.md`.
3. Add **`docs/FRONTEND.md`** when project type is frontend or fullstack; omit otherwise (or replace with a one-line pointer in `docs/DESIGN.md` if “no frontend”).
4. Write **`docs/design-docs/index.md`** and **`docs/design-docs/core-beliefs.md`**; add optional extra design docs as needed and link from index.
5. Write **`docs/exec-plans/tech-debt-tracker.md`** with an empty table template.
6. Write **`docs/generated/<schema>.md`** placeholder with regeneration instructions.
7. Write **`docs/product-specs/index.md`** and one **`docs/product-specs/<domain>.md`** per domain from Phase 1.
8. Write **`docs/references/*.txt`** stubs for LLM-context dumps (see file-specs).
9. If Superpowers: add **`docs/superpowers/workflow.md`** per superpowers-addon; leave `specs/` and `plans/` empty or with `.gitkeep`.
10. If Evals: add **`docs/evals/index.md`** per evals-addon; add **`docs/evals/graders/rubrics.md`** and **`docs/evals/graders/deterministic.md`** with template sections; add at least one **`docs/evals/tasks/example-task.yaml`** (or `.md`) as a starter task stub; ensure **`docs/PLANS.md`** and **`docs/QUALITY_SCORE.md`** mention evals when Evals is enabled (per file-specs and evals-addon).

**Content rules:** Obey [references/file-specs.md](references/file-specs.md). Align tone and tech with **Principles** in [references/harness-principles.md](references/harness-principles.md). Do **not** duplicate long specs inside `AGENTS.md` — link to `docs/`.

## Phase 4 — Verify

Present results to the user for review.

- List created or updated paths.
- Confirm cross-links (`AGENTS.md` → `ARCHITECTURE.md` → `docs/` indexes) resolve; if Evals: include `docs/evals/index.md` and task/grader links.
- Remind the user to add CI/lint for docs later if they want mechanical enforcement; if Evals, remind that **task definitions are in-repo** but **running** evals requires a runner (scripts or a framework — see evals-addon).

## Notes

- Do **not** add README or other auxiliary docs inside the **skill** folder beyond SKILL.md, references, and evals.
- If the repo already has `AGENTS.md` or `docs/`, **merge** carefully: preserve user content, only add missing harness pieces and update indexes.
- Spec Kit compatibility is **lightweight**: detect, don't overwrite, append to `AGENTS.md`, note the `specs/` vs `docs/product-specs/` split.

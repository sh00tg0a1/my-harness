---
name: my-harness
description: Scaffold an OpenAI-spec agent harness (AGENTS.md, ARCHITECTURE.md, structured docs/ as record system) for any software project. Creates progressive-disclosure documentation so coding agents navigate from a short map to deep specs. Use when starting a new repo, adding agent-first docs to an existing codebase, or when the user asks for a harness, AGENTS.md scaffold, docs layout, or harness engineering setup. Optional Superpowers (docs/superpowers/) and optional Evals (docs/evals/) when requested.
---

# My Harness

## Progress overview

At the start of execution, display the following task checklist to the user. Update it as you complete each step — mark completed items with `[x]` and the current step with `[→]`.

```
Harness Setup Progress
══════════════════════════════════════════════

Phase 1 — Gather context
  [ ] 1.1  Identity — project name & purpose (free-form)
  [ ] 1.2  Target path (auto-detect → confirm)
  [ ] 1.3  Baseline — greenfield / existing (choice)
  [ ] 1.4  Stack — languages, framework, tools (auto-detect → confirm)
  [ ] 1.5  Shape — project type (choice)
  [ ] 1.6  Domains — product areas (free-form)
  [ ] 1.7  Architecture style (choice)
  [ ] 1.8  Add-ons — Superpowers / Evals (multi-select)
  [ ] 1.9  Confirm summary table

Phase 2 — Create directory structure
  [ ] 2.1  Core directories (docs/, design-docs/, exec-plans/, etc.)
  [ ] 2.2  Optional directories (superpowers / evals if enabled)

Phase 3 — Populate files
  [ ] 3.1  Root files (AGENTS.md, ARCHITECTURE.md)
  [ ] 3.2  Top-level docs (DESIGN, PLANS, QUALITY_SCORE, etc.)
  [ ] 3.3  Design docs (index, core-beliefs)
  [ ] 3.4  Exec plans & tech debt tracker
  [ ] 3.5  Generated schema placeholder
  [ ] 3.6  Product specs (index + per-domain)
  [ ] 3.7  References (LLM context stubs)
  [ ] 3.8  Superpowers (if enabled)
  [ ] 3.9  Evals (if enabled)

Phase 4 — Verify
  [ ] 4.1  List all created paths
  [ ] 4.2  Check cross-links
  [ ] 4.3  Next steps & recommendations

══════════════════════════════════════════════
```

**Display rules:**
- Show the full checklist at the **start** of execution.
- After each step completes, show an **updated** checklist with `[x]` for done and `[→]` for the current step. Skip items that don't apply (e.g. Superpowers/Evals steps when those add-ons are not enabled — mark them `[–]`).
- Keep the checklist **concise** — do not add commentary inside it. Explanations go in the regular conversation.

## When to load references

- **Principles and constraints:** Read [references/harness-principles.md](references/harness-principles.md) before generating content.
- **Per-file content:** Follow [references/file-specs.md](references/file-specs.md) while filling each path.
- **Superpowers only:** If the user enables Superpowers, read [references/superpowers-addon.md](references/superpowers-addon.md) and add that tree.
- **Evals only:** If the user enables Evals, read [references/evals-addon.md](references/evals-addon.md) and add that tree.

## Phase 1 — Gather context (step-by-step)

Guide the user through the following questions **one at a time**. Present each question as a **structured choice** (multiple-choice where possible, with an "Other" option for free-form input). If the user has already provided some answers in the initial request, skip those and acknowledge them. Use information already available in the repo to **infer and pre-select** the most likely option.

**Interaction rules:**
- Use structured multiple-choice questions (e.g. AskQuestion tool) whenever possible.
- Always include an **"Other (I'll describe)"** option for free-form input.
- When auto-detection finds a strong signal (e.g. `package.json` with Next.js), pre-select that option and let the user confirm or change.
- For questions that are naturally open-ended (Identity, Domains), use free-form input directly.

**Step 1 → Identity** (free-form)
Ask: "What is the project name and a one-sentence purpose?"

**Step 2 → Target path** (auto-detect + confirm)
Auto-detect: check if cwd looks like a repo root (has `.git/`, `package.json`, etc.).
Options:
- `<detected path>` (recommended)
- Other path (I'll type it)

**Step 3 → Baseline** (choice)
Auto-detect: if `AGENTS.md`, `docs/`, or `.specify/` already exist, note what was found.
Options:
- Greenfield (empty project, create everything from scratch)
- Existing repo (merge with what's already here: `<detected files>`)

**Step 4 → Stack** (auto-detect + confirm)
Auto-detect: scan for `package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`, `pom.xml`, etc.
If detected, propose: "I found `<files>`, which suggests: `<stack summary>`. Is this correct?"
Options:
- Yes, that's correct
- Partially correct (I'll adjust)
- No, let me describe the stack

**Step 5 → Shape** (choice)
Infer from stack and directory structure if possible. Pre-select the inferred option.
Options:
- Frontend
- Backend
- Fullstack
- CLI
- Library
- Monorepo
- Other (I'll describe)

**Step 6 → Domains** (free-form)
Ask: "What are the key product domains? (e.g. auth, billing, admin — each becomes a `docs/product-specs/<domain>.md`)"
Suggest examples based on detected code structure if possible.

**Step 7 → Architecture** (choice)
Options:
- Layered (controller → service → repository)
- Hexagonal (ports & adapters)
- Microservices
- Monolith
- Other (I'll describe)

**Step 8 → Add-ons** (multi-select)
Options:
- Superpowers — design → plan → execute → verify workflow
- Evals — agent evaluation tasks, graders, baselines
- None (skip all add-ons)

**Step 9 → Confirm summary**
When all answers are gathered, summarize in a compact table and ask for final confirmation before proceeding to Phase 2. If anything is wrong, let the user correct individual items.

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

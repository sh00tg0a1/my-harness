# Per-file specs for OpenAI-style harness

Use these when populating a target repository. Adjust names (e.g. `api-schema.md` vs `db-schema.md`) to **project type**.

## Root

### `AGENTS.md`

- **Purpose:** Operator + agent contract; **map** into `docs/`.
- **Length:** ~100 lines (keep short).
- **Include:** Project one-liner; priority order (user > harness docs > defaults); tech stack table; repo layout table; secrets/logging rules; testing bar; links to `ARCHITECTURE.md` and key `docs/` files. When Evals add-on is present, add a short subsection linking to `docs/evals/index.md`.
- **Include — How to use this harness:** A `## How to use this harness` section with a **usage table** so agents know what to read for each kind of work:

| Scenario | Start here | Then |
| -------- | ---------- | ---- |
| New feature | `docs/product-specs/<domain>.md` | Create plan in `docs/exec-plans/active/` → implement → move to `completed/` |
| Bug fix | `docs/RELIABILITY.md` + `docs/SECURITY.md` | Fix → update `docs/QUALITY_SCORE.md` |
| Architecture change | `ARCHITECTURE.md` | Add `docs/design-docs/<name>.md` → link from `docs/design-docs/index.md` → implement |
| Tech debt | `docs/exec-plans/tech-debt-tracker.md` | Pick item → create active plan → execute |
| Keep docs fresh | Relevant `docs/` when code changes | Update `docs/QUALITY_SCORE.md` gaps |

Adjust row wording to the project’s stack; keep the table short.

- **Avoid:** Long tutorials; duplicating `product-specs/`; pasting API lists — **link** instead.

**Update rules (harness update mode):** When adding a domain, append a row to the Quick nav / Deep dives table if needed; add a new `docs/product-specs/<domain>.md` and update `docs/product-specs/index.md`. Do not remove unrelated sections.

### `ARCHITECTURE.md`

- **Purpose:** Top-level **technical map** for humans and agents.
- **Include:** ASCII or text diagram (services, data flow); module/package boundaries; dependency direction if layered; links to `docs/DESIGN.md`, `docs/SECURITY.md`, `docs/design-docs/`.
- **Avoid:** Full endpoint catalogs — put those in `docs/product-specs/` or `docs/generated/`.

## `docs/` top-level

### `docs/DESIGN.md`

- **Purpose:** Short design **philosophy** (5–15 lines).
- **Include:** What the system optimizes for; link to `design-docs/index.md`.

### `docs/PLANS.md`

- **Purpose:** **Roadmap** phases (product), distinct from task-level exec plans.
- **Include:** Phase 1 = harness/scaffold done; later phases as bullets; link to `exec-plans/` and (if present) `superpowers/plans/` and (if present) `docs/evals/index.md` for eval suite expansion / “graduate to regression”.

### `docs/PRODUCT_SENSE.md`

- **Purpose:** **Who** the product serves and **what** “good” looks like.
- **Include:** 3–7 bullets (personas, non-goals, UX principles).

### `docs/QUALITY_SCORE.md`

- **Purpose:** **Scorecard** for quality dimensions.
- **Include:** Table — criterion | target | notes (typecheck, tests, docs freshness, coverage if used). When Evals add-on is present, add rows for eval coverage, regression pass rate, or baseline freshness (see `docs/evals/index.md`).

### `docs/RELIABILITY.md`

- **Purpose:** Runtime **reliability** expectations.
- **Include:** Timeouts, retries (idempotent only), idempotency notes, observability hooks if any.

### `docs/SECURITY.md`

- **Purpose:** **Secrets, auth, audit** expectations.
- **Include:** Where tokens live; never log secrets; threat-related conventions; links to auth flows in product specs.

### `docs/FRONTEND.md` (optional)

- **Include when:** frontend or fullstack. Omit for pure backend/CLI/library if not applicable.
- **Include:** UI conventions, a11y bar, routing/state, link to design system references.

## `docs/design-docs/`

### `docs/design-docs/index.md`

- **Purpose:** **Catalog** of design docs.
- **Include:** Table — document | description | optional status.

**Update rules:** Append new rows when adding design docs; link new files from this index.

### `docs/design-docs/core-beliefs.md`

- **Purpose:** **Numbered** engineering principles (agent-first).
- **Include:** 5–8 bullets — naming, errors, testing, boundaries, etc.

### Additional design docs (optional)

- e.g. `cli-command-design.md`, `api-conventions.md` — one concern per file; linked from index.

## `docs/exec-plans/`

### `docs/exec-plans/active/` and `docs/exec-plans/completed/`

- **Purpose:** **Execution plans** as git artifacts. Use `.gitkeep` in empty dirs.
- **Convention:** One markdown file per plan; move `active` → `completed` when done.

### `docs/exec-plans/tech-debt-tracker.md`

- **Purpose:** Running list of **tech debt** with owner/area notes.
- **Include:** Table — item | area | notes | optional priority.

## `docs/generated/`

### `docs/generated/db-schema.md` or `docs/generated/api-schema.md`

- **Purpose:** **Placeholder** for generated artifacts.
- **Include:** How to regenerate (command/script); “do not hand-edit” warning.

## `docs/product-specs/`

### `docs/product-specs/index.md`

- **Purpose:** Catalog of **domain** specs.
- **Include:** Table linking each `*.md` with one-line description.

**Update rules:** Append new rows for new domains; remove rows only when removing a domain file with user confirmation.

### `docs/product-specs/<domain>.md`

- **Purpose:** Behavior for one **product domain**.
- **Include:** Goals, user-visible behavior, API/CLI touchpoints, edge cases; link to references.

## `docs/references/`

### `docs/references/<topic>-llms.txt`

- **Purpose:** **Raw** context for agents (paste zones for vendor docs, long excerpts).
- **Format:** Plain text; short header; suggested sections to fill.
- **Examples:** `design-system-reference-llms.txt`, `nixpacks-llms.txt`, `uv-llms.txt` — name by **tool/domain**, not by mystery.

## `docs/evals/` (optional — when Evals add-on is enabled)

See [evals-addon.md](evals-addon.md) for terminology, grader types, capability vs regression, and tooling notes.

### `docs/evals/index.md`

- **Purpose:** **Eval suite** overview — strategy, links to tasks and graders, baselines, how runs are executed (CI script vs external framework).
- **Include:** List or table of suites (capability vs regression); grader policy (deterministic first, LLM/human as needed); link to `docs/QUALITY_SCORE.md` and `docs/exec-plans/` for eval-related debt; Spec Kit note if `.specify/` exists (evals test agent behavior; `specs/` remain feature specs).
- **Avoid:** Pasting full task YAML — **link** to `tasks/`.

### `docs/evals/tasks/<name>.yaml` (or `.md`)

- **Purpose:** One **task** (test case): inputs, success criteria, grader references, optional `tracked_metrics`.
- **Include:** Unambiguous `id` and `desc`; `suite` tag (`capability` | `regression`) if used; grader blocks aligned with `docs/evals/graders/`; everything the grader checks must be inferable from the description.
- **Avoid:** Ambiguous success criteria; tests that assume hidden constraints (e.g. filepath not stated in prompt).

### `docs/evals/graders/rubrics.md`

- **Purpose:** **LLM-as-judge** rubrics: dimensions, scoring, calibration notes, “unknown” escape hatch for judges.
- **Include:** Section per rubric; link from task YAML; note human calibration cadence if subjective.

### `docs/evals/graders/deterministic.md`

- **Purpose:** **Code-based** checks: unit tests, lint/type commands, state/outcome checks, optional tool-call hints (avoid overly brittle ordering).
- **Include:** Naming conventions; where CI invokes these; prefer grading **outcomes** over rigid step sequences.

### `docs/evals/results/baselines/`

- **Purpose:** **Baseline** snapshots or pointers (JSON/MD summaries, or links to CI artifacts).
- **Include:** `.gitkeep` if empty; in `index.md`, explain whether baselines live in git or externally.

---

## Agent platform bridge files (post-scaffold)

These files **point agents at the harness** when the IDE does not auto-load `AGENTS.md`. **Content pattern** (paths are from **repository root**):

1. Read `AGENTS.md`, then `ARCHITECTURE.md`.
2. Check `docs/exec-plans/active/` for in-flight plans.
3. Check `docs/QUALITY_SCORE.md` for known gaps.

### Cursor — `.cursor/rules/harness.mdc`

Create or merge a rule file with front matter:

```yaml
---
description: Load project harness (AGENTS.md) before coding tasks
globs: "**/*"
alwaysApply: true
---
```

Body: the three numbered bullets above, plus “Follow **How to use this harness** in `AGENTS.md` for workflows.”

### Claude Code / OpenAI Codex

No extra file required — `AGENTS.md` is the conventional entry. Mention in the scaffold **final report** only.

### Windsurf — `.windsurfrules`

Append a section (use HTML comments as fences if needed):

```markdown
## Project harness

Before substantive edits: read `AGENTS.md`, `ARCHITECTURE.md`, `docs/exec-plans/active/`, `docs/QUALITY_SCORE.md`.
```

### GitHub Copilot — `.github/copilot-instructions.md`

Append the same **Project harness** block (create `.github/` if missing).

### Cline — `.clinerules`

Append the same **Project harness** block.

**Merge rule:** If the file exists, append; do not delete unrelated instructions. Prefer wrapping appended content in `<!-- harness-bridge:start -->` … `<!-- harness-bridge:end -->` for Markdown-based files.

---

## Harness update rules (incremental changes)

When running **harness update** (not full scaffold):

- **Indexes** — Append rows to `docs/product-specs/index.md` and `docs/design-docs/index.md`; do not rewrite entire tables unless reconciling with user approval.
- **`AGENTS.md`** — Add or adjust nav links surgically; preserve user sections.
- **Add-ons** — Enabling Superpowers/Evals: create missing dirs/files per addon references; link from `AGENTS.md` / `PLANS.md` / `QUALITY_SCORE.md` as in full scaffold.
- **Removing domains or add-ons** — Require explicit confirmation; prefer deprecating with a short note over hard delete.
- **Platform bridges** — Add only missing bridge files or append missing harness blocks; never overwrite whole rule files.

---

## Anti-patterns (all files)

- **Blob duplication** — same content in `AGENTS.md` and a spec file.
- **Unlinked files** — add new docs to the nearest `index.md`.
- **Stale generated** — document regen path or mark explicitly outdated.
- **Wiping bridge files** — replacing entire `.cursor/rules/*` or `.windsurfrules` with only harness text.

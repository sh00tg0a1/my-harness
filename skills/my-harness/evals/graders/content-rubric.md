# Content Quality Rubric

**Type:** Model-based (LLM-as-judge)

Evaluates the quality of generated harness content against file-specs and harness principles.

## Dimensions (score 1–5 each)

### 1. Completeness

Does each file contain the sections required by [file-specs.md](../../references/file-specs.md)? (For `AGENTS.md`, includes **How to use this harness** with the usage table.)

- 5: All required sections present with meaningful content.
- 3: Most sections present; one or two are shallow placeholders.
- 1: Multiple required sections missing or empty.

### 2. Conciseness

Does `AGENTS.md` stay within the **120-line hard ceiling** and link instead of duplicate?

- 5: Under 100 lines; all deep content linked to `docs/`; usage table has ≤3 rows.
- 3: 100–120 lines; minor duplication; usage table may have extra rows.
- 1: Over 120 lines (automatic fail) or substantial duplication with spec files.

### 3. Cross-linking

Are docs connected via working links? Is there a clear path from `AGENTS.md` → `ARCHITECTURE.md` → `docs/` indexes → leaf files?

- 5: Every file reachable within 2 hops from `AGENTS.md`.
- 3: Most files linked but some orphans.
- 1: Flat structure with few or no links.

### 4. Agent readability

Are headings stable and descriptive? Are file and dir names self-explanatory? Would an agent find the right file by name alone?

- 5: Clear naming, stable headings, obvious structure.
- 3: Mostly clear; a few ambiguous names.
- 1: Confusing structure; agent would need to scan contents to navigate.

### 5. Accuracy

Does content align with the project identity, stack, and domains provided in task inputs? No hallucinated frameworks or mismatched tech?

- 5: All content matches inputs precisely.
- 3: Minor mismatches (e.g. wrong test runner name).
- 1: Significant hallucinations or contradictions.

## Passing threshold

Pass if **all dimensions ≥ 3** and **average ≥ 4**.

## Judge instructions

When scoring, if you lack sufficient information to evaluate a dimension, return `"Unknown"` for that dimension rather than guessing. Evaluate each dimension independently.

## Calibration

Review 10 transcripts manually per quarter. Compare human scores with LLM scores. If divergence > 1 point on any dimension, revise the rubric wording.

# Optional Evals add-on

Use when the user requests **Evals integration** (automated agent evaluations: tasks, graders, baselines). Distilled from [Demystifying evals for AI agents (Anthropic)](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

**Tools:** This add-on scaffolds **documentation and conventions** in-repo. Running evals end-to-end requires a runner (scripts or a framework — see Tooling below). The harness does not ship executable eval infrastructure.

## Directories to add

```text
docs/evals/
  index.md                 # Suite overview, strategy, links to tasks & graders
  tasks/                   # One task definition per file (YAML or Markdown)
  graders/
    rubrics.md             # LLM-as-judge rubric templates and calibration notes
    deterministic.md       # Code-based checks (tests, lint, state) conventions
  results/
    baselines/             # Snapshot baselines (optional; or point to CI artifacts)
    .gitkeep
```

## Terminology (align with Anthropic)

| Term | Meaning |
|------|---------|
| **Task** | One test case: inputs + success criteria. |
| **Trial** | One run of a task (outputs vary; use multiple trials for stability). |
| **Grader** | Logic that scores transcript and/or **outcome** (environment end state). |
| **Transcript** | Full record of a trial (messages, tool calls, reasoning). |
| **Outcome** | Final environment state — not only the agent’s final message. |
| **Evaluation harness** | Infrastructure that runs tasks, records steps, grades, aggregates (external to this doc tree). |
| **Agent harness** | The scaffold that lets the model act as an agent (what you ship); evals measure **harness + model** together. |
| **Evaluation suite** | A set of tasks targeting specific capabilities or behaviors. |

## Grader types (choose per task)

1. **Code-based (deterministic):** string/regex match, unit tests, static analysis, outcome/state checks, tool-call presence (use sparingly — avoid brittle “exact step order” rules). Prefer grading **what was produced**, not the path, when possible.
2. **Model-based:** rubric scoring, natural-language assertions, pairwise compare, reference-based evaluation; calibrate with humans for subjective dimensions.
3. **Human:** SME review, spot checks, used to calibrate model graders.

Combine graders with weighted scores, all-must-pass, or hybrid strategies.

## Capability vs regression suites

- **Capability (quality) evals:** “What can the agent do?” Start with **low** pass rate; add hard tasks; hill-climb.
- **Regression evals:** “Does it still do what it used to?” Target **~100%** pass rate; protect against drift.

When capability tasks saturate (near 100%), **graduate** them into the regression suite.

## Non-determinism metrics

- **pass@k:** Probability of ≥1 success in *k* trials (more shots → higher score).
- **pass^k:** Probability all *k* trials succeed (stricter; matters for user-facing consistency).

At k=1 they coincide; they diverge as k grows.

## `docs/evals/index.md` (template outline)

- **Purpose:** Automated evals for the agent (definition in-repo; runner may be CI or external).
- **Suites:** List capability vs regression (or link to tables in `tasks/`).
- **Grader policy:** Prefer deterministic where possible; LLM rubrics where needed; human calibration for subjective areas.
- **Baselines:** Where results live (`results/baselines/` or CI artifact URLs).
- **Related:** Link `docs/QUALITY_SCORE.md`, `docs/exec-plans/` for debt tied to eval gaps.

## Example task shape (YAML — illustrative)

Adapt to your runner; keep task specs **unambiguous** (two experts should agree pass/fail).

```yaml
task:
  id: example-task-1
  desc: Short, unambiguous description; success criteria clear to graders.
  suite: capability  # or regression
  graders:
    - type: deterministic_tests
      required: [test_foo.py]
    - type: llm_rubric
      rubric: docs/evals/graders/rubrics.md#section
    - type: state_check
      expect:
        resource_table: { status: ok }
  tracked_metrics:
    - type: transcript
      metrics: [n_turns, n_tool_calls, n_total_tokens]
    - type: latency
      metrics: [time_to_first_token, time_to_last_token]
```

## Tooling (optional)

Teams often start with **simple scripts**; frameworks accelerate when you need scale. See Anthropic’s appendix: Harbor (containerized runs, benchmarks), Braintrust (offline + prod observability), LangSmith / Langfuse (tracing + datasets), Arize Phoenix (tracing + evals). **Frameworks are only as good as the tasks and graders you define** — invest in task quality first.

## `AGENTS.md` cross-links

Add a short subsection: link to `docs/evals/index.md`, note where task definitions and baselines live.

## `docs/PLANS.md` and `docs/QUALITY_SCORE.md`

- **PLANS.md:** Mention that eval suite expansion and “graduate to regression” are ongoing product/engineering phases.
- **QUALITY_SCORE.md:** Add rows for eval coverage, regression pass rate, or baseline freshness if relevant.

## Spec Kit coexistence

Do **not** treat `docs/evals/tasks/` as replacement for product feature specs in `specs/` when Spec Kit is present. Evals are **behavioral tests** for the agent; Spec Kit `specs/` remain **feature-level** product specs. Cross-link in `docs/evals/index.md` if needed.

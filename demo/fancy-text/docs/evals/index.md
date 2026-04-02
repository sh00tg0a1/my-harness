# Evals — fancy-text

## Purpose

Automated evaluations for agent behavior when working on the fancy-text codebase. Task definitions live in-repo; the runner may be CI or an external framework.

## Suites

| Suite | Type | Description |
|-------|------|-------------|
| Component rendering | Capability | Can the agent correctly add/modify fancy styles? |
| Code quality | Regression | Does the agent maintain TypeScript strictness and build passing? |

## Grader policy

- **Deterministic first** — use code-based checks (build passes, types check, file exists) where possible
- **LLM rubrics** — for subjective quality (code clarity, naming, visual effect description)
- **Human calibration** — spot-check LLM grader output periodically

## Task definitions

See [tasks/](tasks/) for individual task YAML files.

## Graders

- [graders/rubrics.md](graders/rubrics.md) — LLM-as-judge rubric templates
- [graders/deterministic.md](graders/deterministic.md) — code-based check conventions

## Baselines

Results stored in [results/baselines/](results/baselines/) or CI artifact URLs.

## Related

- [docs/QUALITY_SCORE.md](../QUALITY_SCORE.md) — quality gaps
- [docs/PLANS.md](../PLANS.md) — eval expansion as ongoing phase
- [docs/exec-plans/](../exec-plans/) — debt tied to eval gaps

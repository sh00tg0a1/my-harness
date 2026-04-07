# Plans — fancy-text

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| P0 — Core rendering | ✅ Done | Basic text input + 5 fancy styles |
| P1 — Polish | 🔲 Next | Add CSS animations, responsive design, dark mode |
| P2 — Share | 🔲 Future | Export as image / copy styled HTML |
| P3 — Extend | 🔲 Future | User-created custom styles, style marketplace |

## Active execution plans

See [exec-plans/active/](exec-plans/active/) for in-flight work.

## Task-level plans

Design-phase plans live in [superpowers/plans/](superpowers/plans/).

## Eval suite expansion

Growing the evaluation suite is an ongoing engineering phase. See [evals/index.md](evals/index.md).

## Workflows

| Workflow | Cadence | Steps |
| -------- | ------- | ----- |
| Tech debt triage | Monthly | Review [exec-plans/tech-debt-tracker.md](exec-plans/tech-debt-tracker.md) → prioritize → create exec plan in `active/` |
| Doc freshness | After each feature | Update affected `product-specs/*.md` → verify cross-links → update `QUALITY_SCORE.md` |
| Eval expansion | Per milestone | Add task YAML in `evals/tasks/` → run graders → record baseline in `evals/results/baselines/` |

## Related

- [PRODUCT_SENSE.md](PRODUCT_SENSE.md)
- [exec-plans/tech-debt-tracker.md](exec-plans/tech-debt-tracker.md)

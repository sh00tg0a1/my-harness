# AGENTS.md — fancy-text

> 把用户输入的任何语言文字以 fancy 的方式呈现。

## Quick nav

| Doc | Purpose |
|-----|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System shape, layers, allowed edges |
| [docs/DESIGN.md](docs/DESIGN.md) | Design principles & decisions |
| [docs/PLANS.md](docs/PLANS.md) | Product roadmap & active phases |
| [docs/PRODUCT_SENSE.md](docs/PRODUCT_SENSE.md) | User personas, value props |
| [docs/QUALITY_SCORE.md](docs/QUALITY_SCORE.md) | Quality gaps & scores |
| [docs/FRONTEND.md](docs/FRONTEND.md) | UI architecture & components |
| [docs/RELIABILITY.md](docs/RELIABILITY.md) | Error handling, resilience |
| [docs/SECURITY.md](docs/SECURITY.md) | Security posture |

## Deep dives

- **Design docs** → [docs/design-docs/index.md](docs/design-docs/index.md)
- **Product specs** → [docs/product-specs/index.md](docs/product-specs/index.md)
- **Exec plans** → [docs/exec-plans/tech-debt-tracker.md](docs/exec-plans/tech-debt-tracker.md)
- **References** → [docs/references/](docs/references/)

## Superpowers

Design → Plan → Execute → Verify workflow: [docs/superpowers/workflow.md](docs/superpowers/workflow.md)

## Evals

Agent evaluation suite: [docs/evals/index.md](docs/evals/index.md)

## How to use this harness

| Scenario | Start here | Then |
| -------- | ---------- | ---- |
| New feature | `docs/product-specs/<domain>.md` | Create plan in `docs/exec-plans/active/` → implement → move to `completed/` |
| Bug fix | `docs/RELIABILITY.md` + `docs/SECURITY.md` | Fix → update `docs/QUALITY_SCORE.md` |
| Architecture change | `ARCHITECTURE.md` | Add `docs/design-docs/<name>.md` → link from index → implement |

For tech debt, doc maintenance, and other workflows see [docs/PLANS.md](docs/PLANS.md).

## Conventions

- Stack: React 18 + Vite 5 + TypeScript 5.4
- Architecture: Monolith (single SPA)
- Test: not yet configured
- Lint: not yet configured

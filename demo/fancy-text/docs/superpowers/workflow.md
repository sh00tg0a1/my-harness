# Superpowers Workflow — fancy-text

## Priority

User instructions (`AGENTS.md`, chat) > Superpowers workflow > model defaults.

## Phases

| Phase | Gate | Artifacts |
|-------|------|-----------|
| **Design** | User approves design doc | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| **Plan** | Design accepted | `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` |
| **Execute** | Plan accepted | Code changes + `docs/exec-plans/active/<plan>.md` |
| **Debug** | Tests fail or bugs found | Patches, updated tests |
| **Verify** | All tests pass, lint clean | Move plan to `docs/exec-plans/completed/` |
| **Ship** | Verified | Update `docs/PLANS.md` roadmap status |

## Anti-patterns

- Starting code before an accepted design for non-trivial features
- Skipping verification before marking work "done"
- Accumulating designs without plans (design → shelf syndrome)

## Naming conventions

- Design specs: `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
- Implementation plans: `docs/superpowers/plans/YYYY-MM-DD-<feature>.md`

## Related

- [AGENTS.md](../../AGENTS.md) — navigation hub
- [docs/PLANS.md](../PLANS.md) — product roadmap
- [docs/exec-plans/](../exec-plans/) — active & completed plans

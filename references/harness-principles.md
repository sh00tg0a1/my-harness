# Harness engineering principles (OpenAI)

Source: [Harness engineering (OpenAI)](https://openai.com/zh-Hans-CN/index/harness-engineering/) — distill into **actionable rules** when scaffolding a repo for coding agents.

## 1. Repository as the system of record

- **Versioned, in-repo knowledge only.** If it lives in chat, Google Docs, or heads, the agent cannot see it at runtime.
- Prefer **Markdown, schemas, and executable plans** that agents can grep, diff, and update in PRs.

## 2. AGENTS.md is a map, not an encyclopedia

- Target **~100 lines** (order of magnitude): **table of contents** + pointers into `docs/`.
- **Anti-pattern:** One giant `AGENTS.md` that crowds out task context and rots without mechanical checks.
- **Anti-pattern:** Marking everything “critical” — when everything is important, nothing is.

## 3. Progressive disclosure

- **Layer 1:** Skill metadata / short entry.
- **Layer 2:** `AGENTS.md` — stable routing to deeper docs.
- **Layer 3:** `docs/` — product, design, plans, references.
- **Layer 4:** `docs/references/` — long LLM-oriented dumps (`.txt`), vendor excerpts, append-only context.

Agents should **start small** and **follow links** instead of loading everything.

## 4. Structured `docs/` as record system

- **design-docs/** — principles, command/API UX, indexed catalog.
- **product-specs/** — behavior per domain; link from indexes.
- **exec-plans/** — plans as first-class artifacts: `active/`, `completed/`, `tech-debt-tracker.md`.
- **generated/** — machine-produced docs (OpenAPI, DB schema); regen via scripts; do not hand-edit blindly.

## 5. Plans and debt are versioned

- **Active** and **completed** execution plans live in git so agents run **without external context**.
- **Tech debt** is tracked continuously (small payments) — not a surprise rewrite.

## 6. Mechanical enforcement

- Encode **invariants** in linters, CI, and structure tests — not only prose.
- **Doc gardening:** periodic passes (or automation) to fix stale links and outdated rules.

## 7. Agent readability over human-only polish

- Optimize for **discoverability**: clear names, indexes, cross-links, stable headings.
- Generated code may not match human style preferences; **correctness, maintainability, and clarity for the next agent run** matter more.

## 8. Architecture constraints early

- **Strict boundaries** (layers, allowed edges) beat ad-hoc instructions once the codebase grows.
- Prefer **parse at boundaries** (validate shapes at IO edges) without micromanaging implementation details.

## 9. Quality as a scorecard

- Track **gaps** (docs, tests, coverage, reliability) in `docs/QUALITY_SCORE.md` and update when behavior changes.

## 10. Entropy and “garbage collection”

- Agents **amplify existing patterns** — good and bad. Schedule **small, frequent** cleanups.
- Capture **golden rules** in-repo (short, enforceable) and refactor PRs over batch “big bang” debt days.

---

When generating a new harness, **instantiate** these principles in file layout and short, link-heavy root docs — do not paste this entire file into `AGENTS.md`.

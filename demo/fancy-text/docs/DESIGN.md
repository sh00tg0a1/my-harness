# Design — fancy-text

## Principles

1. **Instant feedback** — text transforms in real-time as the user types.
2. **Universal language support** — any Unicode text works (CJK, Arabic, Emoji, etc.).
3. **Delight over utility** — the visual effect is the product; surprise users with quality.
4. **Simplicity** — one input, one output, minimal controls.

## Design decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering approach | Per-character `<span>` with CSS animation | Fine-grained control over delays and effects |
| Style switching | Enum + CSS classes | Easy to add new styles without changing logic |
| State management | React useState | App is simple enough; no need for external state |

## Related

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [design-docs/index.md](design-docs/index.md)
- [design-docs/core-beliefs.md](design-docs/core-beliefs.md)

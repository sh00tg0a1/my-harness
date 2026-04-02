# Reliability — fancy-text

## Error handling

- **Empty input** — `FancyRenderer` returns `null` (no crash)
- **Unknown style** — TypeScript union type prevents invalid styles at compile time

## Performance concerns

- Per-character `<span>` rendering may degrade with very long text (>5000 chars)
- Animation delays accumulate linearly — consider capping or batching

## Future improvements

- Add `React.memo` to prevent unnecessary re-renders
- Virtualize character rendering for long text
- Add error boundary around `FancyRenderer`

## Related

- [QUALITY_SCORE.md](QUALITY_SCORE.md)
- [SECURITY.md](SECURITY.md)

# Security — fancy-text

## Threat model

Low risk — pure client-side app with no backend, no auth, no data storage.

## Considerations

| Area | Status | Notes |
|------|--------|-------|
| XSS | ✅ Safe | React auto-escapes rendered text; no `dangerouslySetInnerHTML` |
| Data storage | ✅ N/A | No persistence; text lives only in React state |
| Dependencies | ⚠️ Monitor | Keep `react`, `vite` updated; run `npm audit` periodically |

## Related

- [RELIABILITY.md](RELIABILITY.md)

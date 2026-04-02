# Architecture — fancy-text

## System shape

```
┌─────────────────────────────────────────┐
│  Browser (SPA)                          │
│                                         │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │ App      │  │ Components           │ │
│  │ (state)  │──│ • StylePicker        │ │
│  │          │  │ • FancyRenderer      │ │
│  └──────────┘  └──────────────────────┘ │
└─────────────────────────────────────────┘
```

## Layers

| Layer | Path | Responsibility |
|-------|------|----------------|
| Entry | `src/main.tsx` | React root mount |
| App | `src/App.tsx` | State management, layout |
| Components | `src/components/` | UI rendering, style effects |

## Allowed edges

- App → Components (props down)
- Components → App (callbacks up via onChange)

## Key decisions

- **No backend** — pure client-side text transformation
- **CSS animations** — per-character animation via inline delay
- **Style system** — enum-based (`FancyStyle` union type)

## Related

- [AGENTS.md](AGENTS.md) — navigation hub
- [docs/DESIGN.md](docs/DESIGN.md) — design principles
- [docs/FRONTEND.md](docs/FRONTEND.md) — frontend details

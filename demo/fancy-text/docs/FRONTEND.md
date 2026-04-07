# Frontend — fancy-text

## Component tree

```text
App
├── <textarea>          — text input
├── StylePicker         — style selection grid (25 styles)
├── ColorControl        — hue slider for color customization
├── FancyRenderer       — animated text output (per-character spans)
└── ExportPanel         — export styled text as HTML
```

## Style system

25 built-in styles defined as `FancyStyle` union type in `src/App.tsx`:

`neon` · `gradient` · `typewriter` · `glitch` · `handwriting` · `fire` · `ice` · `matrix` · `retro` · `shadow3d` · `bounce` · `wave` · `sparkle` · `smoke` · `outline` · `cyber` · `gold` · `pixel` · `elastic` · `blur` · `rainbow-bounce` · `neon-blue` · `chalk` · `stamp` · `bubble`

## Embed mode

Append `?embed=1&text=Hello&style=neon&hue=180` to the URL to render a style without UI chrome. Used by `ExportPanel` for HTML export.

## Adding a new style

1. Add value to `FancyStyle` type in `src/App.tsx`
2. Add entry to `STYLES` array in `src/components/StylePicker.tsx`
3. Add CSS class `.fancy-<name>` with animations in `src/index.css`

## Related

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [product-specs/rendering.md](product-specs/rendering.md)
- [product-specs/styles.md](product-specs/styles.md)

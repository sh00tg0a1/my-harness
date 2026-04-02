# Frontend — fancy-text

## Component tree

```
App
├── <textarea>          — text input
├── StylePicker         — style selection buttons
└── FancyRenderer       — animated text output
```

## Style system

Five built-in styles defined as `FancyStyle` union type:

| Style | CSS class | Effect |
|-------|-----------|--------|
| neon | `fancy-neon` | Glowing text shadow |
| gradient | `fancy-gradient` | Rainbow gradient fill |
| typewriter | `fancy-typewriter` | Sequential character reveal |
| glitch | `fancy-glitch` | RGB shift + distortion |
| handwriting | `fancy-handwriting` | Cursive font + ink effect |

## Adding a new style

1. Add value to `FancyStyle` type in `App.tsx`
2. Add entry to `STYLES` array in `StylePicker.tsx`
3. Add CSS class `.fancy-<name>` with animations

## Related

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [product-specs/rendering.md](product-specs/rendering.md)
- [product-specs/styles.md](product-specs/styles.md)

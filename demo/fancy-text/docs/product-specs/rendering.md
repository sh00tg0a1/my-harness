# Rendering — fancy-text

## Overview

The rendering engine transforms user input text into animated visual output. Each character is wrapped in a `<span>` with a staggered animation delay.

## Behavior

- **Input**: Any Unicode string from the textarea
- **Output**: Animated `<div>` with per-character spans
- **Empty input**: Returns `null` (no output rendered)
- **Animation delay**: Each character gets `i * 0.05s` delay

## Component

`src/components/FancyRenderer.tsx`

## Future considerations

- Virtualize rendering for text > 5000 characters
- Support block-level effects (paragraph-level animation)
- Add transition animation when switching styles

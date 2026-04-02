# Styles — fancy-text

## Overview

The style system provides 25 visual effects for text rendering. Styles are defined as a TypeScript union type and applied via CSS classes.

## Available styles

| ID | Label | Emoji | CSS class | Effect description |
|----|-------|-------|-----------|--------------------|
| neon | 霓虹灯 | 💡 | `fancy-neon` | Purple glowing text shadow with pulse |
| gradient | 渐变色 | 🌈 | `fancy-gradient` | Rainbow gradient text fill, flowing |
| typewriter | 打字机 | ⌨️ | `fancy-typewriter` | Green terminal, sequential character reveal |
| glitch | 故障风 | 📺 | `fancy-glitch` | RGB channel shift + distortion |
| handwriting | 手写体 | ✍️ | `fancy-handwriting` | Cursive font with ink stroke on lined paper |
| fire | 火焰 | 🔥 | `fancy-fire` | Warm ember glow with flicker |
| ice | 冰霜 | 🧊 | `fancy-ice` | Frosted crystal formation |
| matrix | 黑客帝国 | 🟢 | `fancy-matrix` | Green falling code rain |
| retro | 复古 | 📟 | `fancy-retro` | 80s synthwave with layered shadows |
| shadow3d | 3D立体 | 🧱 | `fancy-shadow3d` | Multi-layer depth shadow |
| bounce | 弹跳 | 🏀 | `fancy-bounce` | Playful bounce-in animation |
| wave | 波浪 | 🌊 | `fancy-wave` | Sine wave vertical oscillation |
| sparkle | 闪烁 | ✨ | `fancy-sparkle` | Gold star twinkle with rotation |
| smoke | 烟雾 | 💨 | `fancy-smoke` | Ethereal fade-in with blur |
| outline | 描边 | 🔲 | `fancy-outline` | Hollow stroke with color cycling |
| cyber | 赛博朋克 | 🤖 | `fancy-cyber` | Cyan terminal with scanlines |
| gold | 金属 | 🥇 | `fancy-gold` | Metallic gold shimmer gradient |
| pixel | 像素 | 👾 | `fancy-pixel` | 8-bit retro game font |
| elastic | 弹性 | 🪀 | `fancy-elastic` | Rubbery stretch-and-snap |
| blur | 模糊 | 🌫️ | `fancy-blur` | Focus reveal from blur |
| rainbow-bounce | 彩虹弹 | 🦄 | `fancy-rainbow-bounce` | Colorful hop with cycling colors |
| neon-blue | 蓝色霓虹 | 💎 | `fancy-neon-blue` | Electric blue glow pulse |
| chalk | 粉笔 | 🖍️ | `fancy-chalk` | Blackboard chalk writing |
| stamp | 印章 | 🔴 | `fancy-stamp` | Red ink stamp press-down |
| bubble | 气泡 | 🫧 | `fancy-bubble` | Floating soap bubble outlines |

## Adding a new style

1. Add to `FancyStyle` union type in `src/App.tsx`
2. Add to `STYLES` array in `src/components/StylePicker.tsx`
3. Add delay value to `DELAY` record in `src/components/FancyRenderer.tsx`
4. Create `.fancy-<id>` CSS class with keyframe animations in `src/index.css`

## Components

- `src/App.tsx` — `FancyStyle` type definition
- `src/components/StylePicker.tsx` — selection UI
- `src/components/FancyRenderer.tsx` — rendering engine with per-style animation delay
- `src/index.css` — all style CSS animations

import type { FancyStyle } from '../App';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@400;600;800&family=Press+Start+2P&family=Fredericka+the+Great&display=swap';

const SKIP_PATTERNS = [
  '.export-', '.style-picker', '.app ', 'header', 'textarea',
  '.embed-mode', 'body.embed-mode', 'toastFade', 'headerShift',
];

function collectCSS(style: FancyStyle): string {
  const styleRules: string[] = [];
  const keyframeRules: string[] = [];
  const seen = new Set<string>();
  const usedAnimations = new Set<string>();

  for (const sheet of document.styleSheets) {
    try {
      for (let i = 0; i < sheet.cssRules.length; i++) {
        const rule = sheet.cssRules[i];
        const t = rule.cssText;
        if (seen.has(t)) continue;

        if (SKIP_PATTERNS.some(p => t.includes(p))) continue;

        const isKeyframe = t.startsWith('@keyframes');

        if (isKeyframe) {
          seen.add(t);
          keyframeRules.push(t);
          continue;
        }

        const isRelevant =
          (t.startsWith('.fancy-output') && !t.includes('.export')) ||
          t.includes(`.fancy-${style}`);

        if (isRelevant) {
          seen.add(t);
          styleRules.push(t);
          const animMatch = t.match(/animation(?:-name)?:\s*([^;{}]+)/g);
          if (animMatch) {
            for (const m of animMatch) {
              m.split(',').forEach(part => {
                const name = part.replace(/animation(-name)?:\s*/, '').trim().split(/\s+/)[0];
                if (name && !/^[\d.]/.test(name) && name !== 'none') usedAnimations.add(name);
              });
            }
          }
        }
      }
    } catch {
      /* cross-origin sheet */
    }
  }

  const relevantKeyframes = keyframeRules.filter(k => {
    const nameMatch = k.match(/@keyframes\s+(\S+)/);
    return nameMatch && usedAnimations.has(nameMatch[1]);
  });

  return [...relevantKeyframes, ...styleRules].join('\n');
}

function getRenderedHTML(): string {
  const el = document.querySelector('.fancy-output');
  return el ? el.outerHTML : '';
}

export function buildSnippet(style: FancyStyle): string {
  const css = collectCSS(style);
  const html = getRenderedHTML();
  return [
    `<!-- Fancy Text · ${style} -->`,
    `<link rel="stylesheet" href="${FONTS_URL}">`,
    '<style>',
    css,
    '</style>',
    html,
  ].join('\n');
}

export function buildFullPage(style: FancyStyle): string {
  const css = collectCSS(style);
  const html = getRenderedHTML();
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="${FONTS_URL}">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0f;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem}
${css}
</style>
</head>
<body>
${html}
</body>
</html>`;
}

export function downloadHTMLFile(style: FancyStyle) {
  const page = buildFullPage(style);
  const blob = new Blob([page], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fancy-text-${style}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(content: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
}

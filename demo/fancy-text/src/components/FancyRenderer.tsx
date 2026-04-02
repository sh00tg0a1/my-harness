import type { FancyStyle } from '../App';

interface Props {
  text: string;
  style: FancyStyle;
  hue?: number;
}

const DELAY: Record<FancyStyle, number> = {
  neon: 0, gradient: 0, typewriter: 0.06, glitch: 0, handwriting: 0.04,
  fire: 0, ice: 0.03, matrix: 0.04, retro: 0, 'shadow3d': 0,
  bounce: 0.05, wave: 0.04, sparkle: 0.06, smoke: 0.05, outline: 0,
  cyber: 0.03, gold: 0, pixel: 0, elastic: 0.04, blur: 0.05,
  'rainbow-bounce': 0.03, 'neon-blue': 0, chalk: 0.04, stamp: 0.06, bubble: 0.05,
};

const EMOJI_RE = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;

function splitGraphemes(str: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [...new Intl.Segmenter().segment(str)].map(s => s.segment);
  }
  return [...str];
}

export function FancyRenderer({ text, style, hue = 0 }: Props) {
  if (!text) return null;

  const delay = DELAY[style];
  const chars = splitGraphemes(text);
  const containerStyle = hue ? { filter: `hue-rotate(${hue}deg)` } : undefined;

  return (
    <div className={`fancy-output fancy-${style}`} key={style} style={containerStyle}>
      {chars.map((char, i) => {
        const isEmoji = EMOJI_RE.test(char);
        return (
          <span
            key={`${style}-${i}`}
            data-char={char}
            className={isEmoji ? 'emoji-char' : undefined}
            style={delay ? { animationDelay: `${i * delay}s` } : undefined}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

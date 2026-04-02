import type { FancyStyle } from '../App';

const STYLES: { id: FancyStyle; label: string; emoji: string }[] = [
  { id: 'neon', label: '霓虹灯', emoji: '💡' },
  { id: 'gradient', label: '渐变色', emoji: '🌈' },
  { id: 'typewriter', label: '打字机', emoji: '⌨️' },
  { id: 'glitch', label: '故障风', emoji: '📺' },
  { id: 'handwriting', label: '手写体', emoji: '✍️' },
  { id: 'fire', label: '火焰', emoji: '🔥' },
  { id: 'ice', label: '冰霜', emoji: '🧊' },
  { id: 'matrix', label: '黑客帝国', emoji: '🟢' },
  { id: 'retro', label: '复古', emoji: '📟' },
  { id: 'shadow3d', label: '3D立体', emoji: '🧱' },
  { id: 'bounce', label: '弹跳', emoji: '🏀' },
  { id: 'wave', label: '波浪', emoji: '🌊' },
  { id: 'sparkle', label: '闪烁', emoji: '✨' },
  { id: 'smoke', label: '烟雾', emoji: '💨' },
  { id: 'outline', label: '描边', emoji: '🔲' },
  { id: 'cyber', label: '赛博朋克', emoji: '🤖' },
  { id: 'gold', label: '金属', emoji: '🥇' },
  { id: 'pixel', label: '像素', emoji: '👾' },
  { id: 'elastic', label: '弹性', emoji: '🪀' },
  { id: 'blur', label: '模糊', emoji: '🌫️' },
  { id: 'rainbow-bounce', label: '彩虹弹', emoji: '🦄' },
  { id: 'neon-blue', label: '蓝色霓虹', emoji: '💎' },
  { id: 'chalk', label: '粉笔', emoji: '🖍️' },
  { id: 'stamp', label: '印章', emoji: '🔴' },
  { id: 'bubble', label: '气泡', emoji: '🫧' },
];

interface Props {
  current: FancyStyle;
  onChange: (s: FancyStyle) => void;
}

export function StylePicker({ current, onChange }: Props) {
  return (
    <div className="style-picker">
      {STYLES.map(s => (
        <button
          key={s.id}
          className={current === s.id ? 'active' : ''}
          onClick={() => onChange(s.id)}
        >
          {s.emoji} {s.label}
        </button>
      ))}
    </div>
  );
}

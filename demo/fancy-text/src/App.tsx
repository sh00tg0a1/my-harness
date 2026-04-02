import { useState, useEffect } from 'react';
import { FancyRenderer } from './components/FancyRenderer';
import { StylePicker } from './components/StylePicker';
import { ColorControl } from './components/ColorControl';
import { ExportPanel } from './components/ExportPanel';

export type FancyStyle =
  | 'neon' | 'gradient' | 'typewriter' | 'glitch' | 'handwriting'
  | 'fire' | 'ice' | 'matrix' | 'retro' | 'shadow3d'
  | 'bounce' | 'wave' | 'sparkle' | 'smoke' | 'outline'
  | 'cyber' | 'gold' | 'pixel' | 'elastic' | 'blur'
  | 'rainbow-bounce' | 'neon-blue' | 'chalk' | 'stamp' | 'bubble';

const params = new URLSearchParams(window.location.search);
const embedMode = params.get('embed') === '1';
const initText = params.get('text') ?? '';
const initStyle = (params.get('style') as FancyStyle) || 'neon';
const initHue = Number(params.get('hue')) || 0;

export default function App() {
  const [text, setText] = useState(initText);
  const [style, setStyle] = useState<FancyStyle>(initStyle);
  const [hue, setHue] = useState(initHue);

  useEffect(() => {
    if (embedMode) document.body.classList.add('embed-mode');
  }, []);

  if (embedMode) {
    return <FancyRenderer text={text} style={style} hue={hue} />;
  }

  return (
    <div className="app">
      <header>
        <h1>Fancy Text</h1>
        <p>输入任何文字，选择一种风格，看它变得 ✨ fancy ✨</p>
      </header>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="在这里输入任何语言的文字..."
      />
      <StylePicker current={style} onChange={setStyle} />
      <ColorControl hue={hue} onChange={setHue} />
      <FancyRenderer text={text} style={style} hue={hue} />
      <ExportPanel style={style} text={text} />
    </div>
  );
}

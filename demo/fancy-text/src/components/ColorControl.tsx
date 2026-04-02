interface Props {
  hue: number;
  onChange: (hue: number) => void;
}

export function ColorControl({ hue, onChange }: Props) {
  return (
    <div className="color-control">
      <div className="color-control-row">
        <span className="color-label">🎨 调色</span>
        <input
          type="range"
          className="hue-slider"
          min="0"
          max="360"
          value={hue}
          onChange={e => onChange(Number(e.target.value))}
        />
        <span className="hue-value">{hue}°</span>
        {hue !== 0 && (
          <button className="hue-reset" onClick={() => onChange(0)}>
            重置
          </button>
        )}
      </div>
    </div>
  );
}

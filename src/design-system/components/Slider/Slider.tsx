import { bem, cx } from '../../utils/bem';
import type { SliderProps } from './Slider.types';

export function Slider({ value, icon, label, onChange, className }: SliderProps) {
  return (
    <div className={cx(bem('slider'), className)}>
      {icon && <span className="pebble-slider__icon">{icon}</span>}
      {label && <span>{label}</span>}
      <input type="range" min={0} max={100} value={value} onChange={(event) => onChange?.(Number(event.target.value))} />
    </div>
  );
}

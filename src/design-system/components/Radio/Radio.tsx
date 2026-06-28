import { bem, cx } from '../../utils/bem';
import type { RadioProps } from './Radio.types';

export function Radio({ selected, label, onChange, className }: RadioProps) {
  return (
    <>
      <div
        className={cx(bem('radio', { selected: selected ? 'true' : 'false' }), className)}
        onClick={() => onChange?.(!selected)}
      />
      {label && <span onClick={() => onChange?.(!selected)}>{label}</span>}
    </>
  );
}

import { bem, cx } from '../../utils/bem';
import type { ToggleProps } from './Toggle.types';

export function Toggle({ active, label, onChange, className }: ToggleProps) {
  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        className={cx(bem('toggle', { active: active ? 'true' : 'false' }), className)}
        onClick={() => onChange?.(!active)}
      />
      {label && <span onClick={() => onChange?.(!active)}>{label}</span>}
    </>
  );
}

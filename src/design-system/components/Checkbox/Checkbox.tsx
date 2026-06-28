import { bem, cx } from '../../utils/bem';
import type { CheckboxProps } from './Checkbox.types';

export function Checkbox({ checked, label, onChange, className }: CheckboxProps) {
  return (
    <>
      <span className={cx(bem('checkbox', { checked }), className)} onClick={() => onChange?.(!checked)} />
      {label && <span onClick={() => onChange?.(!checked)}>{label}</span>}
    </>
  );
}

import { bem, cx } from '../../utils/bem';
import type { InputProps } from './Input.types';

export function Input({
  state,
  showIcon,
  showClose,
  placeholder,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <input
      className={cx(
        bem('input', {
          state,
          'show-icon': showIcon ? 'true' : undefined,
          'show-close': showClose ? 'true' : undefined,
        }),
        className,
      )}
      placeholder={placeholder}
      value={value}
      disabled={state === 'disrubted'}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
}

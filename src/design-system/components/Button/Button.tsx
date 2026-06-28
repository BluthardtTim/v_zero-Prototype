import { bem, cx } from '../../utils/bem';
import type { ButtonProps } from './Button.types';

export function Button({
  size,
  style,
  type = 'text',
  state = 'default',
  label,
  icon,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      className={cx(bem('button', { size, style, type, state }), className)}
      onClick={onClick}
      disabled={state === 'disabled'}
      aria-busy={state === 'loading'}
    >
      {icon}
      {type !== 'icon' && <span>{label}</span>}
    </button>
  );
}

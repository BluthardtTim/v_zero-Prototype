import { bem, cx } from '../../utils/bem';
import type { LabelProps } from './Label.types';

export function Label({ size, tinted, disabled, children, className }: LabelProps) {
  return (
    <span
      className={cx(
        bem('label', { size, tinted, disabled: disabled ? 'true' : undefined }),
        className,
      )}
    >
      {size === 'big' && <span className="pebble-label__dot" />}
      {children}
    </span>
  );
}

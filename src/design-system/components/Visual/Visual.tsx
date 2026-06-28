import { bem, cx } from '../../utils/bem';
import type { VisualProps } from './Visual.types';

export function Visual({ children, className }: VisualProps) {
  return <div className={cx(bem('visual'), className)}>{children}</div>;
}

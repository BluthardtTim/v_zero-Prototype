import { cx } from '../../utils/bem';
import type { RootProps } from './Root.types';

export function Root({ children, className }: RootProps) {
  return <div className={cx('pebble-root', className)}>{children}</div>;
}

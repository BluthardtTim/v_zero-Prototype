import { bem, cx } from '../../utils/bem';
import type { DividerProps } from './Divider.types';

export function Divider({ className }: DividerProps) {
  return <hr className={cx(bem('devider'), className)} />;
}

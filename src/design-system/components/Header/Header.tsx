import { bem, cx } from '../../utils/bem';
import type { HeaderProps } from './Header.types';

export function Header({ children, className }: HeaderProps) {
  return <div className={cx(bem('header'), className)}>{children}</div>;
}

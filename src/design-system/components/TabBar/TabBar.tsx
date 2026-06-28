import { bem, cx } from '../../utils/bem';
import type { TabBarProps } from './TabBar.types';

export function TabBar({ children, className }: TabBarProps) {
  return (
    <div className={cx(bem('tabbar'), className)}>
      <div className="pebble-tabbar__pill">{children}</div>
    </div>
  );
}

import { bem, cx } from '../../utils/bem';
import type { TabBarItemProps } from './TabBar.types';

export function TabBarItem({ selected, label, onClick, className }: TabBarItemProps) {
  return (
    <button
      type="button"
      className={cx(bem('tab_bar_selected', { selected: selected ? 'true' : 'false' }), className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

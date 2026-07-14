import { cloneElement, isValidElement } from 'react';
import { bem, cx } from '../../utils/bem';
import type { TabBarItemProps } from './TabBar.types';

export function TabBarItem({ selected, label, onClick, className }: TabBarItemProps) {
  // The icon (an already-rendered Phosphor icon element) switches to the "fill"
  // weight and black color while selected, "regular" weight and grey otherwise —
  // the model never has to manage this itself, since `selected` is already the
  // live, reactive value.
  const icon = isValidElement(label)
    ? cloneElement(label as React.ReactElement<{ weight?: string; color?: string }>, {
        weight: selected ? 'fill' : 'regular',
        color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
      })
    : label;

  return (
    <button
      type="button"
      className={cx(bem('tab_bar_selected', { selected: selected ? 'true' : 'false' }), className)}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

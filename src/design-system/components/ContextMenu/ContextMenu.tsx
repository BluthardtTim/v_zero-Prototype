import { bem, cx } from '../../utils/bem';
import type { ContextMenuProps } from './ContextMenu.types';

export function ContextMenu({ children, className }: ContextMenuProps) {
  return <div className={cx(bem('context-menue'), className)}>{children}</div>;
}

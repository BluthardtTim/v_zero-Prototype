import { bem, cx } from '../../utils/bem';
import type { FolderGridProps } from './Folder.types';

export function FolderGrid({ type, children, className }: FolderGridProps) {
  return <div className={cx(bem('folder-grid', { type }), className)}>{children}</div>;
}

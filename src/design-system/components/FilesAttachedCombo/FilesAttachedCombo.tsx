import { bem, cx } from '../../utils/bem';
import { FilesAttached } from '../FilesAttached';
import type { FilesAttachedComboProps } from './FilesAttachedCombo.types';

export function FilesAttachedCombo({ headline, files, className }: FilesAttachedComboProps) {
  return (
    <div className={cx(bem('files_attached_combo'), className)}>
      <span className="pebble-files_attached_combo__headline">{headline}</span>
      <FilesAttached files={files} size="small" />
    </div>
  );
}

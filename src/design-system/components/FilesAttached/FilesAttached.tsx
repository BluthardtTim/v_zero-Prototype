import { bem, cx } from '../../utils/bem';
import type { FilesAttachedProps } from './FilesAttached.types';

export function FilesAttached({ files, size = 'big', className }: FilesAttachedProps) {
  const isStacked = size === 'big' && files.length >= 3;
  const visibleFiles = isStacked ? files.slice(0, 1) : files;

  return (
    <div className={cx(bem('files_attached', { size }), className)}>
      {visibleFiles.map((file, index) => (
        <div
          key={index}
          className={cx(
            'pebble-files_attached__item',
            isStacked && 'pebble-files_attached__item--stacked',
          )}
        >
          {file.icon && <span className="pebble-files_attached__icon">{file.icon}</span>}
          <div className="pebble-files_attached__text">
            <span className="pebble-files_attached__name">{file.name}</span>
            {size === 'big' && file.size && (
              <span className="pebble-files_attached__size">{file.size}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import { bem, cx } from '../../utils/bem';
import type { FolderProps } from './Folder.types';

export function Folder({ size, name, description, starred, icon, onClick, className }: FolderProps) {
  return (
    <div className={cx(bem('folder', { size }), className)} onClick={onClick}>
      <div className="pebble-folder__icon">{icon}</div>
      <div className="pebble-folder__row">
        {starred && <span className="pebble-folder__star">★</span>}
        <div className="pebble-folder__text">
          <span className="pebble-folder__name">{name}</span>
          {description && <span className="pebble-folder__description">{description}</span>}
        </div>
      </div>
    </div>
  );
}

import { bem, cx } from '../../utils/bem';
import type { PhotosProps } from './Photos.types';

export function Photos({ albums, recentPhotos, recentTotal, sharedBy, className }: PhotosProps) {
  const visible = recentPhotos.slice(0, 4);
  const overflowCount = recentTotal - visible.length;
  const overflowSrc = overflowCount > 0 ? (recentPhotos[4]?.src ?? visible[visible.length - 1]?.src) : undefined;

  return (
    <div className={cx(bem('photos'), className)}>
      <div className="pebble-photos__albums">
        <p className="pebble-photos__title">Photos</p>
        <div className="pebble-photos__albums-row">
          {albums.map((album, index) => (
            <div
              className={cx('pebble-photos__album', album.onClick && 'pebble-photos__album--clickable')}
              key={index}
              onClick={album.onClick}
              role={album.onClick ? 'button' : undefined}
              tabIndex={album.onClick ? 0 : undefined}
            >
              <img className="pebble-photos__album-cover" src={album.src} alt="" />
              <div className="pebble-photos__album-gradient" aria-hidden />
              <div className="pebble-photos__album-meta">
                <span className="pebble-photos__album-title">{album.title}</span>
                <span className="pebble-photos__album-count">{album.count} Images</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pebble-photos__recent">
        <div className="pebble-photos__recent-header">
          <span className="pebble-photos__recent-label">Recently added</span>
          <span className="pebble-photos__recent-caption">shared by {sharedBy}</span>
        </div>
        <div className="pebble-photos__recent-row">
          {visible.map((photo, index) => (
            <div className="pebble-photos__recent-tile" key={index}>
              <img src={photo.src} alt="" />
            </div>
          ))}
          {overflowSrc && (
            <div className="pebble-photos__recent-tile pebble-photos__recent-tile--overflow">
              <img src={overflowSrc} alt="" />
              <div className="pebble-photos__recent-overlay" aria-hidden />
              <span className="pebble-photos__recent-badge">+{overflowCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

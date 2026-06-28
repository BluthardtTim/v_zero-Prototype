import { bem, cx } from '../../utils/bem';
import type { NoteProps } from './Note.types';

export function Note({ size, headline, body, items, className }: NoteProps) {
  return (
    <div className={cx(bem('note', { size }), className)}>
      <div className="pebble-note__card">
        <div className="pebble-note__header">
          <span className="pebble-note__label">notes</span>
        </div>
        <div className="pebble-note__content">
          {size === 'large' ? (
            <>
              <div className="pebble-note__text-block">
                {headline && <p className="pebble-note__headline">{headline}</p>}
                <p className="pebble-note__body">{body}</p>
              </div>
              {items && items.length > 0 && items.map((item, i) => (
                <div key={i} className="pebble-note__item">
                  <span className={cx('pebble-note__item-checkbox', item.checked ? 'pebble-note__item-checkbox--checked' : undefined)} />
                  <span className="pebble-note__item-text">{item.text}</span>
                </div>
              ))}
            </>
          ) : (
            <p className="pebble-note__body">{body}</p>
          )}
        </div>
        <div className="pebble-note__fade" />
      </div>
    </div>
  );
}

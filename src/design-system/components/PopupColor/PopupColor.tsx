import { bem, cx } from '../../utils/bem';
import type { PopupColorProps } from './PopupColor.types';

export function PopupColor({ surface, headline, onDismiss, children, className }: PopupColorProps) {
  return (
    <div className={cx(bem('popup_color', { surface }), className)}>
      <div className="pebble-popup_color__header">
        <span className="pebble-popup_color__headline">{headline}</span>
        {onDismiss && (
          <button type="button" className="pebble-popup_color__dismiss" onClick={onDismiss} aria-label="Dismiss">
            <span />
          </button>
        )}
      </div>
      <div className="pebble-popup_color__content">{children}</div>
    </div>
  );
}

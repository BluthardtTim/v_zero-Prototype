import { Children, isValidElement } from 'react';
import { bem, cx } from '../../utils/bem';
import { Note } from '../Note';
import type { PopupColorProps } from './PopupColor.types';

export function PopupColor({ surface, headline, onDismiss, children, className }: PopupColorProps) {
  const safeChildren = Children.map(children, child =>
    isValidElement(child) && child.type === Note ? null : child
  );
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
      <div className="pebble-popup_color__content">{safeChildren}</div>
    </div>
  );
}

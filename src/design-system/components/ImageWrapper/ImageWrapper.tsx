import { Children } from 'react';
import { cx } from '../../utils/bem';
import { Button } from '../Button';
import type { ImageWrapperProps } from './ImageWrapper.types';

// Right edge of each nth card (left offset + 100px width) + small rotation buffer,
// indexed by card count so the container shrinks to fit and margin:auto centers it.
const STACK_WIDTHS = [0, 115, 145, 176, 235, 263]

export function ImageWrapper({ count, label, onClick, children, className }: ImageWrapperProps) {
  const cards = Children.toArray(children).slice(0, 5);
  const stackWidth = STACK_WIDTHS[cards.length] ?? 263

  return (
    <div className={cx('pebble-imagewrapper', className)}>
      <div className="pebble-imagewrapper__stack" style={{ width: stackWidth }}>
        {cards.map((card, i) => (
          <div key={i} className="pebble-imagewrapper__card">
            {card}
          </div>
        ))}
      </div>
      <div className="pebble-imagewrapper__footer">
        {(count || label) && (
          <div className="pebble-imagewrapper__meta">
            {count && <span>{count}</span>}
            {count && label && <span className="pebble-imagewrapper__sep" />}
            {label && <span>{label}</span>}
          </div>
        )}
        {onClick && (
          <Button size="large" style="primary" label="See all" onClick={onClick} />
        )}
      </div>
    </div>
  );
}

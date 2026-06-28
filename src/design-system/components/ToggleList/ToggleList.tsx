import { Children } from 'react';
import { bem, cx } from '../../utils/bem';
import type { ToggleListProps } from './ToggleList.types';

export function ToggleList({ headline, children, className }: ToggleListProps) {
  const amount = Math.min(Math.max(Children.count(children), 2), 4);

  return (
    <div
      className={cx(
        bem('togglelist', { amount, headline: headline ? 'true' : 'false' }),
        className,
      )}
    >
      {headline && <span className="pebble-togglelist__headline">{headline}</span>}
      {children}
    </div>
  );
}

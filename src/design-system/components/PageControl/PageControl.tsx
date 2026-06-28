import { bem, cx } from '../../utils/bem';
import type { PageControlProps } from './PageControl.types';

export function PageControl({ amount, selection, className }: PageControlProps) {
  return (
    <div className={cx(bem('page_control'), className)}>
      {Array.from({ length: amount }, (_, index) => (
        <span
          key={index}
          className={cx('pebble-page_control__dot', index === selection && 'pebble-page_control__dot--active')}
        />
      ))}
    </div>
  );
}

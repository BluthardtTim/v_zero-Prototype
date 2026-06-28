import { Children } from 'react';
import { bem, cx } from '../../utils/bem';
import type { TableViewProps } from './TableView.types';

function cellAmount(count: number): string | undefined {
  if (count === 2) return 'two';
  if (count === 3) return 'three';
  if (count > 3) return 'more-then-3';
  return undefined;
}

export function TableView({ description, children, className }: TableViewProps) {
  return (
    <div
      className={cx(
        bem('tableview', {
          discription: description ? 'true' : 'false',
          'cell-amount': cellAmount(Children.count(children)),
        }),
        className,
      )}
    >
      {description && <p className="pebble-tableview__description">{description}</p>}
      {children}
    </div>
  );
}

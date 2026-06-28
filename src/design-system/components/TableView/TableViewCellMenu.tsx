import { bem, cx } from '../../utils/bem';
import type { TableViewCellMenuProps } from './TableView.types';

export function TableViewCellMenu({ label, state = 'label', onClick, className }: TableViewCellMenuProps) {
  return (
    <div className={cx(bem('tableview-cell-menue', { state }), className)} onClick={onClick}>
      {label}
    </div>
  );
}

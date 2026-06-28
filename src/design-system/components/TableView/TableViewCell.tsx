import { bem, cx } from '../../utils/bem';
import type { TableViewCellProps } from './TableView.types';

export function TableViewCell({
  label,
  leftIcon,
  nestedLabel,
  details,
  nestedContent,
  onClick,
  className,
}: TableViewCellProps) {
  return (
    <div className={cx(bem('tableview-cell'), className)} onClick={onClick}>
      <div className="pebble-tableview-cell__main">
        {leftIcon && <span className="pebble-tableview-cell__icon">{leftIcon}</span>}
        <div className="pebble-tableview-cell__text">
          <span className="pebble-tableview-cell__label">{label}</span>
          {nestedLabel && <span className="pebble-tableview-cell__nested-label">{nestedLabel}</span>}
        </div>
      </div>
      {(details || nestedContent) && (
        <div className="pebble-tableview-cell__trailing">
          {details && <span className="pebble-tableview-cell__details">{details}</span>}
          {nestedContent}
        </div>
      )}
    </div>
  );
}

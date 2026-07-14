import { bem, cx } from '../../utils/bem';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

export function SegmentedPicker({ children, trailingIcon, onTrailingIconClick, className }: SegmentedPickerProps) {
  return (
    <div className={cx(bem('segmentedpicker'), className)}>
      <div className="pebble-segmentedpicker__tabs">{children}</div>
      {trailingIcon && (
        <button
          type="button"
          className="pebble-segmentedpicker__trailing"
          onClick={onTrailingIconClick}
        >
          {trailingIcon}
        </button>
      )}
    </div>
  );
}

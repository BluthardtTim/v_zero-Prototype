import { bem, cx } from '../../utils/bem';
import type { SegmentedPickerOptionProps } from './SegmentedPicker.types';

export function SegmentedPickerOption({ selected, label, icon, onClick, className }: SegmentedPickerOptionProps) {
  return (
    <button
      type="button"
      className={cx(
        bem('segmentedpicker-option', {
          selected: selected ? 'true' : 'false',
          icon: icon ? 'true' : 'false',
        }),
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

import { bem, cx } from '../../utils/bem';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

export function SegmentedPicker({ children, className }: SegmentedPickerProps) {
  return <div className={cx(bem('segmentedpicker'), className)}>{children}</div>;
}

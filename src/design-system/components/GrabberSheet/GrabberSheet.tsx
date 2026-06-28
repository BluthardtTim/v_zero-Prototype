import { bem, cx } from '../../utils/bem';
import type { GrabberSheetProps } from './GrabberSheet.types';

export function GrabberSheet({ className }: GrabberSheetProps) {
  return <div className={cx(bem('grabber_-_sheet'), className)} />;
}

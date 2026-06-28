import { bem, cx } from '../../utils/bem';
import { GrabberSheet } from '../GrabberSheet';
import type { SheetHeaderProps } from './SheetHeader.types';

export function SheetHeader({ discription, draggeable, className }: SheetHeaderProps) {
  return (
    <div className={cx(bem('sheet_header'), className)}>
      {draggeable && <GrabberSheet />}
      {discription && <span>{discription}</span>}
    </div>
  );
}

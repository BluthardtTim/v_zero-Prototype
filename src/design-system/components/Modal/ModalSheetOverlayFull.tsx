import { bem, cx } from '../../utils/bem';
import type { ModalSheetOverlayProps } from './Modal.types';

export function ModalSheetOverlayFull({ children, onDismiss, className }: ModalSheetOverlayProps) {
  return (
    <div className={cx(bem('modal_sheet-overlay-full'), className)} onClick={onDismiss}>
      {children}
    </div>
  );
}

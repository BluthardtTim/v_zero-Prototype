import { bem, cx } from '../../utils/bem';
import type { ModalSheetOverlayProps } from './Modal.types';

export function ModalSheetOverlay({ children, onDismiss, className }: ModalSheetOverlayProps) {
  return (
    <div className={cx(bem('modal_sheet-overlay'), className)} onClick={onDismiss}>
      {children}
    </div>
  );
}

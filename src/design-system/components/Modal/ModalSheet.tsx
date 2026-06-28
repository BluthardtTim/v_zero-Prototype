import { bem, cx } from '../../utils/bem';
import type { ModalSheetProps } from './Modal.types';

export function ModalSheet({ children, className }: ModalSheetProps) {
  return (
    <div className={cx(bem('modal_sheet'), className)} onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
}

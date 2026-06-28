import { bem, cx } from '../../utils/bem';
import { Checkbox } from '../Checkbox';
import type { SelectionButtonProps } from './SelectionButton.types';

export function SelectionButton({
  label,
  discriptor,
  checked,
  state = 'default',
  onClick,
  className,
}: SelectionButtonProps) {
  return (
    <div
      className={cx(
        bem('selectionbutton', { checked, state: state === 'disabled' ? 'disabled' : undefined }),
        className,
      )}
      onClick={state === 'disabled' ? undefined : onClick}
    >
      <Checkbox checked={checked} />
      <div className="pebble-selectionbutton__content">
        <span className="pebble-selectionbutton__label">{label}</span>
        {discriptor && <span className="pebble-selectionbutton__discriptor">{discriptor}</span>}
      </div>
    </div>
  );
}

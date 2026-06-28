import { bem, cx } from '../../utils/bem';
import { Radio } from '../Radio';
import type { ToggleButtonProps } from './ToggleButton.types';

export function ToggleButton({
  selected,
  value,
  discription,
  trailing,
  state = 'default',
  onSelect,
  className,
}: ToggleButtonProps) {
  return (
    <div
      className={cx(
        bem('togglebutton', { selected: selected ? 'true' : 'false', state }),
        className,
      )}
      onClick={state === 'disabled' ? undefined : onSelect}
    >
      <div className="pebble-togglebutton__main">
        <Radio selected={selected} />
        <div className="pebble-togglebutton__content">
          <span className="pebble-togglebutton__value">{value}</span>
          {discription && <span className="pebble-togglebutton__discription">{discription}</span>}
        </div>
      </div>
      {trailing && <span className="pebble-togglebutton__trailing">{trailing}</span>}
    </div>
  );
}

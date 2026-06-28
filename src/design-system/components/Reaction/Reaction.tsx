import { bem, cx } from '../../utils/bem';
import type { ReactionProps } from './Reaction.types';

export function Reaction({ emojis = [], onClick, className }: ReactionProps) {
  const isEmpty = emojis.length === 0;

  return (
    <button
      type="button"
      className={cx(bem('reaction', { empty: isEmpty }), className)}
      onClick={onClick}
      aria-label={isEmpty ? 'Add reaction' : undefined}
    >
      {isEmpty ? (
        <span className="pebble-reaction__add" />
      ) : (
        emojis.map((emoji, index) => (
          <span key={index} className="pebble-reaction__emoji">
            {emoji}
          </span>
        ))
      )}
    </button>
  );
}

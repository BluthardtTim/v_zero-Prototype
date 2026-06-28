import { bem, cx } from '../../utils/bem';
import type { CategoryChipProps } from './CategoryChip.types';

export function CategoryChip({ size, headline, label, image, className }: CategoryChipProps) {
  return (
    <div className={cx(bem('category_chip', { size }), className)}>
      <div className="pebble-category_chip__swatch">{image}</div>
      <div className="pebble-category_chip__text">
        {headline && <span className="pebble-category_chip__headline">{headline}</span>}
        {label && <span className="pebble-category_chip__label">{label}</span>}
      </div>
    </div>
  );
}

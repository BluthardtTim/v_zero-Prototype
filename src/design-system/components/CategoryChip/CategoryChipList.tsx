import { bem, cx } from '../../utils/bem';
import type { CategoryChipListProps } from './CategoryChip.types';

export function CategoryChipList({ headline, children, className }: CategoryChipListProps) {
  return (
    <div className={cx(bem('category_chip_list', { headline: headline ? 'true' : 'false' }), className)}>
      {headline && <span>{headline}</span>}
      {children}
    </div>
  );
}

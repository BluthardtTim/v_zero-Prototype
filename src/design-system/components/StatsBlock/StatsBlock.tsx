import { bem, cx } from '../../utils/bem';
import type { StatsBlockProps } from './StatsBlock.types';

export function StatsBlock({ stats, discriptor, variant, className }: StatsBlockProps) {
  return (
    <div className={cx(bem('stats_block', { variant }), className)}>
      <span>{stats}</span>
      {discriptor && <span>{discriptor}</span>}
    </div>
  );
}

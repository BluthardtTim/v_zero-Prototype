import { bem, cx } from '../../utils/bem';
import type { ToolbarTopProps } from './ToolbarTop.types';

export function ToolbarTop({ title, back, onBack, icon, className }: ToolbarTopProps) {
  return (
    <div
      className={cx(
        bem('toolbar_-_top', { icon: icon ? 'true' : undefined, back: back ? 'true' : undefined }),
        className,
      )}
    >
      {back && <button type="button" onClick={onBack}>‹</button>}
      {title && <span className="pebble-toolbar_-_top__title">{title}</span>}
      {icon}
    </div>
  );
}

import { bem, cx } from '../../utils/bem';
import type { AvatarProps } from './Avatar.types';

export function Avatar({ size, grouped, src, alt = '', initials, tint, children, className }: AvatarProps) {
  return (
    <span className={cx(bem('avatar', { size, grouped: grouped ? 'true' : undefined, tint }), className)}>
      {src ? (
        <img src={src} alt={alt} />
      ) : initials ? (
        <span className="pebble-avatar__initials">{initials}</span>
      ) : (
        children
      )}
    </span>
  );
}

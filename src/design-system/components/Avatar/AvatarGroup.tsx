import { Children, cloneElement, isValidElement } from 'react';
import { bem, cx } from '../../utils/bem';
import { Avatar } from './Avatar';
import type { AvatarGroupProps } from './Avatar.types';

export function AvatarGroup({ size, children, className }: AvatarGroupProps) {
  const items = Children.toArray(children);
  const amount = Math.min(Math.max(items.length, 2), 4);

  return (
    <div className={cx(bem('avatar-group', { amount, size }), className)}>
      {items.map((child, index) =>
        isValidElement(child) && child.type === Avatar
          ? cloneElement(child as React.ReactElement<React.ComponentProps<typeof Avatar>>, {
              size,
              grouped: true,
              key: index,
            })
          : child,
      )}
    </div>
  );
}

import { cloneElement, isValidElement, type ReactElement } from 'react';
import { bem, cx } from '../../utils/bem';
import { Avatar } from '../Avatar';
import type { AvatarProps } from '../Avatar';
import type { MessageThreadRowProps } from './MessageThreadRow.types';

// Figma's Message-threathrow always uses a single 48px Avatar (or an AvatarGroup
// cluster for group chats, which manages its own consistent sizing already) - a
// plain Avatar child is force-sized to 48 here so the row never renders at an
// inconsistent size regardless of what size the caller passed.
function normalizeAvatar(avatar: MessageThreadRowProps['avatar']) {
  if (isValidElement(avatar) && avatar.type === Avatar) {
    return cloneElement(avatar as ReactElement<AvatarProps>, { size: 48 });
  }
  return avatar;
}

export function MessageThreadRow({
  name,
  time,
  preview,
  avatar,
  subtitle,
  unread,
  reaction,
  attachment,
  style = 'activity',
  onClick,
  className,
}: MessageThreadRowProps) {
  return (
    <div className={cx(bem('message-threathrow', { style }), className)} onClick={onClick}>
      {avatar && <span className="pebble-message-threathrow__avatar">{normalizeAvatar(avatar)}</span>}
      <div className="pebble-message-threathrow__main">
        <div className="pebble-message-threathrow__header">
          <div className="pebble-message-threathrow__top">
            <div className="pebble-message-threathrow__identity">
              <span className="pebble-message-threathrow__name">{name}</span>
              {subtitle && <span className="pebble-message-threathrow__subtitle">{subtitle}</span>}
            </div>
            <div className="pebble-message-threathrow__meta">
              <span className="pebble-message-threathrow__time">{time}</span>
              {unread && <span className="pebble-message-threathrow__dot" />}
            </div>
          </div>
          <p className="pebble-message-threathrow__preview">{preview}</p>
          {reaction && <div className="pebble-message-threathrow__reaction">{reaction}</div>}
        </div>
        {attachment && <div className="pebble-message-threathrow__attachment">{attachment}</div>}
        <div className="pebble-message-threathrow__divider" />
      </div>
    </div>
  );
}

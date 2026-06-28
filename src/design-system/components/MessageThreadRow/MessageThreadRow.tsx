import { cloneElement, isValidElement, type ReactElement } from 'react';
import { bem, cx } from '../../utils/bem';
import { Avatar } from '../Avatar';
import type { AvatarProps } from '../Avatar';
import type { GroupParticipant, MessageThreadRowProps } from './MessageThreadRow.types';

function normalizeAvatar(avatar: MessageThreadRowProps['avatar']) {
  if (isValidElement(avatar) && avatar.type === Avatar) {
    return cloneElement(avatar as ReactElement<AvatarProps>, { size: 48 });
  }
  return avatar;
}

// Figma node 2082:4305 — three 24px grouped Avatars in a 48×48 circular frame.
// Up to 3 participants are shown; missing slots render as generic placeholders.
function GroupChatAvatar({ participants = [] }: { participants?: GroupParticipant[] }) {
  const slots: GroupParticipant[] = [
    participants[0] ?? {},
    participants[1] ?? {},
    participants[2] ?? {},
  ];
  return (
    <span className="pebble-message-threathrow__group-image">
      {slots.map((p, i) => (
        <Avatar key={i} size={24} grouped initials={p.initials} tint={p.tint} />
      ))}
    </span>
  );
}

export function MessageThreadRow({
  name,
  time,
  preview,
  group,
  participants,
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
      {group ? (
        <GroupChatAvatar participants={participants} />
      ) : avatar ? (
        <span className="pebble-message-threathrow__avatar">{normalizeAvatar(avatar)}</span>
      ) : null}
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

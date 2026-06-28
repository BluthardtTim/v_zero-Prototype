import type { ReactNode } from 'react';
import type { AvatarTint } from '../Avatar';

export type MessageThreadRowStyle = 'activity' | 'list';

export interface GroupParticipant {
  initials?: string;
  tint?: AvatarTint;
}

export interface MessageThreadRowProps {
  name: string;
  time: string;
  preview: string;
  group?: boolean;
  participants?: GroupParticipant[];
  avatar?: ReactNode;
  subtitle?: string;
  unread?: boolean;
  reaction?: ReactNode;
  attachment?: ReactNode;
  style?: MessageThreadRowStyle;
  onClick?: () => void;
  className?: string;
}

import type { ReactNode } from 'react';

export type MessageThreadRowStyle = 'activity' | 'list';

export interface MessageThreadRowProps {
  name: string;
  time: string;
  preview: string;
  avatar?: ReactNode;
  subtitle?: string;
  unread?: boolean;
  reaction?: ReactNode;
  attachment?: ReactNode;
  style?: MessageThreadRowStyle;
  onClick?: () => void;
  className?: string;
}

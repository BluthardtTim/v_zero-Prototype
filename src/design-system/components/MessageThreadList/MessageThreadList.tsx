import { bem, cx } from '../../utils/bem';
import type { MessageThreadListProps } from './MessageThreadList.types';

export function MessageThreadList({ children, className }: MessageThreadListProps) {
  return <div className={cx(bem('message-threatlist'), className)}>{children}</div>;
}

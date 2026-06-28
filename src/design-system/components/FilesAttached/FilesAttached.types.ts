import type { ReactNode } from 'react';

export interface FileAttachmentItem {
  name: string;
  size?: string;
  icon?: ReactNode;
}

export type FilesAttachedSize = 'big' | 'small';

export interface FilesAttachedProps {
  files: FileAttachmentItem[];
  size?: FilesAttachedSize;
  className?: string;
}

import type { FileAttachmentItem } from '../FilesAttached/FilesAttached.types';

export interface FilesAttachedComboProps {
  headline: string;
  files: FileAttachmentItem[];
  className?: string;
}

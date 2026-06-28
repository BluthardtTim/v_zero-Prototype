import type { ReactNode } from 'react';

export interface FolderProps {
  size: 'small' | 'big';
  name: string;
  description?: string;
  starred?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface FolderGridProps {
  type: 'small-list' | 'big-list';
  /** Folder-Elemente */
  children: ReactNode;
  className?: string;
}

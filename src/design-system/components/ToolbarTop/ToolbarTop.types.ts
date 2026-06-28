import type { ReactNode } from 'react';

export interface ToolbarTopProps {
  title?: string;
  back?: boolean;
  onBack?: () => void;
  /** Aktions-Icon/Button rechts in der Toolbar. */
  icon?: ReactNode;
  className?: string;
}

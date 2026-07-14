export interface DocumentItem {
  title: string;
  /** e.g. "By Julia Zoellner" */
  subtitle: string;
  /** Absolute date string, e.g. "6 Apr 2025" */
  date: string;
  /** Watermark label on the placeholder file icon (e.g. "pdf", "doc"). Defaults to "pdf". */
  fileType?: string;
  /** Defaults to 'shared'. Drives the Shared/Private tab filter. */
  visibility?: 'shared' | 'private';
}

export interface DocumentsProps {
  documents: DocumentItem[];
  /** Rows shown before the "See all" link appears. Defaults to 3 (Figma node 119:1892). */
  visibleCount?: number;
  /** Defaults to "See all". */
  seeAllLabel?: string;
  className?: string;
}

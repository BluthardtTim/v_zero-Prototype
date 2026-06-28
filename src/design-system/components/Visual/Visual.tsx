import { bem, cx } from '../../utils/bem';
import type { VisualProps } from './Visual.types';

function FolderIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden>
      <rect x="0" y="2" width="15" height="10" rx="1.5" fill="url(#vf-back)" />
      <path d="M0 4V2.5C0 1.67 0.67 1 1.5 1H5L7 2.5H0Z" fill="url(#vf-back)" />
      <rect x="0.5" y="0" width="11" height="7.5" rx="1" fill="url(#vf-doc)" />
      <rect x="1.5" y="1.5" width="10.5" height="6.5" rx="0.6" fill="white" />
      <rect x="0" y="5.5" width="15" height="6.5" rx="1.5" fill="url(#vf-front)" />
      <defs>
        <linearGradient id="vf-back" x1="7.5" y1="0" x2="7.5" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="15%" stopColor="#77c091" />
          <stop offset="96.759%" stopColor="#c6ddb1" />
        </linearGradient>
        <linearGradient id="vf-doc" x1="5.5" y1="0" x2="5.5" y2="7.5" gradientUnits="userSpaceOnUse">
          <stop offset="15%" stopColor="#1c4a8f" />
          <stop offset="96.759%" stopColor="#71b0ef" />
        </linearGradient>
        <linearGradient id="vf-front" x1="7.5" y1="5.5" x2="7.5" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5cb87c" />
          <stop offset="100%" stopColor="#c6ddb1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Visual({ variant, children, className }: VisualProps) {
  return (
    <div className={cx(bem('visual', { variant }), className)}>
      {variant === 'folder' ? <FolderIcon /> : children}
    </div>
  );
}

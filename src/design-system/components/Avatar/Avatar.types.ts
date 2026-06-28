import type { ReactNode } from 'react';

export type AvatarSize = 24 | 32 | 48 | 64;

export type AvatarTint = 'red' | 'yellow' | 'green' | 'blue';

export interface AvatarProps {
  size: AvatarSize;
  /** true wenn der Avatar Teil einer AvatarGroup ist (weisser Rand). Wird von AvatarGroup automatisch gesetzt. */
  grouped?: boolean;
  src?: string;
  alt?: string;
  /** Initialen (z.B. "JD"), gerendert wenn kein src gesetzt ist. */
  initials?: string;
  /** Faerbt den Kreis-Hintergrund mit dem weichen Farbton und die Initialen mit dem
   * dazugehoerigen kraeftigeren Farbton aus tokens.css (--color-{tint}-soft/-vivid). */
  tint?: AvatarTint;
  /** Fallback-Inhalt (z.B. Icon) wenn weder src noch initials gesetzt sind. */
  children?: ReactNode;
  className?: string;
}

export interface AvatarGroupProps {
  size: AvatarSize;
  children: ReactNode;
  className?: string;
}

export interface PhotoAlbum {
  /** e.g. "All", "Shared Albums", or a specific album name */
  title: string;
  count: number;
  /** "photo:<filename>" | "placeholder:<color>" — resolved by the renderer like any other `src` */
  src: string;
  /** Opens this album, e.g. in PhotosScreen (Step 8). Optional — a card without one is non-interactive. */
  onClick?: () => void;
}

export interface RecentPhoto {
  /** "photo:<filename>" | "placeholder:<color>" */
  src: string;
}

export interface PhotosProps {
  /** First card is always "All"; any further cards are shared albums. */
  albums: PhotoAlbum[];
  /** Most-recent-first. First 4 render as plain tiles; a 5th (if present) becomes the blurred "+N" overflow tile. */
  recentPhotos: RecentPhoto[];
  /** Total size of the recently-added pool — drives the "+N" overflow badge (recentTotal - 4). */
  recentTotal: number;
  /** First name of whoever added the most recent photo, e.g. "Felix". */
  sharedBy: string;
  className?: string;
}

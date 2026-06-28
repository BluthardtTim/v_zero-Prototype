export interface NoteItem {
  text: string;
  checked?: boolean;
}

export type NoteSize = 'large' | 'small';

export interface NoteProps {
  size: NoteSize;
  headline?: string;
  body: string;
  items?: NoteItem[];
  className?: string;
}

export interface InputProps {
  state: 'active' | 'filled' | 'placeholder' | 'disrubted';
  /** Reserviert Platz fuer ein Icon, das die aufrufende Komponente daneben/darueber positioniert. */
  showIcon?: boolean;
  /** Reserviert Platz fuer einen Close-Button, der die aufrufende Komponente daneben/darueber positioniert. */
  showClose?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

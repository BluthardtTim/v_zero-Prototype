export interface RadioProps {
  selected: boolean;
  label?: string;
  onChange?: (selected: boolean) => void;
  className?: string;
}

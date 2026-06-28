export interface ToggleProps {
  active: boolean;
  label?: string;
  onChange?: (active: boolean) => void;
  className?: string;
}

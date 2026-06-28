export interface ToggleButtonProps {
  selected: boolean;
  value: string;
  discription?: string;
  trailing?: string;
  state?: 'default' | 'disabled';
  onSelect?: () => void;
  className?: string;
}

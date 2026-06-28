export interface SelectionButtonProps {
  label: string;
  discriptor?: string;
  checked: boolean;
  state?: 'default' | 'disabled';
  onClick?: () => void;
  className?: string;
}

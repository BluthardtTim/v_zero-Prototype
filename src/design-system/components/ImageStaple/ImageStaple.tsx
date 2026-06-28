import { Children } from 'react';
import { bem, cx } from '../../utils/bem';
import type { ImageStapleProps } from './ImageStaple.types';

function amountModifier(count: number): string {
  if (count === 3) return '3';
  if (count >= 4) return '4';
  return 'default';
}

export function ImageStaple({ children, button, className }: ImageStapleProps) {
  const visible = Children.toArray(children).slice(0, 5);
  return (
    <div className={cx(bem('image-staple', { amount: amountModifier(visible.length) }), className)}>
      {visible}
      {button}
    </div>
  );
}

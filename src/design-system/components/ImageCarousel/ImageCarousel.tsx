import { bem, cx } from '../../utils/bem';
import type { ImageCarouselProps } from './ImageCarousel.types';

export function ImageCarousel({ layout, children, className }: ImageCarouselProps) {
  return <div className={cx(bem('image-carousell', { layout }), className)}>{children}</div>;
}

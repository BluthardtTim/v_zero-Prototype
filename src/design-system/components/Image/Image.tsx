import { bem, cx } from '../../utils/bem';
import type { ImageProps } from './Image.types';

export function Image({ size = 'default', avatar, src, alt = '', className }: ImageProps) {
  return (
    <div className={cx(bem('image', { size, avatar: avatar ? 'true' : undefined }), className)}>
      <img className="pebble-image__photo" src={src} alt={alt} />
    </div>
  );
}

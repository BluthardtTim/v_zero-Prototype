import { bem, cx } from '../../utils/bem';
import type { DocumentCardProps } from './DocumentCard.types';

export function DocumentCard({ variant, image, description, className }: DocumentCardProps) {
  return (
    <div
      className={cx(
        bem('document_card', { variant, discription: description ? 'true' : 'false' }),
        className,
      )}
    >
      {image}
      {description && <span>{description}</span>}
    </div>
  );
}

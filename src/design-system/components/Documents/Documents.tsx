import { useState } from 'react';
import { CaretRight, Funnel } from '@phosphor-icons/react';
import { bem, cx } from '../../utils/bem';
import { SegmentedPicker, SegmentedPickerOption } from '../SegmentedPicker';
import type { DocumentsProps } from './Documents.types';

export function Documents({ documents, visibleCount = 3, seeAllLabel = 'See all', className }: DocumentsProps) {
  const [tab, setTab] = useState<'shared' | 'private'>('shared');
  const [expanded, setExpanded] = useState(false);

  const filtered = documents.filter((doc) => (doc.visibility ?? 'shared') === tab);
  const visible = expanded ? filtered : filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <div className={cx(bem('documents'), className)}>
      <SegmentedPicker trailingIcon={<Funnel size={24} weight="regular" />}>
        <SegmentedPickerOption selected={tab === 'shared'} label="Shared" onClick={() => setTab('shared')} />
        <SegmentedPickerOption selected={tab === 'private'} label="Private" onClick={() => setTab('private')} />
      </SegmentedPicker>

      <div className="pebble-documents__list">
        {visible.length === 0 && <p className="pebble-documents__empty">No {tab} documents</p>}
        {visible.map((doc, index) => (
          <div className="pebble-documents__row" key={index}>
            <div className="pebble-documents__row-icon">
              <span>{doc.fileType ?? 'pdf'}</span>
            </div>
            <div className="pebble-documents__row-text">
              <span className="pebble-documents__row-title">{doc.title}</span>
              <span className="pebble-documents__row-subtitle">{doc.subtitle}</span>
            </div>
            <span className="pebble-documents__row-date">{doc.date}</span>
          </div>
        ))}
      </div>

      {hasMore && !expanded && (
        <button type="button" className="pebble-documents__see-all" onClick={() => setExpanded(true)}>
          <span>{seeAllLabel}</span>
          <CaretRight size={16} weight="regular" />
        </button>
      )}
    </div>
  );
}

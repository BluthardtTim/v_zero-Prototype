import { useState } from "react"
import { CaretLeft, Plus } from "@phosphor-icons/react"
import { SegmentedPicker, SegmentedPickerOption } from "../design-system"

export interface PhotosScreenPhoto {
  src: string
}

export interface PhotosScreenGroup {
  /** Tab label, e.g. "All" | "Group Pictures" */
  label: string
  photos: PhotosScreenPhoto[]
}

export interface PhotosScreenProps {
  title?: string
  groups: PhotosScreenGroup[]
  onBack?: () => void
}

export function PhotosScreen({ title = "Images", groups, onBack }: PhotosScreenProps) {
  const [tab, setTab] = useState(0)
  const active = groups[tab] ?? groups[0]

  return (
    <div className="screen-photos">
      <div className="screen-photos__header">
        <button className="screen-photos__back" onClick={onBack} aria-label="Back">
          <CaretLeft size={24} weight="regular" color="#0D0D0C" />
        </button>
        <span className="screen-photos__title">{title}</span>
      </div>

      <SegmentedPicker className="screen-photos__tabs">
        {groups.map((group, index) => (
          <SegmentedPickerOption
            key={index}
            selected={tab === index}
            label={group.label}
            onClick={() => setTab(index)}
          />
        ))}
      </SegmentedPicker>

      <div className="screen-photos__search">
        <span className="screen-photos__search-placeholder">| Search</span>
      </div>

      <div className="screen-photos__scroll">
        <div className="screen-photos__grid">
          {active?.photos.map((photo, index) => (
            <div className="screen-photos__tile" key={index}>
              <img src={photo.src} alt="" />
            </div>
          ))}
        </div>
      </div>

      <button className="screen-photos__add" aria-label="Add photo">
        <Plus size={24} weight="regular" color="#ffffff" />
      </button>
    </div>
  )
}

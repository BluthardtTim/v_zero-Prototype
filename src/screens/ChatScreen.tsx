import { Phone, VideoCamera, CaretLeft, Plus } from "@phosphor-icons/react"
import { Avatar, AvatarGroup } from "../design-system"

export interface ChatMessage {
  sender: string
  src?: string
  text: string
  isSelf?: boolean  // kept for compat — layout is identical for all senders
  time?: string
}

export interface ChatScreenAvatar {
  src: string
}

export interface ChatScreenProps {
  title: string
  subtitle?: string
  /** 1 entry = single real avatar (1-on-1 chat). 2+ entries = a small group cluster. Omit for a generic placeholder. */
  avatars?: ChatScreenAvatar[]
  messages?: ChatMessage[]
  onBack?: () => void
}

function PlaceholderGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="4.5" r="2.5" fill="#74BE8B" />
      <path d="M1 13c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#74BE8B" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function HeaderAvatar({ avatars }: { avatars?: ChatScreenAvatar[] }) {
  if (avatars && avatars.length > 1) {
    return (
      <AvatarGroup size={32} className="screen-chat__header-avatar-group">
        {avatars.slice(0, 4).map((a, i) => (
          <Avatar key={i} size={32} src={a.src} />
        ))}
      </AvatarGroup>
    )
  }

  return (
    <div className="screen-chat__header-avatar">
      {avatars?.[0]?.src ? <img src={avatars[0].src} alt="" /> : <PlaceholderGlyph />}
    </div>
  )
}

export function ChatScreen({ title, avatars, messages = [], onBack }: ChatScreenProps) {
  return (
    <div className="screen-chat">
      {/* ── Header ── */}
      <div className="screen-chat__header">
        <button className="screen-chat__back" onClick={onBack} aria-label="Back">
          <CaretLeft size={20} weight="bold" color="#0D0D0C" />
        </button>

        <div className="screen-chat__header-center">
          <HeaderAvatar avatars={avatars} />
          <span className="screen-chat__header-name">{title}</span>
        </div>

        <div className="screen-chat__header-actions">
          <button className="screen-chat__action-btn" aria-label="Call">
            <Phone size={18} weight="regular" color="#0D0D0C" />
          </button>
          <button className="screen-chat__action-btn" aria-label="Video">
            <VideoCamera size={18} weight="regular" color="#0D0D0C" />
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="screen-chat__messages">
        {messages.map((msg, i) => (
          <div key={i} className="screen-chat__row">
            <div className="screen-chat__avatar">
              {msg.src ? <img src={msg.src} alt={msg.sender} /> : <PlaceholderGlyph />}
            </div>
            <div className="screen-chat__content">
              <div className="screen-chat__meta">
                <span className="screen-chat__sender">{msg.sender}</span>
                {msg.time && <span className="screen-chat__time">{msg.time}</span>}
              </div>
              <p className="screen-chat__text">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Composer ── */}
      <div className="screen-chat__composer">
        <button className="screen-chat__composer-add" aria-label="Add attachment">
          <Plus size={18} weight="regular" color="#0D0D0C" />
        </button>
        <div className="screen-chat__composer-input">
          <span className="screen-chat__composer-placeholder">| Message</span>
        </div>
      </div>
    </div>
  )
}

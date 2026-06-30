import { Phone, VideoCamera, CaretLeft, Plus } from "@phosphor-icons/react"

export interface ChatMessage {
  sender: string
  src?: string
  text: string
  isSelf?: boolean  // kept for compat — layout is identical for all senders
  time?: string
}

export interface ChatScreenProps {
  title: string
  subtitle?: string
  messages?: ChatMessage[]
  onBack?: () => void
}

export function ChatScreen({ title, messages = [], onBack }: ChatScreenProps) {
  return (
    <div className="screen-chat">
      {/* ── Header ── */}
      <div className="screen-chat__header">
        <button className="screen-chat__back" onClick={onBack} aria-label="Back">
          <CaretLeft size={20} weight="bold" color="#0D0D0C" />
        </button>

        <div className="screen-chat__header-center">
          <div className="screen-chat__header-avatar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="4.5" r="2.5" fill="#74BE8B" />
              <path d="M1 13c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#74BE8B" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
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
              {msg.src
                ? <img src={msg.src} alt={msg.sender} />
                : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <circle cx="7" cy="4.5" r="2.5" fill="#74BE8B" />
                    <path d="M1 13c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#74BE8B" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
              }
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

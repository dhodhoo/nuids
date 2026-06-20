import { AiAvatar, UserAvatar } from './ChatAvatar'

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  const Avatar = isUser ? UserAvatar : AiAvatar
  const name = isUser ? 'Saya' : 'Nuids AI'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar />
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm text-gray-800 ${
          isUser ? 'bg-white rounded-br-sm' : 'bg-white rounded-bl-sm'
        }`}
      >
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-1.5">
          {name}
        </div>
        {message.text.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  )
}

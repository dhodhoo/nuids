import { useState } from 'react'

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('')

  function handleSend() {
    const text = input.trim()
    if (!text) return
    onSend(text)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="px-4 py-3 bg-bg-app border-t border-gray-100">
      <div className="flex items-center bg-[#EBF1F2] rounded-full px-4 py-2.5 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tulis pesan ..."
          className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-text-muted"
        />
        <button
          onClick={handleSend}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:opacity-85 transition-opacity"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

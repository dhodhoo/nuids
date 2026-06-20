import { useNavigate, useLocation } from 'react-router-dom'

export default function FabAI() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAiChat = location.pathname === '/ai-chat'

  if (isAiChat) return null

  return (
    <button
      onClick={() => navigate('/ai-chat')}
      className="
        fixed bottom-24 right-4 z-30
        w-14 h-14 rounded-full
        bg-gradient-to-br from-primary to-[#3a7fb5]
        text-white shadow-[0_4px_16px_rgba(88,165,218,0.5)]
        flex items-center justify-center
        hover:scale-105 active:scale-95 transition-transform
      "
      aria-label="AI Konsultasi"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
        <path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z" opacity="0.7"/>
        <path d="M5 13l.75 2.25L8 16l-2.25.75L5 19l-.75-2.25L2 16l2.25-.75L5 13z" opacity="0.5"/>
      </svg>
    </button>
  )
}

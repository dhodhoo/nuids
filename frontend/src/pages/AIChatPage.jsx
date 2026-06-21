import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import PageShell from '../components/layout/PageShell'
import PageHeader from '../components/layout/PageHeader'
import BottomNav from '../components/layout/BottomNav'
import ChatBubble from '../components/chat/ChatBubble'
import ChatInput from '../components/chat/ChatInput'

const SYSTEM_PROMPT = `Kamu adalah asisten konsultasi pertumbuhan anak. Jawab dalam Bahasa Indonesia yang sederhana, jelas, dan empatik.

ATURAN:
1. Jangan menulis "anak pasti stunting" atau kalimat diagnosis final
2. Jangan menggantikan konsultasi tenaga kesehatan
3. Jangan menyarankan obat, suplemen, atau tindakan medis
4. Jika user menyebut kondisi serius, sarankan konsultasi ke tenaga kesehatan`

async function callAi(conversation) {
  const res = await fetch('/backend/api/chat/custom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + api.getToken() },
    body: JSON.stringify({ systemPrompt: SYSTEM_PROMPT, conversation }),
  })
  const json = await res.json()
  if (!json.success || !json.data?.reply) throw new Error(json.message || 'AI gagal merespon')
  return json.data.reply
}

export default function AIChatPage() {
  const { child } = useApp()
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [historyMessages, setHistoryMessages] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  function startNewChat() {
    setMessages([])
    setShowHistory(false)
  }

  /**
   * recoverChat()
   * Saat user klik salah satu riwayat chat, muat semua pesan
   * ke dalam chat aktif agar bisa melanjutkan percakapan.
   */
  function recoverChat() {
    setMessages(historyMessages)
    setShowHistory(false)
  }

  async function openHistory() {
    if (!child) return
    setLoadingHistory(true)
    setShowHistory(true)
    try {
      const data = await api.chat.list(child.id)
      setHistoryMessages(data || [])
    } catch (err) {
      console.warn('Gagal muat history:', err)
    } finally {
      setLoadingHistory(false)
    }
  }

  async function handleSend(text) {
    if (!child || sending) return

    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setSending(true)

    try {
      await api.chat.send({ child_id: child.id, role: 'user', message: text })

      const allMessages = [...messages, userMsg]
      const replyText = await callAi(allMessages.map((m) => ({ role: m.role, text: m.text })))

      const saved = await api.chat.send({ child_id: child.id, role: 'ai', message: replyText })
      setMessages((prev) => [...prev, saved])
    } catch (err) {
      console.warn('AI error:', err)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <PageShell>
      <PageHeader title="Nuids AI" subtitle="Asisten pertumbuhan anak" showBack />

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Tombol History / New Chat */}
        <div className="flex gap-2">
          <button onClick={openHistory}
            className="text-[12px] text-primary font-semibold border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all">
            ☰ Riwayat Chat
          </button>
          {messages.length > 0 && (
            <button onClick={startNewChat}
              className="text-[12px] text-primary font-semibold border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all">
              + Chat Baru
            </button>
          )}
        </div>

        {/* Riwayat — tampilkan chat lama */}
        {showHistory && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[14px] font-bold text-gray-900">Riwayat Chat</h3>
              <button onClick={() => setShowHistory(false)} className="text-[12px] text-primary">Tutup</button>
            </div>
            {loadingHistory ? (
              <p className="text-[13px] text-text-muted">Memuat...</p>
            ) : historyMessages.length === 0 ? (
              <p className="text-[13px] text-text-muted">Belum ada riwayat chat.</p>
            ) : (
              historyMessages.slice().reverse().slice(0, 50).map((m) => (
                <div key={m.id} onClick={recoverChat} className="mb-2 pb-2 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                  <span className="text-[10px] font-bold uppercase text-text-muted">{m.role === 'user' ? 'Saya' : 'AI'}</span>
                  <p className="text-[13px] text-gray-800 truncate">{m.text}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Chat aktif */}
        {messages.length === 0 && !showHistory ? (
          <p className="text-center text-text-muted text-[13px] mt-8">Belum ada pesan. Mulai bertanya!</p>
        ) : (
          !showHistory && messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
        )}

        {sending && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#72998D" strokeWidth="1.5" className="w-4 h-4">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              </svg>
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <span className="text-[13px] text-text-muted animate-pulse">Mengetik...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 sticky bottom-0">
        <ChatInput onSend={handleSend} />
        <BottomNav />
      </div>
    </PageShell>
  )
}

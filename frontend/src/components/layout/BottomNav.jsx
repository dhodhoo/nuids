/**
 * BottomNav — Navigasi bawah (Home, Riwayat, Tracker, Profil)
 *
 * Selalu muncul di bagian bawah layar.
 * Tombol yang aktif (sesuai halaman saat ini) warnanya lebih terang.
 * Tombol FAB AI (tombol bulat "bintang") untuk akses cepat ke /ai-chat.
 */

import { useNavigate, useLocation } from 'react-router-dom'
import FabAI from './FabAI'

// Daftar menu navigasi bawah
const navItems = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    label: 'Riwayat',
    path: '/history',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
      </svg>
    ),
  },
  {
    label: 'Tracker',
    path: '/tracking',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z" />
      </svg>
    ),
  },
  {
    label: 'Profil',
    path: '/profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {/* Tombol FAB AI — tombol bulat pojok kanan bawah */}
      <FabAI />

      {/* Navigasi bawah */}
      <nav className="sticky bottom-0 z-10 bg-nav-bg border-t border-gray-100 pt-2.5 pb-5 flex justify-around items-center flex-shrink-0">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-opacity ${
                isActive ? 'opacity-100' : 'opacity-40'
              } hover:opacity-70`}
            >
              {/* Icon (SVG) */}
              <span className={isActive ? 'text-primary' : 'text-text-muted'}>
                {item.icon}
              </span>
              {/* Label teks */}
              <span className={`text-[10px] font-semibold tracking-wide ${
                isActive ? 'text-primary' : 'text-text-muted'
              }`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}

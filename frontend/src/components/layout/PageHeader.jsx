/**
 * PageHeader — Header standar untuk setiap halaman
 *
 * Menampilkan logo Nuids + judul halaman + subtitle.
 * Kalau showBack=true, tampilkan tombol panah kembali.
 *
 * Props:
 *   title    — Judul besar (contoh: "Nuids")
 *   subtitle — Teks kecil di bawah judul (contoh: "Dashboard")
 *   showBack — true/false, tampilkan tombol panah kembali
 */

import { useNavigate } from 'react-router-dom'
import NuidsLogo from '../ui/NuidsLogo'

export default function PageHeader({ title, subtitle, showBack = false }) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-20 bg-header-bg border-b border-gray-100 px-4 pt-6 pb-4 flex items-center gap-3">
      {/* Tombol kembali (←) — hanya muncul kalau showBack true */}
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-text-muted"
        >
          ←
        </button>
      )}

      {/* Logo Nuids */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center">
        <NuidsLogo className="w-8 h-8" />
      </div>

      {/* Judul + subtitle */}
      <div>
        <div className="text-[16px] font-bold text-gray-900">{title}</div>
        {subtitle && <div className="text-xs text-text-muted">{subtitle}</div>}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import PageShell from '../components/layout/PageShell'
import PageHeader from '../components/layout/PageHeader'

export default function ConsentPage() {
  const navigate = useNavigate()
  const { giveConsent } = useApp()
  const [checked, setChecked] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleContinue() {
    if (!checked || saving) return
    setSaving(true)
    try {
      await api.auth.consent()
    } catch {}
    giveConsent()
    navigate('/input-data-awal')
  }

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Persetujuan Medis" showBack />
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        <h1 className="text-[20px] font-bold text-gray-900">
          Persetujuan Penggunaan
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚕️</span>
            <h2 className="text-[15px] font-bold text-gray-900">Disclaimer Medis</h2>
          </div>
          <p className="text-[13px] text-gray-700 leading-relaxed">
            <strong>Nuids adalah sistem pendukung pencegahan dini.</strong> Hasil
            pemantauan tidak menggantikan diagnosis atau konsultasi dengan tenaga
            kesehatan.
          </p>
          <p className="text-[13px] text-text-muted leading-relaxed">
            Status pertumbuhan dihitung berdasarkan standar WHO dan Permenkes.
            Nuids tidak memberikan diagnosis medis, rekomendasi obat, atau tindakan
            medis apapun.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <h2 className="text-[15px] font-bold text-gray-900">Penggunaan Data</h2>
          </div>
          <ul className="text-[13px] text-gray-700 leading-relaxed list-disc list-inside flex flex-col gap-1.5">
            <li>Data anak hanya digunakan untuk memantau pertumbuhan</li>
            <li>Data tidak dibagikan ke pihak ketiga tanpa izin</li>
            <li>Anda dapat menghapus data kapan saja</li>
            <li>Data disimpan dengan enkripsi</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-primary rounded-xl p-4">
          <p className="text-[12px] text-gray-700 leading-relaxed">
            Status yang digunakan: <strong>Aman</strong>,{' '}
            <strong>Perlu Pemantauan</strong>, dan{' '}
            <strong>Perlu Konsultasi</strong> — bukan diagnosis medis.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 w-5 h-5 accent-primary flex-shrink-0"
          />
          <span className="text-[13px] text-gray-700 leading-relaxed">
            Saya telah membaca dan menyetujui disclaimer medis serta kebijakan
            penggunaan data di atas.
          </span>
        </label>
      </div>

      <div className="px-4 py-4 bg-bg-app border-t border-gray-100">
        <button
          onClick={handleContinue}
          disabled={!checked}
          className={`w-full h-[50px] rounded-full text-base font-bold transition-all ${
            checked
              ? 'bg-primary text-white hover:opacity-90 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Lanjutkan
        </button>
      </div>
    </PageShell>
  )
}

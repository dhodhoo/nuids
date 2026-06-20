import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import PageShell from '../components/layout/PageShell'
import PageHeader from '../components/layout/PageHeader'
import BottomNav from '../components/layout/BottomNav'
import GrowthChart from '../components/tracking/GrowthChart'

export default function TrackingPage() {
  const navigate = useNavigate()
  const { child } = useApp()
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [metric, setMetric] = useState('wfa')

  useEffect(() => {
    if (child) {
      api.growthChart.get(child.id)
        .then(setChartData)
        .catch((err) => console.warn('Gagal memuat grafik:', err))
        .finally(() => setLoading(false))
    }
  }, [child])

  const latestStatus = chartData?.latestStatus
  const activeData = metric === 'wfa' ? chartData?.wfa : chartData?.hfa

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Monitoring Perkembangan" />
      <div className="flex-1 overflow-y-auto pb-4">
        <h1 className="px-4 pt-5 pb-4 text-[22px] font-bold text-gray-900">
          Monitoring Perkembangan Anak
        </h1>

        <section className="mx-3.5 mb-7 bg-white rounded-[28px] shadow-[0_3px_8px_rgba(0,0,0,0.12)] p-[18px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#58A5DA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="3,17 9,11 13,15 21,7" />
                <polyline points="14,7 21,7 21,14" />
              </svg>
              <span className="text-[18px] font-bold text-gray-900">Grafik Pertumbuhan</span>
            </div>
            <div className="flex bg-[#E0E0E0] rounded-lg overflow-hidden">
              <button onClick={() => setMetric('wfa')} className={`px-3 py-1.5 text-[12px] font-bold transition-all ${metric === 'wfa' ? 'bg-primary text-white' : 'text-text-muted'}`}>Berat</button>
              <button onClick={() => setMetric('hfa')} className={`px-3 py-1.5 text-[12px] font-bold transition-all ${metric === 'hfa' ? 'bg-primary text-white' : 'text-text-muted'}`}>Tinggi</button>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-text-muted text-[13px] py-8">Memuat grafik...</p>
          ) : !activeData ? (
            <p className="text-center text-text-muted text-[13px] py-8">Data belum tersedia. Lakukan input mingguan terlebih dahulu.</p>
          ) : (
            <GrowthChart chartData={activeData} metric={metric} />
          )}

          {latestStatus && (
            <div className="mt-4 flex items-center gap-2 text-[14px]">
              <span className="text-text-muted">Status:</span>
              <span className="font-bold" style={{ color: latestStatus.status === 'aman' ? '#4CAF50' : latestStatus.status === 'pantau' ? '#FFB300' : '#EA6A6A' }}>
                {latestStatus.label}
              </span>
              <span className="text-text-muted text-[12px]">(Z-score: {latestStatus.zScore})</span>
            </div>
          )}
        </section>

        <div className="flex items-center gap-3 px-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="#A6CFC2" className="w-5 h-5">
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM18.5 16l.75 2.25L21.5 19l-2.25.75L18.5 22l-.75-2.25L15.5 19l2.25-.75L18.5 16zM5.5 16l.75 2.25L8.5 19l-2.25.75L5.5 22l-.75-2.25L2.5 19l2.25-.75L5.5 16z" />
            </svg>
          </div>
          <h2 className="text-[20px] font-bold text-gray-900">Analisis Cerdas Nuids</h2>
        </div>

        <section className="mx-3.5 bg-white rounded-[20px] border border-[#CFE0EC] p-5 mb-6">
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            Berdasarkan grafik pertumbuhan {child?.name} (usia {chartData?.childAge || '-'} bulan),
            {latestStatus?.status === 'aman'
              ? ' data berada dalam rentang normal. Lanjutkan pemantauan rutin.'
              : latestStatus?.status === 'pantau'
                ? ' terlihat sedikit melambat. Periksa asupan gizi dan tingkatkan frekuensi makan.'
                : ' perlu konsultasi dengan tenaga kesehatan untuk evaluasi lebih lanjut.'}
          </p>

          <div className="bg-[#DCEAF5] rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="w-4 h-4 flex-shrink-0 mt-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#0A6CB6]">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <p className="text-[14px] leading-relaxed text-[#444]">
                Standar acuan: WHO Child Growth Standards. Nilai Z-score dihitung berdasarkan perbandingan data anak dengan populasi referensi sehat.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-3.5 mb-3">
          <button onClick={() => navigate('/meal-planner')} className="w-full h-[54px] border-none rounded-2xl bg-[#648C81] text-white text-[17px] font-bold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer">
            📖 LIHAT REKOMENDASI MENU
          </button>
        </div>
        <p className="px-5 pb-6 italic font-semibold text-[#555] text-[13px]">
          *Analisis ini bukan pengganti diagnosis medis resmi.
        </p>
      </div>
      <BottomNav />
    </PageShell>
  )
}

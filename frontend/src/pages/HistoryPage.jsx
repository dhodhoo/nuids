import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import PageShell from '../components/layout/PageShell'
import PageHeader from '../components/layout/PageHeader'
import BottomNav from '../components/layout/BottomNav'
import TimelineItem from '../components/history/TimelineItem'
import StatusBadge from '../components/ui/StatusBadge'
import { getStatusConfig } from '../data/statusConfig'

function TableView({ checkups }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-gray-200">
            {['Minggu', 'Tanggal', 'Berat', 'Tinggi', 'Z-Score', 'Status'].map((h) => (
              <th key={h} className="text-left text-text-muted font-bold pb-2 pr-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {checkups.map((c) => {
            const cfg = getStatusConfig(c.status)
            const d = new Date(c.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            })
            return (
              <tr key={c.id} className="border-b border-gray-100">
                <td className="py-2.5 pr-3 font-bold">{c.week}</td>
                <td className="py-2.5 pr-3">{d}</td>
                <td className="py-2.5 pr-3 font-bold">{c.weight}kg</td>
                <td className="py-2.5 pr-3 font-bold">{c.height}cm</td>
                <td className="py-2.5 pr-3 text-[12px] text-text-muted">{c.zScore ?? '-'}</td>
                <td className="py-2.5">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function HistoryPage() {
  const { checkups, child, setCheckups } = useApp()
  const [tab, setTab] = useState('timeline')

  useEffect(() => {
    if (child) {
      api.checkups.analyze(child.id)
        .then(setCheckups)
        .catch((err) => console.warn('Gagal memuat riwayat:', err))
    }
  }, [child])

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Riwayat Pertumbuhan" />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[18px] font-bold text-gray-900">
            Riwayat {child?.name}
          </h1>
        </div>

        <div className="flex bg-[#D7E6F1] rounded-xl overflow-hidden mb-5">
          {['timeline', 'tabel'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 h-[38px] text-[14px] font-semibold transition-all capitalize ${
                tab === t
                  ? 'bg-white text-green font-bold rounded-xl'
                  : 'text-text-muted'
              }`}
            >
              {t === 'timeline' ? 'Timeline' : 'Tabel'}
            </button>
          ))}
        </div>

        {tab === 'timeline' &&
          checkups.map((c, i) => (
            <TimelineItem
              key={c.id}
              checkup={c}
              isLast={i === checkups.length - 1}
            />
          ))}

        {tab === 'tabel' && <TableView checkups={checkups} />}
      </div>
      <BottomNav />
    </PageShell>
  )
}

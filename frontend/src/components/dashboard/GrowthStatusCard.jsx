import { getStatusConfig } from '../../data/statusConfig'

const descriptions = {
  aman: 'tinggi dan berat badan {name} berada dalam rentang optimal WHO. Lanjutkan pemantauan rutin.',
  pantau: 'tren pertumbuhan {name} menunjukkan perlambatan. Periksa asupan gizi dan tingkatkan frekuensi makan.',
  konsultasi: '{name} perlu evaluasi lebih lanjut. Disarankan segera konsultasi dengan tenaga kesehatan.',
}

export default function GrowthStatusCard({ status, childName, week }) {
  const cfg = getStatusConfig(status)
  const desc = (descriptions[status] || descriptions.aman).replace('{name}', childName)

  return (
    <section className="mx-5 mb-4 bg-[#FAFAF8] rounded-[28px] p-[18px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2.5 font-bold text-gray-900">
          <svg viewBox="0 0 24 24" fill="none" stroke="#58A5DA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="3,17 9,11 13,15 21,7" />
            <polyline points="14,7 21,7 21,14" />
          </svg>
          Status Pertumbuhan
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: cfg.color + '22' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: cfg.color }}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
      </div>
      <div className="text-[18px] font-bold text-gray-900 mb-3">
        Status Anak: <span style={{ color: cfg.color }}>{cfg.label}</span>
      </div>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        Berdasarkan data minggu ke-{week}, {desc}
      </p>
    </section>
  )
}

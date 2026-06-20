import { getStatusConfig } from '../../data/statusConfig'
import StatusBadge from '../ui/StatusBadge'

export default function TimelineItem({ checkup, isLast }) {
  const cfg = getStatusConfig(checkup.status)
  const dateStr = new Date(checkup.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  function renderIcon(cfg) {
    if (checkup.status === 'aman') {
      return (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      )
    }
    if (checkup.status === 'pantau') {
      return (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    )
  }

  return (
    <div className="flex gap-3 mb-5 relative">
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-[-20px] w-0.5 bg-[#D7D7D7]" />
      )}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ background: cfg.color }}
      >
        {renderIcon(cfg)}
      </div>
      <div
        className="flex-1 bg-white rounded-2xl p-4 shadow-sm"
        style={{ borderLeft: `4px solid ${cfg.color}` }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <StatusBadge status={checkup.status} />
          <div className="flex items-center gap-2">
            {checkup.zScore !== undefined && checkup.zScore !== null && (
              <span className="text-[11px] text-text-muted">Z: {checkup.zScore}</span>
            )}
            <span className="text-[12px] text-text-muted">{dateStr}</span>
          </div>
        </div>
        <div className="text-[20px] font-bold text-gray-900 mb-3">
          Minggu {checkup.week}
        </div>

        {checkup.status !== 'konsultasi' ? (
          <>
            <div className="flex gap-2.5 mb-3">
              <div className="flex-1 bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] tracking-widest text-gray-400 uppercase mb-1.5">Tinggi Badan</div>
                <div className="text-[17px] font-bold text-[#256735]">
                  {checkup.height} <span className="text-[13px] font-normal">cm</span>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] tracking-widest text-gray-400 uppercase mb-1.5">Berat Badan</div>
                <div className="text-[17px] font-bold text-[#256735]">
                  {checkup.weight} <span className="text-[13px] font-normal">kg</span>
                </div>
              </div>
            </div>
            {checkup.notes && (
              <div className="text-[13px] italic text-gray-500 leading-relaxed">
                &ldquo;{checkup.notes}&rdquo;
              </div>
            )}
            {checkup.status === 'pantau' && (
              <button className="w-full h-9 mt-3 rounded-lg bg-[#D5E6F2] text-primary text-[13px] font-semibold">
                ⓘ Lihat Detail Pantauan
              </button>
            )}
          </>
        ) : (
          <>
            <div className="text-[13px] text-gray-600 leading-relaxed mb-3.5">
              {checkup.notes || 'Berat badan menurun. Disarankan konsultasi dengan bidan/dokter.'}
            </div>
            <button className="w-full h-10 rounded-lg bg-[#EA6A6A] text-white text-[13px] font-bold">
              Hubungi Layanan Kesehatan
            </button>
          </>
        )}
      </div>
    </div>
  )
}

import { ALERGI_LIST, TEKSTUR_LIST } from '../../data/onboardingConfig'
import ToggleChip from '../ui/ToggleChip'

function RadioOption({ selected, onClick, label, desc }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border-[1.5px] transition-all ${
        selected ? 'border-primary bg-blue-50' : 'border-[#C0C9BB] bg-[#E0E0E0]'
      }`}
    >
      <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        selected ? 'border-primary' : 'border-gray-400'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <div className="text-left">
        <div className="text-[14px] font-bold text-gray-900">{label}</div>
        <div className="text-[12px] text-text-muted">{desc}</div>
      </div>
    </button>
  )
}

export default function StepAllergies({ alergi, onToggleAlergi, alergiLain, onAlergiLainChange, tekstur, onTeksturChange }) {
  const labelClass = 'block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2'

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
        <label className={labelClass}>Pilih Alergi yang Dimiliki Anak</label>
        <p className="text-[11px] text-text-muted mb-3">Opsional — untuk meal planner yang aman</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {ALERGI_LIST.map((item) => (
            <ToggleChip key={item} selected={alergi.includes(item)} onClick={() => onToggleAlergi(item)}>
              {item}
            </ToggleChip>
          ))}
        </div>
        <label className={labelClass}>Alergi Lainnya</label>
        <input type="text" value={alergiLain} onChange={(e) => onAlergiLainChange(e.target.value)} placeholder="Contoh: mangga, udang ..." className="w-full h-[50px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] px-3.5 text-[14px] outline-none" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
        <label className={labelClass}>Tekstur Makanan yang Disukai Anak</label>
        <p className="text-[11px] text-text-muted mb-3">Opsional — untuk rekomendasi penyajian</p>
        <div className="flex flex-col gap-2.5">
          {TEKSTUR_LIST.map((item) => (
            <RadioOption
              key={item.value}
              selected={tekstur === item.value}
              onClick={() => onTeksturChange(item.value)}
              label={item.label}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </>
  )
}

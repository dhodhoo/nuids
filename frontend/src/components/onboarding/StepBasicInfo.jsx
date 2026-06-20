import { ALERGI_LIST, TEKSTUR_LIST } from '../../data/onboardingConfig'
import ToggleChip from '../ui/ToggleChip'

export default function StepBasicInfo({ nama, onNamaChange, tanggalLahir, onTanggalLahirChange, gender, onGenderChange, beratLahir, onBeratLahirChange, tinggiLahir, onTinggiLahirChange }) {
  const labelClass = 'block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2'
  const inputClass = 'w-full h-[50px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] px-3.5 text-[15px] outline-none'

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
        <label className={labelClass}>Nama Lengkap Anak</label>
        <input type="text" value={nama} onChange={(e) => onNamaChange(e.target.value)} placeholder="Masukkan nama anak" className={inputClass} />
      </div>

      <div className="flex gap-3 mb-3">
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
          <label className={labelClass}>Tanggal Lahir</label>
          <input type="date" value={tanggalLahir} onChange={(e) => onTanggalLahirChange(e.target.value)} className="w-full h-[46px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] px-3 text-[14px] outline-none" />
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
          <label className={labelClass}>Jenis Kelamin</label>
          <select value={gender} onChange={(e) => onGenderChange(e.target.value)} className="w-full h-[46px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] px-3 text-[14px] outline-none">
            <option value="female">Perempuan</option>
            <option value="male">Laki-laki</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
        <div className="flex items-center gap-2 mb-4">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#00450D]">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h4v4h2V5h2v4h2V5h4v14z" />
          </svg>
          <h2 className="text-[15px] font-bold text-gray-900">Data Kelahiran</h2>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className={labelClass}>Berat Badan Lahir (kg)</label>
            <div className="relative">
              <input type="number" step="any" value={beratLahir} onChange={(e) => onBeratLahirChange(e.target.value)} className={`${inputClass} pr-12`} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">kg</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>Tinggi Badan Lahir (cm)</label>
            <div className="relative">
              <input type="number" step="any" value={tinggiLahir} onChange={(e) => onTinggiLahirChange(e.target.value)} className={`${inputClass} pr-12`} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">cm</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

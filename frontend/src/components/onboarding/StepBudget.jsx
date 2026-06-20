import { BAHAN_LIST } from '../../data/onboardingConfig'
import BudgetSelector from '../ui/BudgetSelector'
import ToggleChip from '../ui/ToggleChip'

export default function StepBudget({ budgetMode, onBudgetModeChange, budget, onBudgetChange, bahan, onToggleBahan, bahanLain, onBahanLainChange }) {
  const labelClass = 'block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2'

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
        <BudgetSelector
          label="Budget Makan Anak"
          budgetMode={budgetMode}
          budget={budget}
          onBudgetModeChange={onBudgetModeChange}
          onBudgetChange={onBudgetChange}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
        <h2 className="text-[15px] font-bold text-gray-900 mb-1">Bahan Tersedia di Rumah</h2>
        <p className="text-[11px] text-text-muted mb-3">Opsional — untuk menu yang realistis</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {BAHAN_LIST.map((item) => (
            <ToggleChip key={item} selected={bahan.includes(item)} onClick={() => onToggleBahan(item)}>
              {item}
            </ToggleChip>
          ))}
        </div>
        <label className={labelClass}>Bahan Lainnya</label>
        <input type="text" value={bahanLain} onChange={(e) => onBahanLainChange(e.target.value)} placeholder="Contoh: jagung, singkong ..." className="w-full h-[50px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] px-3.5 text-[14px] outline-none" />
      </div>

      <div className="bg-blue-50 border-l-4 border-primary rounded-xl p-4 mb-3">
        <p className="text-[12px] text-gray-700 leading-relaxed">
          Nuids adalah sistem pendukung pencegahan dini. Hasil pemantauan tidak menggantikan diagnosis atau konsultasi dengan tenaga kesehatan.
        </p>
      </div>
    </>
  )
}

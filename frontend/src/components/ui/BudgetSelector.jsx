import ToggleChip from './ToggleChip'
import { BUDGET_H, BUDGET_M } from '../../data/onboardingConfig'

export default function BudgetSelector({ budgetMode, budget, onBudgetModeChange, onBudgetChange, label }) {
  const budgetVals = budgetMode === 'harian' ? BUDGET_H : BUDGET_M
  const budgetLabels = budgetVals.map((v) => `Rp ${v.toLocaleString('id-ID')}`)

  return (
    <div>
      {label && (
        <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2.5">
          {label}
        </label>
      )}
      <div className="flex bg-[#E0E0E0] border border-[#C0C9BB] rounded-lg overflow-hidden mb-3">
        {['harian', 'mingguan'].map((m) => (
          <button
            key={m}
            onClick={() => {
              onBudgetModeChange(m)
              onBudgetChange(m === 'harian' ? 20000 : 140000)
            }}
            className={`flex-1 h-10 text-[13px] font-bold transition-all ${
              budgetMode === m ? 'bg-primary text-white rounded-lg' : 'text-text-muted'
            }`}
          >
            Per {m === 'harian' ? 'Hari' : 'Minggu'}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {budgetVals.map((val, i) => (
          <ToggleChip key={val} selected={budget === val} onClick={() => onBudgetChange(val)}>
            {budgetLabels[i]}
          </ToggleChip>
        ))}
      </div>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold">Rp</span>
        <input
          type="number"
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="w-full h-[50px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] pl-10 pr-3.5 text-[15px] outline-none"
        />
      </div>
    </div>
  )
}

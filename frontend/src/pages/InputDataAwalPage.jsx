import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import StepBasicInfo from '../components/onboarding/StepBasicInfo'
import StepAllergies from '../components/onboarding/StepAllergies'
import StepBudget from '../components/onboarding/StepBudget'

export default function InputDataAwalPage() {
  const navigate = useNavigate()
  const { setChild } = useApp()
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    nama: '',
    tanggalLahir: '',
    gender: '',
    beratLahir: '',
    tinggiLahir: '',
    alergi: [],
    alergiLain: '',
    tekstur: '',
    budgetMode: 'harian',
    budget: 0,
    bahan: [],
    bahanLain: '',
  })

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleAlergi(item) {
    setForm((prev) => ({
      ...prev,
      alergi: prev.alergi.includes(item)
        ? prev.alergi.filter((a) => a !== item)
        : [...prev.alergi, item],
    }))
  }

  function toggleBahan(item) {
    setForm((prev) => ({
      ...prev,
      bahan: prev.bahan.includes(item)
        ? prev.bahan.filter((b) => b !== item)
        : [...prev.bahan, item],
    }))
  }

  async function handleSave() {
    if (!form.nama || !form.tanggalLahir || !form.gender) {
      setError('Nama, tanggal lahir, dan jenis kelamin wajib diisi')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await api.children.create({
        name: form.nama,
        birthDate: form.tanggalLahir,
        gender: form.gender,
        birthWeight: parseFloat(form.beratLahir) || null,
        birthHeight: parseFloat(form.tinggiLahir) || null,
        allergies: form.alergi,
        texture: form.tekstur,
        budget: form.budget || 0,
        budgetMode: form.budgetMode,
        availableIngredients: form.bahan,
      })
      const children = await api.children.list()
      if (children?.length > 0) setChild(children[0])
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const progress = ['33.33%', '66.66%', '100%'][step - 1]
  const labels = ['Informasi Dasar', 'Alergi & Preferensi', 'Budget Makan']

  return (
    <div className="min-h-screen bg-bg-app flex flex-col">
      <div className="w-full max-w-[480px] mx-auto flex flex-col flex-1">
        <div className="bg-header-bg border-b border-gray-100 px-4 pt-6 pb-3 text-center">
          <div className="text-[18px] font-bold text-gray-900">Profile</div>
        </div>

        <div className="px-4 py-3 bg-bg-app border-b border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold tracking-widest text-text-muted uppercase">Langkah {step} dari 3</span>
            <span className="text-[13px] font-bold text-gray-900">{labels[step - 1]}</span>
          </div>
          <div className="w-full h-2 bg-[#E0E0E0] rounded">
            <div className="h-full bg-primary rounded transition-all duration-300" style={{ width: progress }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
          {step === 1 && (
            <StepBasicInfo
              nama={form.nama} onNamaChange={(v) => set('nama', v)}
              tanggalLahir={form.tanggalLahir} onTanggalLahirChange={(v) => set('tanggalLahir', v)}
              gender={form.gender} onGenderChange={(v) => set('gender', v)}
              beratLahir={form.beratLahir} onBeratLahirChange={(v) => set('beratLahir', v)}
              tinggiLahir={form.tinggiLahir} onTinggiLahirChange={(v) => set('tinggiLahir', v)}
            />
          )}
          {step === 2 && (
            <StepAllergies
              alergi={form.alergi} onToggleAlergi={toggleAlergi}
              alergiLain={form.alergiLain} onAlergiLainChange={(v) => set('alergiLain', v)}
              tekstur={form.tekstur} onTeksturChange={(v) => set('tekstur', v)}
            />
          )}
          {step === 3 && (
            <StepBudget
              budgetMode={form.budgetMode} onBudgetModeChange={(v) => set('budgetMode', v)}
              budget={form.budget} onBudgetChange={(v) => set('budget', v)}
              bahan={form.bahan} onToggleBahan={toggleBahan}
              bahanLain={form.bahanLain} onBahanLainChange={(v) => set('bahanLain', v)}
            />
          )}
        </div>

        <div className="px-4 py-3 bg-bg-app border-t border-gray-100">
          {error && <div className="mb-3 text-center"><span className="text-[13px] text-red-500 font-medium">{error}</span></div>}
          {step < 3 ? (
            <button onClick={() => { setError(''); setStep((s) => s + 1) }}
              className="w-full h-[52px] bg-primary text-white rounded-xl text-[16px] font-bold hover:opacity-90 active:scale-[0.98] transition-all">
              LANJUT
            </button>
          ) : (
            <button onClick={handleSave} disabled={submitting}
              className="w-full h-[52px] bg-primary text-white rounded-xl text-[16px] font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50">
              {submitting ? 'MENYIMPAN...' : 'SIMPAN & MULAI'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

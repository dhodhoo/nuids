import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import PageShell from '../components/layout/PageShell'
import PageHeader from '../components/layout/PageHeader'
import BottomNav from '../components/layout/BottomNav'

const schema = z.object({
  date: z.string().min(1, 'Tanggal wajib diisi'),
  height: z.coerce.number().min(40, 'Min 40cm').max(120, 'Max 120cm'),
  weight: z.coerce.number().min(2, 'Min 2kg').max(25, 'Max 25kg'),
  meal: z.string().min(1, 'Pilih pola makan'),
  condition: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

function OptionButton({ selected, onClick, children }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex-1 h-[68px] rounded-xl flex flex-col items-center justify-center gap-1.5 text-[13px] font-semibold transition-all ${
        selected ? 'bg-primary text-white' : 'bg-[#E0E0E0] text-gray-800'
      }`}>
      {children}
    </button>
  )
}

export default function WeeklyInputPage() {
  const navigate = useNavigate()
  const { addCheckup, child, checkups } = useApp()

  const nextWeek = checkups?.length > 0 ? Math.max(...checkups.map((c) => c.week)) + 1 : 1

  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      height: 75,
      weight: 9,
      meal: 'cukup',
      condition: ['sehat'],
      notes: '',
    },
  })

  const height = useWatch({ control, name: 'height' })
  const weight = useWatch({ control, name: 'weight' })
  const meal = useWatch({ control, name: 'meal' })
  const condition = useWatch({ control, name: 'condition' }) || []

  function toggleCondition(item) {
    setValue('condition', [item])
  }

  async function onSubmit(data) {
    if (!child) {
      setError('root', { message: 'Data anak belum tersedia' })
      return
    }
    try {
      await api.checkups.create({
        child_id: child.id,
        week: nextWeek,
        date: data.date,
        height: data.height,
        weight: data.weight,
        meal: data.meal,
        condition: data.condition,
        notes: data.notes,
      })
      const checkupsData = await api.checkups.list(child.id)
      addCheckup(checkupsData[0])
      navigate('/tracking')
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  const cardClass = 'bg-white rounded-2xl shadow-sm p-4 mb-3'
  const labelClass = 'block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2.5'

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Input Perkembangan Mingguan" showBack />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <h1 className="text-[20px] font-bold text-gray-900 mb-4">Input Perkembangan Mingguan</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${cardClass} border-l-4 border-green`}>
            <label className={labelClass}>Tanggal Pengukuran</label>
            <input type="date" {...register('date')}
              className="w-full h-[50px] rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] px-4 text-[15px] outline-none" />
            {errors.date && <p className="text-[12px] text-red-500 mt-1">{errors.date.message}</p>}
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-center mb-2.5">
              <span className={`${labelClass} mb-0`}>Tinggi Badan (cm)</span>
              <span className="text-[18px] font-bold text-gray-900">{height}</span>
            </div>
            <input type="range" min="40" max="120" {...register('height')}
              className="w-full accent-primary h-1.5 cursor-pointer" />
            <div className="flex justify-between mt-1.5 text-[11px] text-text-muted">
              <span>40cm</span><span>80cm</span><span>120cm</span>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-center mb-2.5">
              <span className={`${labelClass} mb-0`}>Berat Badan (kg)</span>
              <span className="text-[18px] font-bold text-gray-900">{weight}</span>
            </div>
            <input type="range" min="2" max="25" {...register('weight')}
              className="w-full accent-primary h-1.5 cursor-pointer" />
            <div className="flex justify-between mt-1.5 text-[11px] text-text-muted">
              <span>2kg</span><span>13kg</span><span>25kg</span>
            </div>
          </div>

          <div className={cardClass}>
            <label className={labelClass}>Pola Makan Minggu Ini</label>
            <div className="flex gap-3">
              {[
                { v: 'kurang', e: '🙁' },
                { v: 'cukup', e: '😐' },
                { v: 'baik', e: '🙂' },
              ].map((opt) => (
                <OptionButton key={opt.v} selected={meal === opt.v}
                  onClick={() => setValue('meal', opt.v)}>
                  <span className="text-2xl">{opt.e}</span>
                  <span className="capitalize">{opt.v}</span>
                </OptionButton>
              ))}
            </div>
            {errors.meal && <p className="text-[12px] text-red-500 mt-1">{errors.meal.message}</p>}
          </div>

          <div className={cardClass}>
            <label className={labelClass}>Kondisi Kesehatan</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: 'sehat', l: 'Sehat' },
                { v: 'sakit', l: 'Sakit' },
                { v: 'muntah', l: 'Muntah' },
                { v: 'diare', l: 'Diare' },
              ].map((opt) => (
                <button key={opt.v} type="button" onClick={() => toggleCondition(opt.v)}
                  className={`h-12 rounded-xl text-[13px] font-semibold transition-all ${
                    condition.includes(opt.v) ? 'bg-primary text-white' : 'bg-[#E0E0E0] text-gray-800'
                  }`}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <label className={labelClass}>Catatan Tambahan</label>
            <textarea {...register('notes')} placeholder="Contoh: Mulai tumbuh gigi, nafsu makan meningkat..."
              className="w-full h-24 rounded-lg bg-[#E0E0E0] border border-[#C0C9BB] p-3.5 text-[14px] outline-none resize-none placeholder:text-gray-400" />
          </div>

          {errors.root && (
            <div className="mb-3 text-center">
              <span className="text-[13px] text-red-500 font-medium">{errors.root.message}</span>
            </div>
          )}

          <button type="submit" disabled={isSubmitting}
            className="w-full h-[52px] rounded-full bg-primary text-white text-[16px] font-bold hover:opacity-90 active:scale-[0.98] transition-all mb-2 disabled:opacity-50">
            {isSubmitting ? 'Menyimpan...' : 'Analisis Pertumbuhan ↗'}
          </button>
        </form>

        <p className="text-center text-[12px] text-text-muted mb-4">
          Data Anda akan dianalisis menggunakan standar WHO.
        </p>
      </div>
      <BottomNav />
    </PageShell>
  )
}

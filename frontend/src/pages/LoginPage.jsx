import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import NuidsLogo from '../components/ui/NuidsLogo'

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useApp()

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    try {
      await login(data.email, data.password)
      const status = await api.auth.status()
      if (!status.hasConsent) navigate('/consent')
      else if (!status.hasChild) navigate('/input-data-awal')
      else navigate('/dashboard')
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  const inputClass = [
    'w-full h-[46px] rounded-full bg-white border-none',
    'text-sm text-slate-800 px-6 outline-none',
    'shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
    'focus:ring-2 focus:ring-primary placeholder:text-slate-400',
  ].join(' ')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, #C0E1D2 0%, #E5EEE4 51%, #F6F4E8 100%)' }}>
      <div className="w-full max-w-[480px] flex flex-col items-center px-8 py-8">
        <div className="flex flex-col items-center gap-3.5 mt-8">
          <NuidsLogo className="w-36 h-36" />
          <h1 className="text-[28px] font-bold text-primary tracking-wide">Nuids</h1>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-[22px] font-bold text-slate-800">Masuk</h2>
          <p className="mt-1.5 text-sm text-slate-500">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full flex flex-col gap-3.5">
          <div>
            <input type="email" placeholder="Email" {...register('email')} className={inputClass} />
            {errors.email && <p className="text-[12px] text-red-500 mt-1 px-4">{errors.email.message}</p>}
          </div>
          <div>
            <input type="password" placeholder="Kata Sandi" {...register('password')} className={inputClass} />
            {errors.password && <p className="text-[12px] text-red-500 mt-1 px-4">{errors.password.message}</p>}
          </div>
        </form>

        {errors.root && (
          <div className="mt-3 w-full text-center">
            <span className="text-[13px] text-red-500 font-medium">{errors.root.message}</span>
          </div>
        )}

        <div className="mt-8 w-full flex flex-col gap-4">
          <button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}
            className="w-full h-[46px] rounded-full bg-primary text-white text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50">
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
          <p className="text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <button type="button" onClick={() => navigate('/register')} className="text-primary font-semibold hover:underline">
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

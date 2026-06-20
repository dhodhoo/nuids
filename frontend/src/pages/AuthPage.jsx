import { useNavigate } from 'react-router-dom'
import NuidsLogo from '../components/ui/NuidsLogo'

export default function AuthPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #C0E1D2 0%, #E5EEE4 51%, #F6F4E8 100%)',
      }}
    >
      <div className="w-full max-w-[480px] flex flex-col items-center px-8 py-16 flex-1">
        {/* Brand */}
        <div className="flex flex-col items-center gap-5 mt-12">
          <NuidsLogo className="w-44 h-44" />
          <h1 className="text-[28px] font-bold text-primary tracking-wide">Nuids</h1>
        </div>

        {/* Actions */}
        <div className="mt-auto w-full flex flex-col gap-5 pb-8 pt-16">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full h-[46px] rounded-full bg-primary text-white text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full h-[46px] rounded-full bg-transparent text-primary border-[1.5px] border-primary text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Buat Akun
          </button>
        </div>
      </div>
    </div>
  )
}

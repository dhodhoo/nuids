import { useNavigate } from 'react-router-dom'

export default function ActionButtons() {
  const navigate = useNavigate()

  return (
    <section className="mx-5 mb-4 flex gap-3.5">
      <button
        onClick={() => navigate('/weekly-input')}
        className="flex-1 bg-[#6D9588] rounded-2xl text-white text-center py-6 px-2.5 hover:opacity-90 transition-opacity"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 mx-auto mb-3">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <div className="text-[14px] font-semibold">Input Minggu Ini</div>
      </button>
      <button
        onClick={() => navigate('/tracking')}
        className="flex-1 bg-primary rounded-2xl text-white text-center py-6 px-2.5 hover:opacity-90 transition-opacity"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 mx-auto mb-3">
          <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
        </svg>
        <div className="text-[14px] font-semibold">Hasil Pertumbuhan</div>
      </button>
    </section>
  )
}

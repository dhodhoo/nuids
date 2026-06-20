import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#f3f3f3] overflow-hidden">
        {/* Star top */}
        <div
          className="absolute text-[#9dc5e8] leading-none select-none pointer-events-none"
          style={{ fontSize: 170, top: -20, left: 95, transform: 'rotate(-18deg)' }}
        >
          ★
        </div>

        {/* Square */}
        <div
          className="absolute bg-[#ece5bd] rounded-[22px]"
          style={{ right: -20, top: 230, width: 220, height: 250, transform: 'rotate(-20deg)' }}
        />

        {/* Star mid */}
        <div
          className="absolute text-[#9dc5e8] leading-none select-none pointer-events-none"
          style={{ fontSize: 140, top: 355, left: 35 }}
        >
          ★
        </div>

        {/* Circle */}
        <div
          className="absolute rounded-full bg-[#ecdab9]"
          style={{ left: -30, bottom: 60, width: 250, height: 250 }}
        />

        {/* Hero text */}
        <div className="absolute" style={{ top: 140, left: 24 }}>
          <h1 className="text-[26px] leading-[1.35] text-gray-900">
            <span className="font-bold">Cegah</span>
            <br />
            Stunting pada anak
            <br />
            <span className="font-bold">sebelum terlambat</span>
          </h1>
        </div>

        {/* CTA text */}
        <div
          className="absolute text-[18px] leading-[1.5] text-right text-gray-800"
          style={{ right: 70, bottom: 125 }}
        >
          <div className="font-bold">Ayo</div>
          cegah bersama
          <br />
          <span className="font-bold">Nuids</span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate('/auth')}
          className="absolute bg-[#463b3b] text-white rounded-full text-[20px] font-bold px-8 py-3.5 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          style={{ right: 18, bottom: 40 }}
        >
          Mulai →
        </button>
      </div>
    </div>
  )
}

import { useApp } from '../../context/AppContext'

export default function TipSection({ status }) {
  const { child } = useApp()

  if (!child) return null

  const tips = {
    aman: `Si Kecil tumbuh dengan baik! Pastikan asupan protein hari ini tercukupi untuk mendukung perkembangan kognitifnya.`,
    pantau: `${child.name} perlu perhatian ekstra minggu ini. Tingkatkan frekuensi makan dan pastikan variasi gizinya.`,
    konsultasi: `Disarankan segera konsultasi dengan tenaga kesehatan untuk evaluasi pertumbuhan ${child.name}.`,
  }

  if (!status) return null

  const tip = tips[status] || tips.aman

  return (
    <section className="mx-5 mb-4 bg-[#C3D0CA] rounded-[30px] p-6 flex gap-4">
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[#0B5A1F]">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
        </svg>
      </div>
      <p className="text-[#0B5A1F] text-[16px] font-bold leading-relaxed flex-1">
        &ldquo;{tip}&rdquo;
      </p>
    </section>
  )
}

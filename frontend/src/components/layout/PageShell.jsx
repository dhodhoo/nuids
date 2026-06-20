/**
 * PageShell — Layout dasar setiap halaman
 *
 * Semua halaman dibungkus oleh komponen ini.
 * Fungsinya:
 * 1. Background warna bg-bg-app (abu-abu)
 * 2. Lebar maksimal 480px (seperti layar HP)
 * 3. Flex column agar header dan footer bisa sticky
 *
 * Cara pakai:
 *   <PageShell>
 *     <PageHeader ... />
 *     <div className="flex-1 overflow-y-auto">...</div>
 *     <BottomNav />
 *   </PageShell>
 */

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col">
      <div className="w-full max-w-[480px] mx-auto flex flex-col flex-1">
        {children}
      </div>
    </div>
  )
}

export default function ToggleChip({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
        selected
          ? 'bg-primary border-primary text-white'
          : 'bg-[#E0E0E0] border-[#C0C9BB] text-gray-800'
      }`}
    >
      {children}
    </button>
  )
}

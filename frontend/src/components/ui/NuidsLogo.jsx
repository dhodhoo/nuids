export default function NuidsLogo({ className = 'w-8 h-8' }) {
  return (
    <img
      src="/logo-nuids.png"
      alt="Nuids"
      className={className}
      style={{ objectFit: 'contain', background: 'transparent' }}
    />
  )
}

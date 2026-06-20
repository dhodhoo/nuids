import { getStatusConfig } from '../../data/statusConfig'

export default function StatusBadge({ status, size = 'sm' }) {
  const cfg = getStatusConfig(status)
  const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5'
  const fontSize = size === 'sm' ? 'text-[11px]' : 'text-[12px]'

  return (
    <span
      className={`${padding} ${fontSize} rounded font-bold tracking-wide`}
      style={{ background: cfg.badgeBg, color: cfg.color }}
    >
      {cfg.badgeLabel}
    </span>
  )
}

export default function StatBadge({ icon, label, value, wide = false }) {
  return (
    <div className={`stat-card bg-white/[0.04] rounded-lg px-3.5 py-2 border border-white/[0.06]
      ${wide ? 'flex-1 min-w-[180px]' : 'flex-none min-w-[80px]'}`}>
      <span className="text-xs mr-1.5">{icon}</span>
      <span className="text-[var(--tx3)] text-[9px] font-bold uppercase tracking-wider">{label} </span>
      <span className={`text-[#f1f5f9] font-extrabold ${wide ? 'text-[11px] font-sans' : 'text-sm font-mono'}`}>
        {value}
      </span>
    </div>
  )
}

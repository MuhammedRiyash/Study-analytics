export default function PhaseCard({ name, total, done, pct, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[var(--bg2)] rounded-xl px-4 py-3.5 border border-[var(--bd)] cursor-pointer shadow-sm
        hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      style={{ borderLeftWidth: 4, borderLeftColor: color }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-[var(--tx)]">{name}</span>
        <span className="text-sm font-black font-mono" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="text-[var(--tx3)] text-[10px] font-semibold mt-1.5">{done}/{total} tasks</p>
    </div>
  )
}

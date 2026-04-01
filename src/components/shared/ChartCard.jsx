export default function ChartCard({ title, subtitle, fullWidth = false, children }) {
  return (
    <div className={`bg-[var(--bg2)] rounded-2xl p-5 border border-[var(--bd)] shadow-sm
      hover:shadow-lg hover:-translate-y-1 transition-all duration-300
      ${fullWidth ? 'col-span-full' : ''}`}>
      <h3 className="text-sm font-extrabold text-[var(--tx)] ml-1.5 mb-0.5">{title}</h3>
      {subtitle && <p className="text-[11px] text-[var(--tx3)] font-medium ml-1.5 mb-3">{subtitle}</p>}
      {children}
    </div>
  )
}

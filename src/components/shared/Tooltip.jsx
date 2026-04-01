export default function Tooltip({ text, children, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg
        bg-[var(--tx)] text-[var(--bg)] text-[11px] font-semibold whitespace-nowrap
        opacity-0 pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200 z-50">
        {text}
      </div>
    </div>
  )
}

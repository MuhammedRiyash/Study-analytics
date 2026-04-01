import { useRef } from 'react'
import { pressDown, pressUp } from '../../animations/microInteractions'

export default function FilterPills({ options, value, onChange, className = '' }) {
  return (
    <div className={`flex gap-1.5 flex-wrap ${className}`}>
      {options.map(opt => {
        const label = typeof opt === 'string' ? opt : opt.label
        const val = typeof opt === 'string' ? opt : opt.value
        const active = value === val
        return (
          <PillButton key={val} active={active} onClick={() => onChange(val)}>
            {label}
          </PillButton>
        )
      })}
    </div>
  )
}

function PillButton({ active, onClick, children }) {
  const ref = useRef(null)
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseDown={() => pressDown(ref.current)}
      onMouseUp={() => pressUp(ref.current)}
      onMouseLeave={() => pressUp(ref.current)}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors duration-200 select-none
        ${active
          ? 'bg-[var(--tx)] text-[var(--bg)]'
          : 'bg-[var(--bg3)] text-[var(--tx2)] hover:text-[var(--tx)]'
        }`}
    >
      {children}
    </button>
  )
}

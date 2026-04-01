import { Search } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Search tasks...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--tx3)]" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--bg2)] text-[var(--tx)] text-sm font-medium
          placeholder:text-[var(--tx3)] outline-none transition-all duration-300
          focus:border-[var(--ac)] focus:ring-2 focus:ring-[var(--ac)]/20"
      />
    </div>
  )
}

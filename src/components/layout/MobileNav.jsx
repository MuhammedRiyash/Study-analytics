const MOBILE_TABS = [
  { id: 'dashboard', label: 'Home', icon: '\uD83D\uDCCA' },
  { id: 'checklist', label: 'Tasks', icon: '\uD83D\uDCCB' },
  { id: 'phases', label: 'Phases', icon: '\uD83D\uDDC2' },
  { id: 'achievements', label: 'Trophies', icon: '\uD83C\uDFC6' },
  { id: 'timer', label: 'Focus', icon: '\u23F1' },
]

export default function MobileNav({ activeTab, onTabChange }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--bg2) 85%, transparent)',
        borderColor: 'var(--bd)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {MOBILE_TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center justify-center gap-0.5 px-2 py-1.5
                rounded-lg transition-colors min-w-[52px]
                ${isActive ? 'text-[var(--ac)]' : 'text-[var(--tx3)]'}
              `}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="text-[9px] font-medium leading-tight">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

import { useRef, useCallback } from 'react'
import { gsap } from '../../animations/gsapSetup'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '\uD83D\uDCCA' },
  { id: 'checklist', label: 'Checklist', icon: '\uD83D\uDCCB' },
  { id: 'phases', label: 'Phases', icon: '\uD83D\uDDC2' },
  { id: 'heatmap', label: 'Heatmap', icon: '\uD83D\uDFE9' },
  { id: 'achievements', label: 'Trophies', icon: '\uD83C\uDFC6' },
  { id: 'analytics', label: 'Analytics', icon: '\uD83D\uDCC8' },
  { id: 'timer', label: 'Focus', icon: '\u23F1' },
]

export default function Navigation({ activeTab, onTabChange }) {
  const tabRefs = useRef({})

  const handleHoverEnter = useCallback((id) => {
    const el = tabRefs.current[id]
    if (el) {
      gsap.to(el, { y: -2, duration: 0.2, ease: 'power2.out' })
    }
  }, [])

  const handleHoverLeave = useCallback((id) => {
    const el = tabRefs.current[id]
    if (el) {
      gsap.to(el, { y: 0, duration: 0.2, ease: 'power2.out' })
    }
  }, [])

  return (
    <nav className="hidden md:block w-full border-b" style={{ borderColor: 'var(--bd)' }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el }}
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => handleHoverEnter(tab.id)}
                onMouseLeave={() => handleHoverLeave(tab.id)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium
                  rounded-t-lg transition-colors whitespace-nowrap
                  ${isActive
                    ? 'bg-[var(--bg2)] text-[var(--tx)] shadow-sm'
                    : 'bg-transparent text-[var(--tx3)] hover:text-[var(--tx2)]'
                  }
                `}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

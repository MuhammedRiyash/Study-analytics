import { useRef, useEffect, useState, useCallback } from 'react'
import { useCourse } from '../../context/CourseContext'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter, staggerChildren } from '../../animations/pageTransitions'
import ConfettiEffect from '../shared/ConfettiEffect'

export default function Phases({ onNavigate }) {
  const { completed, toggle, course } = useCourse()
  const containerRef = useRef(null)
  const cardsRef = useRef(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    pageEnter(containerRef.current)
    staggerChildren(cardsRef.current, ':scope > *', 0.06)
  }, [])

  const handleToggle = useCallback((day) => {
    const wasNew = toggle(day)
    if (wasNew) setShowConfetti(true)
  }, [toggle])

  return (
    <div ref={containerRef} className="space-y-4">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      <h2 className="text-lg font-extrabold text-[var(--tx)]">Phases</h2>

      <div ref={cardsRef} className="space-y-4">
        {course.phases.map((phase) => {
          const total = phase.tasks.length
          const done = phase.tasks.filter((t) => completed.includes(t.d)).length
          const pct = total > 0 ? Math.round((done / total) * 100) : 0
          const color = course.phaseColors?.[phase.name] || '#6366f1'

          return (
            <div
              key={phase.name}
              className="bg-[var(--bg2)] rounded-2xl border border-[var(--bd)] overflow-hidden
                hover:shadow-lg transition-all duration-300"
            >
              {/* Header - clickable to navigate */}
              <div
                onClick={() => onNavigate?.('checklist', phase.name)}
                className="px-5 py-4 cursor-pointer hover:bg-[var(--bg3)]/30 transition-colors"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-extrabold text-[var(--tx)]">{phase.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[var(--tx3)]">{done}/{total}</span>
                    <span className="text-sm font-black font-mono" style={{ color }}>{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>

              {/* Day squares */}
              <div className="px-5 pb-4 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {phase.tasks.map((task) => {
                    const isDone = completed.includes(task.d)
                    return (
                      <div
                        key={task.d}
                        onClick={() => handleToggle(task.d)}
                        title={`Day ${task.d}: ${task.task}`}
                        className="flex items-center justify-center rounded-md cursor-pointer
                          text-[9px] font-bold font-mono select-none
                          hover:scale-110 transition-transform duration-150"
                        style={{
                          width: 28,
                          height: 28,
                          background: isDone ? color : 'var(--bg3)',
                          color: isDone ? '#fff' : 'var(--tx3)',
                        }}
                      >
                        {task.d}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

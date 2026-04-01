import { useRef, useEffect, useMemo } from 'react'
import { useCourse } from '../../context/CourseContext'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter } from '../../animations/pageTransitions'

export default function Heatmap() {
  const containerRef = useRef(null)
  const { completed, toggle, allTasks, course, streak, xp, pct } = useCourse()
  const phaseColors = course.phaseColors || {}

  useEffect(() => {
    pageEnter(containerRef.current)
  }, [])

  const phaseForDay = useMemo(() => {
    const map = {}
    for (const phase of course.phases) {
      for (const t of phase.tasks) {
        map[t.d] = phase.name
      }
    }
    return map
  }, [course])

  const handleToggle = (day) => {
    toggle(day)
  }

  const total = allTasks.length
  const cols = 10
  const rows = Math.ceil(total / cols)

  return (
    <div ref={containerRef} className="space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--tx)]">Progress Heatmap</h2>
        <p className="text-xs text-[var(--tx3)] mt-0.5">Click a cell to toggle completion</p>
      </div>

      {/* Heatmap Grid */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: rows * cols }, (_, i) => {
          const day = i + 1
          if (day > total) return <div key={i} />
          const task = allTasks[day - 1]
          const done = completed.includes(day)
          const phase = phaseForDay[day]
          const color = done ? (phaseColors[phase] || '#6366f1') : undefined

          return (
            <button
              key={day}
              onClick={() => handleToggle(day)}
              title={task ? `Day ${day}: ${task.task}` : `Day ${day}`}
              className="aspect-square rounded-lg text-[10px] font-bold
                border border-[var(--bd)] transition-all duration-200
                hover:scale-110 hover:shadow-md flex items-center justify-center"
              style={{
                background: done ? color : 'var(--bg3)',
                color: done ? '#fff' : 'var(--tx3)',
              }}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Phase Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(phaseColors).map(([name, color]) => (
          <div key={name} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
            <span className="text-[10px] text-[var(--tx3)] font-medium">{name}</span>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard emoji="🔥" label="Current Streak" value={`${streak} days`} />
        <StatCard emoji="⚡" label="Total XP" value={xp.toLocaleString()} />
        <StatCard emoji="📊" label="Overall Progress" value={`${pct}%`} />
      </div>
    </div>
  )
}

function StatCard({ emoji, label, value }) {
  return (
    <div className="bg-[var(--bg2)] rounded-xl p-4 border border-[var(--bd)]
      text-center shadow-sm">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-base font-extrabold text-[var(--tx)]">{value}</div>
      <div className="text-[10px] text-[var(--tx3)] font-medium mt-0.5">{label}</div>
    </div>
  )
}

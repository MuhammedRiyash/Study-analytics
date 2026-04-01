import { useRef, useEffect, useState, useCallback } from 'react'
import { useCourse } from '../../context/CourseContext'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter, staggerChildren } from '../../animations/pageTransitions'
import { XP_PER_TASK } from '../../config/constants'
import PhaseCard from '../shared/PhaseCard'
import ChartCard from '../shared/ChartCard'
import ConfettiEffect from '../shared/ConfettiEffect'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts'

export default function Dashboard({ onNavigate }) {
  const {
    completed, toggle, nextTask, allTasks, course,
    getPhaseData, getRadarData, getCatData,
  } = useCourse()

  const containerRef = useRef(null)
  const cardsRef = useRef(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const phaseData = getPhaseData()
  const radarData = getRadarData()
  const catData = getCatData()

  useEffect(() => {
    pageEnter(containerRef.current)
    staggerChildren(cardsRef.current)
  }, [])

  // Find the phase name for a given task
  const getPhaseForTask = useCallback((task) => {
    if (!task) return null
    for (const phase of course.phases) {
      if (phase.tasks.some((t) => t.d === task.d)) return phase.name
    }
    return null
  }, [course])

  const handleToggleNext = () => {
    if (!nextTask) return
    const wasNew = toggle(nextTask.d)
    if (wasNew) setShowConfetti(true)
  }

  const nextPhaseName = getPhaseForTask(nextTask)
  const nextPhaseColor = course.phaseColors?.[nextPhaseName] || '#6366f1'

  return (
    <div ref={containerRef} className="space-y-6">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Up Next Card */}
      {nextTask && (
        <div
          onClick={handleToggleNext}
          className="relative overflow-hidden rounded-2xl p-5 border border-[var(--bd)] cursor-pointer
            hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          style={{ background: `linear-gradient(135deg, ${nextPhaseColor}15, var(--bg2))` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-extrabold tracking-widest text-[var(--ac)] uppercase">Up Next</span>
            <span className="text-[10px] font-bold text-[var(--tx3)]">Click to complete</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-mono text-white flex-shrink-0"
              style={{ background: nextPhaseColor }}
            >
              {nextTask.d}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--tx)] truncate">{nextTask.task}</p>
              <div className="flex gap-1.5 mt-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg3)] text-[var(--tx3)]">{nextPhaseName}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: course.categories?.[nextTask.cat], background: (course.categories?.[nextTask.cat] || '#888') + '15' }}>{nextTask.cat}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: course.levelColors?.[nextTask.lvl], background: (course.levelColors?.[nextTask.lvl] || '#888') + '15' }}>{nextTask.lvl}</span>
                <span className="text-[9px] font-bold text-[var(--ac)] bg-[var(--ac)]/10 px-1.5 py-0.5 rounded">+{XP_PER_TASK[nextTask.lvl]}XP</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Heatmap */}
      <div className="bg-[var(--bg2)] rounded-2xl p-4 border border-[var(--bd)]">
        <h3 className="text-xs font-extrabold text-[var(--tx)] mb-3">100-Day Heatmap</h3>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(20, 1fr)' }}>
          {allTasks.map((task) => {
            const done = completed.includes(task.d)
            const phaseName = getPhaseForTask(task)
            const color = done ? (course.phaseColors?.[phaseName] || '#22c55e') : 'var(--bg3)'
            return (
              <div
                key={task.d}
                onClick={() => {
                  const wasNew = toggle(task.d)
                  if (wasNew) setShowConfetti(true)
                }}
                title={`Day ${task.d}: ${task.task}`}
                className="aspect-square rounded-sm cursor-pointer hover:scale-125 transition-transform duration-150"
                style={{ background: color }}
              />
            )
          })}
        </div>
      </div>

      {/* Phase Overview */}
      <div>
        <h3 className="text-sm font-extrabold text-[var(--tx)] mb-3">Phase Overview</h3>
        <div ref={cardsRef} className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {phaseData.map((phase) => (
            <PhaseCard
              key={phase.name}
              {...phase}
              onClick={() => onNavigate?.('checklist', phase.name)}
            />
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Skill Radar" subtitle="Category mastery">
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} outerRadius="70%">
              <PolarGrid stroke="var(--bd)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--tx3)', fontSize: 9, fontWeight: 700 }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 8, fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Split" subtitle="Task distribution">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={catData} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={2}>
                {catData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

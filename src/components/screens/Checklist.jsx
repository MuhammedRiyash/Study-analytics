import { useState, useRef, useEffect, useCallback } from 'react'
import { useCourse } from '../../context/CourseContext'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter, staggerChildren } from '../../animations/pageTransitions'
import SearchInput from '../shared/SearchInput'
import FilterPills from '../shared/FilterPills'
import TaskCard from '../shared/TaskCard'
import TaskGrid from '../shared/TaskGrid'
import ConfettiEffect from '../shared/ConfettiEffect'

export default function Checklist({ initialPhase }) {
  const {
    completed, notes, toggle, saveNote, filteredTasks, course,
  } = useCourse()

  const [filterPhase, setFilterPhase] = useState(initialPhase || 'all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [showConfetti, setShowConfetti] = useState(false)

  const containerRef = useRef(null)
  const listRef = useRef(null)

  // Update filter when initialPhase changes externally
  useEffect(() => {
    if (initialPhase) setFilterPhase(initialPhase)
  }, [initialPhase])

  useEffect(() => {
    pageEnter(containerRef.current)
  }, [])

  useEffect(() => {
    staggerChildren(listRef.current)
  }, [filterPhase, filterLevel, searchQuery, viewMode])

  const tasks = filteredTasks(filterPhase, filterLevel, searchQuery)

  const phaseOptions = [
    { label: 'All', value: 'all' },
    ...course.phases.map((p) => ({ label: p.name, value: p.name })),
  ]
  const levelOptions = [
    { label: 'All', value: 'all' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ]

  const getPhaseColor = useCallback((task) => {
    for (const phase of course.phases) {
      if (phase.tasks.some((t) => t.d === task.d)) {
        return course.phaseColors?.[phase.name] || '#6366f1'
      }
    }
    return '#6366f1'
  }, [course])

  const handleToggle = (day) => {
    const wasNew = toggle(day)
    if (wasNew) setShowConfetti(true)
  }

  return (
    <div ref={containerRef} className="space-y-4">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Search + View toggle */}
      <div className="flex gap-3 items-center">
        <SearchInput value={searchQuery} onChange={setSearchQuery} className="flex-1" />
        <div className="flex bg-[var(--bg2)] border border-[var(--bd)] rounded-xl overflow-hidden">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 text-xs font-bold transition-colors ${viewMode === 'list' ? 'bg-[var(--tx)] text-[var(--bg)]' : 'text-[var(--tx2)]'}`}
          >
            ☰
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 text-xs font-bold transition-colors ${viewMode === 'grid' ? 'bg-[var(--tx)] text-[var(--bg)]' : 'text-[var(--tx2)]'}`}
          >
            ⊞
          </button>
        </div>
      </div>

      {/* Level filter */}
      <FilterPills options={levelOptions} value={filterLevel} onChange={setFilterLevel} />

      {/* Phase filter */}
      <FilterPills options={phaseOptions} value={filterPhase} onChange={setFilterPhase} />

      {/* Results count */}
      <p className="text-[11px] font-bold text-[var(--tx3)]">{tasks.length} tasks</p>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-[var(--tx3)]">
          <span className="text-4xl mb-3">🔍</span>
          <p className="text-sm font-bold">No tasks found</p>
          <p className="text-xs font-medium mt-1">Try adjusting your filters or search</p>
        </div>
      )}

      {/* Task list/grid */}
      {viewMode === 'list' ? (
        <div ref={listRef} className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.d}
              task={task}
              done={completed.includes(task.d)}
              note={notes[task.d]}
              phaseColor={getPhaseColor(task)}
              catColor={course.categories?.[task.cat] || '#888'}
              lvlColor={course.levelColors?.[task.lvl] || '#888'}
              onToggle={handleToggle}
              onNote={saveNote}
            />
          ))}
        </div>
      ) : (
        <div
          ref={listRef}
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
        >
          {tasks.map((task) => (
            <TaskGrid
              key={task.d}
              task={task}
              done={completed.includes(task.d)}
              phaseColor={getPhaseColor(task)}
              catColor={course.categories?.[task.cat] || '#888'}
              lvlColor={course.levelColors?.[task.lvl] || '#888'}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

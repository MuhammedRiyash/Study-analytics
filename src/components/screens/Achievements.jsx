import { useRef, useEffect, useMemo } from 'react'
import { useCourse } from '../../context/CourseContext'
import { ACHIEVEMENTS } from '../../config/achievements'
import AchievementCard from '../shared/AchievementCard'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter, staggerChildren } from '../../animations/pageTransitions'

export default function Achievements() {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const { completed, allTasks, course } = useCourse()

  const earnedAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => {
      try {
        return a.check(completed, allTasks, course.phases)
      } catch {
        return false
      }
    })
  }, [completed, allTasks, course.phases])

  const earnedIds = useMemo(
    () => new Set(earnedAchievements.map((a) => a.id)),
    [earnedAchievements]
  )

  useEffect(() => {
    pageEnter(containerRef.current)
    const timer = setTimeout(() => {
      staggerChildren(gridRef.current)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const total = ACHIEVEMENTS.length
  const unlocked = earnedAchievements.length
  const progressPct = total > 0 ? Math.round((unlocked / total) * 100) : 0

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--bg2)] rounded-2xl p-6 border border-[var(--bd)] shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏆</span>
          <div>
            <h2 className="text-lg font-extrabold text-[var(--tx)]">Achievements</h2>
            <p className="text-xs text-[var(--tx3)] font-medium">
              {unlocked} of {total} unlocked
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-[var(--bg3)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, var(--wn), #f59e0b)',
            }}
          />
        </div>
        <p className="text-[10px] text-[var(--tx3)] font-medium mt-1.5 text-right">
          {progressPct}% complete
        </p>
      </div>

      {/* Achievement Grid */}
      <div
        ref={gridRef}
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
      >
        {ACHIEVEMENTS.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            earned={earnedIds.has(achievement.id)}
          />
        ))}
      </div>
    </div>
  )
}

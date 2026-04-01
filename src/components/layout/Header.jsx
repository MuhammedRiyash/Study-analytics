import { useMemo, useRef, useEffect } from 'react'
import { gsap } from '../../animations/gsapSetup'
import { useTheme } from '../../context/ThemeContext'
import { useUser } from '../../context/UserContext'
import { useCourse } from '../../context/CourseContext'
import { getGreeting } from '../../utils/dateUtils'
import { getLevel } from '../../config/constants'
import { MOTIVATIONS } from '../../config/constants'
import { ACHIEVEMENTS } from '../../config/achievements'
import ProgressRing from '../shared/ProgressRing'
import StatBadge from '../shared/StatBadge'

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useUser()
  const { totalDone, pct, xp, streak, currentPhase, completed, allTasks, getPhaseData, course } = useCourse()

  const headerRef = useRef(null)
  const progressBarRef = useRef(null)

  const level = useMemo(() => getLevel(xp), [xp])
  const phaseData = useMemo(() => getPhaseData(), [getPhaseData])

  const earnedAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => {
      try {
        return a.check(completed, allTasks)
      } catch {
        return false
      }
    })
  }, [completed, allTasks])

  const motivation = useMemo(() => {
    return MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]
  }, [])

  const totalTasks = allTasks.length
  const remaining = totalTasks - totalDone

  // Animate header on mount
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [])

  // Animate progress bar width
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${pct}%`,
        duration: 1,
        ease: 'power2.out',
      })
    }
  }, [pct])

  return (
    <header
      ref={headerRef}
      className="w-full"
      style={{ background: 'var(--hd)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-5 md:px-6 md:py-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left side */}
          <div className="flex-1 min-w-0">
            <p className="text-[var(--tx3)] text-sm mb-1">{getGreeting()}</p>
            <h1
              className="font-mono font-black text-[22px] md:text-[26px] text-[var(--tx)] leading-tight truncate"
            >
              {user || 'Learner'}
            </h1>
            <p className="text-[var(--tx3)] text-xs italic mt-1.5 line-clamp-2">
              {motivation}
            </p>

            {/* XP Level Bar */}
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                }}
              >
                {level.name}
              </span>
              <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${level.progress}%`,
                      background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[var(--tx3)] whitespace-nowrap">
                  {xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 md:gap-5 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-colors"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--bd)',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Progress Ring */}
            <div className="relative">
              <ProgressRing pct={pct} size={72} stroke={6} color="var(--ac)" />
              <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold font-mono text-[var(--tx)]">
                {pct}%
              </span>
            </div>

            {/* Streak badge */}
            {streak > 0 && (
              <div
                className="flex flex-col items-center px-3 py-1.5 rounded-lg"
                style={{
                  background: 'rgba(251,146,60,0.12)',
                  border: '1px solid rgba(251,146,60,0.25)',
                }}
              >
                <span className="text-lg leading-none">🔥</span>
                <span className="text-sm font-bold font-mono text-[#fb923c]">
                  {streak}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[var(--tx3)] font-bold">
                  Streak
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <StatBadge icon="✅" label="Done" value={totalDone} />
          <StatBadge icon="📋" label="Left" value={remaining} />
          <StatBadge icon="🎯" label="Phases" value={phaseData.length} />
          <StatBadge icon="🏆" label="Badges" value={earnedAchievements.length} />
          <StatBadge
            icon="📍"
            label="Current Phase"
            value={currentPhase?.name || 'N/A'}
            wide
          />
        </div>

        {/* Full-width progress bar */}
        <div className="mt-4 w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full rounded-full"
            style={{
              width: 0,
              background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
            }}
          />
        </div>
      </div>
    </header>
  )
}

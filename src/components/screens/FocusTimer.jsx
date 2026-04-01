import { useRef, useEffect, useState } from 'react'
import { useCourse } from '../../context/CourseContext'
import { usePomodoro } from '../../hooks/usePomodoro'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter } from '../../animations/pageTransitions'

const DURATIONS = [15, 25, 45]

export default function FocusTimer() {
  const containerRef = useRef(null)
  const { nextTask, allTasks, completed } = useCourse()
  const { timeLeft, isActive, duration, task, start, pause, reset, setTask, formatTime } = usePomodoro()
  const [celebrated, setCelebrated] = useState(false)

  useEffect(() => { pageEnter(containerRef.current) }, [])

  useEffect(() => {
    if (timeLeft === 0 && duration > 0 && !isActive) {
      setCelebrated(true)
    }
  }, [timeLeft, duration, isActive])

  const progress = duration > 0 ? timeLeft / duration : 0
  const radius = 88
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  const selectNextTask = () => {
    if (nextTask) {
      setTask(nextTask)
      setCelebrated(false)
    }
  }

  const handleDuration = (min) => {
    reset(min)
    setCelebrated(false)
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-extrabold text-[var(--tx)]">Focus Timer</h2>
        <p className="text-xs text-[var(--tx3)] mt-0.5">Stay focused, one session at a time</p>
      </div>

      {/* Selected Task Card */}
      {task && (
        <div className="w-full bg-[var(--acl)] border border-[var(--ac)]/20 rounded-xl p-4">
          <p className="text-[10px] font-bold text-[var(--ac)] uppercase tracking-wider mb-1">
            Focusing on
          </p>
          <p className="text-sm font-bold text-[var(--tx)]">
            Day {task.d} — {task.task}
          </p>
          <p className="text-[10px] text-[var(--tx3)] mt-1">{task.cat} / {task.lvl}</p>
        </div>
      )}

      {/* Circular Timer */}
      <div className="relative w-[200px] h-[200px]">
        <svg width="200" height="200" className="-rotate-90">
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke="var(--bg3)" strokeWidth="8"
          />
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke="var(--ac)" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-[var(--tx)]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Celebration */}
      {celebrated && (
        <div className="text-center animate-bounce">
          <span className="text-4xl">🎉</span>
          <p className="text-sm font-extrabold text-[var(--ok)] mt-1">Session Complete!</p>
        </div>
      )}

      {/* Duration Pills */}
      <div className="flex gap-2">
        {DURATIONS.map((min) => (
          <button
            key={min}
            onClick={() => handleDuration(min)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors
              ${duration === min * 60
                ? 'bg-[var(--tx)] text-[var(--bg)]'
                : 'bg-[var(--bg3)] text-[var(--tx2)] hover:text-[var(--tx)]'
              }`}
          >
            {min}m
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        <button
          onClick={isActive ? pause : start}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[var(--ac)] text-white
            hover:opacity-90 transition-opacity"
        >
          {isActive ? 'Pause' : timeLeft < duration ? 'Resume' : 'Start'}
        </button>
        <button
          onClick={() => { reset(duration / 60); setCelebrated(false) }}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[var(--bg3)] text-[var(--tx2)]
            hover:text-[var(--tx)] transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Select Task */}
      {nextTask && (
        <button
          onClick={selectNextTask}
          className="text-xs font-bold text-[var(--ac)] hover:underline"
        >
          Focus on: Day {nextTask.d} — {nextTask.task}
        </button>
      )}
    </div>
  )
}

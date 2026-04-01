import { useRef, useEffect } from 'react'
import { COURSES } from '../../config/courses'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter, staggerChildren } from '../../animations/pageTransitions'

const PLACEHOLDERS = [
  { id: 'coming-1', emoji: '📱', title: 'Social Media Mastery', desc: 'Coming Soon' },
  { id: 'coming-2', emoji: '📧', title: 'Email Marketing Pro', desc: 'Coming Soon' },
]

export default function CourseSelect({ onSelect }) {
  const containerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    pageEnter(containerRef.current)
    const timer = setTimeout(() => staggerChildren(gridRef.current), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-[var(--tx)]">Choose Your Course</h1>
        <p className="text-sm text-[var(--tx3)] mt-1">Select a learning path to begin your journey</p>
      </div>

      <div ref={gridRef} className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {/* Real Courses */}
        {COURSES.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelect(course.id)}
            className="text-left bg-[var(--bg2)] rounded-2xl p-6 border-2 border-transparent
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            style={{
              borderImage: `linear-gradient(135deg, ${course.gradient?.[0] || '#6366f1'}, ${course.gradient?.[1] || '#8b5cf6'}) 1`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${course.gradient?.[0]}, ${course.gradient?.[1]})` }} />
            <span className="text-4xl block mb-3">{course.emoji}</span>
            <h3 className="text-base font-extrabold text-[var(--tx)] mb-1">{course.shortTitle || course.title}</h3>
            <p className="text-xs text-[var(--tx3)] mb-3 line-clamp-2">{course.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold bg-[var(--bg3)] text-[var(--tx2)]
                px-2 py-0.5 rounded-md">{course.duration}</span>
              <span className="text-[10px] font-bold bg-[var(--acl)] text-[var(--ac)]
                px-2 py-0.5 rounded-md">{course.difficulty}</span>
            </div>
          </button>
        ))}

        {/* Coming Soon Placeholders */}
        {PLACEHOLDERS.map((ph) => (
          <div
            key={ph.id}
            className="relative bg-[var(--bg2)] rounded-2xl p-6 border border-[var(--bd)]
              opacity-60 overflow-hidden select-none"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--bg3) 50%, transparent 100%)',
              }} />
            <span className="text-4xl block mb-3 grayscale">{ph.emoji}</span>
            <h3 className="text-base font-extrabold text-[var(--tx3)] mb-1">{ph.title}</h3>
            <p className="text-xs text-[var(--tx3)]">{ph.desc}</p>
            <div className="mt-3">
              <span className="text-[10px] font-bold bg-[var(--bg3)] text-[var(--tx3)]
                px-2 py-0.5 rounded-md">Coming Soon</span>
            </div>
          </div>
        ))}
      </div>

      {/* Shimmer keyframe via inline style */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

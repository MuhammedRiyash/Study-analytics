import { useState, useRef, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { gsap } from '../../animations/gsapSetup'

const SKILLS = ['SEO', 'PPC', 'Social Ads', 'Content', 'Email', 'Analytics', 'CRO', 'Strategy']

export default function WelcomeScreen({ onRegister }) {
  const { setUser } = useUser()
  const [name, setName] = useState('')
  const containerRef = useRef(null)
  const rocketRef = useRef(null)
  const cardRef = useRef(null)
  const pillsRef = useRef(null)
  const particlesRef = useRef(null)

  // Floating particles
  useEffect(() => {
    if (!particlesRef.current) return
    const dots = particlesRef.current.children
    Array.from(dots).forEach((dot) => {
      gsap.set(dot, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.5 + 0.2,
      })
      gsap.to(dot, {
        y: `+=${Math.random() * 80 - 40}`,
        x: `+=${Math.random() * 60 - 30}`,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  // Entrance animations
  useEffect(() => {
    if (!containerRef.current) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(rocketRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 })
      .fromTo('.welcome-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
      .fromTo('.welcome-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')

    if (pillsRef.current) {
      const pills = pillsRef.current.children
      tl.fromTo(pills, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.05, duration: 0.3 }, '-=0.2')
    }

    tl.fromTo(cardRef.current, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '-=0.1')

    // Rocket float
    gsap.to(rocketRef.current, { y: -10, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    gsap.to(containerRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setUser(trimmed)
        onRegister?.(trimmed)
      },
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-50"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e, #0f172a, #1a1f3a, #0f172a)',
        fontFamily: "'Inter', sans-serif",
        animation: 'gradientShift 8s ease infinite',
      }}
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
          />
        ))}
      </div>

      {/* Rocket */}
      <div ref={rocketRef} className="text-5xl mb-4 select-none">🚀</div>

      {/* Title */}
      <h1 className="welcome-title shimmer-text text-5xl md:text-6xl font-black tracking-tight mb-2 text-center">
        100 DAYS
      </h1>
      <p className="welcome-subtitle text-lg md:text-xl font-bold text-white/60 tracking-widest mb-6 text-center">
        DIGITAL MARKETING MASTERY
      </p>

      {/* Skill pills */}
      <div ref={pillsRef} className="flex flex-wrap justify-center gap-2 mb-8 max-w-md px-4">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/5 text-white/70 border border-white/10 backdrop-blur-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Glass card with input */}
      <form
        ref={cardRef}
        onSubmit={handleSubmit}
        className="w-[90%] max-w-sm p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        <label className="block text-white/50 text-xs font-bold mb-2 tracking-wide">WHAT SHOULD WE CALL YOU?</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold
            placeholder:text-white/25 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          autoFocus
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full mt-4 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300
            bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Begin My Journey →
        </button>
      </form>

      {/* Stats line */}
      <p className="mt-8 text-[11px] font-semibold text-white/25 tracking-wide text-center">
        13 phases · 100 tasks · 8 categories · 12 achievements
      </p>

      {/* Credit */}
      <p className="absolute bottom-4 text-[10px] text-white/20 font-medium">
        Built with ❤️ by Muhammed Riyash
      </p>
    </div>
  )
}

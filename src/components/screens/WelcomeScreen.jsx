import { useState, useRef, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { OWNER } from '../../config/siteConfig'
import { gsap } from '../../animations/gsapSetup'

const SKILLS = ['SEO', 'PPC', 'Social Ads', 'Content', 'Email', 'Analytics', 'CRO', 'Strategy']

export default function WelcomeScreen({ onRegister }) {
  const { setUser } = useUser()
  const [name, setName] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const containerRef = useRef(null)
  const rocketRef = useRef(null)
  const cardRef = useRef(null)
  const pillsRef = useRef(null)
  const particlesRef = useRef(null)
  const avatarRef = useRef(null)
  const bubbleRef = useRef(null)
  const titleRef = useRef(null)
  const orbitRef = useRef(null)

  // Floating particles
  useEffect(() => {
    if (!particlesRef.current) return
    const dots = particlesRef.current.children
    Array.from(dots).forEach((dot) => {
      gsap.set(dot, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.4 + 0.1,
      })
      gsap.to(dot, {
        y: `+=${Math.random() * 100 - 50}`,
        x: `+=${Math.random() * 80 - 40}`,
        duration: 3 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  // Main entrance timeline
  useEffect(() => {
    if (!containerRef.current) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Orbit rings spin in
    tl.fromTo('.orbit-ring',
      { scale: 0, opacity: 0, rotation: 0 },
      { scale: 1, opacity: 1, rotation: 360, duration: 1.2, stagger: 0.15, ease: 'power2.out' },
    )

    // Rocket drops in with bounce
    tl.fromTo(rocketRef.current,
      { scale: 0, y: -60, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.7, ease: 'back.out(3)' },
      '-=0.8'
    )

    // Title letters animate in
    tl.fromTo('.title-char',
      { y: 50, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.5, ease: 'back.out(2)' },
      '-=0.4'
    )

    // Subtitle slides in
    tl.fromTo('.welcome-subtitle',
      { y: 20, opacity: 0, letterSpacing: '0.3em' },
      { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.5 },
      '-=0.3'
    )

    // Skill pills pop in
    if (pillsRef.current) {
      tl.fromTo(pillsRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.04, duration: 0.3, ease: 'back.out(2)' },
        '-=0.2'
      )
    }

    // Card rises up
    tl.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 },
      '-=0.1'
    )

    // Avatar character slides in from right with wave
    tl.fromTo(avatarRef.current,
      { x: 100, opacity: 0, scale: 0.5, rotation: 10 },
      { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
      '-=0.3'
    )
    tl.call(() => setShowBubble(true))

    // Rocket continuous float
    gsap.to(rocketRef.current, {
      y: -12, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })

    // Orbit rings continuous spin
    gsap.to('.orbit-ring-1', { rotation: '+=360', duration: 20, repeat: -1, ease: 'none' })
    gsap.to('.orbit-ring-2', { rotation: '-=360', duration: 30, repeat: -1, ease: 'none' })

    // Glow pulse on card
    gsap.to(cardRef.current, {
      boxShadow: '0 0 60px rgba(99,102,241,0.15)',
      duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
  }, [])

  // Speech bubble animation
  useEffect(() => {
    if (showBubble && bubbleRef.current) {
      gsap.fromTo(bubbleRef.current,
        { scale: 0, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(3)' }
      )
      // Wave hand animation
      gsap.to('.wave-hand', {
        rotation: 20, duration: 0.3, repeat: 5, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'bottom center',
      })
    }
  }, [showBubble])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    // Exit animation
    const tl = gsap.timeline({
      onComplete: () => {
        setUser(trimmed)
        onRegister?.(trimmed)
      },
    })
    tl.to(avatarRef.current, { x: 100, opacity: 0, duration: 0.3 })
    tl.to(containerRef.current, { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.in' }, '-=0.1')
  }

  const titleText = '100 DAYS'

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-50"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 25%, #1a1f3a 50%, #0f172a 75%, #0a0f1e 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
      }}
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: i % 3 === 0
                ? 'rgba(99,102,241,0.4)'
                : i % 3 === 1
                  ? 'rgba(139,92,246,0.3)'
                  : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

      {/* Orbit rings behind rocket */}
      <div ref={orbitRef} className="relative mb-4">
        <div className="orbit-ring orbit-ring-1 absolute inset-[-30px] rounded-full border border-dashed border-indigo-500/10" />
        <div className="orbit-ring orbit-ring-2 absolute inset-[-55px] rounded-full border border-dashed border-violet-500/[0.06]" />

        {/* Small orbiting dots */}
        <div className="orbit-ring orbit-ring-1 absolute inset-[-30px]">
          <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-indigo-400/40" />
        </div>
        <div className="orbit-ring orbit-ring-2 absolute inset-[-55px]">
          <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full bg-violet-400/30" />
        </div>

        {/* Rocket */}
        <div ref={rocketRef} className="relative text-5xl select-none z-10"
          style={{ filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3))' }}>
          🚀
        </div>
      </div>

      {/* Title with per-character animation */}
      <h1 ref={titleRef} className="flex text-5xl md:text-6xl font-black tracking-tight mb-1 text-center"
        style={{ perspective: '600px' }}>
        {titleText.split('').map((char, i) => (
          <span key={i} className="title-char inline-block"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #818cf8 40%, #c084fc 60%, #818cf8 80%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `shimmer 3s linear infinite ${i * 0.1}s`,
            }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      <p className="welcome-subtitle text-sm md:text-base font-bold text-white/50 tracking-widest mb-6 text-center uppercase">
        Digital Marketing Mastery
      </p>

      {/* Skill pills with hover effects */}
      <div ref={pillsRef} className="flex flex-wrap justify-center gap-2 mb-8 max-w-md px-4">
        {SKILLS.map((skill, i) => (
          <span key={skill}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-sm cursor-default
              transition-all duration-300 hover:scale-110 hover:shadow-lg"
            style={{
              background: `rgba(${99 + i * 15}, ${102 + i * 10}, 241, 0.08)`,
              borderColor: `rgba(${99 + i * 15}, ${102 + i * 10}, 241, 0.15)`,
              color: `rgba(255,255,255,0.7)`,
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, { scale: 1.15, duration: 0.2, ease: 'back.out(2)' })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { scale: 1, duration: 0.2 })
            }}>
            {skill}
          </span>
        ))}
      </div>

      {/* Glass card */}
      <form ref={cardRef} onSubmit={handleSubmit}
        className="w-[90%] max-w-sm p-6 rounded-2xl border border-white/10 backdrop-blur-xl relative"
        style={{ background: 'rgba(255,255,255,0.04)' }}>

        {/* Glow effect behind card */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', filter: 'blur(20px)' }} />

        <label className="block text-white/60 text-xs font-bold mb-1 tracking-wide">
          What should we call you?
        </label>
        <p className="text-white/25 text-[10px] mb-3">Your name will appear on your dashboard</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold
            placeholder:text-white/25 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20
            transition-all duration-300"
          autoFocus
        />
        <button type="submit" disabled={!name.trim()}
          className="w-full mt-4 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300
            bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
            hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5
            active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed">
          Begin My Journey →
        </button>
      </form>

      {/* Stats */}
      <p className="mt-6 text-[11px] font-semibold text-white/20 tracking-wide text-center">
        13 phases · 100 tasks · 8 categories · 12 achievements
      </p>

      {/* ===== ANIMATED AVATAR CHARACTER ===== */}
      <a
        ref={avatarRef}
        href={OWNER.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 cursor-pointer z-[60] group"
        title="Follow Muhammed Riyash on Instagram"
      >
        {/* Speech bubble */}
        {showBubble && (
          <div ref={bubbleRef}
            className="absolute -top-16 right-0 bg-white rounded-2xl rounded-br-sm px-4 py-2 shadow-xl
              whitespace-nowrap pointer-events-none">
            <p className="text-[12px] font-bold text-gray-800">
              Hey there! <span className="wave-hand inline-block">👋</span>
            </p>
            <p className="text-[10px] text-gray-500 font-medium">I'm Muhammed Riyash</p>
            {/* Bubble tail */}
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white rotate-45" />
          </div>
        )}

        {/* Avatar circle */}
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin"
            style={{ animationDuration: '3s' }} />

          {/* Avatar inner */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600
            flex items-center justify-center text-2xl border-2 border-white/20 overflow-hidden
            group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/30">
            {/* Character emoji as avatar */}
            <span className="select-none" style={{ fontSize: '28px' }}>👨‍💻</span>
          </div>

          {/* Instagram indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center
            bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 border-2 border-[#0f172a]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
            </svg>
          </div>
        </div>
      </a>

      {/* Credit */}
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/20 font-medium">
        Built with ❤️ by{' '}
        <a href={OWNER.social.linkedin} target="_blank" rel="noopener noreferrer"
          className="text-indigo-400/50 hover:text-indigo-400/80 transition-colors hover:underline">
          Muhammed Riyash
        </a>
      </p>
    </div>
  )
}

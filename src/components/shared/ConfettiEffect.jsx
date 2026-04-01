import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsapSetup'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

export default function ConfettiEffect({ active, onComplete }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!active || !containerRef.current) return
    const el = containerRef.current
    el.innerHTML = ''

    const particles = Array.from({ length: 40 }, (_, i) => {
      const p = document.createElement('div')
      const size = Math.random() * 6 + 4
      p.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        background:${COLORS[i % COLORS.length]};
        left:50%;top:60%;
        pointer-events:none;
      `
      el.appendChild(p)
      return p
    })

    particles.forEach(p => {
      gsap.fromTo(p,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        {
          x: (Math.random() - 0.5) * 300,
          y: -(Math.random() * 200 + 50),
          rotation: Math.random() * 720 - 360,
          scale: 0,
          opacity: 0,
          duration: 0.8 + Math.random() * 0.5,
          ease: 'power2.out',
          delay: Math.random() * 0.2,
        }
      )
    })

    const timer = setTimeout(() => {
      el.innerHTML = ''
      onComplete?.()
    }, 1500)

    return () => clearTimeout(timer)
  }, [active, onComplete])

  if (!active) return null
  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
}

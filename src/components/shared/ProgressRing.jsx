import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsapSetup'

export default function ProgressRing({ pct = 0, size = 100, stroke = 8, color = 'var(--ac)', className = '' }) {
  const circleRef = useRef(null)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c

  useEffect(() => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 1,
        ease: 'power2.out',
      })
    }
  }, [offset])

  return (
    <svg width={size} height={size} className={className} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bd)" strokeWidth={stroke} />
      <circle
        ref={circleRef}
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c}
        strokeLinecap="round"
      />
    </svg>
  )
}

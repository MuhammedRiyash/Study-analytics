import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../animations/gsapSetup'

export default function AnimatedCounter({ value, duration = 0.8, className = '' }) {
  const [display, setDisplay] = useState(0)
  const obj = useRef({ val: 0 })

  useEffect(() => {
    gsap.to(obj.current, {
      val: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => setDisplay(Math.round(obj.current.val)),
    })
  }, [value, duration])

  return <span className={className}>{display}</span>
}

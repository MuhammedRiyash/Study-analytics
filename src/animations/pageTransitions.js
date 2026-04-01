import { gsap } from './gsapSetup'

export function pageEnter(container) {
  if (!container) return
  gsap.fromTo(container,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
  )
}

export function pageExit(container) {
  if (!container) return
  return gsap.to(container, {
    opacity: 0, y: 20, duration: 0.25, ease: 'power2.in'
  })
}

export function staggerChildren(container, selector = ':scope > *', stagger = 0.04) {
  if (!container) return
  const children = container.querySelectorAll(selector)
  if (!children.length) return
  gsap.fromTo(children,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger, duration: 0.4, ease: 'power3.out' }
  )
}

export function staggerCards(container) {
  staggerChildren(container, ':scope > *', 0.05)
}

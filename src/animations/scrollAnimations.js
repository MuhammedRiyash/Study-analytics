import { gsap, ScrollTrigger } from './gsapSetup'

export function revealOnScroll(elements, container) {
  if (!elements || !elements.length) return

  elements.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        delay: i * 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          scroller: container || window,
        }
      }
    )
  })
}

export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(t => t.kill())
}

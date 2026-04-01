import { gsap } from './gsapSetup'

export function pressDown(el) {
  gsap.to(el, { scale: 0.97, duration: 0.1, ease: 'power2.out' })
}

export function pressUp(el) {
  gsap.to(el, { scale: 1, duration: 0.15, ease: 'back.out(2)' })
}

export function hoverLift(el) {
  gsap.to(el, { y: -4, boxShadow: '0 10px 40px rgba(0,0,0,0.12)', duration: 0.25 })
}

export function hoverReset(el) {
  gsap.to(el, { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', duration: 0.25 })
}

export function checkBounce(el) {
  gsap.fromTo(el,
    { scale: 0, rotation: -90 },
    { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(3)' }
  )
}

export function uncheckShrink(el) {
  gsap.to(el, { scale: 0, rotation: -90, duration: 0.2, ease: 'power2.in' })
}

export function achievementDrop(el) {
  gsap.fromTo(el,
    { y: -50, scale: 0.8, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
  )
}

export function achievementExit(el) {
  gsap.to(el, { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' })
}

export function themeRotate(el) {
  gsap.fromTo(el, { rotation: 0 }, { rotation: 180, duration: 0.4, ease: 'power2.inOut' })
}

export function pulseScale(el) {
  gsap.fromTo(el,
    { scale: 1 },
    { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }
  )
}

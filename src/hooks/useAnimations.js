import { useCallback } from 'react';
import gsap from 'gsap';

export function useAnimations() {
  const fadeIn = useCallback((element, delay = 0) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay, ease: 'power2.out' }
    );
  }, []);

  const staggerIn = useCallback((elements, stagger = 0.05) => {
    if (!elements || elements.length === 0) return;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger, ease: 'power2.out' }
    );
  }, []);

  const scaleIn = useCallback((element) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  const bounceIn = useCallback((element) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      }
    );
  }, []);

  const slideIn = useCallback((element, direction = 'left') => {
    if (!element) return;
    const xOffset = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;
    const yOffset = direction === 'up' ? -60 : direction === 'down' ? 60 : 0;
    gsap.fromTo(
      element,
      { x: xOffset, y: yOffset, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  return { fadeIn, staggerIn, scaleIn, bounceIn, slideIn };
}

export default useAnimations;

'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.15,
      anchors: {
        offset: -82,
        onComplete: () => ScrollTrigger.refresh(),
      },
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    lenis.on('scroll', updateScrollTrigger)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 38, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
    })

    return () => {
      ctx.revert()
      lenis.off('scroll', updateScrollTrigger)
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  return null
}

'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    let x = -100
    let y = -100
    let visible = false

    const render = () => {
      ringRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`)
      dotRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`)
      frame = window.requestAnimationFrame(render)
    }

    const setVisible = (nextVisible: boolean) => {
      visible = nextVisible
      if (wrapRef.current) wrapRef.current.style.opacity = nextVisible ? '1' : '0'
    }

    const handleMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (!visible) setVisible(true)
    }

    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      const overControl = Boolean(target.closest('input, textarea, select'))
      const overInteractive = Boolean(target.closest('a, button, [data-cursor="hover"], .card-neon'))
      wrapRef.current?.classList.toggle('custom-cursor-hidden', overControl)
      wrapRef.current?.classList.toggle('custom-cursor-hover', overInteractive && !overControl)
    }
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  return (
    <div ref={wrapRef} className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  )
}

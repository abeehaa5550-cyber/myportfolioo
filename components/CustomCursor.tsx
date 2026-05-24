'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const moveEvent = 'onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove'

    const handlePointerMove = (event: Event) => {
      const pointerEvent = event as PointerEvent
      if (!cursorRef.current) return

      cursorRef.current.style.transform = `translate3d(${pointerEvent.clientX}px, ${pointerEvent.clientY}px, 0)`
      if (!isVisibleRef.current) {
        cursorRef.current.classList.add('custom-cursor-visible')
        isVisibleRef.current = true
      }
    }

    const handlePointerLeave = () => {
      cursorRef.current?.classList.remove('custom-cursor-visible')
      isVisibleRef.current = false
    }

    const handlePointerEnter = () => {
      cursorRef.current?.classList.add('custom-cursor-visible')
      isVisibleRef.current = true
    }

    window.addEventListener(moveEvent, handlePointerMove, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerenter', handlePointerEnter)

    return () => {
      window.removeEventListener(moveEvent, handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerenter', handlePointerEnter)
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor-glow" />
      <span className="custom-cursor-core">
        <span className="custom-cursor-facet custom-cursor-facet-a" />
        <span className="custom-cursor-facet custom-cursor-facet-b" />
        <span className="custom-cursor-facet custom-cursor-facet-c" />
        <span className="custom-cursor-node custom-cursor-node-a" />
        <span className="custom-cursor-node custom-cursor-node-b" />
        <span className="custom-cursor-node custom-cursor-node-c" />
      </span>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

export function AmbientEffects() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setCursor({ x, y })
      document.documentElement.style.setProperty('--cursor-x', `${x}%`)
      document.documentElement.style.setProperty('--cursor-y', `${y}%`)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{
          background: `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(245,237,228,0.12), transparent 18rem)`,
        }}
      />
      <div className="ambient-lines pointer-events-none fixed inset-0 z-0" />
      <div className="ambient-nodes pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 16 }, (_, index) => {
          const style = {
            '--i': index,
            left: `${6 + index * 5.7}%`,
            top: `${14 + ((index * 17) % 68)}%`,
            animationDelay: `${index * -0.73}s`,
          } as CSSProperties

          return <span key={index} style={style} />
        })}
      </div>
    </>
  )
}

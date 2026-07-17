// src/components/shared/CursorFollower.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  useEffect(() => {
    setIsVisible(true)
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', updateCursor)
    return () => window.removeEventListener('mousemove', updateCursor)
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-6 h-6 bg-primary-500/20 rounded-full blur-sm"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  )
}
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ClickEffect {
  id: number
  x: number
  y: number
}

export default function InteractiveEffects() {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect = {
        id: nextId,
        x: e.clientX,
        y: e.clientY,
      }

      setClickEffects((prev) => [...prev, newEffect])
      setNextId((prev) => prev + 1)

      // Remove effect after animation
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [nextId])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {clickEffects.map((effect) => (
        <motion.div
          key={effect.id}
          initial={{
            x: effect.x,
            y: effect.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: 3,
            opacity: 0,
          }}
          transition={{ duration: 0.8 }}
          className="fixed w-8 h-8 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: effect.x,
            top: effect.y,
          }}
        >
          <div className="w-full h-full border-2 border-cyan-400 rounded-full" />
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            className="absolute inset-0 border-2 border-pink-400 rounded-full"
            transition={{ duration: 0.8 }}
            style={{ transform: 'rotate(-45deg)' }}
          />
        </motion.div>
      ))}

      {/* Floating particle effects on click */}
      {clickEffects.map((effect) => (
        <div key={`particle-${effect.id}`}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${effect.id}-${i}`}
              initial={{
                x: effect.x,
                y: effect.y,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: effect.x + Math.cos((i / 6) * Math.PI * 2) * 100,
                y: effect.y + Math.sin((i / 6) * Math.PI * 2) * 100,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.8 }}
              className="fixed w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full"
              style={{
                left: effect.x,
                top: effect.y,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

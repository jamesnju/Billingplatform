// src/components/ui/FloatingShape.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Shape {
  id: number
  width: number
  height: number
  left: string
  top: string
  xOffset: number
  yOffset: number
  duration: number
}

export default function FloatingShape() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate shapes only on the client side
    const generatedShapes: Shape[] = []
    for (let i = 0; i < 8; i++) {
      generatedShapes.push({
        id: i,
        width: Math.random() * 200 + 50,
        height: Math.random() * 200 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        xOffset: Math.random() * 100 - 50,
        yOffset: Math.random() * 100 - 50,
        duration: Math.random() * 10 + 10,
      })
    }
    setShapes(generatedShapes)
  }, [])

  if (shapes.length === 0) {
    // Return empty div during SSR to prevent hydration mismatch
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-primary-200/20"
          style={{
            width: shape.width,
            height: shape.height,
            left: shape.left,
            top: shape.top,
          }}
          animate={{
            x: [0, shape.xOffset, 0],
            y: [0, shape.yOffset, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
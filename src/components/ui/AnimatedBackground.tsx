'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface MousePos {
  x: number
  y: number
}

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated gradient orbs - slowly moving */}
      {[
        { color: 'from-cyan-500 to-blue-600', delay: 0, size: 400 },
        { color: 'from-pink-500 to-purple-600', delay: 2, size: 350 },
        { color: 'from-blue-500 to-cyan-400', delay: 4, size: 300 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full mix-blend-multiply filter blur-3xl bg-gradient-to-r ${orb.color} opacity-20`}
          style={{
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -150, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
          initial={{
            x: [0, 100, 200][i],
            y: [0, 50, 100][i],
          }}
        />
      ))}

      {/* Grid background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.sin(i) * 100, Math.cos(i) * 50],
            opacity: [0.5, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Interactive mouse-following glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 blur-3xl pointer-events-none"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.15,
        }}
        animate={{
          x: isMoving ? mousePos.x - 192 : 0,
          y: isMoving ? mousePos.y - 192 : 0,
          scale: isMoving ? 1 : 0.5,
          opacity: isMoving ? 0.2 : 0.05,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Radial wave effect from center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-400 rounded-full"
        style={{
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 2, 3],
          opacity: [0.3, 0.15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />

      {/* Secondary wave - offset */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-pink-400 rounded-full"
        style={{
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 2, 3],
          opacity: [0.3, 0.15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 1,
        }}
      />

      {/* Horizontal scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          height: '20%',
          pointerEvents: 'none',
        }}
      />

      {/* Diagonal moving stripe */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-pink-500/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Pulsing aurora effect */}
      {[0, 1].map((i) => (
        <motion.div
          key={`aurora-${i}`}
          className="absolute w-full h-1/3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-2xl"
          style={{
            top: `${i * 50}%`,
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1,
          }}
        />
      ))}

      {/* Corner accent elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500 via-purple-500 to-transparent rounded-bl-full blur-3xl"
        style={{
          opacity: 0.1,
          mixBlendMode: 'overlay',
        }}
        animate={{
          scale: [1, 1.1, 0.9],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500 via-cyan-500 to-transparent rounded-tr-full blur-3xl"
        style={{
          opacity: 0.1,
          mixBlendMode: 'overlay',
        }}
        animate={{
          scale: [1, 1.1, 0.9],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  )
}

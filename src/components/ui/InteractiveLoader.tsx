'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  size: number
}

export default function InteractiveLoader() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [clickParticles, setClickParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [score, setScore] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: Math.random() * 4 + 2,
    }))
    setParticles(newParticles)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newScore = score + Math.floor(Math.random() * 100) + 50
    setScore(newScore)
    setClicks(clicks + 1)

    const particle = { id: Date.now(), x, y }
    setClickParticles([...clickParticles, particle])
    setTimeout(() => {
      setClickParticles((prev) => prev.filter((p) => p.id !== particle.id))
    }, 800)
  }

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 cursor-crosshair overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: ['rgba(0, 217, 255, 0.15)', 'rgba(236, 72, 153, 0.15)', 'rgba(59, 130, 246, 0.15)'][i],
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Rising particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -150, -300],
              x: [0, Math.sin(particle.id) * 80, Math.cos(particle.id) * 40],
              opacity: [1, 0.6, 0],
            }}
            transition={{
              duration: 3.5 + particle.delay,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Click particles */}
      {clickParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ x: particle.x, y: particle.y, scale: 1, opacity: 1 }}
          animate={{
            y: particle.y - 150,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.8 }}
          className="fixed w-10 h-10 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full blur-md"
          />
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            className="absolute inset-0 text-white text-center font-bold text-xs flex items-center justify-center"
          >
            +{Math.floor(Math.random() * 100) + 50}
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Animated console */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="mb-12"
        >
          <div className="relative w-56 h-72 mx-auto">
            {/* Console frame */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl shadow-2xl border-8 border-gray-400">
              {/* Screen bezel */}
              <div className="absolute top-8 left-6 right-6 h-40 bg-gray-900 rounded-lg overflow-hidden shadow-inner">
                {/* Screen content */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"
                  style={{ backgroundSize: '200% 200%' }}
                />
                {/* Scanlines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none" />
                {/* Screen glare */}
                <motion.div
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/10"
                />
              </div>

              {/* D-Pad */}
              <div className="absolute top-52 left-8 text-gray-600 font-bold text-lg">↑↓←→</div>

              {/* Buttons */}
              <div className="absolute top-52 right-8 flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-7 h-7 rounded-full bg-red-500 shadow-lg cursor-pointer border-2 border-red-600"
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-7 h-7 rounded-full bg-yellow-400 shadow-lg cursor-pointer border-2 border-yellow-500"
                />
              </div>

              {/* Speaker */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-3 bg-gray-600 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg"
        >
          LEVEL LOADING...
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-cyan-400 text-lg mb-8 drop-shadow-lg font-bold"
        >
          🎮 Click anywhere to accelerate! 🎮
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border-2 border-cyan-400/50"
          >
            <p className="text-cyan-400 text-xs font-bold tracking-widest">CLICKS</p>
            <motion.p
              key={clicks}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-white text-3xl font-black"
            >
              {clicks}
            </motion.p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border-2 border-purple-400/50"
          >
            <p className="text-purple-400 text-xs font-bold tracking-widest">SCORE</p>
            <motion.p
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-white text-3xl font-black"
            >
              {score}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-72 h-3 bg-white/20 rounded-full overflow-hidden mx-auto border-2 border-cyan-400/50"
        >
          <motion.div
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
          />
        </motion.div>

        {/* Floating text */}
        <motion.p
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/70 text-sm mt-6 font-semibold"
        >
          ✨ Get ready to level up ✨
        </motion.p>
      </div>

      {/* Corner elements */}
      <div className="absolute top-4 left-4 text-cyan-400/60 text-xs font-mono font-bold">BETA v2.0</div>
      <div className="absolute bottom-4 right-4 text-purple-400/60 text-xs font-mono font-bold">[ PRESS START ]</div>
    </motion.div>
  )
}
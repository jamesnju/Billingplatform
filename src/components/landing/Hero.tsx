'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaPlay } from 'react-icons/fa'

const words = "Transform Your Business Operations".split(" ")

export default function HeroEnhanced() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.15,
                      },
                    },
                  }}
                  className={index === words.length - 1 ? 'text-gradient' : ''}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Streamline your business with our comprehensive suite of tools designed for growth. 
            Join thousands of companies transforming their operations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg flex items-center justify-center gap-2 group animate-pulse-glow"
            >
              Get Started Free
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight size={16} />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.8)', backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-cyan-400 rounded-lg font-semibold border border-cyan-400/50 hover:border-cyan-400 flex items-center justify-center gap-2 transition-all"
            >
              <FaPlay size={14} />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-20 pt-8 border-t border-slate-700/30"
          >
            {[
              { label: '10K+', desc: 'Active Users' },
              { label: '99.99%', desc: 'Uptime' },
              { label: '150+', desc: 'Integrations' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-gradient">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </motion.div>

          {/* Floating card showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-2xl aspect-video rounded-2xl overflow-hidden glass border border-cyan-400/20">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />

              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-6xl"
                >
                  ✨
                </motion.div>
              </div>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Floating elements around the card */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full"
                style={{
                  top: ['10%', '90%', '10%', '90%'][i],
                  left: ['10%', '10%', '90%', '90%'][i],
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="text-cyan-400/50 text-center">
          <div className="text-xs mb-2">Scroll to explore</div>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

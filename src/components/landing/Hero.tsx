// src/components/landing/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import FloatingShape from '../ui/FloatingShape'
import MagneticButton from '../ui/MagneticButton'

const words = "Transform Your Business Operations".split(" ")

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      <FloatingShape />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                    },
                  },
                }}
                className="inline-block mr-2 text-gradient"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Streamline your business with our comprehensive suite of tools designed for growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton>
              <button className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all animate-pulse-glow flex items-center gap-2">
                Get Started Free
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all border border-gray-200 flex items-center gap-2 group">
                <FaPlay className="group-hover:rotate-12 transition-transform" />
                Watch Demo
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
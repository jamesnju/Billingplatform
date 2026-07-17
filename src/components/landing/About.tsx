'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaRocket, FaBullseye, FaHeart } from 'react-icons/fa'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const values = [
    {
      icon: FaRocket,
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions that transform businesses.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: FaBullseye,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional quality in every aspect of our work, from product development to customer support.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaHeart,
      title: 'Customer Focus',
      description: 'Your success is our mission. We listen, adapt, and continuously improve to meet and exceed your expectations.',
      color: 'from-pink-500 to-orange-500',
    },
  ]

  const stats = [
    { number: '10K+', label: 'Active Users', highlight: true },
    { number: '500+', label: 'Enterprise Clients' },
    { number: '99.99%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            About <span className="text-gradient">Our Mission</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re on a mission to revolutionize how businesses manage their operations through innovative technology and exceptional service.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Left side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Founded in 2020, we started with a simple vision: to empower businesses with tools that simplify complex operations and drive growth.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Today, we serve over 10,000 active users across 500+ enterprises worldwide. Our platform has processed millions of transactions and helped businesses save countless hours.
            </p>
            <p className="text-gray-300 leading-relaxed">
              What started as a small team of passionate developers has grown into a global company dedicated to innovation, reliability, and customer success.
            </p>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-xl backdrop-blur-md border transition-all ${
                  stat.highlight
                    ? 'bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <motion.div
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="text-3xl font-black text-gradient mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-400 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${value.color} mb-6 shadow-lg`}
                  >
                    <Icon className="text-white text-2xl" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

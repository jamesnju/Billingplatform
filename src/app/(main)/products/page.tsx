'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

const products = [
  {
    id: 1,
    title: 'PO & Cashbook',
    description: 'Streamlined purchase order management and cash flow tracking. Keep your financial operations organized with real-time insights.',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    features: ['Real-time tracking', 'Automated workflows', 'Multi-currency support'],
    stats: { value: '98%', label: 'Accuracy Rate' },
  },
  {
    id: 2,
    title: 'Subscription Cards',
    description: 'Automated recurring billing and membership management. Simplify your subscription business with powerful payment processing.',
    icon: '💳',
    color: 'from-purple-500 to-pink-500',
    features: ['Auto-renewal', 'Payment retry', 'Churn management'],
    stats: { value: '99.9%', label: 'Uptime' },
  },
  {
    id: 3,
    title: 'Business Analytics',
    description: 'Real-time insights and reporting dashboard. Make data-driven decisions with comprehensive business intelligence.',
    icon: '📈',
    color: 'from-green-500 to-emerald-500',
    features: ['Custom reports', 'Predictive analytics', 'Data visualization'],
    stats: { value: '500ms', label: 'Query Response' },
  },
]

export default function ProductsEnhanced() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="products" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Powerful <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your business operations in one unified platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Glow background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300`}
              />

              {/* Card */}
              <div className="relative glass rounded-2xl p-8 h-full border border-slate-700/50 group-hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
                {/* Top accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView && hoveredId === product.id ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.color} origin-left`}
                />

                {/* Icon */}
                <motion.div
                  animate={hoveredId === product.id ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-6"
                >
                  {product.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">{product.title}</h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="mb-6 space-y-2">
                  {product.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView && hoveredId === product.id ? { opacity: 1, x: 0 } : { opacity: 0.6, x: -10 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-cyan-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView && hoveredId === product.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-r ${product.color} bg-opacity-10 rounded-lg p-4 mb-6 border border-slate-600/50`}
                >
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {product.stats.value}
                  </div>
                  <div className="text-sm text-gray-400">{product.stats.label}</div>
                </motion.div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.05, x: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-pink-500/30 hover:from-cyan-500/60 hover:to-pink-500/60 border-2 border-cyan-400/70 rounded-lg text-cyan-300 font-bold transition-all group/btn shadow-lg hover:shadow-cyan-500/50"
                >
                  🎮 Unlock Feature
                  <motion.div
                    animate={hoveredId === product.id ? { x: 4, rotate: 20 } : { x: 0, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaArrowRight size={16} />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating cards decoration */}
        <div className="mt-20 grid grid-cols-3 gap-6">
          {[
            { label: '10K+', desc: 'Active Users' },
            { label: '99.99%', desc: 'Uptime SLA' },
            { label: '24/7', desc: 'Support Team' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gradient mb-2">{stat.label}</div>
              <div className="text-gray-400">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
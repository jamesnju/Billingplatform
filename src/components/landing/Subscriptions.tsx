'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaCheck, FaStar, FaLock } from 'react-icons/fa'

const subscriptions = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 10 users',
      'Basic PO management',
      'Standard support',
      '5GB storage',
      'Basic analytics',
    ],
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500',
    isPopular: false,
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Most popular for growing businesses',
    features: [
      'Unlimited users',
      'Advanced PO & analytics',
      'Priority support',
      '100GB storage',
      'Custom integrations',
      'Advanced reporting',
    ],
    icon: '⭐',
    color: 'from-purple-500 via-pink-500 to-red-500',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large-scale operations',
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Unlimited storage',
      'Custom workflows',
      'API access',
      'SLA guarantee',
    ],
    icon: '👑',
    color: 'from-amber-500 to-orange-500',
    isPopular: false,
  },
]

export default function Subscriptions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  return (
    <section id="subscriptions" className="py-20 relative overflow-hidden" ref={ref}>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Choose Your <span className="text-gradient">Perfect Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Transparent pricing for every business size. Start free, upgrade when you&apos;re ready.
          </p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-cyan-400/30"
          >
            {['monthly', 'yearly'].map((cycle) => (
              <motion.button
                key={cycle}
                onClick={() => setBillingCycle(cycle as 'monthly' | 'yearly')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-bold transition-all capitalize ${
                  billingCycle === cycle
                    ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cycle}
                {cycle === 'yearly' && <span className="ml-2 text-xs text-yellow-300 font-black">-20%</span>}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptions.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative group ${plan.isPopular ? 'md:scale-105' : ''}`}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
              />

              {/* Card */}
              <div className={`relative glass rounded-2xl p-8 flex flex-col h-full border ${
                plan.isPopular 
                  ? 'border-pink-500/50 ring-2 ring-pink-500/20' 
                  : 'border-slate-700/50'
              }`}>
                {/* Popular badge */}
                {plan.isPopular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <div className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                      <FaStar size={12} />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                {/* Icon */}
                <div className="text-4xl mb-4">{plan.icon}</div>

                {/* Plan name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <motion.div
                  animate={isInView ? { y: 0 } : { y: 20 }}
                  className="mb-8"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price !== 'Custom' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-green-400 font-bold mt-2"
                    >
                      💚 Save 20% annually
                    </motion.p>
                  )}
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-pink-500/50'
                      : 'border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                  }`}
                >
                  Get Started
                </motion.button>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      onMouseEnter={() => setActiveFeature(`${plan.name}-${i}`)}
                      onMouseLeave={() => setActiveFeature(null)}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeFeature === `${plan.name}-${i}`
                          ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={activeFeature === `${plan.name}-${i}` ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                          transition={{ type: 'spring' }}
                        >
                          <FaCheck className="text-cyan-400" size={16} />
                        </motion.div>
                      </div>
                      <motion.span
                        animate={activeFeature === `${plan.name}-${i}` ? { x: 5 } : { x: 0 }}
                        className="text-gray-300 font-medium"
                      >
                        {feature}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ section hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">
            Need more info? <span className="text-cyan-400 cursor-pointer hover:text-pink-500 transition-colors">Check our FAQ</span> or <span className="text-cyan-400 cursor-pointer hover:text-pink-500 transition-colors">contact sales</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// src/components/landing/Products.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ProductCard from '../ui/ProductCard'

const products = [
  {
    title: 'PO & Cashbook',
    description: 'Streamlined purchase order management and cash flow tracking',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Subscription Cards',
    description: 'Automated recurring billing and membership management',
    icon: '💳',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Business Analytics',
    description: 'Real-time insights and reporting dashboard',
    icon: '📈',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="products" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools to manage every aspect of your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
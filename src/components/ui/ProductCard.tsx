// src/components/ui/ProductCard.tsx
'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

interface ProductCardProps {
  product: {
    title: string
    description: string
    icon: string
    color: string
  }
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
    >
      {/* Gradient Border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${product.color} opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{ padding: '2px' }}
      >
        <div className="bg-white rounded-2xl h-full w-full" />
      </div>

      <div className="relative z-10">
        <div className="text-5xl mb-4">{product.icon}</div>
        <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-primary-600 font-semibold group"
          whileHover={{ x: 5 }}
        >
          Learn More
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  )
}
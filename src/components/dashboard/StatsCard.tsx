// src/components/dashboard/StatsCard.tsx
'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface StatsCardProps {
  title: string
  value: string
  icon: IconType
  color: string
  bgColor: string
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
          <Icon className={`${color} text-xl`} />
        </div>
      </div>
    </motion.div>
  )
}
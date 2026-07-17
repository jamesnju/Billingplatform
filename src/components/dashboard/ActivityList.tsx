// src/components/dashboard/ActivityList.tsx
'use client'

import { motion } from 'framer-motion'
import { FaCircle } from 'react-icons/fa'

interface Activity {
  id: number
  user: string
  action: string
  time: string
  type: 'order' | 'subscription' | 'update' | 'payment' | 'team'
}

interface ActivityListProps {
  activities: Activity[]
}

const getTypeColor = (type: string) => {
  const colors = {
    order: 'text-blue-500',
    subscription: 'text-purple-500',
    update: 'text-yellow-500',
    payment: 'text-green-500',
    team: 'text-pink-500',
  }
  return colors[type as keyof typeof colors] || 'text-gray-500'
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3"
        >
          <FaCircle className={`text-xs mt-2 ${getTypeColor(activity.type)}`} />
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-semibold">{activity.user}</span>
              {' '}{activity.action}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
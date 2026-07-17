// src/app/(dashboard)/dashboard/analytics/page.tsx
'use client'

import { useAuth } from '@/src/context/AuthContext'
import { FaDownload } from 'react-icons/fa'

export default function AnalyticsPage() {
  const { isPremium } = useAuth()

  const metrics = [
    { label: 'Total Revenue', value: '$124,567', change: '+12.5%' },
    { label: 'Active Users', value: '1,234', change: '+8.3%' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
    { label: 'Average Order Value', value: '$245', change: '+5.1%' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        {isPremium && (
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <FaDownload />
            Export Data
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-2xl font-bold mt-1">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.change} from last month</p>
          </div>
        ))}
      </div>

      {!isPremium && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-800">Upgrade to Premium</h3>
          <p className="text-blue-600 mt-1">
            Get access to advanced analytics, data export, and more features.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  )
}
// src/app/(dashboard)/dashboard/products/page.tsx
'use client'

import { useAuth } from '@/src/context/AuthContext'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const { isPremium } = useAuth()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products Management</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PO & Cashbook Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">PO & Cashbook</h3>
          <p className="text-gray-600">Manage purchase orders and track cash flow</p>
          <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Manage
          </button>
        </motion.div>

        {/* Subscription Cards Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg relative"
        >
          {!isPremium && (
            <div className="absolute top-4 right-4 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
              Basic Plan
            </div>
          )}
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Subscription Cards</h3>
          <p className="text-gray-600">Automated recurring billing management</p>
          {isPremium ? (
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Manage
            </button>
          ) : (
            <button className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
              Upgrade to Premium
            </button>
          )}
        </motion.div>

        {/* Business Analytics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-xl font-bold mb-2">Business Analytics</h3>
          <p className="text-gray-600">Real-time insights and reporting</p>
          <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            View Analytics
          </button>
        </motion.div>
      </div>
    </div>
  )
}
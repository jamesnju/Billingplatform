// src/app/(dashboard)/dashboard/settings/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/src/context/AuthContext'
import { motion } from 'framer-motion'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Settings updated successfully!')
    setIsLoading(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white rounded-2xl p-8 shadow-lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            {/* <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
            /> */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            {/* <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
            /> */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <select
              defaultValue={user?.accountType}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <FaSave />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.form>
    </div>
  )
}
// src/app/(dashboard)/dashboard/page.tsx
'use client'


import ActivityList from '@/src/components/dashboard/ActivityList'
import Chart from '@/src/components/dashboard/Chart'
import StatsCard from '@/src/components/dashboard/StatsCard'
import { useAuth } from '@/src/context/AuthContext'
import { StatsData, Activity } from '@/src/types'
import { FaDollarSign, FaCreditCard, FaShoppingCart, FaUsers } from 'react-icons/fa'

const statsData: StatsData[] = [
  { title: 'Total Revenue', value: '$124,567', icon: FaDollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
  { title: 'Active Subscriptions', value: '1,234', icon: FaCreditCard, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { title: 'Pending Orders', value: '56', icon: FaShoppingCart, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { title: 'Team Members', value: '12', icon: FaUsers, color: 'text-purple-600', bgColor: 'bg-purple-100' },
]

const recentActivity: Activity[] = [
  { id: 1, user: 'John Doe', action: 'Placed an order', time: '2 minutes ago', type: 'order' },
  { id: 2, user: 'Jane Smith', action: 'Subscribed to Premium', time: '15 minutes ago', type: 'subscription' },
  { id: 3, user: 'Bob Johnson', action: 'Updated profile', time: '1 hour ago', type: 'update' },
  { id: 4, user: 'Alice Brown', action: 'Paid invoice #1234', time: '2 hours ago', type: 'payment' },
  { id: 5, user: 'Charlie Wilson', action: 'Created new team', time: '3 hours ago', type: 'team' },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-gradient">{user?.name || 'User'}!</span>
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
            <Chart />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ActivityList activities={recentActivity} />
          </div>
        </div>
      </div>
    </div>
  )
}
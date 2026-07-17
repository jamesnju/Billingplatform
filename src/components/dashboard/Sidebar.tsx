// src/components/dashboard/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaUser, 
  FaChartLine, 
  FaBox, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useAuth } from '@/src/context/AuthContext'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: FaChartLine },
  { name: 'Products', href: '/dashboard/products', icon: FaBox },
  { name: 'Analytics', href: '/dashboard/analytics', icon: FaChartLine },
  { name: 'Team', href: '/dashboard/team', icon: FaUsers, adminOnly: true },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout, isAdmin } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true)
      await logout()
      toast.success('Logged out successfully')
      setIsLoggingOut(false)
    }
  }

  const filteredNavItems = navItems.filter(
    item => !item.adminOnly || isAdmin
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:relative z-50 w-72 h-full bg-white shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <FaUser className="text-primary-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">{user?.email || ''}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 capitalize">
              {user?.role || 'user'}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700 capitalize">
              {user?.accountType || 'basic'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <FaSignOutAlt size={20} />
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </motion.aside>

      {/* Toggle Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 md:hidden bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
      >
        <FaBars size={20} />
      </button>
    </>
  )
}
'use client'

import { useState, useEffect } from 'react'
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
  FaTimes
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import router from 'next/router'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: FaChartLine },
  { name: 'Products', href: '/products', icon: FaBox },
  { name: 'Analytics', href: '/analytics', icon: FaChartLine },
  { name: 'Team', href: '/team', icon: FaUsers, adminOnly: true },
  { name: 'Settings', href: '/settings', icon: FaCog },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userName] = useState('Alex Johnson')
  const [userEmail] = useState('alex@example.com')
  const [userRole] = useState('admin')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true)
      router.push('/login')
      toast.success('Logged out successfully')
      setTimeout(() => setIsLoggingOut(false), 1000)
    }
  }

  const filteredNavItems = navItems.filter(
    item => !item.adminOnly || userRole === 'admin'
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
        className={`fixed md:relative z-50 w-72 h-full shadow-xl flex flex-col backdrop-blur-md border-r transition-colors ${
          isDark
            ? 'bg-slate-900/95 border-slate-700'
            : 'bg-white/95 border-gray-200'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b transition-colors ${
          isDark ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-cyan-400 to-pink-500`}
              >
                <FaUser className="text-white" />
              </motion.div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userName}
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  {userEmail}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`md:hidden transition-colors ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaTimes />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 text-xs rounded-full font-semibold bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-400 capitalize">
              {userRole}
            </span>
            <span className="px-2 py-1 text-xs rounded-full font-semibold bg-gradient-to-r from-pink-500/20 to-pink-500/10 text-pink-400 capitalize">
              Premium
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <motion.div key={item.name} whileHover={{ x: 4 }}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-400 border-l-2 border-cyan-400'
                        : 'bg-gradient-to-r from-cyan-500/10 to-pink-500/10 text-cyan-600 border-l-2 border-cyan-500'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t transition-colors ${
          isDark ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all ${
              isDark
                ? 'text-red-400 hover:bg-red-500/20 disabled:opacity-50'
                : 'text-red-600 hover:bg-red-50 disabled:opacity-50'
            }`}
          >
            <FaSignOutAlt size={20} />
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </motion.button>
        </div>
      </motion.aside>


    </>
  )
}

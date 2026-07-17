'use client'

import { motion } from 'framer-motion'
import { FaBars, FaMoon, FaSun, FaBell, FaUser } from 'react-icons/fa'
import { useSidebar } from './SidebarContext'
import { useState, useEffect } from 'react'

function NavbarContent() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setIsDark(!isDark)
  }

  if (!mounted) {
    return (
      <div className="h-16 sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700 backdrop-blur-md" />
    )
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark
          ? 'bg-slate-900/80 border-slate-700'
          : 'bg-white/80 border-gray-200'
      }`}
    >
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-800 text-cyan-400'
                : 'hover:bg-gray-100 text-cyan-600'
            }`}
            aria-label="Toggle sidebar"
          >
            <FaBars size={20} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`font-bold text-xl bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent`}
          >
            Dashboard
          </motion.div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors relative ${
              isDark
                ? 'hover:bg-slate-800 text-slate-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="Notifications"
          >
            <FaBell size={18} />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"
            />
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDark
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.div>
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-800 text-slate-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="User profile"
          >
            <FaUser size={18} />
          </motion.button>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <motion.div
        layoutId="navbar-border"
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 opacity-50"
        style={{ width: '100%' }}
      />
    </motion.nav>
  )
}

export default function Navbar() {
  return <NavbarContent />
}

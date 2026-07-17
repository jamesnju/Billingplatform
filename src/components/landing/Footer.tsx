'use client'

import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const quickLinks = [
  { name: 'About', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Press', href: '#' },
]

const resources = [
  { name: 'Documentation', href: '#' },
  { name: 'API Reference', href: '#' },
  { name: 'Community', href: '#' },
  { name: 'Status', href: '#' },
]

const legal = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Policy', href: '#' },
]

const socialLinks = [
  { icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
  { icon: FaLinkedin, href: '#', color: 'hover:text-blue-600' },
  { icon: FaGithub, href: '#', color: 'hover:text-cyan-400' },
  { icon: FaYoutube, href: '#', color: 'hover:text-red-500' },
]

export default function FooterNew() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsLoading(true)
      setTimeout(() => {
        toast.success('Subscribed successfully!')
        setEmail('')
        setIsLoading(false)
      }, 500)
    }
  }

  return (
    <footer className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                ⚡
              </div>
              <span className="text-xl font-bold text-gradient">BusinessSuite</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your business operations with our comprehensive suite of modern tools.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 ${social.color} transition-colors`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#ec4899' }}
                    className="text-gray-400 hover:text-pink-500 transition-colors text-sm"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#ec4899' }}
                    className="text-gray-400 hover:text-pink-500 transition-colors text-sm"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#ec4899' }}
                    className="text-gray-400 hover:text-pink-500 transition-colors text-sm"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates and news delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="px-4 py-2 bg-slate-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                required
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 text-sm font-medium"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 my-8" />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} BusinessSuite. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Sitemap
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Accessibility
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

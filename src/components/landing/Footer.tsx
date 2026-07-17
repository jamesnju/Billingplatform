// src/components/landing/Footer.tsx
'use client'

import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const quickLinks = [
  { name: 'About', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Press', href: '#' },
]

const socialLinks = [
  { icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
  { icon: FaLinkedin, href: '#', color: 'hover:text-blue-600' },
  { icon: FaGithub, href: '#', color: 'hover:text-gray-700' },
  { icon: FaYoutube, href: '#', color: 'hover:text-red-600' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Subscribed successfully!')
      setEmail('')
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-8 h-8 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-xl font-bold">BusinessSuite</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering businesses with modern tools for growth and success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} BusinessSuite. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
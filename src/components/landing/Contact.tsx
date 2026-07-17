'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { FaLinkedinIn, FaTwitter, FaFacebook } from 'react-icons/fa'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'hello@company.com',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Address',
      value: '123 Innovation St, Tech Valley, CA 94040',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FaClock,
      label: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM PST',
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

            {/* Contact cards */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${info.color} flex-shrink-0`}
                      >
                        <Icon className="text-white text-xl" />
                      </motion.div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{info.label}</h4>
                        <p className="text-gray-400">{info.value}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { icon: FaLinkedinIn, color: 'from-blue-500 to-cyan-500' },
                  { icon: FaTwitter, color: 'from-sky-400 to-blue-500' },
                  { icon: FaFacebook, color: 'from-blue-600 to-indigo-600' },
                ].map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${social.color} text-white shadow-lg hover:shadow-xl transition-all`}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <label className="block text-white font-semibold mb-2">Full Name</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all focus:outline-none focus:bg-white/10"
                />
              </motion.div>

              {/* Email field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all focus:outline-none focus:bg-white/10"
                />
              </motion.div>

              {/* Subject field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-white font-semibold mb-2">Subject</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all focus:outline-none focus:bg-white/10"
                />
              </motion.div>

              {/* Message field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-white font-semibold mb-2">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all focus:outline-none focus:bg-white/10 resize-none"
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Send Message
              </motion.button>

              {/* Success message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={submitted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-lg bg-green-500/20 border border-green-400/50 text-green-400 font-semibold text-center"
              >
                Thank you! We&apos;ll get back to you soon.
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-xl overflow-hidden border border-white/10"
        >
          <div className="bg-white/5 backdrop-blur-md h-64 flex items-center justify-center relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-4xl mb-4">📍</div>
              <p className="text-gray-300 font-semibold">
                Tech Valley, California
              </p>
              <p className="text-gray-400 text-sm">
                We&apos;re located at 123 Innovation Street, right in the heart of Silicon Valley
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

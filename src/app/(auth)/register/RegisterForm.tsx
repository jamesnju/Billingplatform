'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'basic',
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, checked, value } = e.target as any
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Update password strength
    if (name === 'password') {
      let strength = 0
      if (value.length >= 8) strength++
      if (/[A-Z]/.test(value)) strength++
      if (/[a-z]/.test(value)) strength++
      if (/[0-9]/.test(value)) strength++
      if (/[!@#$%^&*]/.test(value)) strength++
      setPasswordStrength(strength)
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'from-red-500 to-red-600'
    if (passwordStrength === 3) return 'from-yellow-500 to-yellow-600'
    if (passwordStrength === 4) return 'from-blue-500 to-blue-600'
    return 'from-green-500 to-green-600'
  }

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength === 3) return 'Fair'
    if (passwordStrength === 4) return 'Good'
    return 'Strong'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Welcome to the arena! 🎮', {
        style: {
          background: 'linear-gradient(135deg, #00d9ff 0%, #ec4899 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
        },
      })
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md"
      >
        {/* Main Register Card */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background blur layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-white/10" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4 text-4xl"
              >
                🚀
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Join the Arena</h1>
              <p className="text-pink-300 font-medium">Create your gaming account</p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FaUser className="text-cyan-400/60" size={16} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full pl-12 pr-4 py-2.5 bg-white/5 border-2 border-cyan-400/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-sm"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-cyan-400/60" size={16} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-2.5 bg-white/5 border-2 border-cyan-400/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-sm"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FaLock className="text-pink-400/60" size={16} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full pl-12 pr-4 py-2.5 bg-white/5 border-2 border-pink-400/30 hover:border-pink-400/60 focus:border-pink-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/30 text-sm"
                />
                
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 space-y-1"
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          className={`flex-1 h-1 rounded-full bg-gradient-to-r ${
                            i < passwordStrength ? getStrengthColor() : 'from-gray-600 to-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      Strength: <span className="text-cyan-300 font-semibold">{getStrengthText()}</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FaLock className="text-pink-400/60" size={16} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full pl-12 pr-4 py-2.5 bg-white/5 border-2 border-pink-400/30 hover:border-pink-400/60 focus:border-pink-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/30 text-sm"
                />
              </motion.div>

              {/* Account Type */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/5 border-2 border-purple-400/30 hover:border-purple-400/60 focus:border-purple-400 focus:bg-white/10 rounded-lg text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-sm appearance-none cursor-pointer"
                >
                  <option value="basic" className="bg-slate-900 text-white">Basic Plan - Free</option>
                  <option value="premium" className="bg-slate-900 text-white">Premium Plan - $9.99/mo</option>
                  <option value="pro" className="bg-slate-900 text-white">Pro Plan - $29.99/mo</option>
                </select>
              </motion.div>

              {/* Terms Checkbox */}
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded border-2 border-cyan-400/30 bg-white/5 accent-cyan-400 cursor-pointer"
                />
                <span className="text-xs text-gray-300 group-hover:text-cyan-300 transition-colors">
                  I agree to the{' '}
                  <Link href="#" className="text-cyan-400 hover:underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="#" className="text-cyan-400 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </motion.label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.65 }}
              className="my-6 flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <p className="text-gray-300 text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Floating accent elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
        />
      </motion.div>
    </div>
  )
}

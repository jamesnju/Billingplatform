// src/app/(auth)/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/src/context/AuthContext'
import { toast } from 'react-hot-toast'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  accountType: z.enum(['premium', 'basic']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { register: registerUser } = useAuth()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'basic',
    },
  })

  const password = watch('password')

  const checkPasswordStrength = (pass: string) => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (/[A-Z]/.test(pass)) strength++
    if (/[a-z]/.test(pass)) strength++
    if (/[0-9]/.test(pass)) strength++
    if (/[!@#$%^&*]/.test(pass)) strength++
    return strength
  }

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        accountType: data.accountType,
      })
      toast.success('Registration successful!')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = () => {
    const strength = checkPasswordStrength(password || '')
    if (strength <= 2) return 'bg-red-500'
    if (strength === 3) return 'bg-yellow-500'
    if (strength === 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    const strength = checkPasswordStrength(password || '')
    if (strength <= 2) return 'Weak'
    if (strength === 3) return 'Fair'
    if (strength === 4) return 'Good'
    return 'Strong'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient">Create Account</h1>
            <p className="text-gray-600 mt-2">Start your free trial today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white/50"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white/50"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white/50"
                placeholder="••••••••"
                onChange={(e) => setPasswordStrength(checkPasswordStrength(e.target.value))}
              />
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full ${
                          i < checkPasswordStrength(password) ? getStrengthColor() : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Strength: {getStrengthText()}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white/50"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Type</label>
              <select
                {...register('accountType')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white/50"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
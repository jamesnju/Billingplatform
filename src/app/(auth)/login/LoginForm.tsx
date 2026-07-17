// src/app/(auth)/login/LoginForm.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
 // const from = searchParams?.get('from') || '/dashboard'

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@demo.com',
      password: 'Admin123!',
    },
  })

  // Check for error in URL (from NextAuth)
  useEffect(() => {
    const error = searchParams?.get('error')
    if (error) {
      toast.error('Invalid credentials. Please try again.')
    }
  }, [searchParams])

  // const onSubmit = async (data: LoginFormData) => {
  //   setIsLoading(true)
  //   setShake(false)

  //   try {
  //     const result = await signIn('credentials', {
  //       email: data.email,
  //       password: data.password,
  //       redirect: false,
  //     })

  //     if (result?.error) {
  //       setShake(true)
  //       setTimeout(() => setShake(false), 500)
  //       toast.error('Invalid email or password')
  //       return
  //     }

  //     toast.success('Welcome back! 🎮', {
  //       style: {
  //         background: 'linear-gradient(135deg, #00d9ff 0%, #ec4899 100%)',
  //         color: 'white',
  //         border: 'none',
  //         borderRadius: '12px',
  //         fontSize: '14px',
  //         fontWeight: 'bold',
  //       },
  //     })
  //     //router.push(from)
  //     router.refresh()
  //   } catch (error) {
  //     setShake(true)
  //     setTimeout(() => setShake(false), 500)
  //     toast.error('An error occurred. Please try again.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md"
      >
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
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4 text-4xl"
              >
                🎮
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Level Up</h1>
              <p className="text-cyan-300 font-medium">Sign in to your gaming suite</p>
            </motion.div>

            {/* Form */}
            <motion.form
              //sonSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="text-cyan-400/60" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-cyan-400/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="text-pink-400/60" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-pink-400/30 hover:border-pink-400/60 focus:border-pink-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/30"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 rounded border-2 border-cyan-400/30 bg-white/5 accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-gray-300 group-hover:text-cyan-300 transition-colors">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading level...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5 }}
              className="my-6 flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-center"
            >
              <p className="text-gray-300 text-sm">
                New player?{' '}
                <Link
                  href="/register"
                  className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                >
                  Create account
                </Link>
              </p>
            </motion.div>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
            >
              <p className="text-xs text-gray-300 font-semibold mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-gray-400 font-mono">
                <p>Admin: <span className="text-cyan-300">admin@demo.com</span> / <span className="text-pink-300">Admin123!</span></p>
                <p>User: <span className="text-cyan-300">user@demo.com</span> / <span className="text-pink-300">User123!</span></p>
              </div>
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

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function LoginForm() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [shake, setShake] = useState(false)
//   const [formData, setFormData] = useState({
//     email: 'admin@demo.com',
//     password: 'Admin123!',
//     rememberMe: false,
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, checked, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setShake(false)

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       toast.success('Welcome back! 🎮', {
//         style: {
//           background: 'linear-gradient(135deg, #00d9ff 0%, #ec4899 100%)',
//           color: 'white',
//           border: 'none',
//           borderRadius: '12px',
//           fontSize: '14px',
//           fontWeight: 'bold',
//         },
//       })
//     } catch (error) {
//       setShake(true)
//       setTimeout(() => setShake(false), 500)
//       toast.error('Invalid credentials')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
//         className="w-full max-w-md"
//       >
//         {/* Main Login Card */}
//         <div className="relative rounded-2xl overflow-hidden">
//           {/* Background blur layers */}
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-white/10" />

//           {/* Content */}
//           <div className="relative z-10 p-8 md:p-10">
//             {/* Header */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-center mb-8"
//             >
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//                 className="inline-block mb-4 text-4xl"
//               >
//                 🎮
//               </motion.div>
//               <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Level Up</h1>
//               <p className="text-cyan-300 font-medium">Sign in to your gaming suite</p>
//             </motion.div>

//             {/* Form */}
//             <motion.form
//               onSubmit={handleSubmit}
//               className="space-y-5"
//               animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
//               transition={{ duration: 0.3 }}
//             >
//               {/* Email Field */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="relative"
//               >
//                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//                   <FaEnvelope className="text-cyan-400/60" size={18} />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your@email.com"
//                   className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-cyan-400/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
//                 />
//               </motion.div>

//               {/* Password Field */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.35 }}
//                 className="relative"
//               >
//                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//                   <FaLock className="text-pink-400/60" size={18} />
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-pink-400/30 hover:border-pink-400/60 focus:border-pink-400 focus:bg-white/10 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/30"
//                 />
//               </motion.div>

//               {/* Remember Me & Forgot Password */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center justify-between text-sm"
//               >
//                 <label className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     name="rememberMe"
//                     checked={formData.rememberMe}
//                     onChange={handleChange}
//                     className="w-4 h-4 rounded border-2 border-cyan-400/30 bg-white/5 accent-cyan-400 cursor-pointer"
//                   />
//                   <span className="text-gray-300 group-hover:text-cyan-300 transition-colors">Remember me</span>
//                 </label>
//                 <Link
//                   href="#"
//                   className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
//                 >
//                   Forgot password?
//                 </Link>
//               </motion.div>

//               {/* Submit Button */}
//               <motion.button
//                 type="submit"
//                 disabled={isLoading}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.45 }}
//                 whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
//                 whileTap={!isLoading ? { scale: 0.98 } : {}}
//                 className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2 group"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Loading level...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </motion.button>
//             </motion.form>

//             {/* Divider */}
//             <motion.div
//               initial={{ opacity: 0, scaleX: 0 }}
//               animate={{ opacity: 1, scaleX: 1 }}
//               transition={{ delay: 0.5 }}
//               className="my-6 flex items-center gap-4"
//             >
//               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//               <span className="text-xs text-gray-400 font-medium">OR</span>
//               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//             </motion.div>

//             {/* Sign Up Link */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.55 }}
//               className="text-center"
//             >
//               <p className="text-gray-300 text-sm">
//                 New player?{' '}
//                 <Link
//                   href="/register"
//                   className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
//                 >
//                   Create account
//                 </Link>
//               </p>
//             </motion.div>

//             {/* Demo Credentials */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
//             >
//               <p className="text-xs text-gray-300 font-semibold mb-2">Demo Credentials:</p>
//               <div className="space-y-1 text-xs text-gray-400 font-mono">
//                 <p>Admin: <span className="text-cyan-300">admin@demo.com</span> / <span className="text-pink-300">Admin123!</span></p>
//                 <p>User: <span className="text-cyan-300">user@demo.com</span> / <span className="text-pink-300">User123!</span></p>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Floating accent elements */}
//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 4, repeat: Infinity }}
//           className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
//         />
//         <motion.div
//           animate={{ y: [0, 20, 0] }}
//           transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
//           className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
//         />
//       </motion.div>
//     </div>
//   )
// }

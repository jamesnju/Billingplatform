'use client'

import { Suspense } from 'react'
import LoginForm from './LoginForm'
import AnimatedBackground from '@/src/components/ui/AnimatedBackground'
import InteractiveEffects from '@/src/components/ui/InteractiveEffects'

export default function LoginPage() {
  return (
    <>
      <AnimatedBackground />
      <InteractiveEffects />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent shadow-lg shadow-cyan-400/50"></div>
              <p className="mt-4 text-cyan-300 font-semibold">Loading experience...</p>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </>
  )
}

// src/components/providers/Providers.tsx
'use client'

import { AuthProvider } from '@/src/context/AuthContext'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  )
}
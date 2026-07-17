// src/context/AuthContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { RegisterData } from '../types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  isAdmin: boolean
  isPremium: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser({
        id: session.user.id || '1',
        name: session.user.name || '',
        email: session.user.email || '',
        role: (session.user as any).role || 'user',
        accountType: (session.user as any).accountType || 'basic',
      })
    } else if (status === 'unauthenticated') {
      setUser(null)
    }
    setIsLoading(status === 'loading')
  }, [session, status])

  const login = async (email: string, password: string) => {
    // This is now handled directly in the login page with signIn
    // We keep this for compatibility
    throw new Error('Use signIn from next-auth/react directly')
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      // Redirect to login after registration
      router.push('/login?registered=true')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await signOut({ redirect: false })
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isPremium: user?.accountType === 'premium',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
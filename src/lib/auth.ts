// src/lib/auth.ts

import { User } from "../types"

const DEMO_USERS = {
  'admin@demo.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: 'admin' as const,
    accountType: 'premium' as const,
    password: 'Admin123!',
  },
  'user@demo.com': {
    id: '2',
    name: 'Regular User',
    email: 'user@demo.com',
    role: 'user' as const,
    accountType: 'basic' as const,
    password: 'User123!',
  },
}

export const validateCredentials = (email: string, password: string): User | null => {
  const user = DEMO_USERS[email as keyof typeof DEMO_USERS]
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export const registerUser = (data: {
  name: string
  email: string
  password: string
  accountType: 'premium' | 'basic'
}): User => {
  return {
    id: Date.now().toString(),
    name: data.name,
    email: data.email,
    role: 'user',
    accountType: data.accountType,
  }
}
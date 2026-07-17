// src/types/next-auth.d.ts
import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: 'admin' | 'user'
    accountType: 'premium' | 'basic'
  }

  interface Session {
    user: {
      id: string
      role: 'admin' | 'user'
      accountType: 'premium' | 'basic'
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'admin' | 'user'
    accountType: 'premium' | 'basic'
  }
}
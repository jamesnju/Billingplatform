// src/app/api/auth/[...nextauth]/route.ts
import { AuthUser } from '@/src/types'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const DEMO_USERS: AuthUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: 'admin',
    accountType: 'premium',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@demo.com',
    role: 'user',
    accountType: 'basic',
  },
]

// Hardcoded passwords for demo
const DEMO_PASSWORDS: Record<string, string> = {
  'admin@demo.com': 'Admin123!',
  'user@demo.com': 'User123!',
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user exists
        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email
        )

        if (!user) {
          return null
        }

        // Check password
        const expectedPassword = DEMO_PASSWORDS[credentials.email]
        if (credentials.password !== expectedPassword) {
          return null
        }

        // Return user without password
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          accountType: user.accountType,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.accountType = user.accountType
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'admin' | 'user'
        session.user.accountType = token.accountType as 'premium' | 'basic'
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect back to login on error
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }
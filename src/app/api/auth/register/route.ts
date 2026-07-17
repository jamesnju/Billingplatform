// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, accountType } = body

    // Simple validation
    if (!name || !email || !password || !accountType) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // In a real app, you'd save to database
    // For demo, we just return success
    return NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: Date.now().toString(),
          name,
          email,
          role: 'user',
          accountType,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email(),
})

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format',
        },
        { status: 400 }
      )
    }
    
    const { email } = validation.data
    
    // Verify admin email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Token valid for 7 days
    
    // Store session
    const { error } = await supabase
      .from('admin_sessions')
      .insert({
        email,
        token,
        expires_at: expiresAt.toISOString(),
      })
    
    if (error) {
      console.error('Error creating session:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create session' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: {
        token,
        expires_at: expiresAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Error in POST /api/admin/login:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

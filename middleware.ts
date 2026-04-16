import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Protected admin routes
const ADMIN_ROUTES = ['/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if accessing admin routes
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route))
  
  if (isAdminRoute) {
    // Get token from cookies or authorization header
    const token = request.cookies.get('admin_token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      // Redirect to home if no token
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Verify token
    const { data: session } = await supabase
      .from('admin_sessions')
      .select('*')
      .eq('token', token)
      .single()
    
    if (!session || new Date(session.expires_at) < new Date()) {
      // Token invalid or expired, redirect to home
      const response = NextResponse.redirect(new URL('/', request.url))
      response.cookies.delete('admin_token')
      return response
    }
    
    // Token valid, allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/admin/settings - Get all site settings
export async function GET(request: NextRequest) {
  try {
    // Public endpoint - no auth required for reading
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
    
    if (error) {
      console.error('Error fetching settings:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch settings' },
        { status: 500 }
      )
    }
    
    // Convert array to object
    const settingsObject = settings?.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, unknown>) || {}
    
    return NextResponse.json({
      success: true,
      data: settingsObject,
    })
  } catch (error) {
    console.error('Error in GET /api/admin/settings:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/settings - Update site settings (Admin only)
export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const token = authHeader.split(' ')[1]
    const { data: session } = await supabase
      .from('admin_sessions')
      .select('*')
      .eq('token', token)
      .single()
    
    if (!session || new Date(session.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // Validate that body is an object
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }
    
    // Update each setting
    const updates = Object.entries(body).map(async ([key, value]) => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value: value as Record<string, unknown>,
          updated_at: new Date().toISOString(),
        })
      
      if (error) {
        console.error(`Error updating setting ${key}:`, error)
        throw error
      }
    })
    
    await Promise.all(updates)
    
    // Fetch updated settings
    const { data: updatedSettings } = await supabase
      .from('site_settings')
      .select('*')
    
    const settingsObject = updatedSettings?.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, unknown>) || {}
    
    return NextResponse.json({
      success: true,
      data: settingsObject,
      message: 'Settings updated successfully',
    })
  } catch (error) {
    console.error('Error in PUT /api/admin/settings:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Validation schema for review
const reviewSchema = z.object({
  product_id: z.string().uuid(),
  reviewer_name: z.string().min(1, 'Name is required'),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
})

// POST /api/reviews - Create a new review (Public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = reviewSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error',
          details: validation.error.errors 
        },
        { status: 400 }
      )
    }
    
    const { product_id, reviewer_name, rating, comment } = validation.data
    
    // Verify product exists
    const { data: product } = await supabase
      .from('products')
      .select('id')
      .eq('id', product_id)
      .eq('is_active', true)
      .single()
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Create review (pending approval)
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        product_id,
        reviewer_name,
        rating,
        comment: comment || null,
        is_approved: false,
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating review:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to submit review' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: review,
        message: 'Review submitted successfully. It will be visible after approval.' 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

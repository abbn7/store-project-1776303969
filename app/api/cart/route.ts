import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const FREE_SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 10

// Validation schema for cart item
const cartItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1),
})

// GET /api/cart - Get cart details (from cookies/localStorage, this is a helper endpoint)
export async function GET(request: NextRequest) {
  try {
    // This endpoint returns shipping and pricing info
    // Actual cart data is stored client-side in localStorage
    
    return NextResponse.json({
      success: true,
      data: {
        shipping_threshold: FREE_SHIPPING_THRESHOLD,
        shipping_cost: SHIPPING_COST,
      },
    })
  } catch (error) {
    console.error('Error in GET /api/cart:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cart/validate - Validate cart items and get current prices
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body
    
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid cart items' },
        { status: 400 }
      )
    }
    
    // Get product IDs
    const productIds = items.map((item: { product_id: string }) => item.product_id)
    
    // Fetch current product data
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, price, compare_at_price, images, stock, is_active')
      .in('id', productIds)
      .eq('is_active', true)
    
    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to validate cart' },
        { status: 500 }
      )
    }
    
    // Create product map
    const productMap = new Map(products?.map(p => [p.id, p]) || [])
    
    // Validate each item
    const validatedItems = []
    const errors = []
    
    for (const item of items) {
      const product = productMap.get(item.product_id)
      
      if (!product) {
        errors.push({
          product_id: item.product_id,
          error: 'Product not found or no longer available',
        })
        continue
      }
      
      if (product.stock < item.quantity) {
        errors.push({
          product_id: item.product_id,
          error: `Only ${product.stock} items available`,
          available_stock: product.stock,
        })
      }
      
      validatedItems.push({
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        quantity: Math.min(item.quantity, product.stock),
        image: product.images?.[0] || '',
        stock: product.stock,
        subtotal: product.price * Math.min(item.quantity, product.stock),
      })
    }
    
    // Calculate summary
    const subtotal = validatedItems.reduce((sum, item) => sum + item.subtotal, 0)
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
    const total = subtotal + shipping
    
    return NextResponse.json({
      success: true,
      data: {
        items: validatedItems,
        summary: {
          subtotal,
          shipping,
          discount: 0,
          total,
          item_count: validatedItems.reduce((sum, item) => sum + item.quantity, 0),
        },
        errors: errors.length > 0 ? errors : undefined,
      },
    })
  } catch (error) {
    console.error('Error in POST /api/cart:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

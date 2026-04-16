export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_at_price: number | null
  discount_percentage: number
  images: string[]
  category_id: string | null
  category?: Category
  tags: string[]
  stock: number
  is_featured: boolean
  is_active: boolean
  metadata: Record<string, unknown>
  rating?: number
  reviews_count?: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image_url: string | null
  display_order: number
  is_active: boolean
  products_count?: number
  created_at?: string
}

export interface ProductFilters {
  category?: string
  min_price?: number
  max_price?: number
  tags?: string[]
  in_stock?: boolean
  featured?: boolean
}

export interface ProductSort {
  field: 'created_at' | 'price' | 'name' | 'popularity'
  direction: 'asc' | 'desc'
}

export interface ProductQueryParams {
  page?: number
  limit?: number
  sort?: string
  category?: string
  search?: string
  featured?: boolean
  min_price?: number
  max_price?: number
}

export interface ProductListResponse {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

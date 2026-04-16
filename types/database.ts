export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          compare_at_price: number | null
          discount_percentage: number
          images: string[]
          category_id: string | null
          tags: string[]
          stock: number
          is_featured: boolean
          is_active: boolean
          metadata: Record<string, unknown>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string
          description?: string | null
          price: number
          compare_at_price?: number | null
          discount_percentage?: number
          images?: string[]
          category_id?: string | null
          tags?: string[]
          stock?: number
          is_featured?: boolean
          is_active?: boolean
          metadata?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          discount_percentage?: number
          images?: string[]
          category_id?: string | null
          tags?: string[]
          stock?: number
          is_featured?: boolean
          is_active?: boolean
          metadata?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          image_url: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string
          image_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          image_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: Record<string, unknown>
          updated_at: string
        }
        Insert: {
          key: string
          value: Record<string, unknown>
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Record<string, unknown>
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          reviewer_name: string
          rating: number
          comment: string | null
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          reviewer_name: string
          rating: number
          comment?: string | null
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          reviewer_name?: string
          rating?: number
          comment?: string | null
          is_approved?: boolean
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
        }
      }
      admin_sessions: {
        Row: {
          id: string
          email: string
          token: string
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          token: string
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          token?: string
          expires_at?: string
          created_at?: string
        }
      }
    }
  }
}

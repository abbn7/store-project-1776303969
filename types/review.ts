export interface Review {
  id: string
  product_id: string
  reviewer_name: string
  rating: number
  comment: string | null
  is_approved: boolean
  created_at: string
}

export interface ReviewStats {
  average_rating: number
  total_reviews: number
  rating_breakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface CreateReviewInput {
  product_id: string
  reviewer_name: string
  rating: number
  comment?: string
}

export interface ReviewListResponse {
  reviews: Review[]
  stats: ReviewStats
}

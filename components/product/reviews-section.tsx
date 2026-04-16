'use client'

import { useState } from 'react'
import { Review } from '@/types'
import { formatDate } from '@/lib/utils'
import { Star } from 'lucide-react'

interface ReviewsSectionProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function ReviewsSection({ reviews, averageRating, totalReviews }: ReviewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(3)

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: totalReviews > 0
      ? (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100
      : 0,
  }))

  const visibleReviews = reviews.slice(0, visibleCount)

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-surface rounded-2xl">
        {/* Average Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center md:justify-start gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(averageRating)
                    ? 'fill-gold text-gold'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-muted text-sm">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm w-8">{rating}★</span>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted w-10 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="font-medium text-accent">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{review.reviewer_name}</p>
                  <p className="text-sm text-muted">{formatDate(review.created_at)}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-gold text-gold' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              {review.comment && (
                <p className="text-foreground">{review.comment}</p>
              )}
            </div>
          ))}

          {/* Load More */}
          {visibleCount < reviews.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="text-accent hover:underline text-sm"
            >
              Load more reviews
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  )
}

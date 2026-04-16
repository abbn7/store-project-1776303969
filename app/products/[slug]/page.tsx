import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Product } from '@/types'
import { ImageGallery } from '@/components/product/image-gallery'
import { ReviewsSection } from '@/components/product/reviews-section'
import { ScrollReveal } from '@/components/animation/scroll-reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Check, Truck, RotateCcw, Shield } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160),
  }
}

export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true)

  return (products || []).map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(*), reviews:reviews(*)')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!product) {
    notFound()
  }

  const discount = calculateDiscount(product.price, product.compare_at_price || 0)
  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock < 10

  // Get approved reviews
  const approvedReviews = product.reviews?.filter((r: { is_approved: boolean }) => r.is_approved) || []
  const averageRating = approvedReviews.length > 0
    ? approvedReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / approvedReviews.length
    : 0

  // Get related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('id, name, slug, price, compare_at_price, images, discount_percentage')
    .eq('category_id', product.category_id)
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(4)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-8">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Products</span>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <span>{product.category.name}</span>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <ScrollReveal>
            <ImageGallery images={product.images} productName={product.name} />
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              {/* Category */}
              {product.category && (
                <Badge variant="secondary">{product.category.name}</Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

              {/* Rating */}
              {approvedReviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.round(averageRating) ? 'text-gold' : 'text-muted'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted">
                    {averageRating.toFixed(1)} ({approvedReviews.length} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <>
                    <span className="text-xl text-muted line-through">
                      {formatPrice(product.compare_at_price)}
                    </span>
                    <Badge variant="default" className="bg-accent text-white">
                      Save {discount}%
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {isOutOfStock ? (
                  <Badge variant="destructive">Out of Stock</Badge>
                ) : isLowStock ? (
                  <Badge variant="warning">Only {product.stock} left in stock!</Badge>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>In Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-muted leading-relaxed">{product.description}</p>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add to Cart */}
              <div className="pt-4">
                <Button
                  className="w-full md:w-auto btn-primary px-12 py-4 text-lg"
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Truck className="w-5 h-5" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <RotateCcw className="w-5 h-5" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Shield className="w-5 h-5" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Reviews Section */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <ReviewsSection
              reviews={approvedReviews}
              averageRating={averageRating}
              totalReviews={approvedReviews.length}
            />
          </div>
        </ScrollReveal>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <ScrollReveal>
            <div>
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct: any) => (
                  <a
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-surface mb-4">
                      <img
                        src={relatedProduct.images[0] || '/images/placeholder.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-accent transition-colors line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-muted">{formatPrice(relatedProduct.price)}</p>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

import { createClient } from '@supabase/supabase-js'
import { Hero } from '@/components/home/hero'
import { FeaturedCategories } from '@/components/home/featured-categories'
import { FeaturedProducts } from '@/components/home/featured-products'
import { WhyUs } from '@/components/home/why-us'
import { SocialProof } from '@/components/home/social-proof'
import { Newsletter } from '@/components/home/newsletter'
import { TrustBadges } from '@/components/marketing/trust-badges'
import { Marquee } from '@/components/animation/marquee'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const metadata = {
  title: 'Store - Premium Shopping Experience',
  description: 'Discover amazing products at great prices. Premium quality, fast shipping, and excellent customer service.',
}

export const revalidate = 60

export default async function HomePage() {
  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
    .limit(4)

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  // Fetch new arrivals
  const { data: newArrivals } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <section className="py-8 bg-surface border-y border-border">
        <div className="container-custom">
          <TrustBadges />
        </div>
      </section>

      {/* Featured Categories */}
      <FeaturedCategories categories={categories || []} />

      {/* Marquee Banner */}
      <section className="py-6 bg-primary text-white overflow-hidden">
        <Marquee speed="slow">
          <span className="mx-8 text-lg font-medium">Free Shipping on Orders Over $50</span>
          <span className="mx-8 text-lg font-medium">•</span>
          <span className="mx-8 text-lg font-medium">24/7 Customer Support</span>
          <span className="mx-8 text-lg font-medium">•</span>
          <span className="mx-8 text-lg font-medium">30-Day Easy Returns</span>
          <span className="mx-8 text-lg font-medium">•</span>
          <span className="mx-8 text-lg font-medium">Premium Quality Products</span>
          <span className="mx-8 text-lg font-medium">•</span>
        </Marquee>
      </section>

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts || []} />

      {/* Why Us */}
      <WhyUs />

      {/* New Arrivals */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                New Arrivals
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                Check out our latest products fresh from the warehouse
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-background mb-4">
                    <img
                      src={product.images[0] || '/images/placeholder.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-accent uppercase tracking-wide mb-1">New</p>
                  <h3 className="font-medium group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Proof */}
      <SocialProof />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

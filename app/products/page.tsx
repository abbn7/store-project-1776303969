import { Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ProductGrid } from '@/components/store/product-grid'
import { Skeleton } from '@/components/ui/skeleton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of premium products.',
}

export const revalidate = 60

async function ProductsList() {
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return <ProductGrid products={products || []} />
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
          <p className="text-muted max-w-xl">
            Browse our complete collection of premium products. Filter by category, price, and more.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] rounded-xl" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          }
        >
          <ProductsList />
        </Suspense>
      </div>
    </div>
  )
}

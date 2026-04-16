'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { ProductGrid } from '@/components/store/product-grid'
import { ScrollReveal } from '@/components/animation/scroll-reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-muted max-w-xl">
                Handpicked selection of our best products, chosen for quality and value
              </p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="outline" className="btn-outline gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  )
}

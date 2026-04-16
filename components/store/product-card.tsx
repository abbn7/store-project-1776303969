'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store'
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

// ✨ إضافة Wishlist functionality
function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId)
  }, [wishlist])

  return { toggleWishlist, isInWishlist }
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const discount = calculateDiscount(product.price, product.compare_at_price || 0)
  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock < 10
  const inWishlist = isInWishlist(product.id)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isOutOfStock || isAdding) return

    setIsAdding(true)

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    addItem({
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images[0] || '',
      stock: product.stock,
    })

    setIsAdding(false)
    setJustAdded(true)

    setTimeout(() => {
      setJustAdded(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface mb-4">
          {/* Product Image */}
          <Image
            src={product.images[0] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              isHovered && 'scale-105'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="default" className="bg-accent text-white">
                -{discount}%
              </Badge>
            )}
            {product.is_featured && (
              <Badge variant="gold">Featured</Badge>
            )}
            {isOutOfStock && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
            {isLowStock && (
              <Badge variant="warning">Only {product.stock} left</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full transition-all',
              inWishlist
                ? 'bg-accent text-white'
                : 'bg-white hover:bg-accent hover:text-white'
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                'w-5 h-5',
                inWishlist && 'fill-current'
              )}
            />
          </motion.button>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-x-3 bottom-3 flex gap-2"
          >
            <Button
              onClick={handleQuickAdd}
              disabled={isOutOfStock || isAdding}
              className={cn(
                'flex-1 gap-2 transition-all',
                justAdded && 'bg-green-600 hover:bg-green-600'
              )}
              size="sm"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </Button>
            <button
              className="p-2 bg-white rounded-lg hover:bg-surface transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {product.category?.name && (
            <p className="text-xs text-muted uppercase tracking-wide">
              {product.category.name}
            </p>
          )}
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          {/* Rating Preview */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.round(product.rating || 0)
                        ? 'text-gold'
                        : 'text-muted'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted">
                ({product.reviews_count || 0})
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

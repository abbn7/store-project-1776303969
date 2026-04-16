'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/ui/quantity-selector'
import { ShoppingBag, Trash2, ArrowRight, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSummary, clearCart } = useCartStore()
  const summary = getSummary()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-20 h-20 text-muted mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted mb-8">Add some products to get started</p>
          <Link href="/products">
            <Button className="btn-primary gap-2">
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted">
                {summary.item_count} {summary.item_count === 1 ? 'item' : 'items'} in cart
              </p>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-4 p-4 bg-surface rounded-xl"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden bg-background flex-shrink-0"
                  >
                    <Image
                      src={item.image || '/images/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-medium hover:text-accent transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-muted text-sm mt-1">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.product_id, qty)}
                        max={item.stock}
                      />
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="p-2 text-muted hover:text-red-500 transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>
                    {summary.shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(summary.shipping)
                    )}
                  </span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Discount</span>
                    <span>-{formatPrice(summary.discount)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(summary.total)}</span>
                  </div>
                </div>
              </div>

              {summary.shipping > 0 && (
                <p className="text-sm text-muted mt-4">
                  Add {formatPrice(50 - summary.subtotal)} more for free shipping!
                </p>
              )}

              <Button className="w-full btn-primary gap-2 mt-6 py-4">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Link href="/products">
                <Button variant="outline" className="w-full btn-outline mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

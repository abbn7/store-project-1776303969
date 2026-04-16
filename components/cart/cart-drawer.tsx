'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/ui/quantity-selector'
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react'

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getSummary } = useCartStore()
  const summary = getSummary()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-dramatic flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
                  {summary.item_count}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted mb-6">Discover amazing products and add them to your cart</p>
                  <Link href="/products" onClick={() => setCartOpen(false)}>
                    <Button className="btn-primary gap-2">
                      <Sparkles className="w-4 h-4" />
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.product_id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 bg-surface rounded-xl"
                    >
                      {/* Image */}
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="relative w-20 h-20 rounded-lg overflow-hidden bg-background flex-shrink-0"
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
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-medium text-sm hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted mt-1">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(qty) => updateQuantity(item.product_id, qty)}
                            max={item.stock}
                          />
                          <button
                            onClick={() => removeItem(item.product_id)}
                            className="p-2 text-muted hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span>{formatPrice(summary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span>
                      {summary.shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
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
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(summary.total)}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {summary.shipping > 0 && (
                  <div className="bg-accent/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-foreground">
                        Add {formatPrice(50 - summary.subtotal)} more for free shipping!
                      </span>
                    </div>
                    <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((summary.subtotal / 50) * 100, 100)}%` }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <Button className="w-full btn-primary gap-2 py-4">
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-sm text-muted hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Truck, Shield, Check } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getSummary } = useCartStore()
  const summary = getSummary()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted mb-8">Add some products to proceed to checkout</p>
          <a href="/products">
            <Button className="btn-primary">Browse Products</Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" required />
                  <Input label="Last Name" required />
                  <Input type="email" label="Email" className="md:col-span-2" required />
                  <Input type="tel" label="Phone" className="md:col-span-2" required />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <Input label="Street Address" required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="City" required />
                    <Input label="State/Province" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="ZIP/Postal Code" required />
                    <Input label="Country" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-accent rounded-lg bg-accent/5">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-accent bg-accent flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted">
                    Pay when your order arrives. Our delivery partner will collect the payment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-muted">Qty: {item.quantity}</p>
                      </div>
                      <p>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm border-t border-border pt-4">
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
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(summary.total)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Shield className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                </div>

                <Button className="w-full btn-primary mt-6 py-4">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

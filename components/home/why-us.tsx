'use client'

import { ScrollReveal } from '@/components/animation/scroll-reveal'
import { Truck, Shield, RotateCcw, Award } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your payment information is encrypted and secure. Shop with confidence.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Not satisfied? Return within 30 days for a full refund, no questions asked.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We source only the best products from trusted suppliers worldwide.',
  },
]

export function WhyUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              We&apos;re committed to providing the best shopping experience with quality products and excellent service
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-surface hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

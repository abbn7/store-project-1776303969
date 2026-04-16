'use client'

import { ScrollReveal } from '@/components/animation/scroll-reveal'
import { CounterUp } from '@/components/animation/counter-up'
import { Star, Users, Package, ThumbsUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Happy Customers',
  },
  {
    icon: Package,
    value: 100000,
    suffix: '+',
    label: 'Orders Delivered',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '',
    label: 'Average Rating',
    isDecimal: true,
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
  },
]

export function SocialProof() {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Join our growing community of satisfied customers who trust us for their shopping needs
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.isDecimal ? (
                    <span>{stat.value}</span>
                  ) : (
                    <CounterUp end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

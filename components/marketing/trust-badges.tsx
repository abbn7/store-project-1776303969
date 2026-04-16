import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
  },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((badge) => (
        <div key={badge.title} className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
            <badge.icon className="w-6 h-6 text-accent" />
          </div>
          <h4 className="font-medium text-sm">{badge.title}</h4>
          <p className="text-xs text-muted mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}

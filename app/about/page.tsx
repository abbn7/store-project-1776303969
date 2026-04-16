import Image from 'next/image'
import { ScrollReveal } from '@/components/animation/scroll-reveal'
import { CounterUp } from '@/components/animation/counter-up'
import { Award, Users, Globe, Heart } from 'lucide-react'

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our story, mission, and values.',
}

const stats = [
  { value: 2018, label: 'Founded', suffix: '' },
  { value: 50000, label: 'Happy Customers', suffix: '+' },
  { value: 1000, label: 'Products', suffix: '+' },
  { value: 50, label: 'Team Members', suffix: '+' },
]

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do. Your satisfaction is our top priority.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'We source only the best products from trusted suppliers worldwide.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'We ship to customers all around the world, bringing quality products to your doorstep.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We believe in building a community of happy customers who love our products.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="container-custom mb-16">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Founded in 2018, we started with a simple mission: to provide high-quality products 
              at affordable prices while delivering exceptional customer service. What began as a 
              small online store has grown into a trusted destination for thousands of customers worldwide.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-16 mb-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.value >= 1000 ? (
                      <CounterUp end={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span>{stat.value}{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-white/70">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-custom mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface">
              <Image
                src="/images/about-mission.jpg"
                alt="Our mission"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted leading-relaxed mb-4">
                We believe that everyone deserves access to high-quality products without breaking the bank. 
                Our mission is to curate the best products from around the world and make them accessible 
                to customers everywhere.
              </p>
              <p className="text-muted leading-relaxed">
                We are committed to sustainability, ethical sourcing, and building lasting relationships 
                with our customers and suppliers. Every product we sell is carefully selected to meet 
                our high standards of quality and value.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-16 mb-16">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted max-w-xl mx-auto">
                These core principles guide everything we do
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="bg-background p-6 rounded-2xl text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted text-sm">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-muted max-w-xl mx-auto">
              The passionate people behind our success
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'John Doe', role: 'Founder & CEO' },
            { name: 'Jane Smith', role: 'Head of Operations' },
            { name: 'Mike Johnson', role: 'Customer Success' },
          ].map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.1}>
              <div className="text-center">
                <div className="w-32 h-32 bg-surface rounded-full mx-auto mb-4" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-muted text-sm">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

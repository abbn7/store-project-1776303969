'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/store'
import {
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

const footerLinks = {
  shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?featured=true', label: 'Featured' },
    { href: '/products?category=new', label: 'New Arrivals' },
    { href: '/products?category=sale', label: 'Sale' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [loginError, setLoginError] = useState('')
  const { login } = useAdminStore()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail }),
      })

      const data = await response.json()

      if (data.success) {
        login(data.data.token, data.data.expires_at)
        window.location.href = '/admin'
      } else {
        setLoginError(data.error || 'Invalid email')
      }
    } catch {
      setLoginError('Something went wrong')
    }
  }

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Store</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Discover amazing products at great prices. Premium quality, fast shipping, and excellent customer service.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/message/64L5CHSAIA2DA1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4" />
                contact@store.com
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4" />
                123 Store Street, City
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Store. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Crafted with precision by{' '}
            <a
              href="https://wa.me/message/64L5CHSAIA2DA1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Abdelhaned Nada
            </a>
          </p>
        </div>
      </div>

      {/* Secret Admin Button */}
      <button
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-4 right-4 w-2 h-2 bg-transparent hover:bg-white/10 rounded-full transition-colors"
        aria-label="Admin access"
      />

      {/* Admin Login Modal */}
      <Modal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false)
          setAdminEmail('')
          setLoginError('')
        }}
        title="Admin Access"
        description="Enter admin email to access dashboard"
      >
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="admin@example.com"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            error={loginError}
            required
          />
          <Button type="submit" className="w-full btn-primary">
            Access Dashboard
          </Button>
        </form>
      </Modal>
    </footer>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, useThemeStore } from '@/store'
import { cn } from '@/lib/utils'
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Command,
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

// ✨ إضافة SearchModal
function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.data?.products?.slice(0, 5) || [])
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSelect = (slug: string) => {
    onClose()
    router.push(`/products/${slug}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-background rounded-2xl shadow-dramatic overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <Search className="w-5 h-5 text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent border-none outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              {query.length >= 2 && (
                <div className="border-t border-border max-h-96 overflow-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-muted">Searching...</div>
                  ) : results.length > 0 ? (
                    results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(product.slug)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-surface transition-colors text-left"
                      >
                        <div className="relative w-12 h-12 rounded-lg bg-muted overflow-hidden">
                          <img
                            src={product.images?.[0] || '/images/placeholder.jpg'}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted">${product.price}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted">
                      No products found for "{query}"
                    </div>
                  )}
                </div>
              )}

              {/* Keyboard Hint */}
              <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface rounded">ESC</kbd>
                  <span>to close</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface rounded">
                    <Command className="w-3 h-3" /> K
                  </kbd>
                  <span>to open</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { getItemCount, toggleCart } = useCartStore()
  const { theme, toggleTheme } = useThemeStore()

  const cartCount = getItemCount()

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-background/90 backdrop-blur-md shadow-subtle'
            : 'bg-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                Store
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 rounded-lg hover:bg-surface transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-dramatic"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Store'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'

export const SOCIAL_LINKS = {
  instagram: '',
  facebook: '',
  tiktok: '',
  whatsapp: 'https://wa.me/message/64L5CHSAIA2DA1',
  twitter: '',
}

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'home', name: 'Home & Living', slug: 'home-living' },
  { id: 'sports', name: 'Sports', slug: 'sports' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
]

export const PRODUCTS_PER_PAGE = 12

export const FREE_SHIPPING_THRESHOLD = 50

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

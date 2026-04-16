import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { NewsletterPopup } from '@/components/marketing/newsletter-popup'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Store - Premium Shopping Experience',
    template: '%s | Store',
  },
  description: 'Discover amazing products at great prices. Premium quality, fast shipping, and excellent customer service.',
  keywords: ['ecommerce', 'shopping', 'online store', 'premium products'],
  authors: [{ name: 'Abdelhaned Nada' }],
  creator: 'Abdelhaned Nada',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Store',
    title: 'Store - Premium Shopping Experience',
    description: 'Discover amazing products at great prices.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store - Premium Shopping Experience',
    description: 'Discover amazing products at great prices.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <NewsletterPopup />
        </ThemeProvider>
      </body>
    </html>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[8rem] md:text-[10rem] font-bold text-gradient leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Search className="w-32 h-32" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Check the URL or browse our categories below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="btn-primary gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" className="btn-outline gap-2 w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/products" 
              className="text-sm text-accent hover:underline"
            >
              All Products
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-accent hover:underline"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-accent hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Something went wrong
        </h1>
        
        <p className="text-muted mb-8">
          We apologize for the inconvenience. Please try again or contact support if the problem persists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="btn-primary gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button 
            href="/" 
            variant="outline"
            className="btn-outline"
          >
            Go Home
          </Button>
        </div>
        
        {error.digest && (
          <p className="mt-8 text-xs text-muted/60">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}

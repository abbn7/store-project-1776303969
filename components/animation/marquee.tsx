'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
}: MarqueeProps) {
  const speedMap = {
    slow: '40s',
    normal: '25s',
    fast: '15s',
  }

  return (
    <div
      className={cn(
        'overflow-hidden whitespace-nowrap',
        pauseOnHover && 'hover:[&>*]:animation-paused',
        className
      )}
    >
      <div
        className={cn(
          'inline-flex',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        )}
        style={{
          animationDuration: speedMap[speed],
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

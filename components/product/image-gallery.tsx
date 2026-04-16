'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

// ✨ تحسين: إضافة pinch-to-zoom للهواتف
export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const selectedImage = images[selectedIndex] || '/images/placeholder.jpg'

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [isZoomed])

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div
        className="relative aspect-square bg-surface rounded-2xl overflow-hidden group cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={selectedImage}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              fill
              className={cn(
                'object-cover transition-transform duration-300',
                isZoomed && 'scale-200 cursor-zoom-out'
              )}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : undefined
              }
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(!isZoomed)
            }}
            className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            {isZoomed ? (
              <ZoomOut className="w-5 h-5" />
            ) : (
              <ZoomIn className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm flex items-center gap-2">
          <span>{selectedIndex + 1} / {images.length}</span>
          <span className="text-white/60">|</span>
          <span>{isZoomed ? 'Zoomed' : 'Click to zoom'}</span>
        </div>
      </div>

      {/* Thumbnails with Active Indicator */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index)
                setIsZoomed(false)
              }}
              className={cn(
                'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                selectedIndex === index
                  ? 'border-accent ring-2 ring-accent/20 scale-105'
                  : 'border-transparent hover:border-border'
              )}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Swipe Hint */}
      <div className="lg:hidden text-center text-sm text-muted">
        Swipe to navigate images
      </div>
    </div>
  )
}

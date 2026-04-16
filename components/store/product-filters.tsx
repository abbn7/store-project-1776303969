'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Category } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  priceRange: { min: number; max: number }
  onPriceChange: (range: { min: number; max: number }) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A-Z' },
]

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('categories')

  const hasActiveFilters = selectedCategory || priceRange.min > 0 || priceRange.max < 1000

  const clearFilters = () => {
    onCategoryChange(null)
    onPriceChange({ min: 0, max: 1000 })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Categories
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expandedSection === 'categories' && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {expandedSection === 'categories' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => onCategoryChange(null)}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    !selectedCategory
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-surface'
                  )}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.slug)}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedCategory === category.slug
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-surface'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setExpandedSection(expandedSection === 'price' ? null : 'price')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Price Range
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expandedSection === 'price' && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {expandedSection === 'price' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min || ''}
                    onChange={(e) =>
                      onPriceChange({ ...priceRange, min: parseInt(e.target.value) || 0 })
                    }
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max || ''}
                    onChange={(e) =>
                      onPriceChange({ ...priceRange, max: parseInt(e.target.value) || 1000 })
                    }
                    className="text-sm"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Desktop & Mobile Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="lg:hidden btn-outline gap-2"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-accent rounded-full" />
            )}
          </Button>

          {/* Sort */}
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            options={sortOptions}
            className="w-48"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-full bg-background z-50 lg:hidden p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

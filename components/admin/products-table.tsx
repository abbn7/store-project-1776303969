'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Edit, Trash2, Search, Plus } from 'lucide-react'

interface ProductsTableProps {
  products: Product[]
  onDelete: (id: string) => void
  onEdit: (product: Product) => void
}

export function ProductsTable({ products, onDelete, onEdit }: ProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link href="/admin/products/new">
          <Button className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium">Product</th>
              <th className="text-left py-3 px-4 font-medium">Price</th>
              <th className="text-left py-3 px-4 font-medium">Stock</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-surface/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface">
                      <Image
                        src={product.images[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted">{product.category?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">{formatPrice(product.price)}</p>
                    {product.compare_at_price && product.compare_at_price > product.price && (
                      <p className="text-sm text-muted line-through">
                        {formatPrice(product.compare_at_price)}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${
                      product.stock === 0
                        ? 'text-red-500'
                        : product.stock < 10
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {product.is_active && <Badge variant="success">Active</Badge>}
                    {product.is_featured && <Badge variant="gold">Featured</Badge>}
                    {!product.is_active && <Badge variant="destructive">Inactive</Badge>}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-surface rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted">No products found</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/store'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { ProductsTable } from '@/components/admin/products-table'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated, isSessionValid, logout } = useAdminStore()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !isSessionValid()) {
      router.push('/')
      return
    }

    // Fetch products
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('admin_token')
        const response = await fetch('/api/products?include_inactive=true', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setProducts(data.data.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [isAuthenticated, isSessionValid, router])

  const handleLogout = () => {
    logout()
    localStorage.removeItem('admin_token')
    router.push('/')
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEditProduct = (product: Product) => {
    router.push(`/admin/products/edit/${product.slug}`)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-surface">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted">Manage your store</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="btn-outline gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-background">
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="bg-background rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Products</h2>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-surface rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <ProductsTable
                products={products}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
              />
            )}
          </TabsContent>

          <TabsContent value="settings" className="bg-background rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
            <p className="text-muted">Settings management coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

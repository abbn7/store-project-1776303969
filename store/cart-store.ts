'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartSummary } from '@/types'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (isOpen: boolean) => void
  
  // Getters
  getSummary: () => CartSummary
  getItemCount: () => number
  getItem: (productId: string) => CartItem | undefined
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.product_id === item.product_id)
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
                  : i
              ),
            }
          }
          
          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === productId
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      setCartOpen: (isOpen) => {
        set({ isOpen })
      },

      getSummary: () => {
        const items = get().items
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const item_count = items.reduce((sum, item) => sum + item.quantity, 0)
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 10
        const discount = 0
        const total = subtotal + shipping - discount

        return {
          subtotal,
          shipping,
          discount,
          total,
          item_count,
        }
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getItem: (productId) => {
        return get().items.find((i) => i.product_id === productId)
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
)

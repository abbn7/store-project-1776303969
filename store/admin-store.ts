'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminState {
  isAuthenticated: boolean
  token: string | null
  expiresAt: string | null
  
  // Actions
  login: (token: string, expiresAt: string) => void
  logout: () => void
  isSessionValid: () => boolean
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      expiresAt: null,

      login: (token, expiresAt) => {
        set({
          isAuthenticated: true,
          token,
          expiresAt,
        })
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          expiresAt: null,
        })
      },

      isSessionValid: () => {
        const { isAuthenticated, expiresAt } = get()
        if (!isAuthenticated || !expiresAt) return false
        return new Date(expiresAt) > new Date()
      },
    }),
    {
      name: 'admin-storage',
      skipHydration: true,
    }
  )
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username, role) => set({ isAuthenticated: true, user: { username, role } }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)



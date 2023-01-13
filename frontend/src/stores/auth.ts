import { defineStore } from 'pinia'

interface AuthState {
  roles: string[]
  apiAvailable: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    roles: [],
    apiAvailable: false,
  }),
  getters: {
    hasRole: (state) => {
      return (role: string) => state.roles?.includes(role)
    },
    hasAnyRole: (state) => state.roles?.length > 0,
  },
})

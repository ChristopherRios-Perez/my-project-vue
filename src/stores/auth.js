import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch, rawFetch } from '@/lib/api'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken') ?? null)
  const refreshToken = ref(localStorage.getItem('refreshToken') ?? null)
  const email = ref(localStorage.getItem('userEmail') ?? null)

  const isAuthenticated = computed(() => !!accessToken.value)

  function _persist(data) {
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken ?? null
    email.value = data.email ?? null
    localStorage.setItem('accessToken', data.accessToken)
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    if (data.email) localStorage.setItem('userEmail', data.email)
  }

  async function login(form) {
    const data = await rawFetch('/auth/login', { method: 'POST', body: form })
    _persist(data)
  }

  async function register(form) {
    const data = await rawFetch('/auth/register', { method: 'POST', body: form })
    _persist(data)
  }

  async function logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST', auth: true })
    } finally {
      clear()
    }
  }

  async function refresh() {
    try {
      const data = await rawFetch('/auth/refresh', {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
      })
      accessToken.value = data.accessToken
      localStorage.setItem('accessToken', data.accessToken)
      return true
    } catch {
      return false
    }
  }

  function clear() {
    accessToken.value = null
    refreshToken.value = null
    email.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userEmail')
  }

  return { accessToken, refreshToken, email, isAuthenticated, login, register, logout, refresh, clear }
})

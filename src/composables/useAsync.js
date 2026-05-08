import { ref, computed } from 'vue'
import { ApiError } from '@/lib/api'

export function useAsync() {
  const loading = ref(false)
  const error = ref(null)

  const fieldErrors = computed(() => {
    if (error.value instanceof ApiError) return error.value.fieldErrors()
    return {}
  })

  async function run(fn) {
    loading.value = true
    error.value = null
    try {
      return await fn()
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fieldErrors, run }
}

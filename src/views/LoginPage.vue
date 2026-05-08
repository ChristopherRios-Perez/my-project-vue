<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import AppButton from '@/components/AppButton.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsync } from '@/composables/useAsync'

useTitle('Sign in · Projects')

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { loading, error, fieldErrors, run } = useAsync()

const form = reactive({ email: '', password: '' })

async function onSubmit() {
  try {
    await run(() => auth.login(form))
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/projects'
    router.replace(redirect)
  } catch {
    // error captured
  }
}
</script>

<template>
  <main class="flex flex-1 items-center justify-center px-5 py-16">
    <div class="rise w-full max-w-sm">
      <div class="mb-8 text-center">
        <span class="chip chip-accent mb-4">Welcome back</span>
        <h1 class="text-text mt-3 text-2xl font-semibold tracking-tight">Sign in to Projects</h1>
        <p class="text-text-2 mt-1.5 text-sm">Your workspace is waiting.</p>
      </div>
      <form
        class="card flex flex-col gap-4 p-6"
        @submit.prevent="onSubmit"
      >
        <FormField
          v-model="form.email"
          label="Email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@company.com"
          :error="fieldErrors.email"
        />
        <FormField
          v-model="form.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
          :error="fieldErrors.password"
        />

        <p
          v-if="error && Object.keys(fieldErrors).length === 0"
          class="border-danger/30 bg-danger-soft text-danger flex items-center gap-2 rounded-md border px-3 py-2 text-xs"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">⚠</span>
          {{ error.message }}
        </p>

        <AppButton
          type="submit"
          :loading="loading"
        >
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </AppButton>
      </form>
      <p class="text-text-2 mt-5 text-center text-sm">
        New here?
        <RouterLink
          to="/register"
          class="text-accent font-medium underline-offset-4 hover:underline"
        >
          Create an account
        </RouterLink>
      </p>
    </div>
  </main>
</template>

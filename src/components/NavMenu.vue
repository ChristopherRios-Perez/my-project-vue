<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import AppButton from './AppButton.vue'

const auth = useAuthStore()
const router = useRouter()

async function onLogout() {
  await auth.logout()
  // projects.reset()
  // tasks.reset()
  router.replace('/login')
}
const linkClass =
  'text-sm text-text-2 hover:text-text transition-colors [&.router-link-active]:text-text'
</script>

<template>
  <header class="sticky top-0 z-40 backdrop-blur-xl">
    <div class="border-border bg-bg/70 border-b">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <RouterLink
          to="/projects"
          class="text-text flex items-center gap-2.5 text-sm font-semibold"
        >
          <span
            class="bg-accent text-accent-ink grid h-7 w-7 place-items-center rounded-lg"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <rect
                x="2"
                y="2"
                width="10"
                height="10"
                rx="2"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M5 7l1.5 1.5L9 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          Projects
          <span
            class="chip ml-1 hidden sm:inline-flex"
            translate="no"
            >beta</span
          >
        </RouterLink>
        <nav
          class="flex items-center gap-4"
          aria-label="Primary"
        >
          <template v-if="auth.isAuthenticated">
            <RouterLink
              to="/projects"
              :class="linkClass"
              >Dashboard</RouterLink
            >
            <div class="hidden items-center gap-2.5 sm:flex">
              <span
                aria-hidden="true"
                class="border-border bg-surface-2 text-text-2 grid h-7 w-7 place-items-center rounded-full border text-xs font-medium"
              >
                {{ (auth.email || '?').charAt(0).toUpperCase() }}
              </span>
              <span
                class="text-text-2 text-sm"
                translate="no"
              >
                {{ auth.email }}
              </span>
              <AppButton
                variant="ghost"
                size="sm"
                class="cursor-pointer"
                @click="onLogout"
                >Sign out</AppButton
              >
            </div>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              :class="linkClass"
              >Sign in</RouterLink
            >
            <RouterLink
              to="/register"
              class="roudned-md bg-accent text-accent-ink px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
              >Get started</RouterLink
            >
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

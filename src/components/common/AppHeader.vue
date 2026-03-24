<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.name === 'home')

const titles = {
  alphabet: '🔤 Alphabet Game',
  counting: '🔢 Counting Game',
  colors: '🎨 Colors Game',
}

const pageTitle = computed(() => titles[route.name] ?? '🎮 Tiny Taps')
</script>

<template>
  <header class="bg-primary text-white shadow-lg">
    <div class="container mx-auto px-4 py-4 flex items-center gap-4">
      <button
        v-if="!isHome"
        class="text-2xl sm:text-3xl leading-none hover:scale-110 active:scale-95 transition-transform"
        aria-label="Go to home screen"
        @click="router.push('/')"
      >
        🏠
      </button>
      <h1 class="flex-1 text-center text-xl sm:text-2xl font-extrabold tracking-wide">
        {{ pageTitle }}
      </h1>
      <!-- spacer to keep title visually centred when back button is shown -->
      <div v-if="!isHome" class="w-9" aria-hidden="true" />
    </div>
  </header>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-yellow-50 font-kids">
    <AppHeader />
    <main class="container mx-auto px-4 py-4 sm:py-8">
      <RouterView />
    </main>
  </div>
</template>

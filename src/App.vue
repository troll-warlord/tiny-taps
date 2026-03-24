<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-background font-kids">
    <AppHeader />
    <main class="container mx-auto px-4 py-4 sm:py-8">
      <RouterView />
    </main>
  </div>
</template>

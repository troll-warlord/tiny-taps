<script setup>
defineProps({
  streak: { type: Number, required: true },
})
</script>

<template>
  <Transition name="streak">
    <div
      v-if="streak >= 2"
      class="flex items-center gap-1 bg-warning rounded-2xl px-3 sm:px-4 py-1.5 shadow-md"
    >
      <span class="text-xl sm:text-2xl leading-none">🔥</span>
      <span class="text-sm sm:text-base font-extrabold text-text">{{ streak }} in a row!</span>
    </div>
  </Transition>
</template>

<style scoped>
.streak-enter-active {
  animation: scaleUp 0.3s ease-out;
}
.streak-leave-active {
  transition: opacity 0.2s ease;
}
.streak-leave-to {
  opacity: 0;
}
</style>

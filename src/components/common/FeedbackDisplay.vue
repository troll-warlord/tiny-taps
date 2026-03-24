<script setup>
defineProps({
  /** 'correct' | 'wrong' | null */
  feedback: { type: String, default: null },
})
</script>

<template>
  <!-- Fixed-height slot prevents layout shift when feedback is absent -->
  <div class="h-20 sm:h-28 flex items-center justify-center">
    <Transition name="fb">
      <span
        v-if="feedback"
        :key="feedback"
        class="text-6xl sm:text-8xl leading-none select-none"
        :class="feedback === 'correct' ? 'animate-scale-up' : 'animate-shake'"
      >
        {{ feedback === 'correct' ? '✅' : '❌' }}
      </span>
    </Transition>
  </div>
</template>

<style scoped>
.fb-enter-active {
  /* individual icons apply their own keyframe via utility class */
  animation-duration: 0.35s;
}
.fb-leave-active {
  transition: opacity 0.2s ease;
}
.fb-leave-to {
  opacity: 0;
}
</style>

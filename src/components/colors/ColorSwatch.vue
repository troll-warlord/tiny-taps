<script setup>
defineProps({
  question: {
    type: Object,
    required: true,
    // { name: String, color: String (hex), border: Boolean }
  },
  showReveal: { type: Boolean, default: false },
})
</script>

<template>
  <div class="flex flex-col items-center animate-fade-in-up w-full max-w-sm">
    <div class="bg-white rounded-3xl shadow-xl p-5 sm:p-8 text-center w-full">
      <!-- Color swatch -->
      <div
        class="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl mx-auto mb-5 sm:mb-6 shadow-inner transition-all duration-300"
        :class="question.border ? 'border-4 border-gray-300' : ''"
        :style="{ backgroundColor: question.color }"
        role="img"
        :aria-label="showReveal ? question.name : 'A color to identify'"
      />

      <!-- Revealed name with highlighted first letter -->
      <Transition name="reveal">
        <p v-if="showReveal" class="text-3xl font-extrabold text-text">
          {{ question.name }}
        </p>
        <p v-else class="text-lg text-muted">What color is this?</p>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.reveal-enter-active {
  animation: scaleUp 0.3s ease-out;
}
.reveal-leave-active {
  transition: opacity 0.15s ease;
}
.reveal-leave-to {
  opacity: 0;
}
</style>

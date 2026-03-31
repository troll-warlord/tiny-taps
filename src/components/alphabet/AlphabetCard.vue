<script setup>
defineProps({
  question: {
    type: Object,
    required: true,
    // { letter: String, word: String, emoji: String }
  },
  showReveal: { type: Boolean, default: false },
})
</script>

<template>
  <div class="flex flex-col items-center animate-fade-in-up w-full max-w-sm">
    <div class="bg-white rounded-3xl shadow-xl p-5 sm:p-8 text-center w-full">
      <!-- Main visual - swap `emoji` for an <img> when real assets are ready -->
      <div class="text-7xl sm:text-9xl leading-none mb-4 select-none" role="img" :aria-label="question.word">
        {{ question.emoji }}
      </div>

      <!-- Revealed word with highlighted first letter -->
      <!-- Fixed height matches text-3xl line-height, prevents card from resizing on reveal -->
      <div class="min-h-[2.25rem] flex items-center justify-center">
        <Transition name="reveal" mode="out-in">
          <p v-if="showReveal" class="text-3xl font-extrabold text-text">
            <span class="text-primary underline decoration-4">{{ question.word[0] }}</span>{{ question.word.slice(1) }}
          </p>
          <p v-else class="text-muted text-lg">What letter does this start with?</p>
        </Transition>
      </div>
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

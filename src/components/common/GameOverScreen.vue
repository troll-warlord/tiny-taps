<script setup>
import { computed, onMounted } from 'vue'
import { useConfetti } from '@/composables/useConfetti'

const props = defineProps({
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  gameName: { type: String, required: true },
})

const emit = defineEmits(['play-again', 'go-home'])

const { launch } = useConfetti()

const stars = computed(() => {
  const ratio = props.score / props.total
  if (ratio === 1) return '🌟🌟🌟'
  if (ratio >= 0.7) return '⭐⭐'
  return '⭐'
})

onMounted(() => {
  if (props.score === props.total) launch()
})
</script>

<template>
  <div class="flex flex-col items-center gap-6 sm:gap-8 py-6 sm:py-10 animate-fade-in-up">
    <div class="text-center">
      <div class="text-6xl sm:text-8xl mb-3">🎉</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-primary">Game Over!</h2>
      <p class="text-lg text-muted mt-1">{{ gameName }}</p>
    </div>

    <div class="bg-white rounded-3xl shadow-xl px-6 sm:px-10 py-6 sm:py-8 text-center w-full max-w-xs">
      <p class="text-sm font-bold uppercase tracking-widest text-muted mb-2">Your Score</p>
      <p class="text-5xl sm:text-7xl font-extrabold text-primary leading-tight">{{ score }}</p>
      <p class="text-xl text-muted">out of {{ total }}</p>
      <p class="text-4xl mt-3">{{ stars }}</p>
    </div>

    <div class="flex gap-4 flex-wrap justify-center">
      <button
        class="bg-primary text-white font-extrabold text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        @click="emit('play-again')"
      >
        🔄 Play Again
      </button>
      <button
        class="bg-accent text-white font-extrabold text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        @click="emit('go-home')"
      >
        🏠 Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MAX_RETRIES } from '@/constants/gameConfig'

const props = defineProps({
  retriesLeft: { type: Number, required: true },
})

// Array of booleans: true = heart still active, false = used up
const hearts = computed(() =>
  Array.from({ length: MAX_RETRIES }, (_, i) => i < props.retriesLeft),
)
</script>

<template>
  <div class="flex items-center gap-1 sm:gap-2 bg-white rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-md">
    <p class="text-xs font-bold uppercase tracking-widest text-muted mr-1">Tries</p>
    <span
      v-for="(active, i) in hearts"
      :key="i"
      class="text-xl sm:text-2xl leading-none transition-all duration-300"
      :class="active ? 'opacity-100' : 'opacity-25 grayscale'"
    >
      ❤️
    </span>
  </div>
</template>

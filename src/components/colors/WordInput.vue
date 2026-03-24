<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  wordLength: { type: Number, required: true },
  isEnabled: { type: Boolean, default: true },
})

const emit = defineEmits(['submit'])

const typed = ref([])

const isFull = computed(() => typed.value.length === props.wordLength)

// Reset slots whenever a new question begins
watch(
  () => props.isEnabled,
  (enabled) => {
    if (enabled) typed.value = []
  },
)

function handleKeydown(event) {
  if (!props.isEnabled) return
  if (event.ctrlKey || event.altKey || event.metaKey) return

  if (event.key === 'Enter') {
    if (isFull.value) emit('submit', typed.value.join(''))
    event.preventDefault()
    return
  }

  if (/^[a-zA-Z]$/.test(event.key) && !isFull.value) {
    typed.value = [...typed.value, event.key.toUpperCase()]
    event.preventDefault()
    return
  }

  if (event.key === 'Backspace') {
    typed.value = typed.value.slice(0, -1)
    event.preventDefault()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Letter slots -->
    <div class="flex gap-2 flex-wrap justify-center">
      <div
        v-for="i in wordLength"
        :key="i"
        class="w-9 h-11 sm:w-12 sm:h-14 flex items-center justify-center rounded-xl border-4 text-lg sm:text-2xl font-extrabold select-none transition-all duration-150"
        :class="
          typed[i - 1]
            ? 'border-primary bg-primary text-white shadow-md'
            : 'border-gray-300 bg-white text-gray-300'
        "
      >
        {{ typed[i - 1] ?? '_' }}
      </div>
    </div>

    <p class="text-muted text-sm font-semibold">
      <template v-if="!isEnabled">⏳ Get ready…</template>
      <template v-else-if="isFull">Press Enter ↵ to submit</template>
      <template v-else>⌨️ Type the color name</template>
    </p>
  </div>
</template>


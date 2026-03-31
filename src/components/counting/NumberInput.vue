<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  isEnabled: { type: Boolean, default: true },
  questionKey: { type: Number, default: 0 },
})

const emit = defineEmits(['submit'])

const inputRef = ref(null)
const displayValue = ref('')

onMounted(() => inputRef.value?.focus())

// Reset display when a NEW question arrives
watch(() => props.questionKey, () => {
  displayValue.value = ''
})

// Re-focus when input becomes enabled (new question ready)
watch(() => props.isEnabled, (enabled) => {
  if (enabled) inputRef.value?.focus()
})

// No isEnabled guard — always update the display so typing feels instant
function handleInput(event) {
  const newChars = event.target.value.replace(/\D/g, '')
  event.target.value = ''
  if (!newChars) return
  // Append to existing display value (required for two-digit numbers like 10)
  displayValue.value = (displayValue.value + newChars).slice(0, 2)
}

function handleKeydown(event) {
  if (!props.isEnabled) return

  if (event.key === 'Enter') {
    if (displayValue.value.length > 0) emit('submit', displayValue.value)
    event.preventDefault()
  } else if (event.key === 'Backspace') {
    displayValue.value = displayValue.value.slice(0, -1)
    event.preventDefault()
  }
}

// iOS numpad "Done" fires blur instead of Enter.
// Re-focus synchronously within the gesture to keep keyboard open.
function handleBlur() {
  if (props.isEnabled && displayValue.value.length > 0) {
    emit('submit', displayValue.value)
  }
  inputRef.value?.focus()
}
</script>

<template>
  <div class="relative flex flex-col items-center gap-3">
    <div
      class="relative rounded-2xl border-4 px-6 sm:px-10 py-4 sm:py-5 text-center shadow-md min-w-[120px] sm:min-w-[140px] transition-colors overflow-hidden"
      :class="isEnabled ? 'border-primary bg-white' : 'border-gray-300 bg-gray-100 opacity-60'"
    >
      <p
        class="text-5xl sm:text-6xl font-extrabold leading-tight pointer-events-none select-none"
        :class="displayValue ? 'text-primary' : 'text-gray-300'"
      >
        {{ displayValue || '?' }}
      </p>

      <!-- Overlay input: invisible but covers the full box - direct tap = native iOS keyboard -->
      <input
        ref="inputRef"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        aria-label="Type the count"
        class="absolute inset-0 w-full h-full opacity-0 cursor-text"
        style="font-size: 16px"
        @input="handleInput"
        @keydown="handleKeydown"
        @blur="handleBlur"
      />
    </div>

    <p class="text-muted text-sm font-semibold">
      {{ isEnabled ? '⌨️ Type the number, then press Enter ↵' : '⏳ Get ready…' }}
    </p>
  </div>
</template>

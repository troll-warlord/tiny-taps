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

// No isEnabled guard  always update the display so typing feels instant
function handleInput(event) {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 2)
  if (digits) displayValue.value = digits
  event.target.value = ''
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
      class="rounded-2xl border-4 px-6 sm:px-10 py-4 sm:py-5 text-center shadow-md min-w-[120px] sm:min-w-[140px] cursor-text transition-colors"
      :class="isEnabled ? 'border-primary bg-white' : 'border-gray-300 bg-gray-100 opacity-60'"
      @click="inputRef?.focus()"
    >
      <p
        class="text-5xl sm:text-6xl font-extrabold leading-tight"
        :class="displayValue ? 'text-primary' : 'text-gray-300'"
      >
        {{ displayValue || '?' }}
      </p>
    </div>

    <input
      ref="inputRef"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      aria-label="Type the count"
      class="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />

    <p class="text-muted text-sm font-semibold">
      {{ isEnabled ? '⌨️ Type the number, then press Enter ↵' : '⏳ Get ready…' }}
    </p>
  </div>
</template>

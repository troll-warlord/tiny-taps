<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  isEnabled: { type: Boolean, default: true },
})

const emit = defineEmits(['submit'])

const inputRef = ref(null)
const displayValue = ref('')

// Reset display and re-focus whenever the question changes (isEnabled goes false→true)
watch(
  () => props.isEnabled,
  async (enabled) => {
    if (enabled) {
      displayValue.value = ''
      await nextTick()
      inputRef.value?.focus()
    }
  },
  { immediate: true },
)

function handleKeydown(event) {
  if (!props.isEnabled) return

  if (event.key === 'Enter') {
    if (displayValue.value.length > 0) {
      emit('submit', displayValue.value)
    }
    event.preventDefault()
    return
  }

  if (/^\d$/.test(event.key) && displayValue.value.length < 2) {
    displayValue.value += event.key
    event.preventDefault()
    return
  }

  if (event.key === 'Backspace') {
    displayValue.value = displayValue.value.slice(0, -1)
    event.preventDefault()
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <!-- Visible answer box — clicking it refocuses the hidden input -->
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

    <!-- Hidden input captures keyboard events reliably across browsers -->
    <input
      ref="inputRef"
      class="sr-only"
      type="text"
      inputmode="numeric"
      :disabled="!isEnabled"
      readonly
      aria-label="Type the count then press Enter"
      @keydown="handleKeydown"
    />

    <p class="text-muted text-sm font-semibold">
      {{
        isEnabled
          ? '⌨️ Type the number, then press Enter ↵'
          : '⏳ Get ready…'
      }}
    </p>
  </div>
</template>

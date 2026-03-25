<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  isEnabled: { type: Boolean, default: true },
})

const emit = defineEmits(['submit'])

const inputRef = ref(null)
const displayValue = ref('')

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

function handleInput(event) {
  if (!props.isEnabled) return
  const ch = event.target.value.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase()
  if (ch) displayValue.value = ch
  event.target.value = ''
}

function handleKeydown(event) {
  if (!props.isEnabled) return
  if (event.ctrlKey || event.altKey || event.metaKey) return

  if (event.key === 'Enter') {
    if (displayValue.value.length > 0) emit('submit', displayValue.value)
    event.preventDefault()
    return
  }

  if (event.key === 'Backspace') {
    displayValue.value = ''
    event.preventDefault()
  }
}

// iOS keyboard "return" dismisses keyboard via blur — treat as submit
function handleBlur() {
  if (props.isEnabled && displayValue.value.length > 0) {
    emit('submit', displayValue.value)
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-3">
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

    <!-- Hidden input to capture keyboard events reliably on mobile/desktop -->
    <input
      ref="inputRef"
      class="sr-only"
      type="text"
      inputmode="text"
      autocomplete="off"
      aria-label="Type the starting letter then press Enter"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />

    <p class="text-muted text-sm font-semibold">
      {{
        isEnabled
          ? '⌨️ Type the letter, then press Enter ↵'
          : '⏳ Get ready…'
      }}
    </p>
  </div>
</template>

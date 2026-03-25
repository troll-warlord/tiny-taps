<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  isEnabled: { type: Boolean, default: true },
})

const emit = defineEmits(['submit'])

const inputRef = ref(null)
const displayValue = ref('')

onMounted(() => inputRef.value?.focus())

// Reset value when a new question starts; focus() here works on desktop.
// On iOS the keyboard stays open because handleBlur refocuses within the gesture.
watch(() => props.isEnabled, (enabled) => {
  if (enabled) {
    displayValue.value = ''
    inputRef.value?.focus()
  }
})

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
  } else if (event.key === 'Backspace') {
    displayValue.value = ''
    event.preventDefault()
  }
}

// iOS Return key or any keyboard dismiss fires blur.
// Submit if ready, then synchronously re-focus — we're still inside the
// user-gesture window so iOS honours focus() and keeps the keyboard alive.
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

    <!--
      NOT sr-only: that class uses clip+overflow:hidden which stops iOS showing the keyboard.
      opacity-0 + absolute 1px keeps it focusable but invisible.
    -->
    <input
      ref="inputRef"
      type="text"
      inputmode="text"
      enterkeyhint="go"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      spellcheck="false"
      aria-label="Type the starting letter"
      class="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />

    <p class="text-muted text-sm font-semibold">
      {{ isEnabled ? '⌨️ Type the letter, then press Enter ↵' : '⏳ Get ready…' }}
    </p>
  </div>
</template>


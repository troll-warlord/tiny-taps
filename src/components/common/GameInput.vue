<script setup>
import { toRef } from 'vue'
import { useKeyboardInput } from '@/composables/useKeyboardInput'

const PATTERNS = {
  letter: /^[a-zA-Z]$/,
  number: /^[0-9]$/,
}

const props = defineProps({
  /** 'letter' for alphabet game, 'number' for single-digit counting */
  type: { type: String, default: 'letter' },
  isEnabled: { type: Boolean, default: true },
})

const emit = defineEmits(['input'])

useKeyboardInput({
  onInput: (key) => emit('input', key),
  isEnabled: toRef(props, 'isEnabled'),
  pattern: PATTERNS[props.type],
})
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div
      class="rounded-2xl border-4 border-dashed px-8 py-4 text-center shadow-inner transition-colors"
      :class="isEnabled ? 'border-primary bg-white' : 'border-gray-300 bg-gray-100 opacity-60'"
    >
      <p class="text-lg font-bold" :class="isEnabled ? 'text-primary' : 'text-muted'">
        {{ isEnabled ? '⌨️ Press a key!' : '⏳ Get ready…' }}
      </p>
    </div>
  </div>
</template>

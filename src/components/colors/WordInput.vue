<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  wordLength: { type: Number, required: true },
  isEnabled: { type: Boolean, default: true },
  questionKey: { type: Number, default: 0 },
})

const emit = defineEmits(['submit'])

const inputRef = ref(null)
const typed = ref([])

const isFull = computed(() => typed.value.length === props.wordLength)

onMounted(() => inputRef.value?.focus())

// Reset typed slots when a NEW question arrives
watch(() => props.questionKey, () => {
  typed.value = []
})

// Re-focus when input becomes enabled (new question ready)
watch(() => props.isEnabled, (enabled) => {
  if (enabled) inputRef.value?.focus()
})

// No isEnabled guard — always update slots so typing feels instant
function handleInput(event) {
  const letters = event.target.value.replace(/[^a-zA-Z]/g, '')
  for (const ch of letters) {
    if (!isFull.value) typed.value = [...typed.value, ch.toUpperCase()]
  }
  event.target.value = ''
}

function handleKeydown(event) {
  if (!props.isEnabled) return
  if (event.ctrlKey || event.altKey || event.metaKey) return

  if (event.key === 'Enter') {
    if (isFull.value) emit('submit', typed.value.join(''))
    event.preventDefault()
  } else if (event.key === 'Backspace') {
    typed.value = typed.value.slice(0, -1)
    event.preventDefault()
  }
}

// iOS keyboard Done/Return fires blur — submit if word is full, re-focus to keep keyboard alive.
function handleBlur() {
  if (props.isEnabled && isFull.value) {
    emit('submit', typed.value.join(''))
  }
  inputRef.value?.focus()
}
</script>

<template>
  <div class="relative flex flex-col items-center gap-4">
    <!--
      NOT sr-only: clip+overflow:hidden prevents iOS from showing the keyboard.
      opacity-0 absolute 1px is invisible but remains fully focusable.
    -->
    <input
      ref="inputRef"
      type="text"
      inputmode="text"
      enterkeyhint="done"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      spellcheck="false"
      aria-label="Type the color name"
      class="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />

    <!-- Letter slots — tap anywhere to focus input -->
    <div class="flex gap-2 flex-wrap justify-center" @click="inputRef?.focus()">
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


import { onMounted, onUnmounted } from 'vue'

/**
 * Attaches a window keydown listener for the lifetime of the calling component.
 *
 * @param {Object} options
 * @param {Function}   options.onInput    - Called with the matched key string.
 * @param {import('vue').Ref<boolean>} options.isEnabled - Reactive gate.
 * @param {RegExp}     options.pattern    - Keys that pass through (plain RegExp).
 */
export function useKeyboardInput({ onInput, isEnabled, pattern }) {
  function handleKeydown(event) {
    if (!isEnabled.value) return
    if (event.ctrlKey || event.altKey || event.metaKey) return
    if (pattern.test(event.key)) {
      event.preventDefault()
      onInput(event.key)
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}

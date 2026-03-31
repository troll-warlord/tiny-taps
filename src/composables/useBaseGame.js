import { ref, computed, isRef } from 'vue'
import { MAX_RETRIES, FEEDBACK_DURATION_MS, REVEAL_DURATION_MS } from '@/constants/gameConfig'

/**
 * Shared game logic composable.
 *
 * @param {Array|import('vue').Ref<Array>} questionsOrRef  - Static array or reactive ref of question objects.
 * @param {Function} isCorrectAnswer                       - (question, input) => boolean
 * @param {Object}   [options]
 * @param {boolean}  [options.revealAnswer=false]          - Show answer after correct/exhausted retries.
 */
export function useBaseGame(questionsOrRef, isCorrectAnswer, options = {}) {
  const { revealAnswer = false } = options
  const questionsRef = isRef(questionsOrRef) ? questionsOrRef : ref(questionsOrRef)

  const score = ref(0)
  const streak = ref(0)
  const currentIndex = ref(0)
  const retriesLeft = ref(MAX_RETRIES)
  const feedback = ref(null) // 'correct' | 'wrong' | null
  const showReveal = ref(false)
  const isGameOver = ref(false)
  const isTransitioning = ref(false)

  const currentQuestion = computed(() => questionsRef.value[currentIndex.value])
  const totalQuestions = computed(() => questionsRef.value.length)
  const progress = computed(() =>
    Math.round(((currentIndex.value + 1) / questionsRef.value.length) * 100),
  )

  // Track pending timers so they can be cancelled on reset.
  // Cancelling them also unblocks bfcache (browsers refuse to cache a page
  // that has pending JS tasks from an in-flight setTimeout).
  const pendingTimers = []
  function schedule(fn, delay) {
    const id = setTimeout(() => {
      const idx = pendingTimers.indexOf(id)
      if (idx !== -1) pendingTimers.splice(idx, 1)
      fn()
    }, delay)
    pendingTimers.push(id)
  }

  function submitAnswer(input) {
    if (isTransitioning.value || isGameOver.value) return
    isTransitioning.value = true

    // When revealAnswer is on, the word shows alongside the feedback icon
    // and the advance waits for REVEAL_DURATION_MS total.
    // When off (counting game), advance happens after FEEDBACK_DURATION_MS.
    const advanceDelay = revealAnswer ? REVEAL_DURATION_MS : FEEDBACK_DURATION_MS

    if (isCorrectAnswer(currentQuestion.value, input)) {
      score.value++
      streak.value++
      feedback.value = 'correct'
      if (revealAnswer) showReveal.value = true
      schedule(() => { feedback.value = null }, FEEDBACK_DURATION_MS)
      schedule(() => {
        showReveal.value = false
        isTransitioning.value = false
        moveToNext()
      }, advanceDelay)
    } else {
      retriesLeft.value--
      streak.value = 0
      feedback.value = 'wrong'
      const lastAttempt = retriesLeft.value <= 0
      if (lastAttempt && revealAnswer) showReveal.value = true
      schedule(() => {
        feedback.value = null
        if (!lastAttempt) isTransitioning.value = false
      }, FEEDBACK_DURATION_MS)
      if (lastAttempt) {
        schedule(() => {
          showReveal.value = false
          isTransitioning.value = false
          moveToNext()
        }, advanceDelay)
      }
    }
  }

  function moveToNext() {
    if (currentIndex.value + 1 >= questionsRef.value.length) {
      isGameOver.value = true
    } else {
      currentIndex.value++
      retriesLeft.value = MAX_RETRIES
    }
  }

  function reset() {
    pendingTimers.forEach(clearTimeout)
    pendingTimers.length = 0
    score.value = 0
    streak.value = 0
    currentIndex.value = 0
    retriesLeft.value = MAX_RETRIES
    feedback.value = null
    showReveal.value = false
    isGameOver.value = false
    isTransitioning.value = false
  }

  return {
    score,
    streak,
    currentIndex,
    retriesLeft,
    feedback,
    showReveal,
    isGameOver,
    isTransitioning,
    currentQuestion,
    totalQuestions,
    progress,
    submitAnswer,
    reset,
  }
}

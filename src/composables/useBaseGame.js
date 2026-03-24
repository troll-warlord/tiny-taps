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
      setTimeout(() => { feedback.value = null }, FEEDBACK_DURATION_MS)
      setTimeout(() => {
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
      setTimeout(() => {
        feedback.value = null
        if (!lastAttempt) isTransitioning.value = false
      }, FEEDBACK_DURATION_MS)
      if (lastAttempt) {
        setTimeout(() => {
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

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

  function revealThenAdvance() {
    if (revealAnswer) {
      showReveal.value = true
      setTimeout(() => {
        showReveal.value = false
        isTransitioning.value = false
        moveToNext()
      }, REVEAL_DURATION_MS)
    } else {
      isTransitioning.value = false
      moveToNext()
    }
  }

  function submitAnswer(input) {
    if (isTransitioning.value || isGameOver.value) return

    if (isCorrectAnswer(currentQuestion.value, input)) {
      score.value++
      streak.value++
      feedback.value = 'correct'
      isTransitioning.value = true
      setTimeout(() => {
        feedback.value = null
        revealThenAdvance()
      }, FEEDBACK_DURATION_MS)
    } else {
      retriesLeft.value--
      streak.value = 0
      feedback.value = 'wrong'
      isTransitioning.value = true
      setTimeout(() => {
        feedback.value = null
        if (retriesLeft.value <= 0) {
          revealThenAdvance()
        } else {
          isTransitioning.value = false
        }
      }, FEEDBACK_DURATION_MS)
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

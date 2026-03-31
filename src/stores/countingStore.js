import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBaseGame } from '@/composables/useBaseGame'
import { COUNTING_QUESTIONS } from '@/constants/countingData'
import { shuffled } from '@/utils/shuffled'

export const useCountingStore = defineStore('counting', () => {
  const shuffledQuestions = ref(shuffled(COUNTING_QUESTIONS))

  const game = useBaseGame(
    shuffledQuestions,
    (question, input) => parseInt(input, 10) === question.count,
  )

  function reset() {
    shuffledQuestions.value = shuffled(COUNTING_QUESTIONS)
    game.reset()
  }

  return { ...game, reset }
})

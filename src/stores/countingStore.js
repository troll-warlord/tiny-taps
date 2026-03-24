import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBaseGame } from '@/composables/useBaseGame'
import { COUNTING_QUESTIONS } from '@/constants/countingData'

function shuffled(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

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

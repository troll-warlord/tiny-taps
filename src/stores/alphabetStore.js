import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBaseGame } from '@/composables/useBaseGame'
import { ALPHABET_DATA } from '@/constants/alphabetData'
import { shuffled } from '@/utils/shuffled'

export const useAlphabetStore = defineStore('alphabet', () => {
  const shuffledQuestions = ref(shuffled(ALPHABET_DATA))

  const game = useBaseGame(
    shuffledQuestions,
    (question, input) => input.toLowerCase() === question.letter.toLowerCase(),
    { revealAnswer: true },
  )

  function reset() {
    shuffledQuestions.value = shuffled(ALPHABET_DATA)
    game.reset()
  }

  return { ...game, reset }
})

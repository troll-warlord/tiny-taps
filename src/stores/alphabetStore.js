import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBaseGame } from '@/composables/useBaseGame'
import { ALPHABET_DATA } from '@/constants/alphabetData'

function shuffled(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

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

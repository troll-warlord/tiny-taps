import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBaseGame } from '@/composables/useBaseGame'
import { COLORS_DATA } from '@/constants/colorsData'

function shuffled(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export const useColorStore = defineStore('colors', () => {
  const shuffledQuestions = ref(shuffled(COLORS_DATA))

  const game = useBaseGame(
    shuffledQuestions,
    (question, input) => input.toLowerCase() === question.name.toLowerCase(),
    { revealAnswer: true },
  )

  function reset() {
    shuffledQuestions.value = shuffled(COLORS_DATA)
    game.reset()
  }

  return { ...game, reset }
})

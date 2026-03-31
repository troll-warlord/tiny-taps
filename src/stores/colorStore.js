import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBaseGame } from '@/composables/useBaseGame'
import { COLORS_DATA } from '@/constants/colorsData'
import { shuffled } from '@/utils/shuffled'

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

<script setup>
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useColorStore } from '@/stores/colorStore'
import ColorSwatch from '@/components/colors/ColorSwatch.vue'
import WordInput from '@/components/colors/WordInput.vue'
import FeedbackDisplay from '@/components/common/FeedbackDisplay.vue'
import ScoreDisplay from '@/components/common/ScoreDisplay.vue'
import RetryDisplay from '@/components/common/RetryDisplay.vue'
import StreakDisplay from '@/components/common/StreakDisplay.vue'
import GameOverScreen from '@/components/common/GameOverScreen.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'

const router = useRouter()
const store = useColorStore()

const inputEnabled = computed(() => !store.isTransitioning && !store.isGameOver)

function handleSubmit(value) {
  store.submitAnswer(value)
}

function handlePlayAgain() {
  store.reset()
}

function handleGoHome() {
  store.reset()
  router.push('/')
}

onUnmounted(() => store.reset())
</script>

<template>
  <div class="flex flex-col items-center gap-4 sm:gap-6 max-w-lg mx-auto py-1 sm:py-2">
    <template v-if="!store.isGameOver">
      <!-- Stats row -->
      <div class="flex gap-4 w-full justify-between flex-wrap">
        <ScoreDisplay :score="store.score" :total="store.totalQuestions" />
        <RetryDisplay :retries-left="store.retriesLeft" />
      </div>

      <!-- Streak -->
      <StreakDisplay :streak="store.streak" />

      <!-- Progress -->
      <ProgressBar :current="store.currentIndex + 1" :total="store.totalQuestions" />

      <!-- Color swatch -->
      <ColorSwatch
        :key="store.currentIndex"
        :question="store.currentQuestion"
        :show-reveal="store.showReveal"
      />

      <!-- Feedback -->
      <FeedbackDisplay :feedback="store.feedback" />

      <!-- Letter-slot word input -->
      <WordInput
        :word-length="store.currentQuestion.name.length"
        :is-enabled="inputEnabled"
        :question-key="store.currentIndex"
        @submit="handleSubmit"
      />
    </template>

    <GameOverScreen
      v-else
      :score="store.score"
      :total="store.totalQuestions"
      game-name="Colors Game"
      @play-again="handlePlayAgain"
      @go-home="handleGoHome"
    />
  </div>
</template>

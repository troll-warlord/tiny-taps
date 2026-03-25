<script setup>
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCountingStore } from '@/stores/countingStore'
import CountingGrid from '@/components/counting/CountingGrid.vue'
import NumberInput from '@/components/counting/NumberInput.vue'
import FeedbackDisplay from '@/components/common/FeedbackDisplay.vue'
import ScoreDisplay from '@/components/common/ScoreDisplay.vue'
import RetryDisplay from '@/components/common/RetryDisplay.vue'
import StreakDisplay from '@/components/common/StreakDisplay.vue'
import GameOverScreen from '@/components/common/GameOverScreen.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'

const router = useRouter()
const store = useCountingStore()

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

// Always start fresh when the player leaves the game view
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

      <!-- Objects grid -->
      <CountingGrid
        :key="store.currentIndex"
        :count="store.currentQuestion.count"
        :object-emoji="store.currentQuestion.object.emoji"
        :object-name="store.currentQuestion.object.name"
      />

      <!-- Feedback -->
      <FeedbackDisplay :feedback="store.feedback" />

      <!-- Numeric input with Enter to submit -->
      <NumberInput :is-enabled="inputEnabled" :question-key="store.currentIndex" @submit="handleSubmit" />
    </template>

    <GameOverScreen
      v-else
      :score="store.score"
      :total="store.totalQuestions"
      game-name="Counting Game"
      @play-again="handlePlayAgain"
      @go-home="handleGoHome"
    />
  </div>
</template>

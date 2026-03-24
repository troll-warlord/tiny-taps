<script setup>
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlphabetStore } from '@/stores/alphabetStore'
import AlphabetCard from '@/components/alphabet/AlphabetCard.vue'
import AlphabetInput from '@/components/alphabet/AlphabetInput.vue'
import FeedbackDisplay from '@/components/common/FeedbackDisplay.vue'
import ScoreDisplay from '@/components/common/ScoreDisplay.vue'
import RetryDisplay from '@/components/common/RetryDisplay.vue'
import GameOverScreen from '@/components/common/GameOverScreen.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'

const router = useRouter()
const store = useAlphabetStore()

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
        <ScoreDisplay :score="store.score" />
        <RetryDisplay :retries-left="store.retriesLeft" />
      </div>

      <!-- Progress -->
      <ProgressBar :current="store.currentIndex + 1" :total="store.totalQuestions" />

      <!-- Question card (name hidden until answer is revealed) -->
      <AlphabetCard
        :key="store.currentIndex"
        :question="store.currentQuestion"
        :show-reveal="store.showReveal"
      />

      <!-- Feedback (reserved space prevents layout shift) -->
      <FeedbackDisplay :feedback="store.feedback" />

      <!-- Text input + Enter to submit -->
      <AlphabetInput :is-enabled="inputEnabled" @submit="handleSubmit" />
    </template>

    <GameOverScreen
      v-else
      :score="store.score"
      :total="store.totalQuestions"
      game-name="Alphabet Game"
      @play-again="handlePlayAgain"
      @go-home="handleGoHome"
    />
  </div>
</template>

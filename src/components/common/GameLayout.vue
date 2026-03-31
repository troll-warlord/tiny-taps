<script setup>
import ScoreDisplay from '@/components/common/ScoreDisplay.vue'
import RetryDisplay from '@/components/common/RetryDisplay.vue'
import StreakDisplay from '@/components/common/StreakDisplay.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import FeedbackDisplay from '@/components/common/FeedbackDisplay.vue'
import GameOverScreen from '@/components/common/GameOverScreen.vue'

defineProps({
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  retriesLeft: { type: Number, required: true },
  streak: { type: Number, required: true },
  currentIndex: { type: Number, required: true },
  feedback: { type: String, default: null },
  isGameOver: { type: Boolean, required: true },
  gameName: { type: String, required: true },
})

defineEmits(['play-again', 'go-home'])
</script>

<template>
  <div class="flex flex-col items-center gap-4 sm:gap-6 max-w-lg mx-auto py-1 sm:py-2">
    <template v-if="!isGameOver">
      <!-- Stats row -->
      <div class="flex gap-4 w-full justify-between flex-wrap">
        <ScoreDisplay :score="score" :total="total" />
        <RetryDisplay :retries-left="retriesLeft" />
      </div>

      <!-- Streak -->
      <StreakDisplay :streak="streak" />

      <!-- Progress -->
      <ProgressBar :current="currentIndex + 1" :total="total" />

      <!-- Question card (game-specific, injected via default slot) -->
      <slot />

      <!-- Feedback -->
      <FeedbackDisplay :feedback="feedback" />

      <!-- Input (game-specific, injected via named slot) -->
      <slot name="input" />
    </template>

    <GameOverScreen
      v-else
      :score="score"
      :total="total"
      :game-name="gameName"
      @play-again="$emit('play-again')"
      @go-home="$emit('go-home')"
    />
  </div>
</template>

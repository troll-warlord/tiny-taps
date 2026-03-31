<script setup>
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCountingStore } from '@/stores/countingStore'
import GameLayout from '@/components/common/GameLayout.vue'
import CountingGrid from '@/components/counting/CountingGrid.vue'
import NumberInput from '@/components/counting/NumberInput.vue'

const router = useRouter()
const store = useCountingStore()

const inputEnabled = computed(() => !store.isTransitioning && !store.isGameOver)

function handlePlayAgain() { store.reset() }
function handleGoHome() { store.reset(); router.push('/') }

// Always start fresh when the player leaves the game view
onUnmounted(() => store.reset())
</script>

<template>
  <GameLayout
    :score="store.score"
    :total="store.totalQuestions"
    :retries-left="store.retriesLeft"
    :streak="store.streak"
    :current-index="store.currentIndex"
    :feedback="store.feedback"
    :is-game-over="store.isGameOver"
    game-name="Counting Game"
    @play-again="handlePlayAgain"
    @go-home="handleGoHome"
  >
    <!-- Objects grid -->
    <CountingGrid
      :key="store.currentIndex"
      :count="store.currentQuestion.count"
      :object-emoji="store.currentQuestion.object.emoji"
      :object-name="store.currentQuestion.object.name"
    />

    <template #input>
      <NumberInput :is-enabled="inputEnabled" :question-key="store.currentIndex" @submit="store.submitAnswer" />
    </template>
  </GameLayout>
</template>

<script setup>
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlphabetStore } from '@/stores/alphabetStore'
import GameLayout from '@/components/common/GameLayout.vue'
import AlphabetCard from '@/components/alphabet/AlphabetCard.vue'
import AlphabetInput from '@/components/alphabet/AlphabetInput.vue'

const router = useRouter()
const store = useAlphabetStore()

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
    game-name="Alphabet Game"
    @play-again="handlePlayAgain"
    @go-home="handleGoHome"
  >
    <!-- Question card (name hidden until answer is revealed) -->
    <AlphabetCard
      :key="store.currentIndex"
      :question="store.currentQuestion"
      :show-reveal="store.showReveal"
    />

    <template #input>
      <AlphabetInput :is-enabled="inputEnabled" :question-key="store.currentIndex" @submit="store.submitAnswer" />
    </template>
  </GameLayout>
</template>

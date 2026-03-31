<script setup>
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useColorStore } from '@/stores/colorStore'
import GameLayout from '@/components/common/GameLayout.vue'
import ColorSwatch from '@/components/colors/ColorSwatch.vue'
import WordInput from '@/components/colors/WordInput.vue'

const router = useRouter()
const store = useColorStore()

const inputEnabled = computed(() => !store.isTransitioning && !store.isGameOver)

function handlePlayAgain() { store.reset() }
function handleGoHome() { store.reset(); router.push('/') }

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
    game-name="Colors Game"
    @play-again="handlePlayAgain"
    @go-home="handleGoHome"
  >
    <!-- Color swatch -->
    <ColorSwatch
      :key="store.currentIndex"
      :question="store.currentQuestion"
      :show-reveal="store.showReveal"
    />

    <template #input>
      <WordInput
        :word-length="store.currentQuestion.name.length"
        :is-enabled="inputEnabled"
        :question-key="store.currentIndex"
        @submit="store.submitAnswer"
      />
    </template>
  </GameLayout>
</template>

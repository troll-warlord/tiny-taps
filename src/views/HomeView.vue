<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const games = [
  {
    id: 'alphabet',
    name: 'Alphabet Game',
    emoji: '🔤',
    description: 'Look at the picture and type its starting letter!',
    gradient: 'from-violet-400 to-indigo-500',
    path: '/alphabet',
  },
  {
    id: 'counting',
    name: 'Counting Game',
    emoji: '🔢',
    description: 'Count the objects and type the number!',
    gradient: 'from-pink-400 to-rose-500',
    path: '/counting',
  },
  {
    id: 'colors',
    name: 'Colors Game',
    emoji: '🎨',
    description: 'Look at the color and type its name!',
    gradient: 'from-emerald-400 to-teal-500',
    path: '/colors',
  },
]
</script>

<template>
  <div class="flex flex-col items-center gap-8 sm:gap-10 py-4 sm:py-6 animate-fade-in-up">
    <div class="text-center">
      <p class="text-5xl sm:text-6xl mb-3">👋</p>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-primary">Welcome!</h2>
      <p class="text-lg sm:text-xl text-muted mt-2">Choose a game to play</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
      <button
        v-for="game in games"
        :key="game.id"
        class="group flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-3xl shadow-xl bg-gradient-to-br text-white font-bold transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/40"
        :class="game.gradient"
        @click="router.push(game.path)"
      >
        <span class="text-6xl sm:text-8xl leading-none group-hover:animate-bounce">{{ game.emoji }}</span>
        <h3 class="text-xl sm:text-2xl">{{ game.name }}</h3>
        <p class="text-sm opacity-90 text-center font-normal">{{ game.description }}</p>
      </button>
    </div>
  </div>
</template>

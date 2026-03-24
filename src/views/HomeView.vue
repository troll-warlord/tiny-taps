<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const games = [
  {
    id: 'alphabet',
    name: 'Alphabet',
    emoji: '🔤',
    description: 'Look at the picture and type its starting letter!',
    bg: 'from-violet-500 via-purple-500 to-indigo-600',
    path: '/alphabet',
    delay: '0ms',
  },
  {
    id: 'counting',
    name: 'Counting',
    emoji: '🔢',
    description: 'Count the objects and type the number!',
    bg: 'from-orange-400 via-pink-500 to-rose-600',
    path: '/counting',
    delay: '100ms',
  },
  {
    id: 'colors',
    name: 'Colors',
    emoji: '🎨',
    description: 'Look at the color and type its name!',
    bg: 'from-emerald-400 via-teal-500 to-cyan-600',
    path: '/colors',
    delay: '200ms',
  },
]

const decorations = [
  { emoji: '⭐', top: '3%',  left: '4%',  size: 'text-5xl', anim: 'animate-float',        delay: '0s'   },
  { emoji: '🌈', top: '7%',  left: '75%', size: 'text-6xl', anim: 'animate-float-slow',   delay: '1.2s' },
  { emoji: '🌟', top: '22%', left: '90%', size: 'text-5xl', anim: 'animate-float-slower', delay: '0.5s' },
  { emoji: '✨', top: '42%', left: '2%',  size: 'text-4xl', anim: 'animate-float',        delay: '2s'   },
  { emoji: '🎈', top: '62%', left: '87%', size: 'text-6xl', anim: 'animate-float-slow',   delay: '0.8s' },
  { emoji: '💫', top: '56%', left: '5%',  size: 'text-5xl', anim: 'animate-float-slower', delay: '1.5s' },
  { emoji: '🌸', top: '80%', left: '11%', size: 'text-5xl', anim: 'animate-float',        delay: '3s'   },
  { emoji: '🎉', top: '14%', left: '46%', size: 'text-4xl', anim: 'animate-float-slow',   delay: '2.5s' },
  { emoji: '💥', top: '84%', left: '78%', size: 'text-4xl', anim: 'animate-float',        delay: '1.2s' },
  { emoji: '🌙', top: '47%', left: '92%', size: 'text-4xl', anim: 'animate-float-slower', delay: '0.3s' },
  { emoji: '❤️', top: '91%', left: '52%', size: 'text-4xl', anim: 'animate-float-slow',   delay: '2s'   },
  { emoji: '🏆', top: '71%', left: '2%',  size: 'text-4xl', anim: 'animate-float',        delay: '1.8s' },
]

const starRow = ['⭐', '🌟', '💫', '🌟', '⭐']
</script>

<template>
  <div class="relative flex flex-col items-center gap-7 sm:gap-10 py-6 sm:py-8 overflow-hidden min-h-[80vh]">

    <!-- Colorful gradient background layer -->
    <div class="absolute inset-0 -z-20 bg-gradient-to-br from-violet-200 via-pink-100 to-amber-100"></div>

    <!-- Polka dot pattern overlay -->
    <div
      class="absolute inset-0 -z-10 opacity-30"
      style="background-image: radial-gradient(circle, #8b5cf6 3px, transparent 3px), radial-gradient(circle, #ec4899 3px, transparent 3px); background-size: 52px 52px, 76px 76px; background-position: 0 0, 26px 26px;"
    ></div>

    <!-- Floating decorations (bigger + more opaque) -->
    <span
      v-for="(d, i) in decorations"
      :key="i"
      :class="[d.size, d.anim, 'absolute select-none pointer-events-none opacity-70']"
      :style="{ top: d.top, left: d.left, animationDelay: d.delay }"
      aria-hidden="true"
    >{{ d.emoji }}</span>

    <!-- Hero -->
    <div class="text-center animate-fade-in-up relative z-10 px-2">
      <!-- Animated mascot row -->
      <div class="flex justify-center items-end gap-4 mb-4">
        <span class="text-4xl sm:text-5xl drop-shadow-lg animate-bounce" style="animation-duration:1.9s; animation-delay:0.1s">🎯</span>
        <span class="text-6xl sm:text-7xl drop-shadow-xl animate-wiggle">🧠</span>
        <span class="text-4xl sm:text-5xl drop-shadow-lg animate-bounce" style="animation-duration:2.1s; animation-delay:0.4s">🚀</span>
      </div>

      <!-- Rainbow gradient title -->
      <h2
        class="text-5xl sm:text-7xl font-black tracking-tight leading-none select-none"
        style="background: linear-gradient(120deg, #7c3aed 0%, #db2777 28%, #f59e0b 54%, #10b981 78%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
      >
        Tiny Taps
      </h2>

      <!-- Sub-title pill badges -->
      <div class="flex flex-wrap justify-center gap-2 mt-4">
        <span class="bg-violet-500 text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-lg">🌟 Learn</span>
        <span class="bg-pink-500 text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-lg">🎮 Play</span>
        <span class="bg-amber-500 text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-lg">🏆 Win!</span>
      </div>
    </div>

    <!-- Game cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-4xl relative z-10">
      <button
        v-for="game in games"
        :key="game.id"
        class="group relative flex flex-col items-center gap-3 p-7 sm:p-8 rounded-3xl text-white font-bold
               transition-all duration-200 hover:scale-105 hover:-translate-y-2 active:scale-95
               focus:outline-none focus:ring-4 focus:ring-white/60
               animate-pop border-4 border-white/40 shadow-2xl bg-gradient-to-br overflow-hidden"
        :class="game.bg"
        :style="{ animationDelay: game.delay }"
        @click="router.push(game.path)"
      >
        <!-- Corner sparkle (always spinning) -->
        <span class="absolute top-3 right-3 text-2xl opacity-80 animate-spin-slow" aria-hidden="true">✨</span>
        <!-- Corner star (floating) -->
        <span class="absolute bottom-3 left-3 text-xl opacity-60 animate-float-slow" style="animation-delay:1.4s" aria-hidden="true">⭐</span>
        <!-- Top gloss sheen -->
        <div class="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl pointer-events-none"></div>

        <!-- Game emoji -->
        <span class="z-10 text-7xl sm:text-8xl leading-none drop-shadow-xl transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
          {{ game.emoji }}
        </span>

        <!-- Game name -->
        <h3 class="z-10 text-xl sm:text-2xl font-black tracking-wide uppercase drop-shadow">{{ game.name }}</h3>

        <!-- Description -->
        <p class="z-10 text-xs sm:text-sm text-center opacity-95 leading-snug font-semibold">{{ game.description }}</p>

        <!-- PLAY button -->
        <div class="z-10 mt-2 bg-white/30 text-white font-extrabold text-sm sm:text-base px-6 py-2 rounded-full border-2 border-white/60 group-hover:bg-white/50 transition-colors shadow">
          ▶ PLAY!
        </div>
      </button>
    </div>

    <!-- Bouncing star row -->
    <div class="flex gap-3 relative z-10" aria-hidden="true">
      <span
        v-for="(star, i) in starRow"
        :key="i"
        class="text-3xl animate-bounce"
        :style="{ animationDelay: `${i * 0.12}s`, animationDuration: '1.8s' }"
      >{{ star }}</span>
    </div>

    <!-- Keyboard hint -->
    <p
      class="relative z-10 text-sm font-bold text-gray-700 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full shadow animate-fade-in-up"
      style="animation-delay: 400ms"
    >
      ⌨️ Use your keyboard to play!
    </p>

  </div>
</template>

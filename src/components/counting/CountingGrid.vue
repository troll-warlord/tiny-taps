<script setup>
defineProps({
  count: { type: Number, required: true },
  objectEmoji: { type: String, required: true },
  objectName: { type: String, required: true },
})
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-md animate-fade-in-up">
    <div class="bg-white rounded-3xl shadow-xl p-4 sm:p-6 text-center w-full">
      <div
        class="flex flex-wrap justify-center gap-2 sm:gap-3 min-h-[60px] sm:min-h-[80px]"
        role="img"
        :aria-label="`${count} ${objectName}s`"
      >
        <span
          v-for="i in count"
          :key="i"
          class="text-4xl sm:text-5xl leading-none select-none animate-fade-in-up"
          :style="{ animationDelay: `${(i - 1) * 60}ms` }"
        >
          {{ objectEmoji }}
        </span>
      </div>
      <p class="text-muted text-xl mt-5 font-semibold">
        How many <strong class="text-text">{{ objectName }}s</strong> do you see?
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, required: true },
  total: { type: Number, default: null },
})
</script>

<template>
  <div class="flex items-center gap-2 sm:gap-3 bg-white rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-md">
    <span class="text-3xl leading-none">⭐</span>
    <div>
      <p class="text-xs font-bold uppercase tracking-widest text-muted">Score</p>
      <p class="text-xl sm:text-2xl font-extrabold text-primary leading-tight">
        {{ score }}
        <span v-if="total !== null" class="text-sm font-semibold text-muted">/ {{ total }}</span>
      </p>
    </div>
  </div>
</template>

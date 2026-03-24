<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})

const percentage = computed(() => Math.round((props.current / props.total) * 100))
</script>

<template>
  <div class="w-full max-w-lg">
    <div class="flex justify-between text-sm font-semibold text-muted mb-1">
      <span>Question {{ current }} of {{ total }}</span>
      <span>{{ percentage }}%</span>
    </div>
    <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-primary rounded-full transition-all duration-500"
        :style="{ width: percentage + '%' }"
      />
    </div>
  </div>
</template>

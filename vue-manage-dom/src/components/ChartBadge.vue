<script setup lang="ts">
import ChartCircle from '@/components/ChartCircle.vue'

type Props = {
  translation: [number, number]
  strokeColor: string
  label: string
}
defineProps<Props>()
</script>

<template>
  <g v-bind:transform="`translate(${translation[0]}, ${translation[1]})`">
    <ChartCircle
      v-bind:cx="0"
      v-bind:cy="0"
      v-bind:r="18"
      fill="#fff"
      v-bind:stroke="strokeColor"
      v-bind:strokeWidth="3"
    />
    <text text-anchor="middle" alignment-baseline="middle" fill="#374f5e">
      {{ label }}
    </text>
  </g>
</template>

<style scoped>
g {
  transition: transform 400ms cubic-bezier(0.33, 1, 0.68, 1);
}
text {
  font-size: 12px;
  font-weight: bold;
}
</style>

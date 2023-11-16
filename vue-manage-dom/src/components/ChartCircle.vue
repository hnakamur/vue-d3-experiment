<script setup lang="ts">
type Props = {
  cx: number
  cy: number
  r: number
  fill: string
  stroke?: string
  strokeWidth?: number
}
withDefaults(defineProps<Props>(), {
  stroke: 'none',
  strokeWidth: 0
})
</script>

<template>
  <circle
    v-bind:cx="cx"
    v-bind:cy="cy"
    v-bind:r="r"
    v-bind:fill="fill"
    v-bind:stroke="stroke"
    v-bind:stroke-width="strokeWidth"
  />
</template>

<script setup lang="ts">
type Props = {
  x: number
  y: number
  width: number
  height: number
  fill: string
}
defineProps<Props>()
</script>

<template>
  <rect
    v-bind:x="x"
    v-bind:y="y"
    v-bind:width="width"
    v-bind:height="height"
    v-bind:fill="fill"
  />
</template>

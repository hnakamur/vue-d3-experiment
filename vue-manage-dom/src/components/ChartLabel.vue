<script setup lang="ts">
type Props = {
  x: number
  y: number
  color: string
  textAnchor: string
  label: string
}
defineProps<Props>()
</script>

<template>
  <text
    x="0"
    y="0"
    v-bind:fill="color"
    v-bind:text-anchor="textAnchor"
    alignment-baseline="middle"
    v-bind:style="{ transform: `translate(${x}px, ${y}px)` }"
    >{{ label }}</text
  >
</template>

<style scoped>
text {
  font-weight: bold;
  transition: transform 400ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>

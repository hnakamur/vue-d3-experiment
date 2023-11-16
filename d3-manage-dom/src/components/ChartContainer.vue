<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  width: number
  height: number
  margin: {
    top: number
    left: number
    bottom: number
    right: number
  }
}
const props = defineProps<Props>()

const viewBox = computed(() => `0 0 ${props.width} ${props.height}`)
const transform = computed(() => `translate(${props.margin.left}, ${props.margin.top})`)
</script>

<template>
  <svg v-bind:viewBox="viewBox">
    <g v-bind:transform="transform"><slot></slot></g>
  </svg>
</template>

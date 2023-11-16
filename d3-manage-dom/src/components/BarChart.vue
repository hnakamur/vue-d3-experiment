<script setup lang="ts">
import ChartContainer from '@/components/ChartContainer.vue'
import UiCard from '@/components/UiCard.vue'

type Props = {
  data: any
  margin: {
    top: number
    left: number
    bottom: number
    right: number
  }
}
defineProps<Props>()

const width = 300
const height = 245
</script>

<template>
  <UiCard>
    <h2>Awareness</h2>
    <ChartContainer v-bind:width="width" v-bind:height="height" v-bind:margin="margin">
    </ChartContainer>
  </UiCard>
</template>

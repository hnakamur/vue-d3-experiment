<script setup lang="ts">
import ChartContainer from '@/components/ChartContainer.vue'
import RankingFilters from '@/components/RankingFilters.vue'
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

const rankingFilters = [
  { id: 'satisfaction', label: 'Satisfaction' },
  { id: 'interest', label: 'Interest' },
  { id: 'usage', label: 'Usage' },
  { id: 'awareness', label: 'Awareness' }
]
const activeFilter = rankingFilters[0].id

const width = 1000
const height = 542
</script>

<template>
  <UiCard>
    <h2>Rankings</h2>
    <RankingFilters v-bind:filters="rankingFilters" v-bind:activeFilter="activeFilter" />
    <ChartContainer v-bind:width="width" v-bind:height="height" v-bind:margin="margin">
      <text>ranking chart here</text>
    </ChartContainer>
  </UiCard>
</template>

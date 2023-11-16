<script setup lang="ts">
import type { RankingFilter } from '@/types'
import FilterButton from '@/components/FilterButton.vue'

type Props = {
  filters: RankingFilter[]
  activeFilter: string
}
defineProps<Props>()
</script>

<template>
  <div class="ranking-filters">
    <FilterButton
      v-for="filter of filters"
      v-bind:key="filter.id"
      v-bind:id="filter.id"
      v-bind:label="filter.label"
      v-bind:isActive="activeFilter === filter.id"
    />
  </div>
</template>

<style scoped>
.ranking-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
}
</style>

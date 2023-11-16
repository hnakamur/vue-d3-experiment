<script setup lang="ts">
import { ref } from 'vue'
import * as d3 from 'd3'
import type { ChartData } from '@/types'
import ChartSet from '@/components/ChartSet.vue'

const data = ref<ChartData>()
const loading = ref(true)
const url =
  'https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json'
d3.json(url)
  .then((res) => {
    data.value = res as ChartData
    loading.value = false
  })
  .catch((err) => {
    console.log('fail to get data, err=', err)
  })
</script>

<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <ChartSet v-else v-bind:data="data" />
  </div>
</template>

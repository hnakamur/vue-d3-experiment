<script setup lang="ts">
import * as d3 from 'd3'
import BarChart from '@/components/BarChart.vue'
import RankingChart from '@/components/RankingChart.vue'
import ScatterplotVueControlled from '@/components/ScatterplotVueControlled.vue'

type Props = {
  data: any
}
const props = defineProps<Props>()

const margin = { top: 30, right: 10, bottom: 50, left: 60 }
const colorScale = d3.scaleOrdinal().domain(props.data.ids).range(d3.schemeTableau10)
</script>

<template>
  <h1>Front-end Frameworks</h1>
  <div class="row">
    <div class="col-9">
      <RankingChart v-bind:data="data" v-bind:margin="margin" />
    </div>
    <div class="col-3">
      <div class="row">
        <div class="col-12">
          <ScatterplotVueControlled
            v-bind:data="data.experience"
            v-bind:margin="margin"
            v-bind:colorScale="colorScale"
          />
        </div>
        <div class="col-12">
          <BarChart
            v-bind:data="data.experience"
            v-bind:margin="margin"
            v-bind:colorScale="colorScale"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="source">
    Data source and original rankings chart:
    <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks"
      >The State of JS 2021: Front-end Frameworks</a
    >
  </div>
</template>

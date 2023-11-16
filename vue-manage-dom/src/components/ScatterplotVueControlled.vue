<script setup lang="ts">
import * as d3 from 'd3'
import type { Experience } from '@/types'
import ChartAxis from '@/components/ChartAxis.vue'
import ChartCircle from '@/components/ChartCircle.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import UiCard from '@/components/UiCard.vue'

type Props = {
  margin: {
    top: number
    left: number
    bottom: number
    right: number
  }
  data: Experience[]
  colorScale: any
}
const props = defineProps<Props>()

const width = 300
const height = 245
const innerWidth = width - props.margin.left - props.margin.right
const innerHeight = height - props.margin.top - props.margin.bottom

const maxUsers = d3.max(props.data, (d) => d.user_count) as number
const xScale = d3.scaleLinear().domain([0, maxUsers]).range([0, innerWidth]).nice()
const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])
</script>

<template>
  <UiCard>
    <h2>Retention vs Usage</h2>
    <ChartContainer v-bind:width="width" v-bind:height="height" v-bind:margin="margin">
      <ChartAxis
        type="bottom"
        v-bind:scale="xScale"
        v-bind:innerWidth="innerWidth"
        v-bind:innerHeight="innerHeight"
        label="User Count"
      />
      <ChartAxis
        type="left"
        v-bind:scale="yScale"
        v-bind:innerWidth="innerWidth"
        v-bind:innerHeight="innerHeight"
        label="Retention %"
      />
      <ChartCircle
        v-for="framework in data"
        v-bind:key="framework.id"
        v-bind:cx="xScale(framework.user_count)"
        v-bind:cy="yScale(framework.retention_percentage)"
        v-bind:r="6"
        v-bind:fill="colorScale(framework.id)"
      />
    </ChartContainer>
  </UiCard>
</template>

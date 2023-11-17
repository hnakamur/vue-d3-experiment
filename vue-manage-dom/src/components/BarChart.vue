<script setup lang="ts">
import * as d3 from 'd3'
import type { Awareness, Experience } from '@/types'
import ChartAxis from '@/components/ChartAxis.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import ChartRectangle from '@/components/ChartRectangle.vue'
import UiCard from '@/components/UiCard.vue'

type Props = {
  data: Experience[]
  margin: {
    top: number
    left: number
    bottom: number
    right: number
  }
  colorScale: any
}
const props = defineProps<Props>()

const width = 300
const height = 245
const marginBottom = 85
const innerWidth = width - props.margin.left - props.margin.right
const innerHeight = height - props.margin.top - marginBottom

const awarenessData: Awareness[] = []
props.data.forEach((d) => {
  const awareness = {
    id: d.id,
    name: d.name,
    awareness_percentage: d.awareness[d.awareness.length - 1].percentage_question
  }
  awarenessData.push(awareness)
})
awarenessData.sort((a, b) => b.awareness_percentage - a.awareness_percentage)

const xScale = d3
  .scaleBand()
  .domain(awarenessData.map((d) => d.name))
  .range([0, innerWidth])
  .padding(0.2)
const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])
</script>

<template>
  <UiCard>
    <h2>Awareness</h2>
    <ChartContainer v-bind:width="width" v-bind:height="height" v-bind:margin="margin">
      <template v-if="data && colorScale">
        <ChartAxis
          type="band"
          v-bind:scale="xScale"
          v-bind:ticksArray="awarenessData.map((d) => d.name)"
          v-bind:innerWidth="innerWidth"
          v-bind:innerHeight="innerHeight"
        />
        <ChartAxis
          type="left"
          v-bind:scale="yScale"
          v-bind:innerWidth="innerWidth"
          v-bind:innerHeight="innerHeight"
          label="Awareness %"
        />
        <ChartRectangle
          v-for="framework in awarenessData"
          v-bind:key="framework.id"
          v-bind:x="xScale(framework.name) as number"
          v-bind:y="yScale(framework.awareness_percentage)"
          v-bind:width="xScale.bandwidth()"
          v-bind:height="innerHeight - yScale(framework.awareness_percentage)"
          v-bind:fill="colorScale(framework.id)"
        />
      </template>
    </ChartContainer>
  </UiCard>
</template>

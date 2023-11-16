<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import type { Experience } from '@/types'
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

const scatterplot = ref(null)
onMounted(() => {
  const scatterplotContainer = d3.select(scatterplot.value)

  // Declare scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(props.data, (d) => d.user_count) as number])
    .range([0, innerWidth])
    .nice()
  const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])

  // Append axes
  const bottomAxis = d3.axisBottom(xScale).ticks([3]).tickFormat(d3.format('d'))
  scatterplotContainer
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(bottomAxis)

  const leftAxis = d3.axisLeft(yScale).ticks([5])
  scatterplotContainer.append('g').attr('class', 'axis').call(leftAxis)

  // Append circles
  scatterplotContainer
    .selectAll('.scatterplot-circle')
    .data(props.data)
    .join('circle')
    .attr('class', 'scatterplot-circle')
    .attr('cx', (d) => xScale(d.user_count))
    .attr('cy', (d) => yScale(d.retention_percentage))
    .attr('r', 6)
    .attr('fill', (d) => props.colorScale(d.id))
})
</script>

<template>
  <UiCard>
    <h2>Retention vs Usage</h2>
    <ChartContainer v-bind:width="width" v-bind:height="height" v-bind:margin="margin">
      <g ref="scatterplot"></g>
    </ChartContainer>
  </UiCard>
</template>

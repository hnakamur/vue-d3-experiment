<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'
import type { YearRank } from '@/types'

type Props = {
  data: YearRank[]
  stroke: string
  strokeWidth: number
  xAccessor: any
  yAccessor: any
}
const props = defineProps<Props>()

const path = ref(null)

const lineGenerator = d3.line()

lineGenerator
  .x((d) => props.xAccessor(d))
  .y((d) => props.yAccessor(d))
  .defined((d) => props.yAccessor(d) !== null)
  .curve(d3.curveMonotoneX)

const updatePath = (d: any) => {
  console.log('update', d)
  d3.select(path.value).transition().duration(400).ease(d3.easeCubicOut).attr('d', lineGenerator(d))
}

onMounted(() => updatePath(props.data))

watch(
  () => props.data,
  () => updatePath(props.data)
)
</script>

<template>
  <path ref="path" fill="none" v-bind:stroke="stroke" v-bind:stroke-width="strokeWidth" />
</template>

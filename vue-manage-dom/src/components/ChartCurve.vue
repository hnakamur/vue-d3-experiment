<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'
import type { YearRank } from '@/types'

type Props = {
  data: YearRank[]
  xScale: any
  yScale: any
  xAccessor: any
  yAccessor: any
  stroke: string
  strokeWidth: number
}
const props = defineProps<Props>()
// console.log('ChartCurve data=', props.data)

const path = ref(null)

const lineGenerator = d3
  .line()
  .x((d) => {
    console.log('ChartCurve lineGenerator d=', d, ', d[xAccessor]=', d[props.xAccessor], ', ret=', props.xScale(d[props.xAccessor]))
    return props.xScale(d[props.xAccessor])
  })
  .y((d) => props.yScale(d[props.yAccessor]))
  .defined((d) => d[props.yAccessor] !== null)
  .curve(d3.curveMonotoneX)

const updatePath = (d: any) => {
  console.log('update', d)
  d3.select(path.value).transition().duration(400).ease(d3.easeCubicOut).attr('d', lineGenerator(d))
}

onMounted(() => updatePath(props.data))

watch(
    () => props.data,
    () => {
        console.log('ChatCurve watch props.data')
        updatePath(props.data)
    }
)
</script>

<template>
  <path ref="path" fill="none" v-bind:stroke="stroke" v-bind:stroke-width="strokeWidth" />
</template>

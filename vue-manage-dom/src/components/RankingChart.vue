<script setup lang="ts">
import { ref } from 'vue'
import * as d3 from 'd3'
import ChartBadge from '@/components/ChartBadge.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import ChartCurve from '@/components/ChartCurve.vue'
import ChartLabel from '@/components/ChartLabel.vue'
import RankingFilters from '@/components/RankingFilters.vue'
import UiCard from '@/components/UiCard.vue'
import type { ChartData, ExperienceRankKey, RankingFilter } from '@/types'

type Props = {
  data: ChartData
  margin: {
    top: number
    left: number
    bottom: number
    right: number
  }
  colorScale: any
}
const props = defineProps<Props>()

const width = 1000
const height = 542
const marginRight = 150
const marginLeft = 110
const innerWidth = width - marginLeft - marginRight
const innerHeight = height - props.margin.top - props.margin.bottom

const rankingFilters: RankingFilter[] = [
  { id: 'satisfaction', label: 'Satisfaction' },
  { id: 'interest', label: 'Interest' },
  { id: 'usage', label: 'Usage' },
  { id: 'awareness', label: 'Awareness' }
]
const activeFilter = ref<ExperienceRankKey>('satisfaction')

const xScale = d3.scalePoint().domain(props.data.years).range([0, innerWidth])
const ranks = d3.range(1, props.data.ids.length + 1)
const yScale = d3.scalePoint().domain(ranks).range([0, innerHeight])

const filterSelectionHandler = (id: ExperienceRankKey) => {
  if (activeFilter.value !== id) {
    activeFilter.value = id
  }
}
</script>

<template>
  <UiCard>
    <h2>Rankings</h2>
    <RankingFilters
      v-bind:filters="rankingFilters"
      v-bind:activeFilter="activeFilter"
      v-on:select="filterSelectionHandler"
    />
    <ChartContainer
      v-bind:width="width"
      v-bind:height="height"
      v-bind:margin="{
        top: margin.top,
        right: marginRight,
        bottom: margin.bottom,
        left: marginLeft
      }"
    >
      <template v-if="data && colorScale">
        <g
          v-for="year in data.years"
          v-bind:key="`line-year-${year}`"
          class="axis"
          v-bind:transform="`translate(${xScale(year)}, 0)`"
        >
          <line x1="0" v-bind:y1="innerHeight" x2="0" y2="0" stroke-dasharray="6 4" />
          <text x="0" v-bind:y="innerHeight + 40" text-anchor="middle">
            {{ year }}
          </text>
        </g>
        <g v-for="framework in data.experience" v-bind:key="`curve-${framework.id}`">
          <ChartCurve
            v-bind:data="framework[activeFilter]"
            v-bind:xScale="xScale"
            v-bind:yScale="yScale"
            xAccessor="year"
            yAccessor="rank"
            v-bind:stroke="colorScale(framework.id)"
            v-bind:strokeWidth="5"
          />
          <ChartLabel
            v-if="framework[activeFilter] && framework[activeFilter][0].rank"
            v-bind:x="-25"
            v-bind:y="yScale(framework[activeFilter][0].rank)"
            v-bind:color="colorScale(framework.id)"
            v-bind:label="framework.name"
            textAnchor="end"
          />
          <template v-if="framework[activeFilter]">
            <ChartLabel
              v-bind:x="innerWidth + 25"
              v-bind:y="yScale(framework[activeFilter][framework[activeFilter].length - 1].rank)"
              v-bind:color="colorScale(framework.id)"
              v-bind:label="framework.name"
              textAnchor="start"
            />
            <template
              v-for="(selection, i) in framework[activeFilter]"
              v-bind:key="`${framework.id}-selection-${i}`"
            >
              <ChartBadge
                v-if="selection.rank"
                v-bind:translation="[xScale(selection.year), yScale(selection.rank)]"
                v-bind:strokeColor="colorScale(framework.id)"
                v-bind:label="`${Math.round(selection.percentage_question)}%`"
              />
            </template>
          </template>
        </g>
      </template>
    </ChartContainer>
  </UiCard>
</template>

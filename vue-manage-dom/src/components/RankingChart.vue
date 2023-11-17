<script setup lang="ts">
import { ref } from 'vue'
import * as d3 from 'd3'
import ChartBadge from '@/components/ChartBadge.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import ChartCurve from '@/components/ChartCurve.vue'
import ChartLabel from '@/components/ChartLabel.vue'
import RankingFilters from '@/components/RankingFilters.vue'
import UiCard from '@/components/UiCard.vue'
import type { ChartData, ExperienceRankKey, RankingFilter, YearRank } from '@/types'

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

const xScale = d3.scalePoint()
const yScale = d3.scalePoint()
const xAccessor = (d: YearRank) => xScale(d.year.toString())
const yAccessor = (d: YearRank) => (d.rank ? yScale(d.rank.toString()) : null)

const years = props.data.years.map((year) => year.toString())
xScale.domain(years).range([0, innerWidth])
const ranks = d3.range(1, props.data.ids.length + 1).map((rank) => rank.toString())
yScale.domain(ranks).range([0, innerHeight])

const labelVerticalPosition = (item: { rank: number }[], position: string) => {
  if (position === 'left' && item[0].rank) {
    return yScale(item[0].rank.toString())
  } else if (position === 'right') {
    return yScale(item[item.length - 1].rank.toString())
  } else {
    return 0
  }
}

const getBadgeTranslation = (selection: YearRank): [number, number] => [
  parseFloat(xScale(selection.year.toString()) as unknown as string),
  parseFloat(yScale(selection.rank.toString()) as unknown as string)
]

const filterSelectionHandler = (id: string) => {
  if (activeFilter.value !== id) {
    activeFilter.value = id as ExperienceRankKey
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
          v-bind:transform="`translate(${xScale(year.toString())}, 0)`"
        >
          <line x1="0" v-bind:y1="innerHeight" x2="0" y2="0" stroke-dasharray="6 4" />
          <text x="0" v-bind:y="innerHeight + 40" text-anchor="middle">
            {{ year }}
          </text>
        </g>
        <g v-for="framework in data.experience" v-bind:key="`curve-${framework.id}`">
          <ChartCurve
            v-bind:data="framework[activeFilter]"
            v-bind:stroke="colorScale(framework.id)"
            v-bind:xAccessor="xAccessor"
            v-bind:yAccessor="yAccessor"
            v-bind:strokeWidth="5"
          />
          <ChartLabel
            v-if="framework[activeFilter] && framework[activeFilter][0].rank"
            v-bind:x="-25"
            v-bind:y="labelVerticalPosition(framework[activeFilter], 'left') as number"
            v-bind:color="colorScale(framework.id)"
            v-bind:label="framework.name"
            textAnchor="end"
          />
          <template v-if="framework[activeFilter]">
            <ChartLabel
              v-bind:x="innerWidth + 25"
              v-bind:y="labelVerticalPosition(framework[activeFilter], 'right') as number"
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
                v-bind:translation="getBadgeTranslation(selection)"
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

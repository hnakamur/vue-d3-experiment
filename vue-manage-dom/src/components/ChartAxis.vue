<script setup lang="ts">
type Props = {
  type: 'bottom' | 'left' | 'band'
  scale: any
  innerWidth: number
  innerHeight: number
  label?: string
  ticksArray?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  ticksArray: () => []
})

const divider = props.type === 'bottom' ? 100 : props.type === 'left' ? 50 : 100
const numberOfTicks = props.innerWidth / divider
const ticks = props.type !== 'band' ? props.scale.ticks(numberOfTicks) : undefined
</script>

<template>
  <g v-if="type === 'bottom'" class="axis" v-bind:transform="`translate(0, ${innerHeight})`">
    <line x1="0" y1="0" v-bind:x2="innerWidth" y2="0" />
    <g
      v-for="tick in ticks"
      v-bind:key="`tick-bottom-${tick}`"
      v-bind:transform="`translate(${scale(tick)}, 0)`"
    >
      <line x1="0" y1="0" x2="0" y2="5" />
      <text x="0" y="20" text-anchor="middle">{{ tick }}</text>
    </g>
    <text
      v-if="label !== ''"
      text-anchor="middle"
      v-bind:transform="`translate(${innerWidth / 2}, 45)`"
    >
      {{ label }}
    </text>
  </g>
  <g v-else-if="type === 'left'" class="axis">
    <line x1="0" v-bind:y1="innerHeight" x2="0" y2="0" />
    <g
      v-for="tick in ticks"
      v-bind:key="`tick-left-${tick}`"
      v-bind:transform="`translate(0, ${scale(tick)})`"
    >
      <line x1="-5" y1="0" x2="0" y2="0" />
      <text x="-10" y="0" text-anchor="end" alignment-baseline="middle">
        {{ tick }}
      </text>
    </g>
    <text
      v-if="label !== ''"
      text-anchor="middle"
      v-bind:transform="`translate(-42, ${innerHeight / 2}) rotate(-90)`"
    >
      {{ label }}
    </text>
  </g>
  <g v-else-if="type === 'band'" class="axis" v-bind:transform="`translate(0, ${innerHeight})`">
    <line x1="0" y1="0" v-bind:x2="innerWidth" y2="0" />
    <text
      v-for="tick in ticksArray"
      v-bind:key="`tick-band-${tick}`"
      text-anchor="end"
      alignment-baseline="middle"
      v-bind:transform="`translate(${scale(tick) + scale.bandwidth() / 2}, 8) rotate(-90)`"
    >
      {{ tick }}
    </text>
  </g>
</template>

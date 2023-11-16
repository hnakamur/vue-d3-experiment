<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  id: string
  isActive: boolean
  type?: 'button' | 'submit'
  label: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'button'
})

const buttonClass = computed(() => `button ${props.isActive ? 'active' : ''}`)
const onClick = () => {
  console.log('FilterButton.onClick, id=', props.id)
}
</script>

<template>
  <button v-bind:class="buttonClass" v-on:click="onClick" v-bind:type="type">
    {{ label }}
  </button>
</template>

<style scoped>
.button {
  margin: 0;
  padding: 8px 10px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.4rem;
  color: #06273b;
  background-color: transparent;
  border: 1px dashed #06273b;
  border-left: none;
  cursor: pointer;
  transition: all 250ms ease-in;
}
.button:first-of-type {
  border-left: 1px dashed #06273b;
}
.button:hover,
.button.active {
  background-color: rgba(6, 39, 59, 0.15);
  transition-timing-function: ease-out;
}
.button.active {
  cursor: default;
}
</style>

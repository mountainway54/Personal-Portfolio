<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { definitions, shape as logoShape } from '../lib/logoGeometry'

const props = defineProps({
  width: { type: [Number, String], default: 190 },
  color: { type: String, default: '#fff' },
  stretch: { type: Number, default: 4 },
  vStretch: { type: Number, default: 1.5 },
  gapExpand: { type: Number, default: 4 },
  duration: { type: Number, default: 1.25 },
  returnDuration: { type: Number, default: 1.1 },
  interactive: { type: Boolean, default: true },
  linkMode: { type: Boolean, default: false },
})
const emit = defineEmits(['change'])
const states = reactive(definitions.map(() => ({ x: 0, scale: 1 })))
const selected = ref(-1)
type Side = 'left' | 'right' | null
const selectedSide = ref<Side>(null)
const prefersReducedMotion = ref(false)
let motionQuery: MediaQueryList | undefined
let touchFocus = false
let homeTimeline: gsap.core.Timeline | undefined
let finishHomeAnimation: (() => void) | undefined
const style = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  color: props.color,
}))

function shape(index: number) { return logoShape(index, states[index]!.scale) }

function gap(index: number, side: 'left' | 'right') {
  const d = definitions[index]!
  const start = side === 'left'
    ? definitions[index - 1]!.x + states[index - 1]!.x + definitions[index - 1]!.w * states[index - 1]!.scale
    : d.x + states[index]!.x + d.w
  const end = side === 'left'
    ? d.x + states[index]!.x
    : definitions[index + 1]!.x + states[index + 1]!.x
  return { x: start - states[index]!.x, width: Math.max(0, end - start) }
}

function hit(index: number) {
  const d = definitions[index]!
  if (d.name !== 'V') return { x: d.x - 8, width: d.w * states[index]!.scale + 16 }
  // The original Vs overlap. Partition their hover zones so both are reachable.
  const firstBottom = definitions[0]!.x + states[0]!.x + (definitions[0]!.bottom! - definitions[0]!.x) * states[0]!.scale
  const secondBottom = definitions[1]!.x + states[1]!.x + (definitions[1]!.bottom! - definitions[1]!.x) * states[1]!.scale
  const divider = (firstBottom + secondBottom) / 2
  const start = index === 0 ? d.x + states[index]!.x - 8 : divider
  const end = index === 0 ? divider : d.x + states[index]!.x + d.w * states[index]!.scale + 8
  return { x: start - states[index]!.x, width: Math.max(0, end - start) }
}

function activate(index: number, side: Side = null) {
  if (!props.interactive) return
  if (prefersReducedMotion.value) index = -1
  if (index >= 0 && definitions[index]!.name === 'I' && !side) index = -1
  if (index < 0) side = null
  if (selected.value === index && selectedSide.value === side) return
  selected.value = index
  selectedSide.value = side
  const spacing = index >= 0 && definitions[index]!.name === 'I'
  const factor = Math.max(1, index >= 0 && definitions[index]!.name === 'V' ? props.vStretch : props.stretch)
  const gapFactor = Math.max(1, props.gapExpand)
  const extra = index < 0 ? 0 : definitions[index]!.w * (factor - 1)
  const gapExtra = spacing
    ? (side === 'left'
      ? definitions[index]!.x - definitions[index - 1]!.x - definitions[index - 1]!.w
      : definitions[index + 1]!.x - definitions[index]!.x - definitions[index]!.w) * (gapFactor - 1)
    : 0
  states.forEach((state, i) => {
    const target = spacing
      ? { x: (side === 'left' ? i >= index : i > index) ? gapExtra : 0, scale: 1 }
      : { x: index >= 0 && i > index ? extra : 0, scale: i === index ? factor : 1 }
    gsap.to(state, {
      ...target,
      duration: prefersReducedMotion.value ? 0 : Math.max(0, index < 0 ? props.returnDuration : props.duration),
      ease: 'elastic.out(1, 0.55)',
      overwrite: true,
    })
  })
  emit('change', { index, letter: index < 0 ? null : definitions[index]!.name, side, factor: index < 0 ? 1 : spacing ? gapFactor : factor })
}

function reset() { activate(-1) }
function toggle(index: number, side: Side = null) {
  touchFocus = false
  activate(selected.value === index && selectedSide.value === side ? -1 : index, side)
}
function pointerDown(event: PointerEvent) { touchFocus = event.pointerType === 'touch' }
function focus(index: number) {
  // Touch taps may synthesize focus before click; let that click toggle once.
  if (touchFocus) { touchFocus = false; return }
  activate(index, definitions[index]!.name === 'I' ? 'left' : null)
}
function hover(event: PointerEvent, index: number, side: Side = null) {
  if (event.pointerType !== 'touch') activate(index, side)
}
function leave(event: PointerEvent) { if (event.pointerType !== 'touch') reset() }
function keydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Escape') { event.preventDefault(); reset(); return }
  if (definitions[index]!.name === 'I' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
    activate(index, event.key === 'ArrowLeft' ? 'left' : 'right')
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (definitions[index]!.name === 'I') activate(index, selectedSide.value === 'left' ? 'right' : 'left')
    else toggle(index)
  }
}
function focusout(event: FocusEvent) {
  if (!(event.currentTarget as Element).contains(event.relatedTarget as Node | null)) reset()
}
function updateMotion(event: MediaQueryListEvent) {
  prefersReducedMotion.value = event.matches
  if (event.matches) {
    stopHomeAnimation()
    states.forEach(state => gsap.killTweensOf(state))
    selected.value = -1
    selectedSide.value = null
    states.forEach(state => Object.assign(state, { x: 0, scale: 1 }))
  }
}
function clickLetter(event: MouseEvent, index: number, side: Side = null) {
  if (!props.interactive || props.linkMode) return
  event.stopPropagation()
  toggle(index, side)
}
function stopHomeAnimation() {
  homeTimeline?.kill()
  homeTimeline = undefined
  finishHomeAnimation?.()
  finishHomeAnimation = undefined
}
function animateHome(expanded: boolean): Promise<void> {
  stopHomeAnimation()
  states.forEach(state => gsap.killTweensOf(state))
  if (prefersReducedMotion.value) {
    states.forEach(state => Object.assign(state, { x: 0, scale: 1 }))
    return Promise.resolve()
  }
  return new Promise(resolve => {
    finishHomeAnimation = resolve
    homeTimeline = gsap.timeline({
      onUpdate: () => {
        let offset = 0
        states.forEach((state, index) => {
          state.x = offset
          offset += definitions[index]!.w * (state.scale - 1)
        })
      },
      onComplete: () => { finishHomeAnimation = undefined; resolve() },
    })
    states.forEach((state, index) => {
      const letter = definitions[index]!.name
      const scale = !expanded || letter === 'I' ? 1 : letter === 'V' ? props.vStretch : props.stretch
      homeTimeline!.to(state, { scale, duration: 0.24, ease: 'power2.inOut' }, index * 0.05)
    })
  })
}
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', updateMotion)
})
onBeforeUnmount(() => {
  stopHomeAnimation()
  states.forEach(state => gsap.killTweensOf(state))
  motionQuery?.removeEventListener('change', updateMotion)
})
watch(() => [props.stretch, props.vStretch, props.gapExpand], () => {
  const index = selected.value
  const side = selectedSide.value
  selected.value = -1
  if (index >= 0) activate(index, side)
})
defineExpose({ reset, animateHome })
</script>

<template>
  <div class="interactive-logo" :class="{ 'logo-link-mode': linkMode }" :style="style" @pointerleave="leave" @focusout="focusout">
    <svg viewBox="0 0 1734.38 205.21" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="WILLLIN interactive logo">
      <g v-for="(letter, index) in definitions" :key="index"
        :transform="`translate(${states[index]!.x} 0)`"
        class="letter"
        :tabindex="interactive && !linkMode ? 0 : undefined"
        :role="interactive && !linkMode ? 'button' : undefined"
        :aria-label="interactive && !linkMode ? (letter.name === 'I' ? `Letter I, position ${index + 1}. Use arrow keys to expand spacing` : `Stretch letter ${letter.name}, position ${index + 1}`) : undefined"
        :aria-pressed="interactive && !linkMode ? selected === index : undefined"
        @pointerdown="pointerDown"
        @focus="focus(index)"
        @keydown="keydown($event, index)"
        @click="clickLetter($event, index)">
        <!-- v-html only renders the trusted, bundled SVG geometry above. -->
        <g class="ink" v-html="shape(index)" />
        <rect class="hit" :x="hit(index).x" y="5" :width="hit(index).width" height="195"
          @pointerenter.stop="hover($event, index)" />
        <template v-if="letter.name === 'I'">
          <rect v-for="side in (['left', 'right'] as const)" :key="side" class="hit"
            :x="gap(index, side).x" :width="gap(index, side).width" y="5" height="195"
            @pointerenter.stop="hover($event, index, side)" @click="clickLetter($event, index, side)" />
        </template>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.interactive-logo { display: inline-block; position: relative; flex-shrink: 0; touch-action: pan-y; overflow: visible; }
svg { display: block; width: 100%; height: auto; min-height: 0; overflow: visible; }
.letter { fill: currentColor; cursor: pointer; }
.ink { pointer-events: none; }
.hit { fill: transparent; pointer-events: all; }
.interactive-logo .letter:focus,
.interactive-logo .letter:focus-visible { outline: none; box-shadow: none; }
</style>


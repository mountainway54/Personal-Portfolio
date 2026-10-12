<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  loading: { type: Boolean, default: true },
  width: { type: [Number, String], default: 360 },
  color: { type: String, default: '#fff' },
  stretch: { type: Number, default: 4 },
})
const emit = defineEmits(['expanded', 'complete'])
const letters = reactive(Array.from({ length: 7 }, () => ({ progress: 0 })))
const phase = ref('expanding')
const thickness = 18.76
const center = 102.605
const scale = (index: number) => 1 + letters[index]!.progress * (Math.max(1, props.stretch) - 1)
const y = (value: number, index: number) => center + (value - center) * scale(index)

// Rebuild each outline about the same center without stretching its thickness.
function v(left: number, bottom: number, right: number) {
  const top = y(25.48, 0)
  const base = y(182.29, 0)
  const a = (base - top) / (bottom - left)
  const b = (base - top) / (right - bottom)
  const da = thickness * Math.sqrt(1 + a ** 2)
  const db = thickness * Math.sqrt(1 + b ** 2)
  const innerX = (db - da + (a + b) * bottom) / (a + b)
  const innerY = base + a * (innerX - bottom) - da
  return `${left},${top} ${left + da / a},${top} ${innerX},${innerY} ${right - db / b},${top} ${right},${top} ${bottom},${base}`
}
function l(left: number, right: number, index: number) {
  const top = y(25.48, index)
  const bottom = y(179.73, index)
  return `M${left} ${top}H${left + thickness}V${bottom - thickness}H${right}V${bottom}H${left}Z`
}
const n = computed(() => {
  const half = thickness / 2
  const leftY = y(38.065, 6)
  const rightY = y(167.14, 6)
  const slope = (rightY - leftY) / (1691.14 - 1499.9)
  const offset = half * Math.sqrt(1 + slope ** 2)
  return `1700.52,${y(25.48, 6)} 1700.52,${rightY + slope * half + offset} 1509.28,${leftY + slope * half + offset} 1509.28,${y(179.73, 6)} 1490.52,${y(179.73, 6)} 1490.52,${leftY - slope * half - offset} 1681.76,${rightY - slope * half - offset} 1681.76,${y(25.48, 6)}`
})
const style = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  color: props.color,
}))
let timeline: gsap.core.Timeline | undefined
let media: MediaQueryList | undefined
let mounted = false
function finish() {
  if (!mounted || props.loading || phase.value !== 'expanded') return
  phase.value = 'returning'
  timeline = gsap.timeline({ onComplete: () => {
    phase.value = 'complete'
    emit('complete')
  } })
  timeline.to(letters, {
    progress: 0,
    duration: media?.matches ? 0 : 1.15,
    ease: 'elastic.out(1, 0.48)',
  })
}
function expand() {
  timeline?.kill()
  gsap.killTweensOf(letters)
  letters.forEach(letter => { letter.progress = 0 })
  phase.value = 'expanding'
  timeline = gsap.timeline({ onComplete: () => {
    phase.value = 'expanded'
    emit('expanded')
    finish()
  } })
  timeline.to(letters, {
    progress: media?.matches ? 0 : 1,
    duration: media?.matches ? 0 : 0.7,
    stagger: media?.matches ? 0 : 0.14,
    ease: 'power2.inOut',
  })
}
function updateMotion() {
  if (!media?.matches) return
  timeline?.kill()
  gsap.killTweensOf(letters)
  letters.forEach(letter => { letter.progress = 0 })
  if (phase.value !== 'complete') {
    phase.value = 'expanded'
    finish()
  }
}
watch(() => props.loading, (loading) => {
  if (!mounted) return
  if (loading && (phase.value === 'complete' || phase.value === 'returning')) expand()
  else if (!loading) finish()
})
onMounted(() => {
  mounted = true
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', updateMotion)
  expand()
})
onBeforeUnmount(() => {
  mounted = false
  timeline?.kill()
  gsap.killTweensOf(letters)
  media?.removeEventListener('change', updateMotion)
})
defineExpose({ replay: () => { if (mounted) expand() } })
</script>

<template>
  <div class="loading-logo" :style="style" role="status" :aria-busy="phase !== 'complete'">
    <span class="sr-only">{{ phase === 'complete' ? 'Portfolio loaded' : 'Loading portfolio' }}</span>
    <svg viewBox="0 0 1734.38 205.21" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="currentColor">
        <polygon :points="v(33.85, 266.52, 499.01)" />
        <polygon :points="v(253.79, 486.46, 718.95)" />
        <template v-for="item in [{ left: 788.35, index: 1 }, { left: 1363.43, index: 5 }]" :key="item.index">
          <rect :x="item.left" :y="y(25.48, item.index)" :width="thickness" :height="64.74 * scale(item.index)" />
          <rect :x="item.left" :y="y(114.97, item.index)" :width="thickness" :height="64.75 * scale(item.index)" />
        </template>
        <path :d="l(904.51, 1061.02, 2)" />
        <path :d="l(1061.02, 1217.53, 3)" />
        <path :d="l(1217.53, 1311.16, 4)" />
        <polygon :points="n" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.loading-logo { display: block; }
svg { display: block; width: 100%; height: auto; overflow: visible; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>

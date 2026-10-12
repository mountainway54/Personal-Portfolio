<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const frame = ref(0)
const openFrame = 10
let animation = 0
let motion: MediaQueryList | undefined

function update() {
  cancelAnimationFrame(animation)
  const target = props.open ? openFrame : 0
  if (!motion || motion.matches) { frame.value = target; return }
  const startFrame = frame.value
  const direction = Math.sign(target - startFrame)
  if (!direction) return
  const started = performance.now()
  function tick(now: number) {
    const steps = Math.floor((now - started) / 41)
    frame.value = startFrame + direction * Math.min(steps, Math.abs(target - startFrame))
    if (frame.value !== target) animation = requestAnimationFrame(tick)
  }
  animation = requestAnimationFrame(tick)
}
watch(() => props.open, update)
onMounted(() => {
  motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', update)
  update()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(animation)
  motion?.removeEventListener('change', update)
})
</script>

<template>
  <span class="menu-icon" aria-hidden="true">
    <img src="/icons/menu-sprite.png" width="2688" height="96" alt=""
      :style="{ transform: `translateX(${-frame * 24}px)` }" />
  </span>
</template>

<script setup lang="ts">
import { loadingLimitMs } from '~/utils/loading'
// Render the overlay during SSR so the page cannot flash before hydration.
const visible = useState<boolean>('portfolio-loading-visible', () => true)
const loading = ref(true)
let timer: ReturnType<typeof setTimeout> | undefined
let image: HTMLImageElement | null = null
let media: MediaQueryList | undefined
function ready() { loading.value = false }
function close() { visible.value = false; if (timer) clearTimeout(timer) }
function motion() { if (media?.matches) close() }
onMounted(async () => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', motion)
  if (media.matches) { close(); return }
  timer = setTimeout(close, loadingLimitMs)
  await nextTick()
  image = document.querySelector('main img[data-priority]')
  if (!image || image.complete) ready()
  else { image.addEventListener('load', ready, { once: true }); image.addEventListener('error', ready, { once: true }) }
})
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  image?.removeEventListener('load', ready)
  image?.removeEventListener('error', ready)
  media?.removeEventListener('change', motion)
})
</script>
<template>
  <div v-if="visible" class="loading-screen" aria-label="Loading portfolio">
    <LoadingLogo :loading="loading" color="#fff" :width="280" @complete="close" />
  </div>
</template>

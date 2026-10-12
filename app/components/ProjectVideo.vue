<script setup lang="ts">
import type { Media } from '~/types/portfolio'
const props = defineProps<{ media: Media }>()
const frame = ref<HTMLElement>()
const failed = ref(false)
const aspectRatio = ref(props.media.width / props.media.height)
useImageReveal(frame, computed(() => true), 'up')
function loaded(event: Event) {
  const video = event.target as HTMLVideoElement
  if (video.videoWidth && video.videoHeight) aspectRatio.value = video.videoWidth / video.videoHeight
}
</script>
<template>
  <div ref="frame" class="media-frame project-video" :style="{ aspectRatio }">
    <video v-if="!failed" :src="media.sourcePath" :aria-label="`${media.alt.en} · ${media.alt.zhTw}`" autoplay muted loop playsinline controls preload="metadata" @loadedmetadata="loaded" @error="failed = true" />
    <div v-else class="media-placeholder" role="img" :aria-label="media.alt.en"><span>Video unavailable</span><span lang="zh-Hant">影片暫時無法載入</span></div>
  </div>
</template>
